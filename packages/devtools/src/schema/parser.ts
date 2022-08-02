import { ModelAccountRelation } from '@ceramicnetwork/stream-model'
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
import type {
  AbstractModelDefinition,
  ItemDefinition,
  ListFieldDefinition,
  ObjectDefinition,
  ReferenceFieldType,
  SchemaDefinition,
  ViewFieldDefinition,
} from './types.js'

const ACCOUNT_RELATIONS: Record<string, ModelAccountRelation> = {
  LIST: ModelAccountRelation.LIST,
  SINGLE: ModelAccountRelation.SINGLE,
}

type NumberDirectiveArguments = {
  default?: number
  max?: number
  min?: number
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
        return type
      },
      [MapperKind.INTERFACE_TYPE]: (type: GraphQLInterfaceType) => {
        const model = this._parseModelDirective(type)
        if (model == null) {
          throw new Error(`Missing @createModel or @loadModel directive for interface ${type.name}`)
        }
        this.#def.models[type.name] = model
        return type
      },
      [MapperKind.OBJECT_TYPE]: (type: GraphQLObjectType) => {
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

    if (Object.keys(this.#def.models).length === 0) {
      throw new Error('No models found in Composite Definition Schema')
    }

    return this.#def
  }

  _parseModelDirective(
    type: GraphQLInterfaceType | GraphQLObjectType
  ): AbstractModelDefinition | void {
    const directives = getDirectives(this.#schema, type)
    const createModel = directives.find((d) => d.name === 'createModel')
    const loadModel = directives.find((d) => d.name === 'loadModel')

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
        throw new Error('Missing accountRelation value for @createModel directive')
      }
      const accountRelationValue = ACCOUNT_RELATIONS[accountRelation]
      if (accountRelationValue == null) {
        throw new Error(
          `Unsupported accountRelation value ${accountRelation} for @createModel directive`
        )
      }
      if (description == null || description === '') {
        throw new Error('Missing description value for @createModel directive')
      }
      return {
        type: 'create',
        accountRelation: accountRelationValue,
        description,
        interface: isInterfaceType(type),
        implements: type.getInterfaces().map((i) => i.name),
      }
    }
  }

  _parseObjectFields(type: GraphQLObjectType): ObjectDefinition {
    const fields: ObjectDefinition = {}
    for (const [key, value] of Object.entries(type.getFields())) {
      const directives = getDirectives(this.#schema, value)

      const view = this._parseViews(value.type, directives)
      if (view != null) {
        fields[key] = view
        continue
      }

      const [innerType, required] = isNonNullType(value.type)
        ? [value.type.ofType, true]
        : [value.type, false]
      fields[key] = isListType(innerType)
        ? this._parseListType(innerType, required, directives)
        : this._parseItemType(value.type, directives)
    }
    return fields
  }

  _parseViews(
    type: GraphQLType,
    directives: Array<DirectiveAnnotation>
  ): ViewFieldDefinition | void {
    for (const directive of directives) {
      switch (directive.name) {
        case 'documentAccount':
          if (!isScalarType(type) || type.name !== 'DID') {
            throw new Error('@documentAccount directive can only be set on a DID scalar')
          }
          return { type: 'view', required: true, viewType: 'documentAccount' }
        case 'documentVersion':
          if (!isScalarType(type) || type.name !== 'CommitID') {
            throw new Error('@documentVersion directive can only be set on a CommitID scalar')
          }
          return { type: 'view', required: true, viewType: 'documentVersion' }
      }
    }
  }

  _parseListType(
    type: GraphQLList<GraphQLType>,
    required: boolean,
    directives: Array<DirectiveAnnotation>
  ): ListFieldDefinition {
    const list = directives.find((d) => d.name === 'list')
    if (list == null) {
      throw new Error('Missing @list directive on list field')
    }
    if (list.args?.maxLength == null) {
      throw new Error('Missing maxLength value for @list directive')
    }

    const definition: ListFieldDefinition = {
      type: 'list',
      required,
      item: this._parseItemType(type.ofType, directives),
      maxLength: list.args.maxLength,
    }
    if (list.args?.minLength != null) {
      definition.minLength = list.args.minLength
    }
    return definition
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
    const args = directives.find((d) => d.name === 'int')?.args
    return args ? this._validateNumberArguments(schema, args) : schema
  }

  _validateNumberSchema(
    schema: JSONSchema.Number,
    directives: Array<DirectiveAnnotation>
  ): JSONSchema.Number {
    const args = directives.find((d) => d.name === 'float')?.args
    return args ? this._validateNumberArguments(schema, args) : schema
  }

  _validateNumberArguments<T extends JSONSchema.Integer | JSONSchema.Number>(
    schema: T,
    args: NumberDirectiveArguments
  ): T {
    if (args.max != null) {
      schema.minimum = args.min
    }
    if (args.min != null) {
      schema.minimum = args.min
    }
    if (args.default != null) {
      if (args.max != null && args.default > args.max) {
        throw new Error('Default value is higher than max constraint')
      }
      if (args.min != null && args.default < args.min) {
        throw new Error('Default value is lower than min constraint')
      }
      schema.default = args.default
    }
    return schema
  }

  _validateStringSchema(
    schema: JSONSchema.String,
    directives: Array<DirectiveAnnotation>
  ): JSONSchema.String {
    const string = directives.find((d) => d.name === 'string')
    const defaultValue = string?.args?.default ?? schema.default
    const maxLength = string?.args?.maxLength ?? schema.maxLength
    const minLength = string?.args?.minLength ?? schema.minLength

    if (maxLength == null) {
      if (string == null) {
        throw new Error('Missing @string directive for field of type String')
      }
      throw new Error('Missing maxLength value for @string directive')
    }
    schema.maxLength = maxLength

    if (minLength != null) {
      schema.minLength = minLength
    }

    if (defaultValue != null) {
      if (defaultValue.length > maxLength) {
        throw new Error('Length of default value is higher than maxLength constraint')
      }
      if (minLength != null && defaultValue.length < minLength) {
        throw new Error('Length of default value is lower than minLength constraint')
      }
      schema.default = defaultValue
    }

    return schema
  }

  _getReferenceFieldType(type: GraphQLType): ReferenceFieldType | void {
    if (isEnumType(type)) {
      return 'enum'
    }
    if (isObjectType(type)) {
      return 'object'
    }
    if (isUnionType(type)) {
      return 'union'
    }
  }
}

export function parseSchema(schema: string): SchemaDefinition {
  return new SchemaParser(schema).parse()
}
