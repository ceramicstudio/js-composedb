import { CeramicClient } from '@ceramicnetwork/http-client'
import { Context, createGraphQLSchema } from '@composedb/runtime'
import type { RuntimeCompositeDefinition } from '@composedb/types'
import type { DID } from 'dids'
import fastify from 'fastify'
import getPort from 'get-port'
import {
  type Request,
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix'

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
  readonly?: boolean
}

/**
 * Create a local GraphQL server to interact with a runtime composite definition.
 */
export async function serveGraphQL(params: ServeGraphQLParams): Promise<ServerHandler> {
  const { ceramicURL, definition, readonly, did, graphiql, port } = params
  const ceramic = new CeramicClient(ceramicURL)
  if (did != null) {
    ceramic.did = did
  }

  const context = new Context({ ceramic })
  const schema = createGraphQLSchema({ definition, readonly })

  const server = fastify()

  server.route({
    method: ['GET', 'POST'],
    url: '/graphql',
    handler: async (req, reply) => {
      const request: Request = {
        body: req.body,
        headers: req.headers,
        method: req.method,
        query: req.query,
      }
      if (graphiql && shouldRenderGraphiQL(request)) {
        reply.header('Content-Type', 'text/html')
        reply.send(renderGraphiQL())
      } else {
        const { operationName, query, variables } = getGraphQLParameters(request)
        const result = await processRequest<Context>({
          operationName,
          query,
          variables,
          request,
          schema,
          contextFactory: () => context,
        })
        await sendResult(result, reply.raw)
      }
    },
  })

  const serverPort = await getPort({ port })
  await server.listen({ port: serverPort })

  return {
    url: `http://localhost:${serverPort}/graphql`,
    stop: async () => {
      await server.close()
    },
  }
}

/**
 * Create a local GraphQL server to interact with an encoded composite definition.
 */
export async function serveEncodedDefinition(
  params: ServeDefinitionParams
): Promise<ServerHandler> {
  const { path, ...rest } = params
  const composite = await readEncodedComposite(params.ceramicURL, path)
  return await serveGraphQL({ ...rest, definition: composite.toRuntime() })
}
