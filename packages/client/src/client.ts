import { type CeramicApi, fetchJson } from '@ceramicnetwork/common'
import { CeramicClient } from '@ceramicnetwork/http-client'
import {
  ComposeRuntime,
  type ComposeRuntimeParams,
  Context,
  type DocumentCache,
} from '@composedb/runtime'
import type { RuntimeCompositeDefinition } from '@composedb/types'
import type { DID } from 'dids'
import type { DocumentNode, ExecutionResult, Source } from 'graphql'

import { createHybridSchema } from './remote.js'

export type FromServerParams = {
  /**
   * Optional cache for documents.
   */
  cache?: DocumentCache
  /**
   * Server config URL.
   */
  url: string
}

export type FromServerConfig = {
  /**
   * Ceramic server URL.
   */
  ceramic: string
  /**
   * Runtime composite definition, created using the {@linkcode devtools.Composite Composite}
   * development tools.
   */
  definition: RuntimeCompositeDefinition
  /**
   * Query server URL.
   */
  serverURL: string
}

export type ComposeClientParams = {
  /**
   * Optional cache for documents.
   */
  cache?: DocumentCache
  /**
   * Ceramic client instance or HTTP URL.
   */
  ceramic: CeramicApi | string
  /**
   * Runtime composite definition, created using the {@linkcode devtools.Composite Composite}
   * development tools.
   */
  definition: RuntimeCompositeDefinition
  /**
   * Optional query server URL.
   */
  serverURL?: string
}

/**
 * The ComposeClient class provides APIs to execute queries on a GraphQL schema generated from a
 * `RuntimeCompositeDefinition`. It allows applications to interact with documents using known
 * models on a Ceramic node.
 *
 * It is exported by the {@linkcode client} module.
 *
 * ```sh
 * import { ComposeClient } from '@composedb/client'
 * ```
 */
export class ComposeClient {
  static async fromServer(params: FromServerParams): Promise<ComposeClient> {
    const config = (await fetchJson(params.url)) as FromServerConfig
    return new ComposeClient({ ...config, cache: params.cache })
  }

  #context: Context
  #resources: Array<string>
  #runtime: ComposeRuntime

  constructor(params: ComposeClientParams) {
    const { ceramic, definition, serverURL, ...contextParams } = params
    const ceramicClient = typeof ceramic === 'string' ? new CeramicClient(ceramic) : ceramic
    this.#context = new Context({ ...contextParams, ceramic: ceramicClient })
    this.#resources = Object.values(definition.models).map((model) => {
      return `ceramic://*?model=${model.id}`
    })
    const runtimeParams: ComposeRuntimeParams = {
      ceramic: ceramicClient,
      context: this.#context,
      definition,
    }
    if (serverURL != null) {
      runtimeParams.schema = createHybridSchema({
        definition,
        getViewerID: () => this.id,
        serverURL,
      })
    }
    this.#runtime = new ComposeRuntime(runtimeParams)
  }

  /**
   * Context instance used internally.
   */
  get context(): Context {
    return this.#context
  }

  /**
   * DID instance used internally by the Ceramic client instance.
   */
  get did(): DID | undefined {
    return this.#context.ceramic.did
  }

  /**
   * ID of the DID attached to the Ceramic client instance used internally. If `null`, the
   * Ceramic instance is not authenticated and mutations will fail.
   */
  get id(): string | null {
    return this.#context.viewerID
  }

  /**
   * CACAO resources URLs for the models the client interacts with.
   */
  get resources(): Array<string> {
    return this.#resources
  }

  /**
   * Attach the given DID instance to the Ceramic client instance used internally. An authenticated
   * DID instance is necessary to perform GraphQL mutations.
   */
  setDID(did: DID): void {
    this.#context.ceramic.did = did
  }

  /**
   * Execute a GraphQL query from a DocumentNode and optional variables.
   */
  async execute<Data = Record<string, unknown>>(
    document: DocumentNode,
    variableValues?: Record<string, unknown>
  ): Promise<ExecutionResult<Data>> {
    return await this.#runtime.execute<Data>(document, variableValues)
  }

  /**
   * Execute a GraphQL query from its source and optional variables.
   */
  async executeQuery<Data = Record<string, unknown>>(
    source: string | Source,
    variableValues?: Record<string, unknown>
  ): Promise<ExecutionResult<Data>> {
    return await this.#runtime.executeQuery<Data>(source, variableValues)
  }
}
