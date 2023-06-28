import {
  CompositeEntityCodec,
  CompositesQueryCodec,
  ModelEntityCodec,
  ModelsQueryCodec,
} from '@composedb/database-codecs'
import {
  type Document as EncodedDocument,
  DocumentCodec,
  DocumentQueryCodec,
  PaginationQueryCodec,
  PaginationResultCodec,
  UniqueDocumentCodec,
} from '@composedb/document-codecs'
import { ioDecode, ioEncode } from '@composedb/services-rpc'
import { initTRPC } from '@trpc/server'
import * as io from 'io-ts'
import { map } from 'rxjs'
// Workaround for TS2742 error - https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1270716220
import type {} from 'json-schema-typed/draft-2020-12.js'

import type { Document as DocumentEntity } from './entities/document.js'
import { documentInserted$ } from './events.js'
import type { Service } from './service.js'

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

const loadOneInput = ioDecode(io.strict({ id: io.string }, 'database.loadOneInput'))
const loadManyInput = ioDecode(io.strict({ ids: io.array(io.string) }, 'database.loadManyInput'))

const countOutput = ioEncode(io.number)

const compositesQueryInput = ioDecode(CompositesQueryCodec)
const compositesOutput = ioEncode(io.array(CompositeEntityCodec, 'database.compositesOutput'))

const modelsQueryInput = ioDecode(ModelsQueryCodec)
const modelsOutput = ioEncode(io.array(ModelEntityCodec, 'database.modelsOutput'))

export const router = t.router({
  // Entities APIs (internal structures)

  loadComposite: t.procedure
    .input(loadOneInput)
    .output(ioEncode(io.union([CompositeEntityCodec, io.null], 'database.loadCompositeOutput')))
    .query((req) => req.ctx.service.loadComposite(req.input.id)),

  loadComposites: t.procedure
    .input(loadManyInput)
    .output(compositesOutput)
    .query((req) => req.ctx.service.loadComposites(req.input.ids)),

  countComposites: t.procedure
    .input(compositesQueryInput)
    .output(countOutput)
    .query((req) => req.ctx.service.countComposites(req.input)),

  findComposites: t.procedure
    .input(compositesQueryInput)
    .output(compositesOutput)
    .query((req) => req.ctx.service.findComposites(req.input)),

  saveComposite: t.procedure.input(ioDecode(CompositeEntityCodec)).mutation(async (req) => {
    // Models need to have been saved to DB before saving the composite
    const models = await Promise.all(
      Object.values(req.input.graph.models).map(async ({ id }) => {
        const model = await req.ctx.service.loadModel(id)
        if (model == null) {
          throw new Error(`Model not found: ${id}`)
        }
        return model
      })
    )
    await req.ctx.service.saveComposite({
      id: req.input.id,
      label: req.input.label ?? undefined,
      description: req.input.description ?? undefined,
      graph: req.input.graph,
      models,
      commonEmbeds: req.input.commonEmbeds,
      isEnabled: req.input.isEnabled,
      mutationsEnabled: req.input.mutationsEnabled,
      subscriptionsEnabled: req.input.subscriptionsEnabled,
    })
  }),

  loadModel: t.procedure
    .input(loadOneInput)
    .output(ioEncode(io.union([ModelEntityCodec, io.null], 'database.loadModelOutput')))
    .query((req) => req.ctx.service.loadModel(req.input.id)),

  loadModels: t.procedure
    .input(loadManyInput)
    .output(modelsOutput)
    .query((req) => req.ctx.service.loadModels(req.input.ids)),

  countModels: t.procedure
    .input(modelsQueryInput)
    .output(countOutput)
    .query((req) => req.ctx.service.countModels(req.input)),

  findModels: t.procedure
    .input(modelsQueryInput)
    .output(modelsOutput)
    .query((req) => req.ctx.service.findModels(req.input)),

  saveModel: t.procedure.input(ioDecode(ModelEntityCodec)).mutation(async (req) => {
    const model = req.input
    await req.ctx.service.saveModel({ ...model, description: model.description ?? undefined })
  }),

  // Documents APIs

  countDocuments: t.procedure
    .input(ioDecode(DocumentQueryCodec))
    .output(countOutput)
    .query((req) => req.ctx.service.countDocuments(req.input)),

  getDocument: t.procedure
    .input(loadOneInput)
    .output(ioEncode(io.union([DocumentCodec, io.null], 'database.getDocumentOutput')))
    .query(async (req) => {
      const entity = await req.ctx.service.loadDocument(req.input.id)
      return entity ? docEntityToCodec(entity) : null
    }),

  getDocuments: t.procedure
    .input(loadManyInput)
    .output(ioEncode(io.array(DocumentCodec, 'database.getDocumentsOutput')))
    .query(async (req) => {
      const results = await req.ctx.service.loadDocuments(req.input.ids)
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

  saveDocument: t.procedure.input(ioDecode(UniqueDocumentCodec)).mutation(async (req) => {
    const { model, ...doc } = req.input
    await req.ctx.service.saveDocument({ ...doc, modelId: model })
  }),

  documentInserted: t.procedure.subscription(() => {
    return documentInserted$.pipe(map(docEntityToCodec))
  }),
})

export type Router = typeof router
