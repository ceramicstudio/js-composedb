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
  loadStream: t.procedure.input(ioDecode(io.strict({ id: io.string }))).query(async (req) => {
    const stream = await req.ctx.service.streams.loadStream(req.input.id)
    return CeramicStreamCodec.encode(stream)
  }),
  storeCommit: t.procedure
    .input(
      ioDecode(
        io.intersection([
          io.strict({ commit: CeramicCommitCodec }),
          io.partial({ streamID: io.string }), // TODO: StreamID codecs
        ])
      )
    )
    .output(ioEncode(io.strict({ cid: cidCodec })))
    .mutation(async (req) => {
      const cid = await req.ctx.service.streams.storeCommit(req.input.commit)
      return { cid }
    }),
})

export type Router = typeof router
