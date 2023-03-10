import {
  AnchorCommitCodec,
  type AnchorProof,
  AnchorProofCodec,
  CacaoCodec,
  CeramicCommitCodec,
  type CeramicCommit,
  type CeramicStream,
  type CIDInput,
  type CommitData,
  CommitType,
  type SignedCommit,
  SignedCommitCodec,
  parseCID,
} from '@composedb/ceramic-codecs'
import type { Cacao } from '@didtools/cacao'
import type { IPFS } from 'ipfs-core-types'
import type { GetOptions } from 'ipfs-core-types/dist/src/dag'
import { CID } from 'multiformats/cid'
import QuickLRU from 'quick-lru'
import { type Observable, filter, firstValueFrom, from, map, mergeMap, timeout } from 'rxjs'
import { fromString, toString } from 'uint8arrays'

import type { Logger } from './logger.js'
import {
  MessageType,
  type PubsubMessage,
  type ResponseMessage,
  buildQueryMessage,
} from './pubsub-protocol.js'
import type { PubsubChannel } from './pubsub-channel.js'

const DAG_NODES_CACHE_MAX_SIZE = 1024
const STREAMS_CACHE_MAX_SIZE = 128
const STREAM_TIPS_CACHE_MAX_SIZE = 1024
const NETWORK_QUERY_TIMEOUT = 30_000 // 30 secs

export function base64urlToJSON<T = Record<string, unknown>>(input: string): T {
  return JSON.parse(toString(fromString(input, 'base64url')))
}

export type StreamsHandlerParams = {
  ipfsPromise: Promise<IPFS>
  logger: Logger
  pubsubPromise: Promise<PubsubChannel>
}

export type LoadDagNodeOptions = GetOptions

export class StreamsHandler {
  #dagNodesPromises: QuickLRU<string, Promise<unknown>>
  #ipfsPromise: Promise<IPFS>
  #pubsubPromise: Promise<PubsubChannel>
  #streamsPromises: QuickLRU<string, Promise<CeramicStream>>
  #streamTipsPromises: QuickLRU<string, Promise<string>>

  constructor(params: StreamsHandlerParams) {
    this.#dagNodesPromises = new QuickLRU({ maxSize: DAG_NODES_CACHE_MAX_SIZE })
    this.#ipfsPromise = params.ipfsPromise
    this.#pubsubPromise = params.pubsubPromise
    this.#streamsPromises = new QuickLRU({ maxSize: STREAMS_CACHE_MAX_SIZE })
    this.#streamTipsPromises = new QuickLRU({ maxSize: STREAM_TIPS_CACHE_MAX_SIZE })
  }

  queryNetwork(streamID: string): Observable<string> {
    const queryMessage = buildQueryMessage(streamID)

    return from(this.#pubsubPromise).pipe(
      mergeMap((pubsub) => {
        pubsub.next(queryMessage)
        return pubsub
      }),
      filter<PubsubMessage, ResponseMessage>((message): message is ResponseMessage => {
        return message.typ === MessageType.RESPONSE && message.id === queryMessage.id
      }),
      map((message) => message.tips[streamID]),
      filter((tip) => tip != null)
    )
  }

  loadDagNode(cidInput: CIDInput, options: GetOptions = {}): Promise<unknown> {
    const cid = parseCID(cidInput)
    const cidString = cid.toString()
    const cacheKey = options.path ? cidString + options.path : cidString

    const existing = this.#dagNodesPromises.get(cacheKey)
    if (existing != null) {
      return existing
    }

    const loading = this.#ipfsPromise
      .then((ipfs) => ipfs.dag.get(cid, options))
      .then((res) => res.value)
    this.#dagNodesPromises.set(cacheKey, loading)
    return loading
  }

  async loadCommit(cid: CID): Promise<CeramicCommit> {
    const commit = await this.loadDagNode(cid)
    if (commit == null) {
      throw new Error(`No commit found for CID: ${cid.toString()}`)
    }
    if (CeramicCommitCodec.is(commit)) {
      return commit
    }
    throw new Error(`Invalid commit for CID: ${cid.toString()}`)
  }

  async loadAnchorProof(cid: CID): Promise<AnchorProof | undefined> {
    const proof = await this.loadDagNode(cid)
    if (proof == null) {
      return undefined
    }
    if (AnchorProofCodec.is(proof)) {
      return proof
    }
    throw new Error(`Invalid anchor proof for CID: ${cid.toString()}`)
  }

  async loadCacao(cid: CID): Promise<Cacao | undefined> {
    const cacao = await this.loadDagNode(cid)
    if (cacao == null) {
      return undefined
    }
    if (CacaoCodec.is(cacao)) {
      return cacao
    }
    throw new Error(`Invalid Cacao for CID: ${cid.toString()}`)
  }

  async loadCommitData(cid: CID, timestamp?: number): Promise<CommitData> {
    const commit = await this.loadCommit(cid)

    // The default applies to all cases that do not use DagJWS for signing (e.g. CAIP-10 links)
    const commitData: CommitData = { cid, type: CommitType.SIGNED, commit, timestamp }

    if (SignedCommitCodec.is(commit)) {
      const [linkedCommit, capability] = await Promise.all([
        this.loadCommit(commit.link),
        this.extractCapability(commit),
      ])
      return { ...commitData, capability, commit: linkedCommit, envelope: commit }
    }

    if (AnchorCommitCodec.is(commit)) {
      const proof = await this.loadAnchorProof(commit.proof)
      return { ...commitData, type: CommitType.ANCHOR, proof }
    }

    if ((commitData.commit as any).prev == null) {
      commitData.type = CommitType.GENESIS
    }

    return commitData
  }

  async extractCapability(commit: SignedCommit): Promise<Cacao | undefined> {
    const protectedHeader = commit.signatures[0]?.protected
    if (protectedHeader == null) {
      return
    }

    const decoded = base64urlToJSON<{ cap?: string }>(protectedHeader)
    if (decoded.cap == null) {
      return
    }

    const cid = CID.parse(decoded.cap.replace('ipfs://', ''))
    return await this.loadCacao(cid)
  }

  loadStream(streamID: string, refreshCache = false): Promise<CeramicStream> {
    const existing = this.#streamsPromises.get(streamID)
    if (!refreshCache && existing != null) {
      return existing
    }

    let tipPromise = this.#streamTipsPromises.get(streamID)
    if (refreshCache || tipPromise == null) {
      tipPromise = firstValueFrom(this.queryNetwork(streamID).pipe(timeout(NETWORK_QUERY_TIMEOUT)))
      this.#streamTipsPromises.set(streamID, tipPromise)
    }

    const loading = tipPromise.then((tipString) => {
      const tip = parseCID(tipString)
      return this.loadStreamLog(tip).then((log) => {
        return { log, tip }
      })
    })
    this.#streamsPromises.set(streamID, loading)
    return loading
  }

  async loadStreamLog(tip: CID): Promise<Array<CommitData>> {
    const log: Array<CommitData> = []
    let previousTip = tip
    while (previousTip != null) {
      const commitData = await this.loadCommitData(previousTip)
      log.push(commitData)
      previousTip = (commitData.commit as any).prev
    }
    return log
  }
}
