import { ioDecode } from '@composedb/services-rpc'
import { initTRPC } from '@trpc/server'
import { from, of } from 'rxjs'
// Workaround for TS2742 error - https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1270716220
import type {} from 'json-schema-typed/draft-2020-12.js'
import type {} from 'multiformats/cid'

import { GraphQLQueryCodec, type Service } from './service.js'

export type Context = {
  service: Service
}

const t = initTRPC.context<Context>().create()

export const router = t.router({
  graphql: t.procedure
    .input(ioDecode(GraphQLQueryCodec))
    .query((req) => req.ctx.service.executeGraphQL(req.input)),

  graphqlSubscription: t.procedure.input(ioDecode(GraphQLQueryCodec)).subscription(async (req) => {
    const result = await req.ctx.service.subscribeGraphQL(req.input)
    const observable =
      typeof (result as AsyncGenerator).next === 'function'
        ? from(result as AsyncGenerator)
        : of(result)
    return observable
  }),
})

export type Router = typeof router
