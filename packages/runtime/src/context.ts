import type { BaseQuery, CreateOpts, UpdateOpts } from '@ceramicnetwork/common'
import type { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import type { CommitID, StreamID } from '@ceramicnetwork/streamid'
import { type DocumentCache, DocumentLoader } from '@composedb/loader'
import type { CeramicAPI } from '@composedb/types'

export type UpsertOptions = CreateOpts & {
  shouldIndex?: boolean
}

export type ContextParams = {
  /**
   * Optional cache for documents.
   */
  cache?: DocumentCache | boolean
  /**
   * Ceramic client instance.
   */
  ceramic: CeramicAPI
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
  ceramic: CeramicAPI
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
  ) => Promise<ModelInstanceDocument<Content> | null>
  /**
   * Create or update a document using the SINGLE account relation with the
   * given model and content.
   */
  upsertSingle: <Content extends Record<string, any>>(
    model: string,
    content: Content,
    options?: UpsertOptions,
  ) => Promise<ModelInstanceDocument<Content> | null>
  /**
   * Create or update a document using the SET account relation with the given
   * model, content and unique fields value.
   */
  upsertSet: <Content extends Record<string, any>>(
    model: string,
    unique: Array<string>,
    content: Content,
    options?: UpsertOptions,
  ) => Promise<ModelInstanceDocument<Content> | null>
  /**
   * Enable indexing for an existing document.
   */
  enableDocIndexing: (id: string, shouldIndex: boolean, opts?: UpdateOpts) => Promise<void>
  /**
   * Query the index for the total number of documents matching the query parameters.
   */
  queryCount: (query: BaseQuery) => Promise<number>
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
    ): Promise<ModelInstanceDocument<Content> | null> => {
      const key = { id }
      if (fresh) {
        loader.clear(key)
      }
      return await loader.load<Content>(key)
    },
    upsertSingle: async <Content extends Record<string, any> = Record<string, any>>(
      model: string,
      content: Content,
      options: UpsertOptions = {},
    ): Promise<ModelInstanceDocument<Content> | null> => {
      const controller = getViewerID()
      if (controller == null) {
        throw new Error('Document can only be created with an authenticated account')
      }
      const { shouldIndex, ...opts } = options
      const doc = await loader.loadSingle<Content>(controller, model, {
        ...opts,
        onlyIndexed: false,
      })
      await doc!.replace(content, { shouldIndex: shouldIndex !== false })
      return doc
    },
    upsertSet: async <Content extends Record<string, any> = Record<string, any>>(
      model: string,
      unique: Array<string>,
      content: Content,
      options: UpsertOptions = {},
    ): Promise<ModelInstanceDocument<Content> | null> => {
      const controller = getViewerID()
      if (controller == null) {
        throw new Error('Document can only be created with an authenticated account')
      }
      const { shouldIndex, ...opts } = options
      const doc = await loader.loadSet<Content>(controller, model, unique, {
        ...opts,
        onlyIndexed: false,
      })
      await doc!.replace(content, { shouldIndex: shouldIndex !== false })
      return doc
    },
    enableDocIndexing: async <Content extends Record<string, any> = Record<string, any>>(
      id: string,
      shouldIndex: boolean,
      opts?: UpdateOpts,
    ): Promise<void> => {
      const controller = getViewerID()
      if (controller == null) {
        throw new Error('Document can only be hidden with an authenticated account')
      }

      const doc = await loader.load<Content>({ id })
      await doc.shouldIndex(shouldIndex, opts)
    },
    queryCount: async (query: BaseQuery): Promise<number> => {
      return await ceramic.index.count(query)
    },
  }
}
