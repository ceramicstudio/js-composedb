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
  ItemDefinition,
  ListFieldDefinition,
  ObjectDefinition,
  ParsedModelDefinition,
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
  ): ParsedModelDefinition | void {
    const directives = getDirectives(this.#schema, type)
    const createModel = directives.find((d) => d.name === 'createModel')
    const loadModel = directives.find((d) => d.name === 'loadModel')

    if (loadModel != null) {
      const id = loadModel.args?.id as string | void
      if (id == null) {
        throw new Error(`Missing id value for @loadModel directive on object ${type.name}`)
      }
      if (createModel != null) {
        throw new Error(
          `Unsupported @createModel and @loadModel directives on same object ${type.name}`
        )
      }
      return { action: 'load', id }
    }

    if (createModel != null) {
      const { accountRelation, description } = (createModel.args ?? {}) as {
        accountRelation?: string
        description?: string
      }
      if (accountRelation == null) {
        throw new Error(
          `Missing accountRelation value for @createModel directive on object ${type.name}`
        )
      }
      const accountRelationValue = ACCOUNT_RELATIONS[accountRelation]
      if (accountRelationValue == null) {
        throw new Error(
          `Unsupported accountRelation value ${accountRelation} for @createModel directive on object ${type.name}`
        )
      }
      if (description == null || description === '') {
        throw new Error(
          `Missing description value for @createModel directive on object ${type.name}`
        )
      }
      return {
        action: 'create',
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

      const [innerType, required] = isNonNullType(value.type)
        ? [value.type.ofType, true]
        : [value.type, false]

      const view = this._parseViews(type.name, key, innerType, directives)
      if (view != null) {
        fields[key] = view
      } else if (isListType(innerType)) {
        fields[key] = this._parseListType(type.name, key, innerType, required, directives)
      } else {
        const list = directives.find((d) => d.name === 'list')
        if (list != null) {
          throw new Error(`Unexpected @list directive on field ${key} of object ${type.name}`)
        }
        fields[key] = this._parseItemType(type.name, key, value.type, directives)
      }
    }
    return fields
  }

  _parseViews(
    objectName: string,
    fieldName: string,
    type: GraphQLType,
    directives: Array<DirectiveAnnotation>
  ): ViewFieldDefinition | void {
    for (const directive of directives) {
      switch (directive.name) {
        case 'documentAccount':
          if (!isScalarType(type) || type.name !== 'DID') {
            throw new Error(
              `Unsupported @documentAccount directive on field ${fieldName} of object ${objectName}, @documentAccount can only be set on a DID scalar`
            )
          }
          return { type: 'view', required: true, viewType: 'documentAccount' }
        case 'documentVersion':
          if (!isScalarType(type) || type.name !== 'CommitID') {
            throw new Error(
              `Unsupported @documentVersion directive on field ${fieldName} of object ${objectName}, @documentVersion can only be set on a CommitID scalar`
            )
          }
          return { type: 'view', required: true, viewType: 'documentVersion' }
      }
    }
  }

  _parseListType(
    objectName: string,
    fieldName: string,
    type: GraphQLList<GraphQLType>,
    required: boolean,
    directives: Array<DirectiveAnnotation>
  ): ListFieldDefinition {
    const list = directives.find((d) => d.name === 'list')
    if (list == null) {
      throw new Error(`Missing @list directive on list field ${fieldName} of object ${objectName}`)
    }
    if (list.args?.maxLength == null) {
      throw new Error(
        `Missing maxLength value for @list directive on field ${fieldName} of object ${objectName}`
      )
    }

    const definition: ListFieldDefinition = {
      type: 'list',
      required,
      item: this._parseItemType(objectName, fieldName, type.ofType, directives),
      maxLength: list.args.maxLength as number,
    }
    if (list.args?.minLength != null) {
      definition.minLength = list.args.minLength as number
    }
    return definition
  }

  _parseItemType(
    objectName: string,
    fieldName: string,
    type: GraphQLType,
    directives: Array<DirectiveAnnotation>
  ): ItemDefinition {
    const required = isNonNullType(type)
    const innerType = required ? type.ofType : type
    if (isListType(innerType)) {
      throw new Error(`Unsupported nested list on field ${fieldName} of object ${objectName}`)
    }

    const referenceType = this._getReferenceFieldType(innerType)
    if (referenceType != null) {
      return { type: referenceType, required, name: innerType.name }
    }

    if (isScalarType(innerType)) {
      return {
        type: 'scalar',
        required,
        schema: this._parseScalarSchema(objectName, fieldName, innerType, directives),
      }
    }
    throw new Error(
      `Unsupported type ${innerType.name} on field ${fieldName} of object ${objectName}`
    )
  }

  _parseScalarSchema(
    objectName: string,
    fieldName: string,
    type: GraphQLScalarType,
    directives: Array<DirectiveAnnotation>
  ): ScalarSchema {
    const schema = getScalarSchema(type)

    const boolean = directives.find((d) => d.name === 'boolean')
    const float = directives.find((d) => d.name === 'float')
    const int = directives.find((d) => d.name === 'int')
    const string = directives.find((d) => d.name === 'string')

    switch (schema.type) {
      case 'boolean': {
        const mismatch = [float, int, string].find(Boolean)
        if (mismatch) {
          throw new Error(
            `Unexpected @${mismatch.name} directive with type ${type.name} on field ${fieldName} of object ${objectName}`
          )
        }
        break
      }
      case 'integer': {
        const mismatch = [boolean, float, string].find(Boolean)
        if (mismatch) {
          throw new Error(
            `Unexpected @${mismatch.name} directive with type ${type.name} on field ${fieldName} of object ${objectName}`
          )
        }
        return this._validateIntegerSchema(objectName, fieldName, schema, int)
      }
      case 'number': {
        const mismatch = [boolean, int, string].find(Boolean)
        if (mismatch) {
          throw new Error(
            `Unexpected @${mismatch.name} directive with type ${type.name} on field ${fieldName} of object ${objectName}`
          )
        }
        return this._validateNumberSchema(objectName, fieldName, schema, float)
      }
      case 'string': {
        const mismatch = [boolean, float, int].find(Boolean)
        if (mismatch) {
          throw new Error(
            `Unexpected @${mismatch.name} directive with type ${type.name} on field ${fieldName} of object ${objectName}`
          )
        }
        return this._validateStringSchema(objectName, fieldName, schema, string)
      }
    }
    return schema
  }

  _validateIntegerSchema(
    objectName: string,
    fieldName: string,
    schema: JSONSchema.Integer,
    directive: DirectiveAnnotation | undefined
  ): JSONSchema.Integer {
    const args = directive?.args
    return args ? this._validateNumberArguments(objectName, fieldName, schema, args) : schema
  }

  _validateNumberSchema(
    objectName: string,
    fieldName: string,
    schema: JSONSchema.Number,
    directive: DirectiveAnnotation | undefined
  ): JSONSchema.Number {
    const args = directive?.args
    return args ? this._validateNumberArguments(objectName, fieldName, schema, args) : schema
  }

  _validateNumberArguments<T extends JSONSchema.Integer | JSONSchema.Number>(
    objectName: string,
    fieldName: string,
    schema: T,
    args: NumberDirectiveArguments
  ): T {
    if (args.max != null) {
      schema.maximum = args.max
    }
    if (args.min != null) {
      schema.minimum = args.min
    }
    if (args.default != null) {
      if (args.max != null && args.default > args.max) {
        throw new Error(
          `Default value is higher than max constraint on field ${fieldName} of object ${objectName}`
        )
      }
      if (args.min != null && args.default < args.min) {
        throw new Error(
          `Default value is lower than min constraint on field ${fieldName} of object ${objectName}`
        )
      }
      schema.default = args.default
    }
    return schema
  }

  _validateStringSchema(
    objectName: string,
    fieldName: string,
    schema: JSONSchema.String,
    string: DirectiveAnnotation | undefined
  ): JSONSchema.String {
    const defaultValue = (string?.args?.default ?? schema.default) as string | void
    const maxLength = (string?.args?.maxLength ?? schema.maxLength) as number | void
    const minLength = (string?.args?.minLength ?? schema.minLength) as number | void

    if (maxLength == null) {
      if (string == null) {
        throw new Error(
          `Missing @string directive on string field ${fieldName} of object ${objectName}`
        )
      }
      throw new Error(
        `Missing maxLength value for @string directive on field ${fieldName} of object ${objectName}`
      )
    }
    schema.maxLength = maxLength

    if (minLength != null) {
      schema.minLength = minLength
    }

    if (defaultValue != null) {
      if (defaultValue.length > maxLength) {
        throw new Error(
          `Length of default value is higher than maxLength constraint on field ${fieldName} of object ${objectName}`
        )
      }
      if (minLength != null && defaultValue.length < minLength) {
        throw new Error(
          `Length of default value is lower than minLength constraint on field ${fieldName} of object ${objectName}`
        )
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
