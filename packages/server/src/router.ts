import { SignedCommitContainerCodec } from '@composedb/ceramic-codecs'
import { CompositeDefinitionCodec, GraphQLQueryCodec } from '@composedb/composite-codecs'
import type {
  GraphQLResult,
  Router as CompositeRouter,
  SavedComposite,
} from '@composedb/composite-service'
import { ModelCodec } from '@composedb/model-codecs'
import { type ServiceClient, ioDecode } from '@composedb/services-rpc'
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

export type Context = {
  composite: ServiceClient<CompositeRouter>
}

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
}

const procedures: Procedures = {
  // @ts-ignore type mismatch
  createModel: t.procedure
    .input(ioDecode(CreateModelInput))
    .mutation((req) => req.ctx.composite.createModel.mutate(req.input)),
  // @ts-ignore type mismatch
  loadModel: t.procedure
    .input(ioDecode(io.strict({ id: io.string }, 'server.loadModelInput')))
    .mutation((req) => req.ctx.composite.loadModel.query(req.input)),
  // @ts-ignore type mismatch
  saveComposite: t.procedure
    .input(
      ioDecode(io.strict({ composite: CompositeDefinitionCodec }, 'server.saveCompositeInput'))
    )
    .mutation((req) => req.ctx.composite.saveComposite.mutate(req.input)),
  // @ts-ignore type mismatch
  graphql: t.procedure
    .input(ioDecode(GraphQLQueryCodec))
    .query((req) => req.ctx.composite.graphql.query(req.input)),
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
}

export const router: CreateRouterInner<AnyRootConfig, Procedures> = t.router(procedures)

export type Router = typeof router
