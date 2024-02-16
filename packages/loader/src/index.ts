/**
 * ComposeDB loader module, handling streams loading and caching.
 *
 * ## Installation
 *
 * ```sh
 * npm install @composedb/loader
 * ```
 *
 * @module loader
 */
export type { BaseQuery } from '@ceramicnetwork/common'
export type { Connection } from 'graphql-relay'
export {
  type CreateOptions,
  type DeterministicLoadOptions,
  DocumentLoader,
  type DocumentLoaderParams,
  type UpdateDocOptions,
  type UpdateOptions,
} from './loader.js'
export type { ConnectionQuery } from './query.js'
export type { CacheMap, DeterministicKeysCache, DocID, DocumentCache, LoadKey } from './types.js'
