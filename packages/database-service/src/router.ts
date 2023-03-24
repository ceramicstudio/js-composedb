import { GraphDefinitionCodec } from '@composedb/graph-codecs'
import { META_MODEL_BYTES, ModelCodec } from '@composedb/model-codecs'
import { ioDecode, ioEncode } from '@composedb/services-rpc'
import { initTRPC } from '@trpc/server'
import * as io from 'io-ts'
// Workaround for TS2742 error - https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1270716220
import type {} from 'json-schema-typed/draft-2020-12.js'

import type { Service } from './service.js'

export const StoredCompositeCodec = io.intersection(
  [
    io.strict({
      id: io.string,
      graph: GraphDefinitionCodec,
      enable: io.boolean,
      enableMutations: io.boolean,
      enableSubscriptions: io.boolean,
    }),
    io.partial({ description: io.string }),
  ],
  'StoredComposite'
)

export type Context = {
  service: Service
}

const t = initTRPC.context<Context>().create()

export const router = t.router({
  getModel: t.procedure
    .input(ioDecode(io.strict({ id: io.string }, 'database.getModelInput')))
    .output(ioEncode(io.union([ModelCodec, io.null], 'database.getModelOutput')))
    .query(async (req) => {
      const entity = await req.ctx.service.findModel(req.input.id)
      return entity
        ? {
            id: entity.id,
            content: entity.content,
            metadata: { controller: entity.controller, model: META_MODEL_BYTES },
          }
        : null
    }),

  saveModel: t.procedure
    .input(
      ioDecode(
        io.strict({ model: ModelCodec, indexDocuments: io.boolean }, 'database.saveModelInput')
      )
    )
    .mutation(async (req) => {
      const { model, indexDocuments } = req.input
      await req.ctx.service.saveModel({
        id: model.id,
        controller: model.metadata.controller,
        version: model.content.version,
        name: model.content.name,
        description: model.content.description,
        content: model.content,
        indexDocuments,
      })
    }),

  getComposite: t.procedure
    .input(ioDecode(io.strict({ id: io.string }, 'database.getCompositeInput')))
    .output(ioEncode(io.union([StoredCompositeCodec, io.null], 'database.getCompositeOutput')))
    .query((req) => req.ctx.service.findComposite(req.input.id)),

  saveComposite: t.procedure.input(ioDecode(StoredCompositeCodec)).mutation(async (req) => {
    // Models need to have been saved to DB before saving the composite
    const models = await Promise.all(
      Object.values(req.input.graph.models).map(async ({ id }) => {
        const model = await req.ctx.service.findModel(id)
        if (model == null) {
          throw new Error(`Model not found: ${id}`)
        }
        return model
      })
    )
    await req.ctx.service.saveComposite({
      id: req.input.id,
      graph: req.input.graph,
      models,
      enable: req.input.enable,
      enableMutations: req.input.enableMutations,
      enableSubscriptions: req.input.enableSubscriptions,
    })
  }),
})

export type Router = typeof router
