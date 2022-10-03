import type { BaseQuery, CeramicApi } from '@ceramicnetwork/common'
import type { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import type { CommitID, StreamID } from '@ceramicnetwork/streamid'
import type { Connection } from 'graphql-relay'

import { type ConnectionQuery, queryConnection, querySingle, toBaseQuery } from './query.js'
import { type DocumentCache, DocumentLoader, type UpdateDocOptions } from './loader.js'

export type ContextParams = {
  /**
   * Optional cache for documents.
   */
  cache?: DocumentCache | boolean
  /**
   * Ceramic client instance.
   */
  ceramic: CeramicApi
  /**
   * @internal
   */
  loader?: DocumentLoader
}

/**
 * GraphQL execution context, exported by the {@linkcode client} module.
 *
 * ```sh
 * import { Context } from '@composedb/client'
 * ```
 */
export class Context {
  #ceramic: CeramicApi
  #loader: DocumentLoader

  constructor(params: ContextParams) {
    const { cache, ceramic } = params
    this.#ceramic = ceramic
    this.#loader = params.loader ?? new DocumentLoader({ ceramic, cache })
  }

  /**
   * Returns whether the Ceramic client instance used internally is authenticated or not. When not
   * authenticated, mutations will fail.
   */
  get authenticated(): boolean {
    return this.#ceramic.did?.authenticated ?? false
  }

  /**
   * Ceramic client instance used internally.
   */
  get ceramic(): CeramicApi {
    return this.#ceramic
  }

  /**
   * Document loader instance used internally.
   */
  get loader(): DocumentLoader {
    return this.#loader
  }

  /**
   * ID of the current viewer (authenticated DID), if set.
   */
  get viewerID(): string | null {
    const did = this.#ceramic.did
    return did?.hasParent ? did.parent : did?.id ?? null
  }

  /**
   * Load a document by ID, using the cache if possible.
   */
  async loadDoc<Content extends Record<string, any> = Record<string, any>>(
    id: string | CommitID | StreamID,
    fresh = false
  ): Promise<ModelInstanceDocument<Content>> {
    if (fresh) {
      this.#loader.clear(id)
    }
    return await this.#loader.load<Content>(id)
  }

  /**
   * Create a new document with the given model and content.
   */
  async createDoc<Content extends Record<string, any> = Record<string, any>>(
    model: string,
    content: Content
  ): Promise<ModelInstanceDocument<Content>> {
    return await this.#loader.create(model, content)
  }

  /**
   * Create a new single document with the given model and content.
   */
  async createSingle<Content extends Record<string, any> = Record<string, any>>(
    model: string,
    content: Content
  ): Promise<ModelInstanceDocument<Content>> {
    const controller = this.viewerID
    if (controller == null) {
      throw new Error('Document can only be created with an authenticated account')
    }
    const doc = await this.#loader.single<Content>(controller, model)
    await doc.replace(content)
    return doc
  }

  /**
   * Update an existing document.
   */
  async updateDoc<Content extends Record<string, any> = Record<string, any>>(
    id: string | StreamID,
    content: Content,
    options?: UpdateDocOptions
  ): Promise<ModelInstanceDocument<Content>> {
    return await this.#loader.update(id, content, options)
  }

  /**
   * Query the index for a connection of documents.
   */
  async queryConnection(query: ConnectionQuery): Promise<Connection<ModelInstanceDocument | null>> {
    return await queryConnection(this.#ceramic, query)
  }

  /**
   * Query the index for the total number of documents matching the query parameters.
   */
  async queryCount(query: BaseQuery): Promise<number> {
    return await this.#ceramic.index.count(toBaseQuery(query))
  }

  /**
   * Query the index for a single document.
   */
  async querySingle(query: BaseQuery): Promise<ModelInstanceDocument | null> {
    return await querySingle(this.#ceramic, query)
  }
}
