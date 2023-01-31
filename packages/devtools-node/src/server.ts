import { CeramicClient } from '@ceramicnetwork/http-client'
import { createContext, createGraphQLSchema } from '@composedb/runtime'
import { type GraphQLServer, startGraphQLServer } from '@composedb/server'
import type { RuntimeCompositeDefinition } from '@composedb/types'
import type { DID } from 'dids'

import { readEncodedComposite } from './fs.js'
import type { PathInput } from './types.js'

export type ServerHandler = {
  /**
   * URL of the local GraphQL endpoint.
   */
  url: string
  /**
   * Stop the server.
   */
  stop: () => Promise<void>
}

export type ServeParams = {
  /**
   * URL of the Ceramic node.
   */
  ceramicURL: string
  /**
   * Optional DID instance attached to the Ceramic client.
   */
  did?: DID
  /**
   * Enable GraphiQL on the server.
   */
  graphiql?: boolean
  /**
   * Port to use, if available.
   */
  port?: number | Array<number>
}

export type ServeDefinitionParams = ServeParams & {
  /**
   * Path of the encoded composite definition used to generate the GraphQL schema.
   */
  path: PathInput
}

export type ServeGraphQLParams = ServeParams & {
  /**
   * Runtime composite definition used to generate the GraphQL schema.
   */
  definition: RuntimeCompositeDefinition
  /**
   * Set the schema to read-only, disabling mutations support.
   */
  readonly?: boolean
}

/**
 * Create a local GraphQL server to interact with a runtime composite definition.
 */
export async function serveGraphQL(params: ServeGraphQLParams): Promise<GraphQLServer> {
  const { ceramicURL, definition, readonly, did, graphiql, port } = params
  const ceramic = new CeramicClient(ceramicURL)
  if (did != null) {
    ceramic.did = did
  }
  return await startGraphQLServer({
    ceramic,
    options: { context: createContext({ ceramic }), graphiql },
    port,
    schema: createGraphQLSchema({ definition, readonly }),
  })
}

/**
 * Create a local GraphQL server to interact with an encoded composite definition.
 */
export async function serveEncodedDefinition(
  params: ServeDefinitionParams
): Promise<GraphQLServer> {
  const { path, ...rest } = params
  const composite = await readEncodedComposite(params.ceramicURL, path)
  return await serveGraphQL({ ...rest, definition: composite.toRuntime() })
}
