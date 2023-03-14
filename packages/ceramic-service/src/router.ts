import { CeramicStreamCodec } from '@composedb/ceramic-codecs'
import { ioParser } from '@composedb/services-rpc'
import { initTRPC } from '@trpc/server'
import * as io from 'io-ts'

import type { Service } from './service.js'

export type Context = {
  service: Service
}

const t = initTRPC.context<Context>().create()

export const router = t.router({
  loadStream: t.procedure
    .input(
      ioParser(
        io.type({
          id: io.string,
        })
      )
    )
    .query(async (req) => {
      const stream = await req.ctx.service.streams.loadStream(req.input.id)
      return CeramicStreamCodec.encode(stream)
    }),
})

export type Router = typeof router
