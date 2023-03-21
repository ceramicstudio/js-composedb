import { SignedCommitContainerCodec } from '@composedb/ceramic-codecs'
import { ModelCodec } from '@composedb/model-codecs'
import { ioDecode, ioEncode } from '@composedb/services-rpc'
import { initTRPC } from '@trpc/server'
import * as io from 'io-ts'
// Workaround for TS2742 error - https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1270716220
import type {} from 'json-schema-typed/draft-2020-12.js'
import type {} from 'multiformats/cid'

import type { Service } from './service.js'

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
})

export type Router = typeof router
