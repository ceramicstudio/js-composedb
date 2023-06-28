import { StreamID } from '@ceramicnetwork/streamid'
import { META_MODEL_BYTES, type ContentDefinition } from '@composedb/model-codecs'
import { randomBytes } from '@stablelib/random'
import type { DagJWSResult, DID } from 'dids'

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

export async function createGenesisCommit(
  did: DID,
  model: string | Uint8Array,
  data: Record<string, unknown>,
  deterministic = false
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

export async function createModel(did: DID, content: ContentDefinition): Promise<DagJWSResult> {
  // TODO: validation for DID, ensure did:key or did:pkh with no expiration time
  return await createGenesisCommit(did, META_MODEL_BYTES, content, true)
}
