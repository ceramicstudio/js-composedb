import { StreamID } from '@ceramicnetwork/streamid'
import type { ModelDefinition } from '@composedb/types'
import { randomBytes } from '@stablelib/random'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { type DagJWSResult, DID } from 'dids'

/**
 * Meta model (constant model ID used in models metadata) codec
 */
export const META_MODEL_ID = 'kh4q0ozorrgaq2mezktnrmdwleo1d' as const
export const META_MODEL_BYTES = new Uint8Array([
  206, 1, 4, 1, 113, 113, 11, 0, 9, 104, 109, 111, 100, 101, 108, 45, 118, 49,
])

export type CommitHeader = {
  controllers: [string]
  model: Uint8Array
  sep: string
  unique?: Uint8Array
}

export type Commit<Data extends Record<string, unknown> = Record<string, unknown>> = {
  data: Data
  header: CommitHeader
}

export function createKeyDID(seed?: Uint8Array): DID {
  return new DID({
    provider: new Ed25519Provider(seed ?? randomBytes(32)),
    resolver: getResolver(),
  })
}

export async function createGenesisCommit(
  did: DID,
  model: string | Uint8Array,
  data: Record<string, unknown>,
  deterministic = false,
): Promise<DagJWSResult> {
  if (!did.authenticated) {
    await did.authenticate()
  }

  const payload: Commit = {
    data,
    header: {
      controllers: [did.hasParent ? did.parent : did.id],
      model: typeof model === 'string' ? StreamID.fromString(model).bytes : model,
      sep: 'model',
    },
  }
  if (!deterministic) {
    payload.header.unique = randomBytes(12)
  }

  return await did.createDagJWS(payload)
}

export async function createModelCommit(did: DID, content: ModelDefinition): Promise<DagJWSResult> {
  // TODO: validation for DID, ensure did:key or did:pkh with no expiration time
  return await createGenesisCommit(did, META_MODEL_BYTES, content, true)
}
