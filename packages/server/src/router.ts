import { SignedCommitContainerCodec } from '@composedb/ceramic-codecs'
import { CompositeDefinitionCodec, GraphQLQueryCodec } from '@composedb/composite-codecs'
import type { Router as CompositeRouter } from '@composedb/composite-service'
import { type ServiceClient, ioDecode } from '@composedb/services-rpc'
import { initTRPC } from '@trpc/server'
import * as io from 'io-ts'
import type {} from 'multiformats/cid'

export type Context = {
  composite: ServiceClient<CompositeRouter>
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
          'server.createModelInput'
        )
      )
    )
    .mutation((req) => req.ctx.composite.createModel.mutate(req.input)),

  loadModel: t.procedure
    .input(ioDecode(io.strict({ id: io.string }, 'server.loadModelInput')))
    .mutation((req) => req.ctx.composite.loadModel.query(req.input)),

  saveComposite: t.procedure
    .input(
      ioDecode(io.strict({ composite: CompositeDefinitionCodec }, 'server.saveCompositeInput'))
    )
    .mutation((req) => req.ctx.composite.saveComposite.mutate(req.input)),

  graphql: t.procedure
    .input(ioDecode(GraphQLQueryCodec))
    .query((req) => req.ctx.composite.graphql.query(req.input)),
})

export type Router = typeof router
