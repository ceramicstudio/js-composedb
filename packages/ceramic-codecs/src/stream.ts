import * as io from 'io-ts'

import { bytesCodec } from './binary.js'
import { CacaoCodec, DagJWSResultCodec } from './did.js'
import { DagJWSCodec, cidCodec } from './ipld.js'

export const CommitHeaderCodec = io.partial(
  {
    controllers: io.array(io.string),
    model: bytesCodec,
  },
  'CommitHeader'
)
export type CommitHeader = io.TypeOf<typeof CommitHeaderCodec>

export const GenesisHeaderCodec = io.intersection(
  [
    CommitHeaderCodec,
    io.partial({
      // Model and ModelInstanceDocument use Uint8Array, older stream types use string
      unique: io.union([bytesCodec, io.string]),
    }),
  ],
  'GenesisHeader'
)
export type GenesisHeader = io.TypeOf<typeof GenesisHeaderCodec>

export const GenesisCommitCodec = io.intersection(
  [
    io.strict({
      header: GenesisHeaderCodec,
    }),
    io.partial({
      data: io.unknown,
      prev: io.void, // Important to allow differentiation from other commit types
    }),
  ],
  'GenesisCommit'
)
export type GenesisCommit = io.TypeOf<typeof GenesisCommitCodec>

export const RawCommitCodec = io.intersection(
  [
    io.strict({
      id: cidCodec,
      data: io.unknown,
      prev: cidCodec,
    }),
    io.partial({
      header: CommitHeaderCodec,
    }),
  ],
  'RawCommit'
)
export type RawCommit = io.TypeOf<typeof RawCommitCodec>

export const AnchorProofCodec = io.intersection(
  [
    io.strict({
      chainId: io.string,
      txHash: cidCodec,
      root: cidCodec,
    }),
    io.partial({
      txType: io.string,
    }),
  ],
  'AnchorProof'
)
export type AnchorProof = io.TypeOf<typeof AnchorProofCodec>

export const AnchorCommitCodec = io.strict(
  {
    id: cidCodec,
    prev: cidCodec,
    proof: cidCodec,
    path: io.string,
  },
  'AnchorCommit'
)
export type AnchorCommit = io.TypeOf<typeof AnchorCommitCodec>

export const SignedCommitCodec = io.intersection(
  [DagJWSCodec, io.strict({ link: cidCodec })],
  'SignedCommit'
)
export type SignedCommit = io.TypeOf<typeof SignedCommitCodec>

export const SignedCommitContainerCodec = DagJWSResultCodec

export type SignedCommitContainer = io.TypeOf<typeof DagJWSResultCodec>

export const CeramicCommitCodec = io.union(
  [
    // Ideally should be ordered by most frequently used for codec matches
    RawCommitCodec,
    SignedCommitCodec,
    SignedCommitContainerCodec,
    AnchorCommitCodec,
    GenesisCommitCodec,
  ],
  'CeramicCommit'
)
export type CeramicCommit = io.TypeOf<typeof CeramicCommitCodec>
export type AnyCeramicCommitCodec =
  | typeof CeramicCommitCodec
  | typeof AnchorCommitCodec
  | typeof GenesisCommitCodec
  | typeof RawCommitCodec
  | typeof SignedCommitCodec
  | typeof SignedCommitContainerCodec

export enum CommitType {
  GENESIS = 0,
  SIGNED = 1,
  ANCHOR = 2,
}
export const GenesisCommitTypeCodec = io.literal(CommitType.GENESIS, 'CommitType.Genesis')
export const SignedCommitTypeCodec = io.literal(CommitType.SIGNED, 'CommitType.Signed')
export const AnchorCommitTypeCodec = io.literal(CommitType.ANCHOR, 'CommitType.Anchor')

export const CommitTypeCodec = io.union(
  [GenesisCommitTypeCodec, SignedCommitTypeCodec, AnchorCommitTypeCodec],
  'CommitType'
)
export type CommitTypeCodec = io.LiteralC<CommitType> | typeof CommitTypeCodec

export const LogEntryCommonCodec = io.intersection([
  io.strict({ cid: cidCodec }),
  io.partial({ timestamp: io.number, expirationTime: io.number }),
])

export function createLogEntryType(type: CommitTypeCodec, name?: string) {
  return io.intersection([LogEntryCommonCodec, io.type({ type })], name)
}

export const LogEntryCodec = createLogEntryType(CommitTypeCodec, 'LogEntry')
export type LogEntry = io.TypeOf<typeof LogEntryCodec>

export const CommitDataCommonCodec = io.partial({
  envelope: DagJWSCodec,
  proof: AnchorProofCodec,
  capability: CacaoCodec,
  disableTimecheck: io.boolean,
})

export function createCommitDataCodec<CommitCodec extends AnyCeramicCommitCodec>(
  type: CommitTypeCodec,
  commit: CommitCodec,
  name?: string
) {
  return io.intersection(
    [LogEntryCommonCodec, CommitDataCommonCodec, io.strict({ type, commit })],
    name
  )
}

export const CommitDataCodec = createCommitDataCodec(
  CommitTypeCodec,
  CeramicCommitCodec,
  'CommitData'
)
export type CommitData = io.TypeOf<typeof CommitDataCodec>

export const GenesisCommitDataCodec = createCommitDataCodec(
  CommitTypeCodec,
  GenesisCommitCodec,
  'GenesisCommitData'
)
export type GenesisCommitData = io.TypeOf<typeof GenesisCommitDataCodec>

export const CeramicStreamCodec = io.strict(
  {
    log: io.array(CommitDataCodec),
    tip: cidCodec,
  },
  'CeramicStream'
)
export type CeramicStream = io.TypeOf<typeof CeramicStreamCodec>
