import {
  type Document as EncodedDocument,
  DocumentCodec,
  DocumentQueryCodec,
  PaginationQueryCodec,
  PaginationResultCodec,
  UniqueDocumentCodec,
} from '@composedb/document-codecs'
import { GraphDefinitionCodec } from '@composedb/graph-codecs'
import { META_MODEL_BYTES, ModelCodec } from '@composedb/model-codecs'
import { ioDecode, ioEncode } from '@composedb/services-rpc'
import { initTRPC } from '@trpc/server'
import * as io from 'io-ts'
import { map } from 'rxjs'
// Workaround for TS2742 error - https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1270716220
import type {} from 'json-schema-typed/draft-2020-12.js'

import type { Document as DocumentEntity } from './entities/document.js'
import { documentInserted$ } from './events.js'
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
    io.partial({ description: io.union([io.string, io.null]) }),
  ],
  'StoredComposite'
)

export type Context = {
  service: Service
}

const t = initTRPC.context<Context>().create()

function docEntityToCodec(entity: DocumentEntity): EncodedDocument {
  return {
    id: entity.id,
    tip: entity.tip,
    model: entity.modelId,
    controller: entity.controller,
    content: entity.content,
  }
}

export const router = t.router({
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

  countDocuments: t.procedure
    .input(ioDecode(DocumentQueryCodec))
    .output(ioEncode(io.number))
    .query((req) => req.ctx.service.countDocuments(req.input)),

  getDocument: t.procedure
    .input(ioDecode(io.strict({ id: io.string }, 'database.getDocumentInput')))
    .output(ioEncode(io.union([DocumentCodec, io.null], 'database.getDocumentOutput')))
    .query(async (req) => {
      const entity = await req.ctx.service.findDocument(req.input.id)
      return entity ? docEntityToCodec(entity) : null
    }),

  getDocuments: t.procedure
    .input(ioDecode(io.strict({ ids: io.array(io.string) }, 'database.getDocumentsInput')))
    .output(ioEncode(io.array(DocumentCodec, 'database.getDocumentsOutput')))
    .query(async (req) => {
      const results = await req.ctx.service.findDocuments(req.input.ids)
      return results.map(docEntityToCodec)
    }),

  pageDocuments: t.procedure
    .input(ioDecode(PaginationQueryCodec))
    .output(ioEncode(PaginationResultCodec))
    .query(async (req) => {
      const { edges, pageInfo } = await req.ctx.service.queryDocuments(req.input)
      return {
        edges: edges.map((e) => ({ cursor: e.cursor, node: docEntityToCodec(e.node) })),
        pageInfo,
      }
    }),

  saveDocument: t.procedure
    .input(ioDecode(io.strict({ document: UniqueDocumentCodec }, 'database.saveDocumentInput')))
    .mutation(async (req) => {
      const { model, ...doc } = req.input.document
      await req.ctx.service.saveDocument({ ...doc, modelId: model })
    }),

  documentInserted: t.procedure.subscription(() => {
    return documentInserted$.pipe(map(docEntityToCodec))
  }),

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
})

export type Router = typeof router
