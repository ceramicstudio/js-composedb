import { CommitCodec, StreamLogCodec, cidCodec } from '@composedb/ceramic-codecs'
import { ioDecode, ioEncode } from '@composedb/services-rpc'
import { initTRPC } from '@trpc/server'
import * as io from 'io-ts'
// Workaround for TS2742 error - https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1270716220
import type {} from '@ceramicnetwork/streamid'

import type { Service } from './service.js'

export type Context = {
  service: Service
}

const t = initTRPC.context<Context>().create()

export const router = t.router({
  createStream: t.procedure
    .input(ioDecode(io.strict({ commit: CommitCodec }, 'ceramic.createStreamInput')))
    .output(ioEncode(StreamLogCodec))
    .mutation((req) => req.ctx.service.createStream(req.input.commit)),

  loadStream: t.procedure
    .input(ioDecode(io.strict({ id: io.string }, 'ceramic.loadStreamInput')))
    .output(ioEncode(StreamLogCodec))
    .query((req) => req.ctx.service.streams.loadStream(req.input.id)),

  storeCommit: t.procedure
    .input(
      ioDecode(
        io.intersection(
          [io.strict({ commit: CommitCodec }), io.partial({ streamID: io.string })],
          'ceramic.storeCommitInput'
        )
      )
    )
    .output(ioEncode(cidCodec))
    .mutation((req) => req.ctx.service.streams.storeCommit(req.input.commit)),
})

export type Router = typeof router
