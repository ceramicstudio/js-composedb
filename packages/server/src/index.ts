/**
 * ComposeDB server for hybrid execution on the {@linkcode client ComposeDB client}.
 *
 * ## Installation
 *
 * ```sh
 * npm install @composedb/server
 * ```
 *
 * @module server
 */

import { createServer } from 'node:http'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { VIEWER_ID_HEADER } from '@composedb/constants'
import type { DocumentCache } from '@composedb/loader'
import { type Context, createContext, getSchema } from '@composedb/runtime'
import type { CeramicAPI, RuntimeCompositeDefinition } from '@composedb/types'
import getPort from 'get-port'
import type { GraphQLSchema } from 'graphql'
import {
  type YogaInitialContext,
  type YogaServerInstance,
  type YogaServerOptions,
  createYoga,
} from 'graphql-yoga'

/**
 * Returns the viewer ID sent by the client, if set.
 */
export function getViewerID(request: Request): string | null | undefined {
  return request.headers.get(VIEWER_ID_HEADER)
}

export type HandlerParams<ServerContext extends Record<string, unknown> = Record<string, unknown>> =
  {
    /**
     * Optional cache for documents.
     */
    cache?: DocumentCache
    /**
     * Ceramic client instance or HTTP URL.
     */
    ceramic: CeramicAPI | string
    /**
     * Runtime composite definition, created using the {@linkcode devtools.Composite Composite}
     * development tools.
     */
    definition?: RuntimeCompositeDefinition
    /**
     * {@link https://the-guild.dev/graphql/yoga-server/docs Yoga server} options.
     */
    options?: YogaServerOptions<ServerContext, Context>
    /**
     * GraphQL Schema to use, ignores the `definition` parameter if provided.
     */
    schema?: GraphQLSchema
  }

/**
 * Create a {@link https://the-guild.dev/graphql/yoga-server/docs Yoga server} handling GraphQL requests.
 */
export function createHandler<
  ServerContext extends Record<string, unknown> = Record<string, unknown>,
>(params: HandlerParams<ServerContext>): YogaServerInstance<ServerContext, Context> {
  const { cache, ceramic, definition, options, schema } = params
  const client = typeof ceramic === 'string' ? new CeramicClient(ceramic) : ceramic

  return createYoga<ServerContext, Context>({
    context: (ctx: YogaInitialContext) => {
      const fallbackViewerID = getViewerID(ctx.request)
      return createContext({ cache, ceramic: client, fallbackViewerID })
    },
    graphiql: false, // Yoga enables GraphiQL by default
    ...options,
    schema: getSchema({ definition, readonly: true, schema }),
  })
}

export type GraphQLServer = {
  port: number
  stop: () => Promise<void>
}

export type GraphQLParams<ServerContext extends Record<string, unknown> = Record<string, unknown>> =
  HandlerParams<ServerContext> & {
    port?: number | Array<number>
  }

/**
 * Start a local GraphQL server.
 */
export async function startGraphQLServer<
  ServerContext extends Record<string, unknown> = Record<string, unknown>,
>(params: GraphQLParams<ServerContext>): Promise<GraphQLServer> {
  const handler = createHandler<ServerContext>(params)
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const server = createServer(handler)

  function stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  const port = await getPort({ port: params.port })
  return await new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(port, () => {
      resolve({ port, stop })
    })
  })
}
