import type { CeramicApi } from '@ceramicnetwork/common'
import { CeramicClient } from '@ceramicnetwork/http-client'
import {
  type DocumentNode,
  type ExecutionResult,
  type GraphQLError,
  type Source,
  GraphQLSchema,
  execute,
  parse,
  validate,
} from 'graphql'

import { type Context, createContext } from './context.js'
import type { DocumentCache } from './loader.js'
import { type GetSchemaParams, getSchema } from './utils.js'

export type ComposeRuntimeParams = GetSchemaParams & {
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
}

/**
 * The ComposeRuntime class provides APIs to execute queries on a GraphQL schema generated from a
 * `RuntimeCompositeDefinition`. It allows applications to interact with documents using known
 * models on a Ceramic node.
 *
 * It is exported by the {@linkcode runtime} module.
 *
 * ```sh
 * import { ComposeRuntime } from '@composedb/runtime'
 * ```
 */
export class ComposeRuntime {
  #context: Context
  #schema: GraphQLSchema

  constructor(params: ComposeRuntimeParams) {
    const { ceramic, context, definition, readonly, schema, ...contextParams } = params
    const ceramicClient = typeof ceramic === 'string' ? new CeramicClient(ceramic) : ceramic
    this.#context = context ?? createContext({ ...contextParams, ceramic: ceramicClient })
    this.#schema = getSchema({ definition, readonly, schema })
  }

  /**
   * Context object used internally.
   */
  get context(): Context {
    return this.#context
  }

  /**
   * Execute a GraphQL query from a DocumentNode and optional variables.
   */
  async execute<Data = Record<string, unknown>>(
    document: DocumentNode,
    variableValues?: Record<string, unknown>,
  ): Promise<ExecutionResult<Data>> {
    const errors = validate(this.#schema, document)
    return errors.length > 0
      ? { errors }
      : ((await execute({
          document,
          variableValues,
          contextValue: this.#context,
          schema: this.#schema,
        })) as unknown as ExecutionResult<Data>)
  }

  /**
   * Execute a GraphQL query from its source and optional variables.
   */
  async executeQuery<Data = Record<string, unknown>>(
    source: string | Source,
    variableValues?: Record<string, unknown>,
  ): Promise<ExecutionResult<Data>> {
    let document: DocumentNode
    try {
      document = parse(source)
    } catch (syntaxError) {
      return { errors: [syntaxError as GraphQLError] }
    }
    return await this.execute<Data>(document, variableValues)
  }
}
