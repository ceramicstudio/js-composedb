import {
  type CreateOpts,
  type LoadOpts,
  SyncOptions,
  type UpdateOpts,
} from '@ceramicnetwork/common'
import { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import { StreamID, StreamRef } from '@ceramicnetwork/streamid'
import type { CeramicAPI } from '@composedb/types'
import DataLoader, { type BatchLoadFn } from 'dataloader'

import {
  type GenesisMetadata,
  createDeterministicKey,
  getDeterministicCacheKey,
} from './deterministic.js'
import type { DeterministicKeysCache, DocumentCache, LoadKey } from './types.js'

export const DEFAULT_DETERMINISTIC_OPTIONS: LoadOpts = { sync: SyncOptions.NEVER_SYNC }

export type CreateOptions = CreateOpts & {
  controller?: string
}

export type UpdateDocOptions = {
  replace?: boolean
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

const tempBatchLoadFn: BatchLoadFn<LoadKey, ModelInstanceDocument> = () => Promise.resolve([])

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
    super(tempBatchLoadFn, {
      cache: true, // Cache needs to be enabled for batching
      cacheKeyFn: getKeyID,
      cacheMap:
        params.cache != null && typeof params.cache !== 'boolean' ? params.cache : undefined,
    })

    this.#deterministicKeys = params.deterministicKeysCache ?? new Map()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore internal method
    this._batchLoadFn = async (keys: ReadonlyArray<LoadKey>) => {
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
    }

    this.#ceramic = params.ceramic
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
  async create<T extends Record<string, any> = Record<string, any>>(
    model: string | StreamID,
    content: T,
    { controller, ...options }: CreateOptions = {},
  ): Promise<ModelInstanceDocument<T>> {
    const metadata = {
      controller,
      model: model instanceof StreamID ? model : StreamID.fromString(model),
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
  async load<T extends Record<string, any> = Record<string, any>>(
    key: LoadKey,
  ): Promise<ModelInstanceDocument<T>> {
    return (await super.load(key)) as ModelInstanceDocument<T>
  }

  /**
   * Load a deterministic stream and add it to the cache.
   */
  async _loadDeterministic<T extends Record<string, any> = Record<string, any>>(
    meta: GenesisMetadata,
    options: CreateOpts = {},
  ): Promise<ModelInstanceDocument<T>> {
    const opts = { ...DEFAULT_DETERMINISTIC_OPTIONS, ...options }
    const key = await this._getDeterministicKey(meta)
    const stream = await this.load<T>({ ...key, opts })
    this.cache(stream)
    return stream
  }

  /**
   * Create or load a deterministic ModelInstanceDocument and cache it.
   */
  async loadSingle<T extends Record<string, any> = Record<string, any>>(
    controller: string,
    model: string | StreamID,
    options?: CreateOpts,
  ): Promise<ModelInstanceDocument<T>> {
    return await this._loadDeterministic({ controller, model }, options)
  }

  /**
   * Create or load a deterministic ModelInstanceDocument using the SET account
   * relation and cache it.
   */
  async loadSet<T extends Record<string, any> = Record<string, any>>(
    controller: string,
    model: string | StreamID,
    unique: Array<string>,
    options?: CreateOpts,
  ): Promise<ModelInstanceDocument<T>> {
    return await this._loadDeterministic({ controller, model, unique }, options)
  }

  /**
   * Update a ModelInstanceDocument after loading the stream remotely, bypassing the cache.
   */
  async update<T extends Record<string, any> = Record<string, any>>(
    streamID: string | StreamID,
    content: T,
    { replace, version, ...options }: UpdateOptions = {},
  ): Promise<ModelInstanceDocument<T>> {
    const key = { id: streamID }
    this.clear(key)
    const stream = await this.load<T>(key)
    if (version != null && stream.commitId.toString() !== version) {
      throw new Error('Stream version mismatch')
    }
    const newContent = replace ? content : { ...(stream.content ?? {}), ...content }
    await stream.replace(removeNullValues(newContent) as T, undefined, options)
    return stream
  }
}
