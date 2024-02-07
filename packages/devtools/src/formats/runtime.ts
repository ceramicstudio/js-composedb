import type { FieldsIndex } from '@ceramicnetwork/common'
import type {
  ModelDefinition,
  ModelRelationsDefinitionV2,
  ModelViewsDefinitionV2,
} from '@ceramicnetwork/stream-model'
import type {
  CustomRuntimeScalarType,
  InternalCompositeDefinition,
  JSONSchema,
  RuntimeCompositeDefinition,
  RuntimeList,
  RuntimeObjectField,
  RuntimeObjectFields,
  RuntimeReference,
  RuntimeReferenceType,
  RuntimeScalar,
  RuntimeViewReference,
} from '@composedb/types'
import { camelCase, pascalCase } from 'change-case'
import { JsonReference } from 'json-ptr'

import { type ScalarTitle, SCALAR_RUNTIME_TYPES } from '../schema/scalars.js'
import type { AnySchema, ScalarSchema } from '../types.js'
import { viewDefinitionToRuntime } from '../utils.js'

type EnumSchema = JSONSchema.String & { title: string; enum: Array<string> }

/** @internal */
export function getName(base: string, prefix = ''): string {
  const withCase = pascalCase(base)
  return withCase.startsWith(prefix) ? withCase : prefix + withCase
}

/** @internal */
export function getStringScalarType(schema: JSONSchema.String): CustomRuntimeScalarType | 'string' {
  return SCALAR_RUNTIME_TYPES[schema.title as ScalarTitle] ?? 'string'
}

const NON_INDEXABLE_FIELD_TYPES: Array<RuntimeObjectField['type']> = ['list', 'reference', 'view']
const INDEXABLE_REFERENCE_TYPES: Array<RuntimeReferenceType> = ['enum', 'object']

type RuntimeModelBuilderParams = {
  name: string
  definition: ModelDefinition
  commonEmbeds?: Array<string>
  views: ModelViewsDefinitionV2
  indices: Array<FieldsIndex>
}

type ExtractSchemaParams = {
  parentName?: string
  ownName?: string
  required?: boolean
  localRef?: boolean
}

type RuntimeModelDefinition = {
  accountData: Record<string, RuntimeViewReference>
  objects: Record<string, RuntimeObjectFields>
  enums: Record<string, Array<string>>
  unions: Record<string, Array<string>>
}

/** @internal */
export class RuntimeModelBuilder {
  #accountData: Record<string, RuntimeViewReference> = {}
  #commonEmbeds: Array<string>
  #modelName: string
  #modelRelations: ModelRelationsDefinitionV2
  #modelSchema: JSONSchema.Object
  #modelViews: ModelViewsDefinitionV2
  #modelIndices: Array<FieldsIndex>
  #objects: Record<string, RuntimeObjectFields> = {}
  #enums: Record<string, Array<string>> = {}
  #unions: Record<string, Array<string>> = {}

  constructor(params: RuntimeModelBuilderParams) {
    this.#commonEmbeds = params.commonEmbeds ?? []
    this.#modelName = params.name
    this.#modelRelations = params.definition.relations ?? {}
    this.#modelSchema = params.definition.schema
    this.#modelViews = params.views
    this.#modelIndices = params.indices
  }

  build(): RuntimeModelDefinition {
    const modelObject = this._buildObject(this.#modelSchema)
    this.#objects[this.#modelName] = modelObject
    this._buildRelations(this.#modelRelations)
    this._buildViews(modelObject, this.#modelViews)
    this._buildIndices(modelObject, this.#modelIndices)
    return {
      accountData: this.#accountData,
      objects: this.#objects,
      enums: this.#enums,
      unions: this.#unions,
    }
  }

  _getName(schema: AnySchema, params: ExtractSchemaParams, isReference = false): string {
    return isReference && typeof schema.title === 'string'
      ? this.#commonEmbeds.includes(schema.title)
        ? schema.title
        : getName(schema.title, this.#modelName)
      : params.ownName ?? this.#modelName
  }

  _getReferenceSchema<T extends AnySchema = AnySchema>(reference: string): T {
    const ref = new JsonReference(reference)
    const schema = ref.resolve(this.#modelSchema)
    if (schema == null) {
      throw new Error(`Missing reference: ${reference}`)
    }
    return schema as T
  }

  _buildObject(schema: JSONSchema.Object, params: ExtractSchemaParams = {}): RuntimeObjectFields {
    const ownName = this._getName(schema, params)
    const requiredProps = schema.required ?? []

    const fields: RuntimeObjectFields = {}
    for (const [propKey, propSchema] of Object.entries(schema.properties ?? {})) {
      fields[propKey] = this._buildObjectField(propSchema as AnySchema, {
        ownName: propKey,
        parentName: ownName,
        required: requiredProps.includes(propKey),
      })
    }
    return fields
  }

  _buildObjectField(schema: AnySchema, params: ExtractSchemaParams = {}): RuntimeObjectField {
    if (schema.$ref != null) {
      return this._buildReferenceSchema(schema.$ref, params)
    }
    switch (schema.type) {
      case 'array':
        return this._buildList(schema, params)
      case 'object':
        return this._buildObjectReferenceField(schema, params)
      default:
        return this._buildScalar(schema as ScalarSchema, params)
    }
  }

  _buildList(schema: JSONSchema.Array, params: ExtractSchemaParams = {}): RuntimeList {
    if (typeof schema.items !== 'object' || Array.isArray(schema.items)) {
      throw new Error('Unsupported items schema in array')
    }

    const required = params.required ?? false
    const items = schema.items as AnySchema

    if (items.$ref != null) {
      return { type: 'list', required, item: this._buildListReference(items.$ref, params) }
    }
    if (items.type == null) {
      throw new Error('Missing schema $ref or type for array items')
    }

    let item: RuntimeScalar | RuntimeReference<'enum' | 'object'>
    switch (items.type) {
      case 'array':
        throw new Error('Unsupported array in array')
      case 'object':
        item = this._buildObjectReferenceField(items, params)
        break
      default:
        item = this._buildScalar(items as ScalarSchema, params)
        break
    }
    return { type: 'list', required, item }
  }

  _buildListReference(
    reference: string,
    params: ExtractSchemaParams = {},
  ): RuntimeScalar | RuntimeReference<'enum' | 'object'> {
    const schema = this._getReferenceSchema(reference)
    switch (schema.type) {
      case 'array':
        throw new Error('Unsupported array in array reference')
      case 'object':
        return this._buildObjectReferenceField(schema, params)
      case 'string':
        return schema.enum != null && schema.title != null
          ? this._buildEnumReferenceField(schema as EnumSchema)
          : this._buildScalar(schema, params)
      default:
        return this._buildScalar(schema as ScalarSchema, params)
    }
  }

  _buildObjectReferenceField(
    schema: JSONSchema.Object,
    params: ExtractSchemaParams = {},
  ): RuntimeReference<'object'> {
    const ownName = this._getName(schema, params, true)
    if (this.#objects[ownName] == null) {
      this.#objects[ownName] = this._buildObject(schema, { ...params, ownName })
    }
    return {
      type: 'reference',
      refType: 'object',
      refName: ownName,
      required: params.required ?? false,
    }
  }

  _buildEnumReferenceField(
    schema: EnumSchema,
    params: ExtractSchemaParams = {},
  ): RuntimeReference<'enum'> {
    const ownName = this._getName(schema, params, true)
    if (this.#enums[ownName] == null) {
      this.#enums[ownName] = schema.enum
    }
    return {
      type: 'reference',
      refType: 'enum',
      refName: ownName,
      required: params.required ?? false,
    }
  }

  _buildReferenceSchema(reference: string, params: ExtractSchemaParams = {}): RuntimeObjectField {
    const schema = this._getReferenceSchema(reference)
    switch (schema.type) {
      case 'array':
        return this._buildList(schema, params)
      case 'object':
        return this._buildObjectReferenceField(schema, params)
      case 'string':
        return schema.enum != null && schema.title != null
          ? this._buildEnumReferenceField(schema as EnumSchema)
          : this._buildScalar(schema, params)
      default:
        return this._buildScalar(schema as ScalarSchema, params)
    }
  }

  _buildScalar(schema: ScalarSchema, params: ExtractSchemaParams = {}): RuntimeScalar {
    if (schema.type == null) {
      throw new Error('Missing scalar type')
    }

    const required = params.required ?? false

    switch (schema.type) {
      case 'boolean':
      case 'integer':
        return { type: schema.type, required }
      case 'number':
        return { type: 'float', required }
      case 'string':
        return {
          type: getStringScalarType(schema),
          required,
        }
    }
  }

  _buildRelations(relations: ModelRelationsDefinitionV2 = {}): void {
    for (const [key, relation] of Object.entries(relations)) {
      if (relation.type === 'account') {
        const relationKey = camelCase(`${key}Of${this.#modelName}List`)
        this.#accountData[relationKey] = { type: 'account', name: this.#modelName, property: key }
      }
    }
  }

  _buildViews(object: RuntimeObjectFields, views: ModelViewsDefinitionV2 = {}): void {
    for (const [key, view] of Object.entries(views)) {
      object[key] = viewDefinitionToRuntime(view)
    }
  }

  _buildIndices(object: RuntimeObjectFields, indices: Array<FieldsIndex>): void {
    for (const index of indices) {
      for (const field of index.fields) {
        const path = field.path[0]
        const objectField = object[path]
        if (objectField == null) {
          throw new Error(`Could not resolve ${field.path.join('.')} as a valid path`)
        }
        if (objectField.type === 'reference') {
          if (INDEXABLE_REFERENCE_TYPES.includes(objectField.refType)) {
            objectField.indexed = true
          } else {
            throw new Error(`${field.path.join('.')} is not indexable`)
          }
        } else if (NON_INDEXABLE_FIELD_TYPES.includes(objectField.type)) {
          throw new Error(`${field.path.join('.')} is not indexable`)
        }
        ;(objectField as RuntimeScalar).indexed = true
      }
    }
  }
}

/** @internal */
export function createRuntimeDefinition(
  definition: InternalCompositeDefinition,
): RuntimeCompositeDefinition {
  const runtime: RuntimeCompositeDefinition = {
    models: {},
    objects: {},
    enums: {},
    accountData: {},
  }

  for (const [modelID, modelDefinition] of Object.entries(definition.models)) {
    const modelName = definition.aliases?.[modelID] ?? modelDefinition.name
    const interfaceDefinition =
      modelDefinition.version === '1.0'
        ? { interface: false, implements: [] }
        : { interface: modelDefinition.interface, implements: modelDefinition.implements }
    // Add name to model metadata mapping
    runtime.models[modelName] = {
      ...interfaceDefinition,
      id: modelID,
      accountRelation: modelDefinition.accountRelation,
    }
    // Extract objects, enums, relations and views from model schema
    const modelViews = modelDefinition.views ?? {}
    const compositeModelViews = definition.views?.models?.[modelID] ?? {}
    const modelBuilder = new RuntimeModelBuilder({
      commonEmbeds: definition.commonEmbeds,
      name: modelName,
      definition: modelDefinition,
      views: { ...modelViews, ...compositeModelViews },
      indices: definition.indices?.[modelID] ?? [],
    })
    const builtModel = modelBuilder.build()
    // Inject extracted types to runtime definition
    Object.assign(runtime.accountData, builtModel.accountData)
    Object.assign(runtime.objects, builtModel.objects)
    Object.assign(runtime.enums, builtModel.enums)
    // Attach entry-point to account store based on relation type
    const key = camelCase(modelName)
    if (modelDefinition.version !== '1.0' && modelDefinition.interface) {
      runtime.accountData[key + 'List'] = { type: 'connection', name: modelName }
    } else {
      const relationType = modelDefinition.accountRelation.type
      switch (relationType) {
        case 'list':
          runtime.accountData[key + 'List'] = { type: 'connection', name: modelName }
          break
        case 'set':
          // relation to single document in the set based on input
          runtime.accountData[key] = { type: 'set', name: modelName }
          // relation to all documents in the set
          runtime.accountData[key + 'List'] = { type: 'connection', name: modelName }
          break
        case 'single':
          runtime.accountData[key] = { type: 'node', name: modelName }
          break
        default:
          throw new Error(`Unsupported account relation type: ${relationType}`)
      }
    }
  }

  return runtime
}
