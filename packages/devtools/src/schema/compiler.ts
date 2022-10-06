import type { ModelViewsDefinition } from '@ceramicnetwork/stream-model'
import type { JSONSchema } from '@composedb/types'
import type { SetRequired } from 'type-fest'

import { DOC_ID_FIELD } from '../constants.js'
import type { AnySchema, ScalarSchema } from '../types.js'
import { viewRuntimeToModel } from '../utils.js'

import { parseSchema } from './parser.js'
import { isCommonScalar } from './scalars.js'
import type {
  AbstractCompositeDefinition,
  AbstractModelDefinition,
  EnumFieldDefinition,
  ListFieldDefinition,
  ObjectDefinition,
  ObjectReferenceFieldDefinition,
  ParsedModelDefinition,
  ScalarFieldDefinition,
  SchemaDefinition,
} from './types.js'

type CompileObject = SetRequired<JSONSchema.Object, 'properties'>

type JSONSchemaReference = { $ref: string }

type ReferencedSchema = ScalarSchema | JSONSchema.Object

type SchemaWithRefs<T extends AnySchema = AnySchema> = { schema: T; refs: Array<string> }

export function createReference(name: string): JSONSchemaReference {
  return { $ref: `#/$defs/${name}` }
}

export function extractReference(ref: JSONSchemaReference): string {
  const name = ref.$ref.split('#/$defs/')[1]
  if (name == null || name.length === 0) {
    throw new Error(`Could not extract name from reference: ${ref.$ref}`)
  }
  return name
}

export class SchemaCompiler {
  #def: AbstractCompositeDefinition = {
    models: {},
    commonEmbeds: [],
  }
  #refs: Record<string, SchemaWithRefs<ReferencedSchema>> = {}
  #src: SchemaDefinition

  constructor(source: SchemaDefinition) {
    this.#src = source
  }

  _getReference(name: string): SchemaWithRefs<ReferencedSchema> {
    const ref = this.#refs[name]
    if (ref == null) {
      throw new Error(`Reference ${name} does not exist`)
    }
    return ref
  }

  _extractDefinitions(name: string): Record<string, ReferencedSchema> {
    const unref = this._getReference(name)
    const defs: Record<string, ReferencedSchema> = { [name]: unref.schema }
    for (const subrefName of unref.refs) {
      Object.assign(defs, this._extractDefinitions(subrefName))
    }
    return defs
  }

  compile(): AbstractCompositeDefinition {
    // Ensure enums are tracked in common embeds
    for (const name of Object.keys(this.#src.enums)) {
      this.#def.commonEmbeds.push(name)
    }
    // Only compile embedded objects in first pass so they can be added to models in second pass
    for (const [name, definition] of Object.entries(this.#src.objects)) {
      if (this.#src.models[name] == null) {
        this._compileEmbedObject(name, definition)
        this.#def.commonEmbeds.push(name)
      }
    }
    // Compile models
    for (const [name, definition] of Object.entries(this.#src.models)) {
      const object = this.#src.objects[name]
      if (object == null) {
        throw new Error(`Missing object definition for model: ${name}`)
      }
      // Compile object schema with embedded references for model
      this.#def.models[name] = this._compileModel(name, definition, object)
    }
    return this.#def
  }

  _compileEmbedObject(name: string, definition: ObjectDefinition): SchemaWithRefs<CompileObject> {
    const existing = this.#refs[name]
    if (existing) {
      return existing as SchemaWithRefs<CompileObject>
    }

    const object: CompileObject = {
      type: 'object',
      title: name,
      properties: {},
      additionalProperties: false,
    }
    const required: Array<string> = []
    let refs: Array<string> = []

    for (const [key, field] of Object.entries(definition.properties)) {
      if (field.required) {
        required.push(key)
      }

      let value: SchemaWithRefs | void
      switch (field.type) {
        case 'enum':
          value = this._compileEnum(name, key, field)
          break
        case 'list':
          value = this._compileList(name, key, field)
          break
        case 'object':
          value = this._compileObjectReference(name, key, field)
          break
        case 'scalar':
          value = this._compileScalar(field)
          break
        case 'view':
          throw new Error(
            `Unsupported view on field ${key} of object ${name}. Views can only be set on models.`
          )
      }

      if (value == null) {
        throw new Error(`Could not compile value for field ${key} of object ${name}`)
      }
      object.properties[key] = value.schema
      refs = [...refs, ...value.refs]
    }

    if (required.length !== 0) {
      object.required = required
    }

    const schemaWithRefs = { schema: object, refs }
    this.#refs[name] = schemaWithRefs

    return schemaWithRefs
  }

  _compileList(
    objectName: string,
    fieldName: string,
    definition: ListFieldDefinition
  ): SchemaWithRefs {
    const list: JSONSchema.Array = { type: 'array', maxItems: definition.maxLength }
    if (definition.minLength != null) {
      list.minItems = definition.minLength
    }

    let item: SchemaWithRefs | void
    switch (definition.item.type) {
      case 'enum':
        item = this._compileEnum(objectName, fieldName, definition.item)
        break
      case 'object':
        item = this._compileObjectReference(objectName, fieldName, definition.item)
        break
      case 'scalar':
        item = this._compileScalar(definition.item)
        break
    }

    if (item == null) {
      throw new Error(`Could not compile item schema for list ${fieldName} of object ${objectName}`)
    }
    list.items = item.schema

    return { schema: list, refs: item.refs }
  }

  _compileObjectReference(
    objectName: string,
    fieldName: string,
    definition: ObjectReferenceFieldDefinition
  ): SchemaWithRefs {
    if (this.#src.models[definition.name] != null) {
      throw new Error(
        `Unsupported reference to model ${definition.name} in field ${fieldName} of object ${objectName}. References can only be made to embedded objects.`
      )
    }

    const target = this.#src.objects[definition.name]
    if (target == null) {
      throw new Error(
        `Missing object ${definition.name} referenced in field ${fieldName} of object ${objectName}`
      )
    }

    // Ensure object is compiled and injected to definitions record
    this._compileEmbedObject(definition.name, target)

    return { schema: { $ref: `#/$defs/${definition.name}` }, refs: [definition.name] }
  }

  _compileEnum(
    objectName: string,
    fieldName: string,
    definition: EnumFieldDefinition
  ): SchemaWithRefs {
    const values = this.#src.enums[definition.name]
    if (values == null) {
      throw new Error(
        `Missing enum ${definition.name} referenced in field ${fieldName} of object ${objectName}`
      )
    }
    if (this.#refs[definition.name] == null) {
      this.#refs[definition.name] = {
        schema: { type: 'string', title: definition.name, enum: values },
        refs: [],
      }
    }
    return { schema: { $ref: `#/$defs/${definition.name}` }, refs: [definition.name] }
  }

  _compileScalar(definition: ScalarFieldDefinition): SchemaWithRefs {
    const title = definition.schema.title
    // Scalars without title or that have properties changed from the defaults are injected directly as they are not reusable
    if (title == null || !isCommonScalar(definition.schema)) {
      return { schema: definition.schema, refs: [] }
    }

    // Scalars with title are injected in definitions and referenced
    if (this.#refs[title] == null) {
      this.#refs[title] = { schema: definition.schema, refs: [] }
    }
    return { schema: { $ref: `#/$defs/${title}` }, refs: [title] }
  }

  _compileModel(
    name: string,
    modelDefinition: ParsedModelDefinition,
    objectDefinition: ObjectDefinition
  ): AbstractModelDefinition {
    if (modelDefinition.action === 'load') {
      const views: ModelViewsDefinition = {}
      for (const [key, field] of Object.entries(objectDefinition.properties)) {
        if (key === DOC_ID_FIELD) {
          // id can be set as unique field to ensure the object is not empty, as it's not supported
          // by the GraphQL parser
          continue
        }
        if (field.type === 'view') {
          views[key] = viewRuntimeToModel(field)
        } else {
          throw new Error(
            `Unsupported property ${key} on model ${name}, only views can be added to loaded models`
          )
        }
      }
      return { ...modelDefinition, views }
    }

    if (objectDefinition.properties[DOC_ID_FIELD] != null) {
      throw new Error(
        `Unsupported ${DOC_ID_FIELD} field on model ${name}, the ${DOC_ID_FIELD} field is reserved by ComposeDB`
      )
    }

    const views: ModelViewsDefinition = {}
    const object: CompileObject = {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      type: 'object',
      properties: {},
      additionalProperties: false,
    }
    const required: Array<string> = []
    let refs: Array<string> = []

    for (const [key, field] of Object.entries(objectDefinition.properties)) {
      if (field.required && field.type !== 'view') {
        required.push(key)
      }

      let value: SchemaWithRefs | void
      switch (field.type) {
        case 'enum':
          value = this._compileEnum(name, key, field)
          break
        case 'list':
          value = this._compileList(name, key, field)
          break
        case 'object':
          value = this._compileObjectReference(name, key, field)
          break
        case 'scalar':
          value = this._compileScalar(field)
          break
        case 'view': {
          views[key] = viewRuntimeToModel(field)
          break
        }
      }

      if (value != null) {
        object.properties[key] = value.schema
        refs = [...refs, ...value.refs]
      }
    }

    if (required.length !== 0) {
      object.required = required
    }
    if (refs.length !== 0) {
      object.$defs = {}
      for (const refName of new Set(refs)) {
        Object.assign(object.$defs, this._extractDefinitions(refName))
      }
    }

    return {
      action: 'create',
      model: {
        name,
        description: modelDefinition.description,
        // TODO: add once supported in model definition
        // interface: definition.interface,
        // implements: definition.implements,
        accountRelation: modelDefinition.accountRelation,
        schema: object,
        relations: modelDefinition.relations,
        views,
      },
    }
  }
}

export function compileSchema(definition: SchemaDefinition): AbstractCompositeDefinition {
  return new SchemaCompiler(definition).compile()
}

export function createAbstractCompositeDefinition(schema: string): AbstractCompositeDefinition {
  return compileSchema(parseSchema(schema))
}
