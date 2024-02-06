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
export {
  type CreateOptions,
  DocumentLoader,
  type DocumentLoaderParams,
  type UpdateDocOptions,
  type UpdateOptions,
} from './loader.js'
export type { CacheMap, DeterministicKeysCache, DocID, DocumentCache, LoadKey } from './types.js'
