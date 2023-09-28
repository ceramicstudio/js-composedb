import type { BaseQuery, CeramicApi, CreateOpts } from '@ceramicnetwork/common'
import type { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import type { CommitID, StreamID } from '@ceramicnetwork/streamid'
import type { Connection } from 'graphql-relay'

import { type ConnectionQuery, queryConnection, querySingle } from './query.js'
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
   * Fallback viewer ID to use when the Ceramic instance is not authenticated.
   */
  fallbackViewerID?: string | null
  /**
   * @internal
   */
  loader?: DocumentLoader
}

export type Context = {
  /**
   * Returns whether the Ceramic client instance used internally is authenticated or not. When not
   * authenticated, mutations will fail.
   */
  isAuthenticated: () => boolean
  /**
   * Ceramic client instance used internally.
   */
  ceramic: CeramicApi
  /**
   * Document loader instance used internally.
   */
  loader: DocumentLoader
  /**
   * ID of the current viewer (authenticated DID), if set.
   */
  getViewerID: () => string | null
  /**
   * Load a document by ID, using the cache if possible.
   */
  loadDoc: <Content extends Record<string, any>>(
    id: string | CommitID | StreamID,
    fresh?: boolean,
  ) => Promise<ModelInstanceDocument<Content>>
  /**
   * Create a new document with the given model and content.
   */
  createDoc: <Content extends Record<string, any>>(
    model: string,
    content: Content,
  ) => Promise<ModelInstanceDocument<Content>>
  /**
   * Create a new single document with the given model and content.
   */
  createSingle: <Content extends Record<string, any>>(
    model: string,
    content: Content,
    options?: CreateOpts,
  ) => Promise<ModelInstanceDocument<Content>>
  /**
   * Update an existing document.
   */
  updateDoc: <Content extends Record<string, any>>(
    id: string | StreamID,
    content: Content,
    options?: UpdateDocOptions,
  ) => Promise<ModelInstanceDocument<Content>>
  /**
   * Query the index for a connection of documents.
   */
  queryConnection: (query: ConnectionQuery) => Promise<Connection<ModelInstanceDocument | null>>
  /**
   * Query the index for the total number of documents matching the query parameters.
   */
  queryCount: (query: BaseQuery) => Promise<number>
  /**
   * Query the index for a single document.
   */
  querySingle: (query: BaseQuery) => Promise<ModelInstanceDocument | null>
}

export function createContext(params: ContextParams): Context {
  const { cache, ceramic, fallbackViewerID } = params
  const loader = params.loader ?? new DocumentLoader({ ceramic, cache })

  function getViewerID(): string | null {
    const did = ceramic.did
    return did ? (did.hasParent ? did.parent : did.id) : fallbackViewerID ?? null
  }

  return {
    ceramic,
    loader,
    getViewerID,
    isAuthenticated: (): boolean => ceramic.did?.authenticated ?? false,
    loadDoc: async <Content extends Record<string, any> = Record<string, any>>(
      id: string | CommitID | StreamID,
      fresh = false,
    ): Promise<ModelInstanceDocument<Content>> => {
      if (fresh) {
        loader.clear(id)
      }
      return await loader.load<Content>(id)
    },
    createDoc: async <Content extends Record<string, any> = Record<string, any>>(
      model: string,
      content: Content,
    ): Promise<ModelInstanceDocument<Content>> => {
      return await loader.create(model, content)
    },
    createSingle: async <Content extends Record<string, any> = Record<string, any>>(
      model: string,
      content: Content,
      options?: CreateOpts,
    ): Promise<ModelInstanceDocument<Content>> => {
      const controller = getViewerID()
      if (controller == null) {
        throw new Error('Document can only be created with an authenticated account')
      }
      const doc = await loader.single<Content>(controller, model, options)
      await doc.replace(content)
      return doc
    },
    updateDoc: async <Content extends Record<string, any> = Record<string, any>>(
      id: string | StreamID,
      content: Content,
      options?: UpdateDocOptions,
    ): Promise<ModelInstanceDocument<Content>> => {
      return await loader.update(id, content, options)
    },
    queryConnection: async (
      query: ConnectionQuery,
    ): Promise<Connection<ModelInstanceDocument | null>> => {
      return await queryConnection(ceramic, query)
    },
    queryCount: async (query: BaseQuery): Promise<number> => {
      return await ceramic.index.count(query)
    },
    querySingle: async (query: BaseQuery): Promise<ModelInstanceDocument | null> => {
      return await querySingle(ceramic, query)
    },
  }
}
