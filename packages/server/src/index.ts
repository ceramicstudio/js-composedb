import type { CeramicApi } from '@ceramicnetwork/common'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { Context, type DocumentCache, createGraphQLSchema } from '@composedb/runtime'
import type { RuntimeCompositeDefinition } from '@composedb/types'
import fastify, { type FastifyServerOptions } from 'fastify'
import getPort from 'get-port'
import type { GraphQLSchema } from 'graphql'
import {
  type ProcessRequestResult,
  type Request,
  type RawResponse,
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix'

export type HTTPServerParams = {
  options?: FastifyServerOptions
  port?: number | Array<number>
}

export type HTTPServerHandler = {
  port: number
  stop: () => Promise<void>
}

export type ComposeServerParams = {
  /**
   * Optional cache for documents.
   */
  cache?: DocumentCache | boolean
  /**
   * Ceramic client instance or HTTP URL.
   */
  ceramic: CeramicApi | string
  /**
   * Optional context to use.
   */
  context?: Context
  /**
   * Runtime composite definition, created using the {@linkcode devtools.Composite Composite}
   * development tools.
   */
  definition: RuntimeCompositeDefinition
  /**
   * Enable GraphiQL support.
   */
  graphiql?: boolean
}

export class ComposeServer {
  #context: Context
  #graphiql: boolean
  #schema: GraphQLSchema

  constructor(params: ComposeServerParams) {
    const { ceramic, context, definition, graphiql, ...contextParams } = params
    const ceramicClient = typeof ceramic === 'string' ? new CeramicClient(ceramic) : ceramic
    this.#context = context ?? new Context({ ...contextParams, ceramic: ceramicClient })
    this.#graphiql = graphiql === true
    this.#schema = createGraphQLSchema({ definition, readonly: true })
  }

  async processRequest(request: Request): Promise<ProcessRequestResult<Context, unknown>> {
    const { operationName, query, variables } = getGraphQLParameters(request)
    return await processRequest<Context>({
      operationName,
      query,
      variables,
      request,
      schema: this.#schema,
      contextFactory: () => this.#context,
    })
  }

  async handleHTTPRequest(request: Request, response: RawResponse): Promise<void> {
    if (this.#graphiql && shouldRenderGraphiQL(request)) {
      response.end(renderGraphiQL())
    } else {
      const result = await this.processRequest(request)
      await sendResult(result, response)
    }
  }

  async startHTTPServer(params: HTTPServerParams = {}): Promise<HTTPServerHandler> {
    const server = fastify(params.options)
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
        await this.handleHTTPRequest(request, reply.raw)
      },
    })

    const port = await getPort({ port: params.port ?? 7077 })
    console.log('server port', port)
    await server.listen({ port })

    return {
      port,
      stop: async () => {
        await server.close()
      },
    }
  }
}
