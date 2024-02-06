import type { GenesisCommit, LoadOpts } from '@ceramicnetwork/common'
import type { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import type { CommitID, StreamID } from '@ceramicnetwork/streamid'

export type DocID = CommitID | StreamID | string

export type LoadKey = {
  /**
   * Document ID
   */
  id: DocID
  /**
   * Optional genesis commit for deterministic streams
   */
  genesis?: GenesisCommit
  /**
   * Stream load options
   */
  opts?: LoadOpts
}

// Implements CacheMap from dataloader, copied here to generate docs
export type CacheMap<Value, Key = string> = {
  /**
   * Get a Promise of a Value by its Key
   */
  get(key: Key): Promise<Value> | void
  /**
   * Set a Promise of a Value by its Key
   */
  set(key: Key, value: Promise<Value>): any
  /**
   * Remove a specific entry from the cache
   */
  delete(key: Key): any
  /**
   * Remove all entries from the cache
   */
  clear(): any
}

export type DocumentCache = CacheMap<ModelInstanceDocument>

export type DeterministicKeysCache = CacheMap<LoadKey>
