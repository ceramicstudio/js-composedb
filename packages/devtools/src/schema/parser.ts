import type {
  ModelAccountRelationV2,
  ModelRelationDefinition,
  ModelRelationsDefinition,
} from '@ceramicnetwork/stream-model'
import type { FieldsIndex, JSONSchema } from '@composedb/types'
import { makeExecutableSchema } from '@graphql-tools/schema'
import {
  type DirectiveAnnotation,
  getDirectives,
  MapperKind,
  mapSchema,
} from '@graphql-tools/utils'
import {
  type GraphQLEnumType,
  type GraphQLFieldMap,
  type GraphQLInterfaceType,
  GraphQLList,
  type GraphQLObjectType,
  type GraphQLScalarType,
  type GraphQLSchema,
  type GraphQLType,
  isEnumType,
  isInterfaceType,
  isListType,
  isNonNullType,
  isObjectType,
  isScalarType,
} from 'graphql'

import { NODE_INTERFACE_NAME } from '../constants.js'
import type { ScalarSchema } from '../types.js'

import { getScalarSchema } from './scalars.js'
import { typeDefinitions } from './type-definitions.js'
import type {
  Field,
  ItemDefinition,
  ListFieldDefinition,
  ObjectDefinition,
  ObjectFieldsDefinition,
  ParsedModelDefinition,
  ReferenceFieldType,
  SchemaDefinition,
  ViewFieldDefinition,
} from './types.js'

const ACCOUNT_RELATIONS: Record<string, ModelAccountRelationV2> = {
  LIST: { type: 'list' },
  NONE: { type: 'none' },
  SET: { type: 'set', fields: [] },
  SINGLE: { type: 'single' },
}

type NumberDirectiveArguments = {
  default?: number
  max?: number
  min?: number
}

type DefinitionWithReferences<T> = {
  definition: T
  references: Array<string>
}

type IntermediaryObjectDefinition = DefinitionWithReferences<ObjectFieldsDefinition> & {
  relations: ModelRelationsDefinition
}

export class SchemaParser {
  #def: SchemaDefinition = {
    enums: {},
    models: {},
    objects: {},
  }
  #schema: GraphQLSchema

  constructor(schema: string) {
    this.#schema = makeExecutableSchema({ typeDefs: [typeDefinitions, schema] })
  }

  parse(): SchemaDefinition {
    mapSchema(this.#schema, {
      [MapperKind.ENUM_TYPE]: (type: GraphQLEnumType) => {
        if (type.name !== 'ModelAccountRelation') {
          this.#def.enums[type.name] = type.getValues().map((v) => v.name)
        }
        return type
      },
      [MapperKind.INTERFACE_TYPE]: (type: GraphQLInterfaceType) => {
        if (type.name === NODE_INTERFACE_NAME) {
          return type
        }
        const directives = getDirectives(this.#schema, type)
        const object = this._parseObject(type)
        this.#def.objects[type.name] = object
        const model = this._parseModelDirective(type, directives, object)
        if (model == null) {
          throw new Error(`Missing @createModel or @loadModel directive for interface ${type.name}`)
          // this.#def.interfaces[type.name] = this._parseObject(type)
        } else {
          this.#def.models[type.name] = model
        }
        return type
      },
      [MapperKind.OBJECT_TYPE]: (type: GraphQLObjectType) => {
        const directives = getDirectives(this.#schema, type)
        const indices = this._parseIndices(directives)
        const object = this._parseObject(type)
        object.indices = indices
        this.#def.objects[type.name] = object
        const model = this._parseModelDirective(type, directives, object)
        if (model != null) {
          this.#def.models[type.name] = model
        } else if (indices.length > 0) {
          throw new Error('Indices added to type that is not a model')
        }
        return type
      },
      [MapperKind.UNION_TYPE]: () => {
        throw new Error('GraphQL unions are not supported')
      },
    })

    const modelsNames = Object.keys(this.#def.models)
    if (modelsNames.length === 0) {
      throw new Error('No models found in Composite Definition Schema')
    }

    // Once all models are defined, we need to validate the model names used in relations
    for (const name of modelsNames) {
      // Validate model names in model relations
      const model = this.#def.models[name]
      if (model.action === 'create') {
        for (const [key, relation] of Object.entries(model.relations)) {
          if (relation.type === 'document' && relation.model !== null) {
            if (relation.model === NODE_INTERFACE_NAME) {
              relation.model = null
            } else {
              this._validateRelatedModel(key, relation.model)
            }
          }
        }
      }

      // Validate model names in object views
      const object = this.#def.objects[name]
      if (object == null) {
        throw new Error(`Missing object definition for model ${name}`)
      }
      for (const [key, field] of Object.entries(object.properties)) {
        if (
          field.type === 'view' &&
          field.viewType === 'relation' &&
          field.relation.model !== null
        ) {
          if (field.relation.model === NODE_INTERFACE_NAME) {
            field.relation.model = null
          } else {
            this._validateRelatedModel(key, field.relation.model)
          }
        }
      }
    }

    return this.#def
  }

  _parseIndices(directives: Array<DirectiveAnnotation>): Array<FieldsIndex> {
    return directives.flatMap((d) => {
      if (d.name === 'createIndex' && d.args) {
        const fields = d.args.fields as Array<Field>
        return [{ fields }]
      } else {
        return []
      }
    })
  }

  _validateRelatedModel(key: string, modelName: string): void {
    const relatedModel = this.#def.models[modelName]
    if (relatedModel == null) {
      throw new Error(
        `Missing related model ${modelName} for relation defined on field ${key} of object ${modelName}`,
      )
    }
  }

  _parseModelDirective(
    type: GraphQLInterfaceType | GraphQLObjectType,
    directives: Array<DirectiveAnnotation>,
    object: ObjectDefinition,
  ): ParsedModelDefinition | void {
    const createModel = directives.find((d) => d.name === 'createModel')
    const loadModel = directives.find((d) => d.name === 'loadModel')

    if (loadModel != null) {
      const id = loadModel.args?.id as string | void
      if (id == null) {
        throw new Error(`Missing id value for @loadModel directive on object ${type.name}`)
      }
      if (createModel != null) {
        throw new Error(
          `Unsupported @createModel and @loadModel directives on same object ${type.name}`,
        )
      }
      return { action: 'load', interface: isInterfaceType(type), id }
    }

    if (createModel != null) {
      const isInterface = isInterfaceType(type)
      const args = (createModel.args ?? {}) as {
        accountRelation?: string
        accountRelationFields?: Array<string>
        description?: string
      }
      const accountRelationType = args.accountRelation ?? 'LIST'

      const accountRelation = ACCOUNT_RELATIONS[isInterface ? 'NONE' : accountRelationType]
      if (accountRelation == null) {
        throw new Error(
          `Unsupported accountRelation value ${accountRelationType} for @createModel directive on object ${type.name}`,
        )
      }

      const accountRelationValue = { ...accountRelation }
      if (accountRelationValue.type === 'set') {
        const accountRelationFields = args.accountRelationFields
        if (accountRelationFields == null) {
          throw new Error(
            `Missing accountRelationFields argument for @createModel directive on object ${type.name}`,
          )
        }
        if (accountRelationFields.length === 0) {
          throw new Error(
            `The accountRelationFields argument must specify at least one field for @createModel directive on object ${type.name}`,
          )
        }
        const object = this.#def.objects[type.name]
        if (object == null) {
          throw new Error(`Missing object definition for ${type.name}`)
        }
        // Check properties are defined and valid in the JSON schema for the specified fields
        for (const field of accountRelationFields) {
          const property = object.properties[field]
          if (property == null) {
            throw new Error(
              `Missing property ${field} defined in accountRelationFields argument for @createModel directive on object ${type.name}`,
            )
          }
          if (!property.required) {
            throw new Error(
              `Property ${field} defined in accountRelationFields argument for @createModel directive on object ${type.name} must have a required value`,
            )
          }
          if (property.type !== 'enum' && property.type !== 'scalar') {
            throw new Error(
              `Property ${field} defined in accountRelationFields argument for @createModel directive on object ${type.name} must use an enum or scalar type`,
            )
          }
        }
        accountRelationValue.fields = accountRelationFields
      }

      if (args.description == null || args.description === '') {
        throw new Error(
          `Missing description value for @createModel directive on object ${type.name}`,
        )
      }

      return {
        action: 'create',
        interface: isInterfaceType(type),
        implements: type.getInterfaces().map((i) => i.name),
        immutableFields: Object.keys(object.properties).filter(
          (key) => object.properties[key].immutable === true,
        ),
        description: args.description,
        accountRelation: accountRelationValue,
        relations: object.relations,
      }
    }
  }

  _parseObject(type: GraphQLInterfaceType | GraphQLObjectType): ObjectDefinition {
    const { definition, references, relations } = this._parseObjectFields(type)
    return {
      // implements: type.getInterfaces().map((i) => i.name),
      properties: definition,
      references: Array.from(new Set(references)),
      relations,
      indices: [],
    }
  }

  _parseObjectFields(type: GraphQLInterfaceType | GraphQLObjectType): IntermediaryObjectDefinition {
    const objectFields = type.getFields()
    const fields: ObjectFieldsDefinition = {}
    let references: Array<string> = []
    const relations: ModelRelationsDefinition = {}

    for (const [key, value] of Object.entries(objectFields)) {
      const directives = getDirectives(this.#schema, value)

      const [innerType, required] = isNonNullType(value.type)
        ? [value.type.ofType, true]
        : [value.type, false]

      const relation = this._parseRelations(type.name, key, innerType, directives)
      if (relation != null) {
        relations[key] = relation
      }

      const view = this._parseViews(type.name, key, innerType, directives, objectFields)
      if (view != null) {
        fields[key] = view
      } else if (isListType(innerType)) {
        const list = this._parseListType(type.name, key, innerType, required, directives)
        fields[key] = list.definition
        references = [...references, ...list.references]
      } else {
        const listDirective = directives.find((d) => d.name === 'list')
        if (listDirective != null) {
          throw new Error(`Unexpected @list directive on field ${key} of object ${type.name}`)
        }
        const item = this._parseItemType(type.name, key, value.type, directives)
        fields[key] = item.definition
        references = [...references, ...item.references]
      }
    }

    return { definition: fields, references, relations }
  }

  _parseRelations(
    objectName: string,
    fieldName: string,
    type: GraphQLType,
    directives: Array<DirectiveAnnotation>,
  ): ModelRelationDefinition | void {
    for (const directive of directives) {
      switch (directive.name) {
        case 'accountReference':
          if (!isScalarType(type) || type.name !== 'DID') {
            throw new Error(
              `Unsupported @accountReference directive on field ${fieldName} of object ${objectName}, @accountReference can only be set on a DID scalar`,
            )
          }
          return { type: 'account' }
        case 'documentReference':
          if (!isScalarType(type) || type.name !== 'StreamID') {
            throw new Error(
              `Unsupported @documentReference directive on field ${fieldName} of object ${objectName}, @documentReference can only be set on a StreamID scalar`,
            )
          }
          return { type: 'document', model: (directive.args?.model as string) ?? null }
      }
    }
  }

  _parseViews(
    objectName: string,
    fieldName: string,
    type: GraphQLType,
    directives: Array<DirectiveAnnotation>,
    objectFields: GraphQLFieldMap<any, any>,
  ): ViewFieldDefinition | void {
    for (const directive of directives) {
      switch (directive.name) {
        case 'documentAccount':
          if (!isScalarType(type) || type.name !== 'DID') {
            throw new Error(
              `Unsupported @documentAccount directive on field ${fieldName} of object ${objectName}, @documentAccount can only be set on a DID scalar`,
            )
          }
          return { type: 'view', required: true, immutable: false, viewType: 'documentAccount' }
        case 'documentVersion':
          if (!isScalarType(type) || type.name !== 'CommitID') {
            throw new Error(
              `Unsupported @documentVersion directive on field ${fieldName} of object ${objectName}, @documentVersion can only be set on a CommitID scalar`,
            )
          }
          return { type: 'view', required: true, immutable: false, viewType: 'documentVersion' }
        case 'relationDocument': {
          if (!isInterfaceType(type) && !isObjectType(type)) {
            throw new Error(
              `Unsupported @relationDocument directive on field ${fieldName} of object ${objectName}, @relationDocument can only be set on a referenced object`,
            )
          }
          const property = directive.args?.property as string | void
          if (property == null) {
            throw new Error(
              `Missing property argument for @relationDocument directive on field ${fieldName} of object ${objectName}`,
            )
          }
          if (objectFields[property] == null) {
            throw new Error(
              `Missing referenced property ${property} for @relationDocument directive on field ${fieldName} of object ${objectName}`,
            )
          }
          return {
            type: 'view',
            required: false,
            immutable: false,
            viewType: 'relation',
            relation: {
              source: 'document',
              model: type.name === NODE_INTERFACE_NAME ? null : type.name,
              property,
            },
          }
        }
        case 'relationFrom': {
          if (!isListType(type) || !(isInterfaceType(type.ofType) || isObjectType(type.ofType))) {
            throw new Error(
              `Unsupported @relationFrom directive on field ${fieldName} of object ${objectName}, @relationFrom can only be set on a list of referenced object`,
            )
          }
          const model = type.ofType.name === NODE_INTERFACE_NAME ? null : type.ofType.name
          const property = directive.args?.property as string | void
          if (property == null) {
            throw new Error(
              `Missing property argument for @relationFrom directive on field ${fieldName} of object ${objectName}`,
            )
          }
          return {
            type: 'view',
            required: true,
            immutable: false,
            viewType: 'relation',
            relation: { source: 'queryConnection', model, property },
          }
        }
        case 'relationCountFrom': {
          if (!isScalarType(type) || type.name !== 'Int') {
            throw new Error(
              `Unsupported @relationCountFrom directive on field ${fieldName} of object ${objectName}, @relationCountFrom can only be set on a Int scalar`,
            )
          }
          const model = directive.args?.model as string | void
          if (model == null) {
            throw new Error(
              `Missing model argument for @relationCountFrom directive on field ${fieldName} of object ${objectName}`,
            )
          }
          const property = directive.args?.property as string | void
          if (property == null) {
            throw new Error(
              `Missing property argument for @relationCountFrom directive on field ${fieldName} of object ${objectName}`,
            )
          }
          return {
            type: 'view',
            required: true,
            immutable: false,
            viewType: 'relation',
            relation: { source: 'queryCount', model, property },
          }
        }
        case 'relationSetFrom': {
          if (!isObjectType(type)) {
            throw new Error(
              `Unsupported @relationSetFrom directive on field ${fieldName} of object ${objectName}, @relationSetFrom can only be set on a referenced object`,
            )
          }
          const property = directive.args?.property as string | void
          if (property == null) {
            throw new Error(
              `Missing property argument for @relationSetFrom directive on field ${fieldName} of object ${objectName}`,
            )
          }
          return {
            type: 'view',
            required: false,
            viewType: 'relation',
            relation: { source: 'set', model: type.name, property },
          }
        }
      }
    }
  }

  _parseListType(
    objectName: string,
    fieldName: string,
    type: GraphQLList<GraphQLType>,
    required: boolean,
    directives: Array<DirectiveAnnotation>,
  ): DefinitionWithReferences<ListFieldDefinition> {
    const list = directives.find((d) => d.name === 'list')
    if (list == null) {
      throw new Error(`Missing @list directive on list field ${fieldName} of object ${objectName}`)
    }
    if (list.args?.maxLength == null) {
      throw new Error(
        `Missing maxLength value for @list directive on field ${fieldName} of object ${objectName}`,
      )
    }

    const item = this._parseItemType(objectName, fieldName, type.ofType, directives)
    const definition: ListFieldDefinition = {
      type: 'list',
      required,
      item: item.definition,
      maxLength: list.args.maxLength as number,
    }
    if (list.args?.minLength != null) {
      definition.minLength = list.args.minLength as number
    }
    return { definition, references: item.references }
  }

  _parseItemType(
    objectName: string,
    fieldName: string,
    type: GraphQLType,
    directives: Array<DirectiveAnnotation>,
  ): DefinitionWithReferences<ItemDefinition> {
    const required = isNonNullType(type)
    const immutable = directives.some((item) => item.name === 'immutable')
    const innerType = required ? type.ofType : type
    if (isListType(innerType)) {
      throw new Error(`Unsupported nested list on field ${fieldName} of object ${objectName}`)
    }

    const referenceType = this._getReferenceFieldType(innerType)
    if (referenceType != null) {
      return {
        definition: { type: referenceType, required, immutable, name: innerType.name },
        references: [innerType.name],
      }
    }

    if (isScalarType(innerType)) {
      return {
        definition: {
          type: 'scalar',
          required,
          immutable,
          schema: this._parseScalarSchema(objectName, fieldName, innerType, directives),
        },
        references: [],
      }
    }
    throw new Error(
      `Unsupported type ${innerType.name} on field ${fieldName} of object ${objectName}`,
    )
  }

  _parseScalarSchema(
    objectName: string,
    fieldName: string,
    type: GraphQLScalarType,
    directives: Array<DirectiveAnnotation>,
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
            `Unexpected @${mismatch.name} directive with type ${type.name} on field ${fieldName} of object ${objectName}`,
          )
        }
        break
      }
      case 'integer': {
        const mismatch = [boolean, float, string].find(Boolean)
        if (mismatch) {
          throw new Error(
            `Unexpected @${mismatch.name} directive with type ${type.name} on field ${fieldName} of object ${objectName}`,
          )
        }
        return this._validateIntegerSchema(objectName, fieldName, schema, int)
      }
      case 'number': {
        const mismatch = [boolean, int, string].find(Boolean)
        if (mismatch) {
          throw new Error(
            `Unexpected @${mismatch.name} directive with type ${type.name} on field ${fieldName} of object ${objectName}`,
          )
        }
        return this._validateNumberSchema(objectName, fieldName, schema, float)
      }
      case 'string': {
        const mismatch = [boolean, float, int].find(Boolean)
        if (mismatch) {
          throw new Error(
            `Unexpected @${mismatch.name} directive with type ${type.name} on field ${fieldName} of object ${objectName}`,
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
    directive: DirectiveAnnotation | undefined,
  ): JSONSchema.Integer {
    const args = directive?.args
    return args ? this._validateNumberArguments(objectName, fieldName, schema, args) : schema
  }

  _validateNumberSchema(
    objectName: string,
    fieldName: string,
    schema: JSONSchema.Number,
    directive: DirectiveAnnotation | undefined,
  ): JSONSchema.Number {
    const args = directive?.args
    return args ? this._validateNumberArguments(objectName, fieldName, schema, args) : schema
  }

  _validateNumberArguments<T extends JSONSchema.Integer | JSONSchema.Number>(
    objectName: string,
    fieldName: string,
    schema: T,
    args: NumberDirectiveArguments,
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
          `Default value is higher than max constraint on field ${fieldName} of object ${objectName}`,
        )
      }
      if (args.min != null && args.default < args.min) {
        throw new Error(
          `Default value is lower than min constraint on field ${fieldName} of object ${objectName}`,
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
    string: DirectiveAnnotation | undefined,
  ): JSONSchema.String {
    const defaultValue = (string?.args?.default ?? schema.default) as string | void
    const maxLength = (string?.args?.maxLength ?? schema.maxLength) as number | void
    const minLength = (string?.args?.minLength ?? schema.minLength) as number | void

    if (maxLength == null) {
      if (string == null) {
        throw new Error(
          `Missing @string directive on string field ${fieldName} of object ${objectName}`,
        )
      }
      throw new Error(
        `Missing maxLength value for @string directive on field ${fieldName} of object ${objectName}`,
      )
    }
    schema.maxLength = maxLength

    if (minLength != null) {
      schema.minLength = minLength
    }

    if (defaultValue != null) {
      if (defaultValue.length > maxLength) {
        throw new Error(
          `Length of default value is higher than maxLength constraint on field ${fieldName} of object ${objectName}`,
        )
      }
      if (minLength != null && defaultValue.length < minLength) {
        throw new Error(
          `Length of default value is lower than minLength constraint on field ${fieldName} of object ${objectName}`,
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
  }
}

export function parseSchema(schema: string): SchemaDefinition {
  return new SchemaParser(schema).parse()
}
