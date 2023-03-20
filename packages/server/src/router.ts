import { ModelCodec } from '@composedb/model-codecs'
import { ioDecode } from '@composedb/services-rpc'
import type { ServicesRunner } from '@composedb/services-runner'
import { initTRPC } from '@trpc/server'
import * as io from 'io-ts'

export type Context = {
  runner: ServicesRunner
}

const t = initTRPC.context<Context>().create()

export const router = t.router({
  createModel: t.procedure
    .input(
      ioDecode(
        io.intersection([
          io.strict({ model: ModelCodec }),
          io.partial({ indexDocuments: io.boolean }),
        ])
      )
    )
    .mutation(async (req) => {
      return await req.ctx.runner.clients.composite.createModel.mutate(req.input)
    }),
})

export type Router = typeof router
