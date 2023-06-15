import { GraphQLQueryCodec as AdminGraphQLQueryCodec } from '@composedb/admin-service'
import { SignedCommitContainerCodec } from '@composedb/ceramic-codecs'
import { CompositeDefinitionCodec, GraphQLQueryCodec } from '@composedb/composite-codecs'
import type { GraphQLResult, SavedComposite } from '@composedb/composite-service'
import { ModelCodec } from '@composedb/model-codecs'
import { ioDecode, ioEncode } from '@composedb/services-rpc'
import {
  type AnyRootConfig,
  type BuildProcedure,
  type CreateRouterInner,
  type ProcedureParams,
  initTRPC,
} from '@trpc/server'
import * as io from 'io-ts'
import { type Observable, Subject } from 'rxjs'
import type {} from 'multiformats/cid'

import type { Context } from './context.js'

const t = initTRPC.context<Context>().create()
type Config = typeof t._config

const CreateModelInput = io.intersection(
  [io.strict({ commit: SignedCommitContainerCodec }), io.partial({ indexDocuments: io.boolean })],
  'server.createModelInput'
)

type Procedures = {
  createModel: BuildProcedure<'mutation', ProcedureParams<Config>, io.TypeOf<typeof ModelCodec>>
  loadModel: BuildProcedure<'query', ProcedureParams<Config>, io.TypeOf<typeof ModelCodec>>
  saveComposite: BuildProcedure<'mutation', ProcedureParams<Config>, SavedComposite>
  graphql: BuildProcedure<'query', ProcedureParams<Config>, GraphQLResult>
  graphqlSubscription: BuildProcedure<
    'subscription',
    ProcedureParams<Config>,
    Observable<GraphQLResult>
  >
  adminAuthenticate: BuildProcedure<'query', ProcedureParams<Config>, boolean>
  adminGraphql: BuildProcedure<'query', ProcedureParams<Config>, GraphQLResult>
  adminGraphqlSubscription: BuildProcedure<
    'subscription',
    ProcedureParams<Config>,
    Observable<GraphQLResult>
  >
}

const procedures: Procedures = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore type mismatch
  createModel: t.procedure
    .input(ioDecode(CreateModelInput))
    .mutation((req) => req.ctx.composite.createModel.mutate(req.input)),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore type mismatch
  loadModel: t.procedure
    .input(ioDecode(io.strict({ id: io.string }, 'server.loadModelInput')))
    .mutation((req) => req.ctx.composite.loadModel.query(req.input)),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore type mismatch
  saveComposite: t.procedure
    .input(
      ioDecode(io.strict({ composite: CompositeDefinitionCodec }, 'server.saveCompositeInput'))
    )
    .mutation((req) => req.ctx.composite.saveComposite.mutate(req.input)),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore type mismatch
  graphql: t.procedure
    .input(ioDecode(GraphQLQueryCodec))
    .query((req) => req.ctx.composite.graphql.query(req.input)),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore type mismatch
  graphqlSubscription: t.procedure.input(ioDecode(GraphQLQueryCodec)).subscription((req) => {
    const subject = new Subject()
    // TODO: handle stopping subscription
    req.ctx.composite.graphqlSubscription.subscribe(req.input, {
      onComplete() {
        subject.complete()
      },
      onData(value) {
        subject.next(value)
      },
      onError(err) {
        subject.error(err)
      },
    })
    return subject.asObservable()
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore type mismatch
  adminAuthenticate: t.procedure
    .input(ioDecode(io.string))
    .output(ioEncode(io.boolean))
    .query((req) => req.ctx.admin.authenticate.query(req.input)),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore type mismatch
  adminGraphql: t.procedure
    .input(ioDecode(AdminGraphQLQueryCodec))
    .query((req) => req.ctx.admin.graphql.query(req.input)),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore type mismatch
  adminGraphqlSubscription: t.procedure
    .input(ioDecode(AdminGraphQLQueryCodec))
    .subscription((req) => {
      const subject = new Subject()
      // TODO: handle stopping subscription
      req.ctx.admin.graphqlSubscription.subscribe(req.input, {
        onComplete() {
          subject.complete()
        },
        onData(value) {
          subject.next(value)
        },
        onError(err) {
          subject.error(err)
        },
      })
      return subject.asObservable()
    }),
}

export const router: CreateRouterInner<AnyRootConfig, Procedures> = t.router(procedures)

export type Router = typeof router
