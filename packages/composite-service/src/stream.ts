import {
  type CommitData,
  type CommitType,
  GenesisCommitDataCodec,
  type LogEntry,
  StreamLogCodec,
  createDecoder,
} from '@composedb/ceramic-codecs'
import type { Cacao } from '@didtools/cacao'
import { getEIP191Verifier } from '@didtools/pkh-ethereum'
import { getSolanaVerifier } from '@didtools/pkh-solana'
import { getTezosVerifier } from '@didtools/pkh-tezos'
import { DID } from 'dids'
import { getResolver } from 'key-did-resolver'

const DEFAULT_CACAO_REVOCATION_PHASE_OUT = 24 * 60 * 60

const verifierDID = new DID({ resolver: getResolver() })

// Register supported CACAO Verifiers
const verifiersCACAO = {
  ...getEIP191Verifier(),
  ...getSolanaVerifier(),
  ...getTezosVerifier(),
}

export function verifyCapability(
  commitData: CommitData,
  streamID: string,
  model: string | null
): Cacao | null {
  const { capability, envelope } = commitData
  const resources = capability?.p.resources
  const payloadCID = envelope?.link?.toString()
  if (resources == null || payloadCID == null) {
    return null
  }

  if (
    !resources.includes(`ceramic://*`) &&
    !resources.includes(`ceramic://${streamID}`) &&
    !resources.includes(`ceramic://${streamID}?payload=${payloadCID}`) &&
    !(model && resources.includes(`ceramic://*?model=${model}`))
  ) {
    throw new Error(`Capability does not have appropriate permissions to update this Stream`)
  }

  return capability as Cacao
}

export type VerifyCommitSignatureParams = {
  commitData: CommitData
  controller: string
  model: string | null
  streamID: string
}

export async function verifyCommitSignature(params: VerifyCommitSignatureParams): Promise<void> {
  const { commitData, controller, model, streamID } = params

  try {
    if (commitData.envelope == null) {
      throw new Error('Missing envelope in commit data')
    }

    const atTime = commitData.timestamp ? new Date(commitData.timestamp * 1000) : undefined
    const capability = verifyCapability(commitData, streamID, model) ?? undefined

    await verifierDID.verifyJWS(commitData.envelope, {
      atTime,
      issuer: controller,
      disableTimecheck: commitData.disableTimecheck,
      capability,
      revocationPhaseOutSecs: DEFAULT_CACAO_REVOCATION_PHASE_OUT,
      verifiers: verifiersCACAO,
    })
  } catch (e) {
    const original = (e as Error).message ? (e as Error).message : String(e)
    throw new Error(`Can not verify signature for commit ${commitData.cid.toString()}: ${original}`)
  }
}

export function commitDataToLogEntry(commitData: CommitData, commitType: CommitType): LogEntry {
  const logEntry: LogEntry = {
    cid: commitData.cid,
    type: commitType,
  }
  if (commitData?.capability?.p?.exp) {
    logEntry.expirationTime = Math.floor(Date.parse(commitData.capability.p.exp) / 1000)
  }
  if (commitData.timestamp) {
    logEntry.timestamp = commitData.timestamp
  }
  return logEntry
}

export const decodeStream = createDecoder(StreamLogCodec)

export const decodeGenesisCommitData = createDecoder(GenesisCommitDataCodec)
