import type { Logger, ServiceLifecycle, ServicesBus } from '@composedb/services-rpc'
import {
  type DocumentNode,
  type ExecutionResult,
  GraphQLError,
  execute,
  parse,
  subscribe,
  validate,
} from 'graphql'
import * as io from 'io-ts'
// import { nanoid } from 'nanoid'

import { schema } from './graphql/schema.js'
import type { ServiceClients } from './types.js'

export type ServiceConfig = Readonly<{
  dids: Array<string>
}>

export type ServiceParams = ServiceConfig & {
  bus: ServicesBus
  clients: ServiceClients
  logger: Logger
}

// TODO: move to admin-codecs package
export const GraphQLQueryCodec = io.intersection(
  [io.strict({ source: io.string }), io.partial({ variables: io.UnknownRecord })],
  'GraphQLQuery'
)
export type GraphQLQuery = io.TypeOf<typeof GraphQLQueryCodec>

export type GraphQLResult = ExecutionResult<Record<string, unknown>>

export class Service implements ServiceLifecycle {
  #allowedDIDs: Array<string>
  #clients: ServiceClients

  constructor(params: ServiceParams) {
    this.#allowedDIDs = params.dids
    this.#clients = params.clients
  }

  async stop() {
    // TODO: stop all active subscriptions
  }

  checkAllowedDID(did: string): Promise<boolean> {
    return Promise.resolve(this.#allowedDIDs.includes(did))
  }

  async executeGraphQL(query: GraphQLQuery): Promise<GraphQLResult> {
    let document: DocumentNode
    try {
      document = parse(query.source)
    } catch (syntaxError) {
      return { errors: [syntaxError as GraphQLError] }
    }

    const errors = validate(schema, document)
    if (errors.length > 0) {
      return { errors }
    }

    return execute({
      document,
      variableValues: query.variables,
      contextValue: { db: this.#clients.database },
      schema,
    })
  }

  async subscribeGraphQL(
    query: GraphQLQuery
  ): Promise<GraphQLResult | AsyncGenerator<GraphQLResult>> {
    let document: DocumentNode
    try {
      document = parse(query.source)
    } catch (syntaxError) {
      return { errors: [syntaxError as GraphQLError] }
    }

    const errors = validate(schema, document)
    if (errors.length > 0) {
      return { errors }
    }

    return subscribe({
      document,
      variableValues: query.variables,
      contextValue: { db: this.#clients.database },
      schema,
    })
  }
}
