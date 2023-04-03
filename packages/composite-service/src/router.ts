import { SignedCommitContainerCodec } from '@composedb/ceramic-codecs'
import { CompositeDefinitionCodec, GraphQLQueryCodec } from '@composedb/composite-codecs'
import { ModelCodec } from '@composedb/model-codecs'
import { ioDecode, ioEncode } from '@composedb/services-rpc'
import { initTRPC } from '@trpc/server'
import * as io from 'io-ts'
import { from, of } from 'rxjs'
// Workaround for TS2742 error - https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1270716220
import type {} from 'json-schema-typed/draft-2020-12.js'
import type {} from 'multiformats/cid'

import { SaveCompositeOptionsCodec, SavedCompositeCodec, type Service } from './service.js'

export type Context = {
  service: Service
}

const t = initTRPC.context<Context>().create()

export const router = t.router({
  createModel: t.procedure
    .input(
      ioDecode(
        io.intersection(
          [
            io.strict({ commit: SignedCommitContainerCodec }),
            io.partial({ indexDocuments: io.boolean }),
          ],
          'composite.createModelInput'
        )
      )
    )
    .output(ioEncode(ModelCodec))
    .mutation((req) => req.ctx.service.models.create(req.input.commit)),

  loadModel: t.procedure
    .input(ioDecode(io.strict({ id: io.string }, 'composite.loadModelInput')))
    .output(ioEncode(ModelCodec))
    .query((req) => req.ctx.service.models.load(req.input.id)),

  saveComposite: t.procedure
    .input(
      ioDecode(
        io.intersection(
          [io.strict({ composite: CompositeDefinitionCodec }), SaveCompositeOptionsCodec],
          'composite.saveCompositeInput'
        )
      )
    )
    .output(ioEncode(SavedCompositeCodec))
    .mutation(async (req) => {
      const { composite, ...options } = req.input
      return await req.ctx.service.saveComposite(composite, options)
    }),

  graphql: t.procedure
    .input(ioDecode(GraphQLQueryCodec))
    .query((req) => req.ctx.service.executeGraphQL(req.input)),

  graphqlSubscription: t.procedure.input(ioDecode(GraphQLQueryCodec)).subscription(async (req) => {
    const result = await req.ctx.service.subscribeGraphQL(req.input)
    const observable =
      typeof (result as AsyncGenerator).next === 'function'
        ? from(result as AsyncGenerator)
        : of(result)
    return observable
  }),
})

export type Router = typeof router
