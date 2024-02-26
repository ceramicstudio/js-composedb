import {
  type BaseQuery,
  type CreateOpts,
  type LoadOpts,
  SyncOptions,
  type UpdateOpts,
} from '@ceramicnetwork/common'
import { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import { StreamID, StreamRef } from '@ceramicnetwork/streamid'
import type { CeramicAPI } from '@composedb/types'
import DataLoader from 'dataloader'
import type { Connection } from 'graphql-relay'

import {
  type GenesisMetadata,
  createDeterministicKey,
  getDeterministicCacheKey,
} from './deterministic.js'
import { type ConnectionQuery, queryConnection, queryOne } from './query.js'
import type { DeterministicKeysCache, DocumentCache, LoadKey } from './types.js'

export const DEFAULT_DETERMINISTIC_OPTIONS: LoadOpts = { sync: SyncOptions.NEVER_SYNC }

export type CreateOptions = CreateOpts & {
  controller?: string
  shouldIndex?: boolean
}

export type DeterministicLoadOptions = CreateOpts & {
  controller?: string
  ignoreEmpty?: boolean
  onlyIndexed?: boolean
}

export type UpdateDocOptions = {
  replace?: boolean
  shouldIndex?: boolean
  version?: string
}

export type UpdateOptions = UpdateOpts & UpdateDocOptions

export type DocumentLoaderParams = {
  /**
   * A Ceramic client instance
   */
  ceramic: CeramicAPI
  /**
   * A supported cache implementation, `true` to use the default implementation or `false` to
   * disable the cache (default)
   */
  cache?: DocumentCache | boolean
  /**
   * Optional cache for deterministic streams keys
   */
  deterministicKeysCache?: DeterministicKeysCache
  /**
   * MultiQuery request timeout in milliseconds
   */
  multiqueryTimeout?: number
}

export function getKeyID(key: LoadKey): string {
  return typeof key.id === 'string' ? StreamRef.from(key.id).toString() : key.id.toString()
}

/** @internal */
export function removeNullValues(content: Record<string, unknown>): Record<string, unknown> {
  const copy = { ...content }
  for (const [key, value] of Object.entries(copy)) {
    if (value == null) {
      delete copy[key]
    } else if (Array.isArray(value)) {
      copy[key] = value.map((item: unknown) => {
        return typeof item === 'object' && !Array.isArray(item) && item != null
          ? removeNullValues(item as Record<string, unknown>)
          : item
      })
    } else if (typeof value === 'object') {
      copy[key] = removeNullValues(value as Record<string, unknown>)
    }
  }
  return copy
}

/**
 * The DocumentLoader class provides APIs to batch load and cache ModelInstanceDocument streams.
 *
 * It is exported by the {@linkcode loader} module.
 *
 * ```sh
 * import { DocumentLoader } from '@composedb/loader'
 * ```
 */
export class DocumentLoader extends DataLoader<LoadKey, ModelInstanceDocument, string> {
  #ceramic: CeramicAPI
  #deterministicKeys: DeterministicKeysCache
  #useCache: boolean

  constructor(params: DocumentLoaderParams) {
    super(
      async (keys: ReadonlyArray<LoadKey>) => {
        if (!params.cache) {
          // Disable cache but keep batching behavior - from https://github.com/graphql/dataloader#disabling-cache
          this.clearAll()
        }
        const results = await params.ceramic.multiQuery(
          keys.map(({ id, ...rest }) => ({ streamId: id, ...rest })),
          params.multiqueryTimeout,
        )
        return keys.map((key) => {
          const id = getKeyID(key)
          const doc = results[id]
          return doc
            ? (doc as unknown as ModelInstanceDocument)
            : new Error(`Failed to load document: ${id}`)
        })
      },
      {
        cache: true, // Cache needs to be enabled for batching
        cacheKeyFn: getKeyID,
        cacheMap:
          params.cache != null && typeof params.cache !== 'boolean' ? params.cache : undefined,
      },
    )

    this.#ceramic = params.ceramic
    this.#deterministicKeys = params.deterministicKeysCache ?? new Map()
    this.#useCache = !!params.cache
  }

  /**
   * Add a ModelInstanceDocument to the local cache, if enabled.
   */
  cache(stream: ModelInstanceDocument): boolean {
    if (!this.#useCache) {
      return false
    }

    const key = { id: stream.id.toString() }
    this.clear(key).prime(key, stream)
    return true
  }

  /**
   * Get or create the LoadKey for a deterministic stream.
   */
  _getDeterministicKey(meta: GenesisMetadata): Promise<LoadKey> {
    const cacheKey = getDeterministicCacheKey(meta)
    const existing = this.#deterministicKeys.get(cacheKey)
    if (existing != null) {
      return existing
    }

    const loadKeyPromise = createDeterministicKey(meta)
    this.#deterministicKeys.set(cacheKey, loadKeyPromise)
    return loadKeyPromise
  }

  /**
   * Create a new ModelInstanceDocument and add it to the cache, if enabled.
   */
  async create<T extends Record<string, unknown> = Record<string, unknown>>(
    model: string | StreamID,
    content: T,
    { controller, shouldIndex, ...options }: CreateOptions = {},
  ): Promise<ModelInstanceDocument<T>> {
    const metadata = {
      controller,
      model: model instanceof StreamID ? model : StreamID.fromString(model),
      shouldIndex,
    }
    const stream = await ModelInstanceDocument.create<T>(
      this.#ceramic,
      removeNullValues(content) as T,
      metadata,
      options,
    )
    this.cache(stream)
    return stream
  }

  /**
   * Load a ModelInstanceDocument from the cache (if enabled) or remotely.
   */
  async load<T extends Record<string, unknown> = Record<string, unknown>>(
    key: LoadKey,
  ): Promise<ModelInstanceDocument<T>> {
    return (await super.load(key)) as ModelInstanceDocument<T>
  }

  /**
   * Load a deterministic stream and add it to the cache.
   */
  async _loadDeterministic<T extends Record<string, unknown> = Record<string, unknown>>(
    meta: GenesisMetadata,
    options: DeterministicLoadOptions = {},
  ): Promise<ModelInstanceDocument<T> | null> {
    const opts = { ...DEFAULT_DETERMINISTIC_OPTIONS, ...options }
    const key = await this._getDeterministicKey(meta)
    const doc = await this.load<T>({ ...key, opts })
    return (options.onlyIndexed === false || doc.metadata.shouldIndex !== false) &&
      (!options.ignoreEmpty || doc.content != null)
      ? doc
      : null
  }

  /**
   * Create or load a deterministic ModelInstanceDocument and cache it.
   */
  async loadSingle<T extends Record<string, unknown> = Record<string, unknown>>(
    controller: string,
    model: string | StreamID,
    options?: DeterministicLoadOptions,
  ): Promise<ModelInstanceDocument<T> | null> {
    return await this._loadDeterministic({ controller, model }, options)
  }

  /**
   * Create or load a deterministic ModelInstanceDocument using the SET account
   * relation and cache it.
   */
  async loadSet<T extends Record<string, unknown> = Record<string, unknown>>(
    controller: string,
    model: string | StreamID,
    unique: Array<string>,
    options?: DeterministicLoadOptions,
  ): Promise<ModelInstanceDocument<T> | null> {
    return await this._loadDeterministic({ controller, model, unique }, options)
  }

  /**
   * Update a ModelInstanceDocument after loading the stream remotely, bypassing the cache.
   */
  async update<T extends Record<string, unknown> = Record<string, unknown>>(
    streamID: string | StreamID,
    content: T,
    { replace, shouldIndex, version, ...options }: UpdateOptions = {},
  ): Promise<ModelInstanceDocument<T>> {
    const key = { id: streamID }
    this.clear(key)
    const stream = await this.load<T>(key)
    if (version != null && stream.commitId.toString() !== version) {
      throw new Error('Stream version mismatch')
    }
    const newContent = replace ? content : { ...(stream.content ?? {}), ...content }
    const metadata = typeof shouldIndex === 'undefined' ? undefined : { shouldIndex }
    await stream.replace(removeNullValues(newContent) as T, metadata, options)
    return stream
  }

  /**
   * Query the index for multiple ModelInstanceDocument streams and cache the results.
   */
  async queryConnection(query: ConnectionQuery): Promise<Connection<ModelInstanceDocument | null>> {
    const connection = await queryConnection(this.#ceramic, query)
    for (const edge of connection.edges) {
      if (edge.node != null) {
        this.cache(edge.node)
      }
    }
    return connection
  }

  /**
   * Query the index for a single ModelInstanceDocument stream and cache it.
   */
  async queryOne(query: BaseQuery): Promise<ModelInstanceDocument | null> {
    const doc = await queryOne(this.#ceramic, query)
    if (doc != null) {
      this.cache(doc)
    }
    return doc
  }
}
