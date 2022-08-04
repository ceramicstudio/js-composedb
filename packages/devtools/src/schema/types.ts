import type { ModelAccountRelation, ModelDefinition } from '@ceramicnetwork/stream-model'
import type { RuntimeViewField } from '@composedb/types'

import type { ScalarSchema } from '../types.js'

export type CreateParsedModelDefinition = {
  action: 'create'
  accountRelation: ModelAccountRelation
  description: string
  interface: boolean
  implements: Array<string>
  // relations: Record<string, unknown>
  // views: ModelViewsDefinition
}

export type LoadModelDefinition = {
  action: 'load'
  id: string
  // views: ModelViewsDefinition
}

export type ParsedModelDefinition = CreateParsedModelDefinition | LoadModelDefinition

export type FieldCommonDefinition = {
  required: boolean
}

export type EnumFieldDefinition = FieldCommonDefinition & {
  type: 'enum'
  name: string
}

export type ObjectReferenceFieldDefinition = FieldCommonDefinition & {
  type: 'object'
  name: string
}

export type ReferenceFieldDefinition = EnumFieldDefinition | ObjectReferenceFieldDefinition

export type ReferenceFieldType = ReferenceFieldDefinition['type']

export type ScalarFieldDefinition = FieldCommonDefinition & {
  type: 'scalar'
  schema: ScalarSchema
}

export type ItemDefinition = ReferenceFieldDefinition | ScalarFieldDefinition

export type ListFieldDefinition = FieldCommonDefinition & {
  type: 'list'
  item: ItemDefinition
  maxLength: number
  minLength?: number
}

export type ViewFieldDefinition = FieldCommonDefinition & RuntimeViewField

export type ObjectFieldDefinition = ItemDefinition | ListFieldDefinition | ViewFieldDefinition

export type ObjectFieldsDefinition = Record<string, ObjectFieldDefinition>

export type ObjectDefinition = {
  implements: Array<string> // Interface names
  properties: ObjectFieldsDefinition
  references: Array<string> // Embedded objects and enums
}

export type SchemaDefinition = {
  enums: Record<string, Array<string>>
  interfaces: Record<string, ObjectDefinition>
  models: Record<string, ParsedModelDefinition>
  objects: Record<string, ObjectDefinition>
}

export type CreateModelDefinition = { action: 'create'; definition: ModelDefinition }

export type AbstractModelDefinition = CreateModelDefinition | LoadModelDefinition

export type AbstractCompositeDefinition = {
  models: Record<string, AbstractModelDefinition>
  commonEmbeds: Array<string>
}
