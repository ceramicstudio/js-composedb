import { SignedCommitContainerCodec } from '@composedb/ceramic-codecs'
import { ScalarSchemaCodec } from '@composedb/json-schema-codecs'
import { RelationsDefinitionCodec } from '@composedb/model-codecs'
import * as io from 'io-ts'
// Workaround for TS2742 error - https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1270716220
import type {} from 'json-schema-typed/draft-2020-12.js'
import type {} from 'multiformats/cid'

import { ViewFieldCodec } from './graph.js'

export const FieldCommonDefinitionCodec = io.strict({ required: io.boolean })

export const EnumFieldDefinitionCodec = io.intersection(
  [FieldCommonDefinitionCodec, io.strict({ type: io.literal('enum'), name: io.string })],
  'EnumFieldDefinition'
)
export type EnumFieldDefinition = io.TypeOf<typeof EnumFieldDefinitionCodec>

export const ObjectReferenceFieldDefinitionCodec = io.intersection(
  [FieldCommonDefinitionCodec, io.strict({ type: io.literal('object'), name: io.string })],
  'ObjectReferenceFieldDefinition'
)
export type ObjectReferenceFieldDefinition = io.TypeOf<typeof ObjectReferenceFieldDefinitionCodec>

export const ReferenceFieldDefinitionCodec = io.union(
  [EnumFieldDefinitionCodec, ObjectReferenceFieldDefinitionCodec],
  'ReferenceFieldDefinition'
)
export type ReferenceFieldDefinition = io.TypeOf<typeof ReferenceFieldDefinitionCodec>

export const ReferenceFieldTypeDefinitionCodec = io.keyof(
  { enum: null, object: null },
  'ReferenceFieldTypeDefinition'
)
export type ReferenceFieldTypeDefinition = io.TypeOf<typeof ReferenceFieldTypeDefinitionCodec>

export const ScalarFieldDefinitionCodec = io.intersection(
  [
    FieldCommonDefinitionCodec,
    io.strict({ type: io.literal('scalar'), scalar: ScalarSchemaCodec }),
  ],
  'ScalarFieldDefinition'
)
export type ScalarFieldDefinition = io.TypeOf<typeof ScalarFieldDefinitionCodec>

export const ItemDefinitionCodec = io.union(
  [ReferenceFieldDefinitionCodec, ScalarFieldDefinitionCodec],
  'ItemDefinition'
)
export type ItemDefinition = io.TypeOf<typeof ItemDefinitionCodec>

export const ListFieldDefinitionCodec = io.intersection([
  FieldCommonDefinitionCodec,
  io.strict({ type: io.literal('scalar'), item: ItemDefinitionCodec, maxLength: io.number }),
  io.partial({ minLength: io.number }),
])
export type ListFieldDefinition = io.TypeOf<typeof ListFieldDefinitionCodec>

export const ViewFieldDefinitionCodec = io.intersection(
  [FieldCommonDefinitionCodec, ViewFieldCodec],
  'ViewFieldDefinition'
)
export type ViewFieldDefinition = io.TypeOf<typeof ViewFieldDefinitionCodec>

export const ObjectFieldDefinitionCodec = io.union(
  [ItemDefinitionCodec, ListFieldDefinitionCodec, ViewFieldDefinitionCodec],
  'ObjectFieldDefinition'
)
export type ObjectFieldDefinition = io.TypeOf<typeof ObjectFieldDefinitionCodec>

export const ObjectFieldsDefinitionCodec = io.record(
  io.string,
  ObjectFieldDefinitionCodec,
  'ObjectFieldsDefinition'
)
export type ObjectFieldsDefinition = io.TypeOf<typeof ObjectFieldsDefinitionCodec>

export const ObjectDefinitionCodec = io.strict(
  {
    properties: ObjectFieldsDefinitionCodec,
    references: io.array(io.string),
    relations: RelationsDefinitionCodec,
  },
  'ObjectDefinition'
)
export type ObjectDefinition = io.TypeOf<typeof ObjectDefinitionCodec>

export const CreateModelActionDefinitionCodec = io.strict(
  { action: io.literal('create'), commit: SignedCommitContainerCodec },
  'CreateModelDefinition'
)
export type CreateModelActionDefinition = io.TypeOf<typeof CreateModelActionDefinitionCodec>

export const LoadModelActionDefinitionCodec = io.strict(
  { action: io.literal('load'), id: io.string },
  'LoadModelDefinition'
)
export type LoadModelActionDefinition = io.TypeOf<typeof LoadModelActionDefinitionCodec>

export const ModelActionDefinitionCodec = io.union(
  [CreateModelActionDefinitionCodec, LoadModelActionDefinitionCodec],
  'ModelActionDefinition'
)
export type ModelActionDefinition = io.TypeOf<typeof ModelActionDefinitionCodec>

export const CompositeDefinitionCodec = io.strict(
  {
    enums: io.record(io.string, io.array(io.string)),
    interfaces: io.record(io.string, ObjectDefinitionCodec),
    models: io.record(io.string, ModelActionDefinitionCodec),
    objects: io.record(io.string, ObjectDefinitionCodec),
  },
  'CompositeDefinition'
)
export type CompositeDefinition = io.TypeOf<typeof CompositeDefinitionCodec>
