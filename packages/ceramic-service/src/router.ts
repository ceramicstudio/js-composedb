import { CeramicStreamCodec, ioParser } from '@composedb/ceramic-codecs'
import { initTRPC } from '@trpc/server'
import * as io from 'io-ts'

import { service } from './service.js'

const t = initTRPC.create()

export const serviceRouter = t.router({
  loadStream: t.procedure
    .input(
      ioParser(
        io.type({
          id: io.string,
        })
      )
    )
    .query(async (req) => {
      const stream = await service.streams.loadStream(req.input.id)
      return CeramicStreamCodec.encode(stream)
    }),
})

export type ServiceRouter = typeof serviceRouter
