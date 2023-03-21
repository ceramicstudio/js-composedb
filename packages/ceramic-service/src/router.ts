import { CeramicCommitCodec, CeramicStreamCodec, cidCodec } from '@composedb/ceramic-codecs'
import { ioDecode, ioEncode } from '@composedb/services-rpc'
import { initTRPC } from '@trpc/server'
import * as io from 'io-ts'

import type { Service } from './service.js'

export type Context = {
  service: Service
}

const t = initTRPC.context<Context>().create()

export const router = t.router({
  createStream: t.procedure
    .input(ioDecode(io.strict({ commit: CeramicCommitCodec }, 'ceramic.createStreamInput')))
    .output(ioEncode(CeramicStreamCodec))
    .mutation((req) => req.ctx.service.createStream(req.input.commit)),

  loadStream: t.procedure
    .input(ioDecode(io.strict({ id: io.string }, 'ceramic.loadStreamInput')))
    .output(ioEncode(CeramicStreamCodec))
    .query((req) => req.ctx.service.streams.loadStream(req.input.id)),

  storeCommit: t.procedure
    .input(
      ioDecode(
        io.intersection(
          [
            io.strict({ commit: CeramicCommitCodec }),
            io.partial({ streamID: io.string }), // TODO: StreamID codecs
          ],
          'ceramic.storeCommitInput'
        )
      )
    )
    .output(ioEncode(cidCodec))
    .mutation((req) => req.ctx.service.streams.storeCommit(req.input.commit)),
})

export type Router = typeof router
