import { META_MODEL_BYTES, ContentDefinitionCodec, type Model } from '@composedb/model-codecs'
import * as io from 'io-ts'
// Workaround for TS2742 error - https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1270716220
import type {} from 'json-schema-typed/draft-2020-12.js'

import { isoDate } from './date.js'
import { nullableString } from './nullable.js'

export const ModelEntityCodec = io.intersection(
  [
    io.strict({
      id: io.string,
      controller: io.string,
      version: io.string,
      name: io.string,
      content: ContentDefinitionCodec,
      indexingEnabled: io.boolean,
    }),
    io.partial({ description: nullableString, createdAt: isoDate, updatedAt: isoDate }),
  ],
  'ModelEntity'
)
export type ModelEntity = io.TypeOf<typeof ModelEntityCodec>

export const ModelsQueryCodec = io.partial({ composite: io.string }, 'ModelsQuery')
export type ModelsQuery = io.TypeOf<typeof ModelsQueryCodec>

export function fromModelEntity(entity: ModelEntity): Model {
  return {
    id: entity.id,
    content: entity.content,
    metadata: { controller: entity.controller, model: META_MODEL_BYTES },
  }
}

export type ToModelEntityParams = {
  indexingEnabled?: boolean
}

export function toModelEntity(model: Model, params: ToModelEntityParams = {}): ModelEntity {
  return {
    id: model.id,
    controller: model.metadata.controller,
    version: model.content.version,
    name: model.content.name,
    description: model.content.description,
    content: model.content,
    indexingEnabled: params.indexingEnabled ?? false,
  }
}
