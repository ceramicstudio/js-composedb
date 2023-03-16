import { ModelCodec } from '@composedb/model-codecs'
import { ioDecode } from '@composedb/services-rpc'
import { ServicesRunner } from '@composedb/services-runner'
import { initTRPC } from '@trpc/server'
import * as io from 'io-ts'

import { type CompositeClient } from './clients.js'

export type Context = {
  composite: CompositeClient
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
    .mutation(async () => {
      // return await req.ctx.composite.createModel
    }),
})

export type Router = typeof router
