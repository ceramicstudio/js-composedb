import type {
  ModelAccountRelationV2,
  ModelDefinition,
  ModelRelationsDefinitionV2,
  ModelViewsDefinitionV2,
} from '@ceramicnetwork/stream-model'
import type { RuntimeViewField, FieldsIndex } from '@composedb/types'

import type { ScalarSchema } from '../types.js'

export { type Field } from '@ceramicnetwork/common'

export type FieldCommonDefinition = {
  required: boolean
  immutable?: boolean
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
  properties: ObjectFieldsDefinition
  references: Array<string> // Embedded objects and enums
  relations: ModelRelationsDefinitionV2
  indices: Array<FieldsIndex>
}

export type ParsedCreateModelDefinition = {
  action: 'create'
  interface: boolean
  implements: Array<string>
  description: string
  accountRelation: ModelAccountRelationV2
  relations: ModelRelationsDefinitionV2
  immutableFields: Array<string>
}

export type ParsedLoadModelDefinition = {
  action: 'load'
  interface: boolean
  id: string
}

export type ParsedModelDefinition = ParsedCreateModelDefinition | ParsedLoadModelDefinition

export type SchemaDefinition = {
  enums: Record<string, Array<string>>
  models: Record<string, ParsedModelDefinition>
  objects: Record<string, ObjectDefinition>
}

export type AbstractCreateModelDefinition = {
  action: 'create'
  model: ModelDefinition
  indices?: Array<FieldsIndex>
}

export type AbstractLoadModelDefinition = ParsedLoadModelDefinition & {
  views: ModelViewsDefinitionV2
  indices?: Array<FieldsIndex>
}

export type AbstractModelDefinition = AbstractCreateModelDefinition | AbstractLoadModelDefinition

export type AbstractCompositeDefinition = {
  models: Record<string, AbstractModelDefinition>
  commonEmbeds: Array<string>
}
