import type { GenesisCommit, GenesisHeader } from '@ceramicnetwork/common'
import { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import { StreamID } from '@ceramicnetwork/streamid'

import type { LoadKey } from './types.js'

export type GenesisMetadata = {
  controller: string
  model: StreamID | string
  unique?: Array<string>
}

/**
 * Create a deterministic genesis commit matching the logic unsed internally by ModelInstanceDocument.
 */
export function createDeterministicGenesis(meta: GenesisMetadata): GenesisCommit {
  const model = meta.model instanceof StreamID ? meta.model : StreamID.fromString(meta.model)
  const header: GenesisHeader = { controllers: [meta.controller], model: model.bytes, sep: 'model' }
  if (Array.isArray(meta.unique)) {
    header.unique = new TextEncoder().encode(meta.unique.join('|'))
  }
  return { header, data: null }
}

/**
 * Create a LoadKey for a deterministic stream.
 */
export async function createDeterministicKey(meta: GenesisMetadata): Promise<LoadKey> {
  const genesis = createDeterministicGenesis(meta)
  const id = await StreamID.fromGenesis(ModelInstanceDocument.STREAM_TYPE_ID, genesis)
  return { id, genesis }
}

/**
 * Get the cache key for a deterministic stream.
 */
export function getDeterministicCacheKey(meta: GenesisMetadata): string {
  const model = typeof meta.model === 'string' ? meta.model : meta.model.toString()
  return [meta.controller, model].concat(meta.unique ?? []).join('|')
}
