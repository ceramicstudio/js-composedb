import { SignedCommitContainerCodec } from '@composedb/ceramic-codecs'
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
        io.intersection([
          io.strict({ commit: SignedCommitContainerCodec }),
          io.partial({ indexDocuments: io.boolean }),
        ])
      )
    )
    .mutation(async (req) => {
      return await req.ctx.composite.createModel.mutate(req.input)
    }),
})

export type Router = typeof router
