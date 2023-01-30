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

import type { CeramicApi } from '@ceramicnetwork/common'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { VIEWER_ID_HEADER } from '@composedb/constants'
import { Context, type DocumentCache, getSchema } from '@composedb/runtime'
import type { RuntimeCompositeDefinition } from '@composedb/types'
import fastify, {
  type FastifyInstance,
  type FastifyServerOptions,
  type HTTPMethods,
  type RouteOptions,
} from 'fastify'
import getPort from 'get-port'
import type { GraphQLSchema } from 'graphql'
import {
  type ExecutionContext,
  type ProcessRequestResult,
  type Request,
  type RawResponse,
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix'

export type ContextFactoryFunction = (executionContext: ExecutionContext) => Context

/**
 * Returns the viewer ID sent by the client, if set.
 *
 * @param request {@link https://graphql-helix.vercel.app/docs/types GraphQL Helix `Request` object}
 */
export function getViewerID(request: Request): string | null | undefined {
  return typeof request.headers.get === 'function'
    ? request.headers.get(VIEWER_ID_HEADER)
    : (request.headers as Record<string, string>)[VIEWER_ID_HEADER]
}

export type GraphQLServerParams = {
  options?: FastifyServerOptions
  port?: number | Array<number>
}

export type HTTPServerHandler = {
  port: number
  stop: () => Promise<void>
}

/** @internal */
export async function startHTTPServer(
  server: FastifyInstance,
  listenOnPort?: number | Array<number>
): Promise<HTTPServerHandler> {
  const port = await getPort({ port: listenOnPort })
  await server.listen({ port })
  return {
    port,
    stop: async () => {
      await server.close()
    },
  }
}

export type ComposeServerParams = {
  /**
   * Optional cache for documents.
   */
  cache?: DocumentCache
  /**
   * Ceramic client instance or HTTP URL.
   */
  ceramic: CeramicApi | string
  /**
   * Per-request context factory.
   */
  contextFactory?: ContextFactoryFunction
  /**
   * Runtime composite definition, created using the {@linkcode devtools.Composite Composite}
   * development tools.
   */
  definition?: RuntimeCompositeDefinition
  /**
   * Enable GraphiQL support.
   */
  graphiql?: boolean
  /**
   * GraphQL Schema to use, ignores the `definition` parameter if provided.
   */
  schema?: GraphQLSchema
}

export class ComposeServer {
  #cache: DocumentCache | undefined
  #ceramic: CeramicApi
  #contextFactory: ContextFactoryFunction
  #graphiql: boolean
  #schema: GraphQLSchema

  constructor(params: ComposeServerParams) {
    const { cache, ceramic, contextFactory, definition, graphiql, schema } = params
    this.#cache = cache
    this.#ceramic = typeof ceramic === 'string' ? new CeramicClient(ceramic) : ceramic
    this.#contextFactory =
      contextFactory ??
      ((ctx) => {
        const fallbackViewerID = getViewerID(ctx.request)
        return new Context({ cache: this.#cache, ceramic: this.#ceramic, fallbackViewerID })
      })
    this.#graphiql = graphiql === true
    this.#schema = getSchema({ definition, readonly: true, schema })
  }

  /** @internal */
  async processRequest(request: Request): Promise<ProcessRequestResult<Context, unknown>> {
    const { operationName, query, variables } = getGraphQLParameters(request)
    return await processRequest<Context>({
      operationName,
      query,
      variables,
      request,
      schema: this.#schema,
      contextFactory: this.#contextFactory,
    })
  }

  /**
   * Handle a GraphQL query from an incoming HTTP `request`, sending the `response` back.
   *
   * If the `graphiql` option is set to `true` when creating the
   * {@linkcode server.ComposeServer ComposeServer instance}, this handler can serve the GraphiQL
   * UI.
   *
   * @param request {@link https://graphql-helix.vercel.app/docs/types GraphQL Helix `Request` object}
   * @param response {@link https://graphql-helix.vercel.app/docs/types GraphQL Helix `Response` object}
   */
  async handleHTTPRequest(request: Request, response: RawResponse): Promise<void> {
    if (this.#graphiql && shouldRenderGraphiQL(request)) {
      response.setHeader('Content-Type', 'text/html')
      response.end(renderGraphiQL())
    } else {
      const result = await this.processRequest(request)
      await sendResult(result, response)
    }
  }

  /** @internal */
  createGraphQLRoute(
    url = '/graphql',
    method: HTTPMethods | Array<HTTPMethods> = ['GET', 'POST']
  ): RouteOptions {
    return {
      method,
      url,
      handler: async (req, reply) => {
        const request: Request = {
          body: req.body,
          headers: req.headers,
          method: req.method,
          query: req.query,
        }
        await this.handleHTTPRequest(request, reply.raw)
      },
    }
  }

  /**
   * Start a local HTTP server with a `/graphql` endpoint handling GraphQL queries.
   */
  async startGraphQLServer(params: GraphQLServerParams = {}): Promise<HTTPServerHandler> {
    const server = fastify(params.options)
    server.route(this.createGraphQLRoute())
    return await startHTTPServer(server, params.port)
  }
}
