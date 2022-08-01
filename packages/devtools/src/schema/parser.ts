import type { ModelAccountRelation, ModelViewsDefinition } from '@ceramicnetwork/stream-model'
import type { JSONSchema } from '@composedb/types'
import { makeExecutableSchema } from '@graphql-tools/schema'
import {
  type DirectiveAnnotation,
  getDirectives,
  mapSchema,
  MapperKind,
} from '@graphql-tools/utils'
import {
  type GraphQLEnumType,
  type GraphQLInterfaceType,
  GraphQLList,
  type GraphQLObjectType,
  type GraphQLScalarType,
  type GraphQLSchema,
  type GraphQLType,
  type GraphQLUnionType,
  isEnumType,
  isInterfaceType,
  isListType,
  isNonNullType,
  isObjectType,
  isScalarType,
  isUnionType,
} from 'graphql'

import type { ScalarSchema } from '../types.js'

import { getScalarSchema } from './scalars.js'
import { typeDefinitions } from './typeDefinitions.js'

type CreateModelDirectiveDefinition = {
  type: 'create'
  accountRelation: ModelAccountRelation
  description: string
  interface: boolean
  interfaces: Array<string>
  // relations: Record<string, unknown>
  // views: ModelViewsDefinition
}

type LoadModelDirectiveDefinition = {
  type: 'load'
  id: string
}

type ModelDirectiveDefinition = CreateModelDirectiveDefinition | LoadModelDirectiveDefinition

type FieldCommonDefinition = {
  required: boolean
}

type EnumFieldDefinition = FieldCommonDefinition & {
  type: 'enum'
  name: string
}

type InterfaceFieldDefinition = FieldCommonDefinition & {
  type: 'interface'
  name: string
}

type ObjectReferenceFieldDefinition = FieldCommonDefinition & {
  type: 'object'
  name: string
}

type UnionFieldDefinition = FieldCommonDefinition & {
  type: 'union'
  name: string
}

type ReferenceFieldDefinition =
  | EnumFieldDefinition
  | InterfaceFieldDefinition
  | ObjectReferenceFieldDefinition
  | UnionFieldDefinition

type ReferenceFieldType = ReferenceFieldDefinition['type']

type ScalarFieldDefinition = FieldCommonDefinition & {
  type: 'scalar'
  schema: ScalarSchema
}

type ItemDefinition = ReferenceFieldDefinition | ScalarFieldDefinition

type ListFieldDefinition = FieldCommonDefinition & {
  type: 'list'
  item: ItemDefinition
  maxLength: number
  minLength?: number
}

type ObjectFieldDefinition = ItemDefinition | ListFieldDefinition

type ObjectDefinition = Record<string, ObjectFieldDefinition>

type SchemaDefinition = {
  enums: Record<string, Array<string>>
  models: Record<string, ModelDirectiveDefinition>
  objects: Record<string, ObjectDefinition>
  unions: Record<string, Array<string>>
}

export class SchemaParser {
  #def: SchemaDefinition = {
    enums: {},
    models: {},
    objects: {},
    unions: {},
  }

  #schema: GraphQLSchema

  constructor(schema: string) {
    this.#schema = makeExecutableSchema({ typeDefs: [typeDefinitions, schema] })
  }

  parse(): SchemaDefinition {
    mapSchema(this.#schema, {
      [MapperKind.ENUM_TYPE]: (type: GraphQLEnumType) => {
        console.log('ENUM_TYPE', type)
        return type
      },
      [MapperKind.INTERFACE_TYPE]: (type: GraphQLInterfaceType) => {
        console.log('INTERFACE_TYPE', type)
        const model = this._parseModelDirective(type)
        if (model == null) {
          throw new Error(`Missing @createModel or @loadModel directive for interface ${type.name}`)
        }
        this.#def.models[type.name] = model
        return type
      },
      [MapperKind.OBJECT_TYPE]: (type: GraphQLObjectType) => {
        console.log('OBJECT_TYPE', type)
        this.#def.objects[type.name] = this._parseObjectFields(type)
        const model = this._parseModelDirective(type)
        if (model != null) {
          this.#def.models[type.name] = model
        }
        return type
      },
      [MapperKind.UNION_TYPE]: (type: GraphQLUnionType) => {
        this.#def.unions[type.name] = type.getTypes().map((t) => t.name)
        return type
      },
    })
    return this.#def
  }

  _parseModelDirective(
    type: GraphQLInterfaceType | GraphQLObjectType
  ): ModelDirectiveDefinition | void {
    const directives = getDirectives(this.#schema, type)
    const createModel = directives.find((d) => d.name === 'createModel')
    const loadModel = directives.find((d) => d.name === 'loadModel')

    const interfaces = type.getInterfaces().map((i) => i.name)

    if (loadModel != null) {
      const id = loadModel.args?.id
      if (id == null) {
        throw new Error('Missing id value for @loadModel directive')
      }
      if (createModel != null) {
        throw new Error('Unsupported @createModel and @loadModel directives on same object')
      }
      return { type: 'load', id }
    }

    if (createModel != null) {
      const { accountRelation, description } = createModel.args ?? {}
      if (accountRelation == null) {
        throw new Error('Missing accountRelation value for @model directive')
      }
      if (description == null || description === '') {
        throw new Error('Missing description value for @model directive')
      }

      return {
        type: 'create',
        accountRelation,
        description,
        interface: isInterfaceType(type),
        interfaces,
      }
    }
  }

  _parseObjectFields(type: GraphQLObjectType): ObjectDefinition {
    const fields: ObjectDefinition = {}
    for (const [key, value] of Object.entries(type.getFields())) {
      const [innerType, required] = isNonNullType(value.type)
        ? [value.type.ofType, true]
        : [value.type, false]
      const fieldDirectives = getDirectives(this.#schema, value)
      fields[key] = isListType(innerType)
        ? this._parseListType(innerType, required, fieldDirectives)
        : this._parseItemType(innerType, fieldDirectives)
    }
    return fields
  }

  _parseListType(
    type: GraphQLList<GraphQLType>,
    required: boolean,
    directives: Array<DirectiveAnnotation>
  ): ListFieldDefinition {
    const arrayLength = directives.find((d) => d.name === 'arrayLength')
    if (arrayLength == null) {
      throw new Error('Missing @arrayLength directive on list field')
    }
    if (arrayLength.args?.max == null) {
      throw new Error('Missing max value for @arrayLength directive')
    }

    const list: ListFieldDefinition = {
      type: 'list',
      required,
      item: this._parseItemType(type.ofType, directives),
      maxLength: arrayLength.args.max,
    }
    if (arrayLength.args?.min != null) {
      list.minLength = arrayLength.args.min
    }
    return list
  }

  _parseItemType(type: GraphQLType, directives: Array<DirectiveAnnotation>): ItemDefinition {
    const required = isNonNullType(type)
    const innerType = required ? type.ofType : type
    if (isListType(innerType)) {
      throw new Error('Unsupported nested list')
    }

    const referenceType = this._getReferenceFieldType(innerType)
    if (referenceType != null) {
      return { type: referenceType, required, name: innerType.name }
    }

    if (isScalarType(innerType)) {
      return { type: 'scalar', required, schema: this._parseScalarSchema(innerType, directives) }
    }
    throw new Error(`Unsupported type: ${innerType.name}`)
  }

  _parseScalarSchema(
    type: GraphQLScalarType,
    directives: Array<DirectiveAnnotation>
  ): ScalarSchema {
    const schema = getScalarSchema(type)
    switch (schema.type) {
      case 'integer':
        return this._validateIntegerSchema(schema, directives)
      case 'number':
        return this._validateNumberSchema(schema, directives)
      case 'string':
        return this._validateStringSchema(schema, directives)
    }
    return schema
  }

  _validateIntegerSchema(
    schema: JSONSchema.Integer,
    directives: Array<DirectiveAnnotation>
  ): JSONSchema.Integer {
    const intRange = directives.find((d) => d.name === 'intRange')
    if (intRange?.args != null) {
      if (intRange.args.max != null) {
        schema.minimum = intRange.args.min
      }
      if (intRange.args.min != null) {
        schema.minimum = intRange.args.min
      }
    }
    return schema
  }

  _validateNumberSchema(
    schema: JSONSchema.Number,
    directives: Array<DirectiveAnnotation>
  ): JSONSchema.Number {
    const floatRange = directives.find((d) => d.name === 'floatRange')
    if (floatRange?.args != null) {
      if (floatRange.args.max != null) {
        schema.minimum = floatRange.args.min
      }
      if (floatRange.args.min != null) {
        schema.minimum = floatRange.args.min
      }
    }
    return schema
  }

  _validateStringSchema(
    schema: JSONSchema.String,
    directives: Array<DirectiveAnnotation>
  ): JSONSchema.String {
    const lengthDirective = directives.find((d) => d.name === 'length')
    const length = {
      max: lengthDirective?.args?.max ?? schema.maxLength,
      min: lengthDirective?.args?.min ?? schema.minLength,
    }
    if (length.max == null) {
      if (lengthDirective == null) {
        throw new Error('Missing @length directive for field of type String')
      }
      throw new Error('Missing max value for @length directive')
    }
    schema.maxLength = length.max
    if (length.min != null) {
      schema.minLength = length.min
    }
    return schema
  }

  _getReferenceFieldType(type: GraphQLType): ReferenceFieldType | void {
    if (isEnumType(type)) {
      return 'enum'
    }
    if (isInterfaceType(type)) {
      return 'interface'
    }
    if (isObjectType(type)) {
      return 'object'
    }
    if (isUnionType(type)) {
      return 'union'
    }
  }
}
