import { META_MODEL_BYTES, type ContentDefinition, ModelCodec } from '@composedb/model-codecs'
import { ioDecode, ioEncode } from '@composedb/services-rpc'
import { initTRPC } from '@trpc/server'
import * as io from 'io-ts'
// Workaround for TS2742 error - https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1270716220
import type {} from 'json-schema-typed/draft-2020-12.js'

import type { Model as ModelEntity } from './entities/model.js'
import type { Service } from './service.js'

export type Context = {
  service: Service
}

const t = initTRPC.context<Context>().create()

export const router = t.router({
  createModel: t.procedure
    .input(
      ioDecode(
        io.type({ model: ModelCodec, indexDocuments: io.boolean }, 'database.createModelInput')
      )
    )
    .mutation(async (req) => {
      const { model, indexDocuments } = req.input
      const entity: ModelEntity = {
        id: model.id,
        controller: model.metadata.controller,
        version: model.content.version,
        name: model.content.name,
        description: model.content.description,
        content: model.content,
        indexDocuments,
      }
      await req.ctx.service.createModel(entity)
    }),

  getModel: t.procedure
    .input(ioDecode(io.type({ id: io.string }, 'database.getModelInput')))
    .output(ioEncode(io.union([ModelCodec, io.null], 'database.getModelOutput')))
    .query(async (req) => {
      const entity = await req.ctx.service.getModel(req.input.id)
      const model = entity
        ? {
            id: entity.id,
            content: entity.content as ContentDefinition,
            metadata: { controller: entity.controller, model: META_MODEL_BYTES },
          }
        : null
      return model
    }),
})

export type Router = typeof router
