import {
  AnchorCommitCodec,
  type AnchorProof,
  AnchorProofCodec,
  CacaoCodec,
  type CIDInput,
  type Commit,
  CommitCodec,
  type CommitData,
  CommitType,
  type SignedCommit,
  SignedCommitCodec,
  type SignedCommitContainer,
  SignedCommitContainerCodec,
  type StreamLog,
  parseCID,
} from '@composedb/ceramic-codecs'
import type { Logger } from '@composedb/services-rpc'
import type { Cacao } from '@didtools/cacao'
import type { IPFS } from 'ipfs-core-types'
import type { GetOptions } from 'ipfs-core-types/dist/src/dag'
import { CID } from 'multiformats/cid'
import QuickLRU from 'quick-lru'
import { type Observable, filter, firstValueFrom, from, map, mergeMap, timeout } from 'rxjs'
import { fromString, toString } from 'uint8arrays'

import {
  MessageType,
  type PubsubMessage,
  type ResponseMessage,
  buildQueryMessage,
} from './pubsub-protocol.js'
import type { PubsubChannel } from './pubsub-channel.js'

const MAX_COMMIT_SIZE = 256_000 // 256 KB
const DAG_NODES_CACHE_MAX_SIZE = 1024
const STREAMS_CACHE_MAX_SIZE = 128
const STREAM_TIPS_CACHE_MAX_SIZE = 1024
const NETWORK_QUERY_TIMEOUT = 30_000 // 30 secs

export function base64urlToJSON<T = Record<string, unknown>>(input: string): T {
  return JSON.parse(toString(fromString(input, 'base64url'))) as T
}

export function toCID(input: CID | string): CID {
  return typeof input === 'string' ? CID.parse(input.replace('ipfs://', '')) : input
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
  #logger: Logger
  #pubsubPromise: Promise<PubsubChannel>
  #streamsPromises: QuickLRU<string, Promise<StreamLog>>
  #streamTipsPromises: QuickLRU<string, Promise<string>>

  constructor(params: StreamsHandlerParams) {
    this.#dagNodesPromises = new QuickLRU({ maxSize: DAG_NODES_CACHE_MAX_SIZE })
    this.#ipfsPromise = params.ipfsPromise
    this.#logger = params.logger
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
      .then((res) => res.value as unknown)
    this.#dagNodesPromises.set(cacheKey, loading)
    return loading
  }

  async loadCommit(cid: CID): Promise<Commit> {
    const commit = await this.loadDagNode(cid)
    if (commit == null) {
      throw new Error(`No commit found for CID: ${cid.toString()}`)
    }
    if (CommitCodec.is(commit)) {
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
        this._extractCapability(commit),
      ])
      return { ...commitData, capability, commit: linkedCommit, envelope: commit }
    }

    if (AnchorCommitCodec.is(commit)) {
      const proof = await this.loadAnchorProof(commit.proof)
      return { ...commitData, type: CommitType.ANCHOR, proof }
    }

    if ((commitData.commit as { prev?: CID }).prev == null) {
      commitData.type = CommitType.GENESIS
    }

    return commitData
  }

  async _extractCapability(commit: SignedCommit): Promise<Cacao | undefined> {
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

  loadStream(streamID: string, refreshCache = false): Promise<StreamLog> {
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
      previousTip = (commitData.commit as { prev: CID }).prev
    }
    return log
  }

  async storeCommit(commit: unknown, streamID?: string): Promise<CID> {
    try {
      if (SignedCommitContainerCodec.is(commit)) {
        return await this._storeSignedCommitContainer(commit)
      }

      const cid = await this.#ipfsPromise.then((ipfs) => ipfs.dag.put(commit))
      await this._restrictCommitSize(cid)
      return cid
    } catch (err) {
      this.#logger.error('Error while storing commit to IPFS', {
        streamID,
        message: (err as Error).message,
      })
      throw err
    }
  }

  async _storeSignedCommitContainer(commit: SignedCommitContainer): Promise<CID> {
    const { jws, linkedBlock, cacaoBlock } = commit
    const link = jws.link as CID

    // if cacao is present, put it into ipfs dag
    const cacaoStored = cacaoBlock
      ? this._putBlock(base64urlToJSON(jws.signatures[0].protected).cap as string, cacaoBlock)
      : undefined

    // put the JWS into the ipfs dag
    const jwsStored = this.#ipfsPromise
      .then((ipfs) => ipfs.dag.put(jws, { hashAlg: 'sha2-256', storeCodec: 'dag-jose' }))
      .then((cid) => this._restrictCommitSize(cid).then(() => cid))

    // put the payload into the ipfs dag
    const payloadStored = this._putBlock(link, linkedBlock).then(() => {
      return this._restrictCommitSize(link)
    })

    const [cid] = await Promise.all([jwsStored, cacaoStored, payloadStored])
    return cid
  }

  async _putBlock(cidInput: CID | string, block: Uint8Array, signal?: AbortSignal): Promise<CID> {
    const cid = toCID(cidInput)
    const ipfs = await this.#ipfsPromise
    const [format, mhtype] = await Promise.all([
      ipfs.codecs.getCodec(cid.code).then((f) => f.name),
      ipfs.hashers.getHasher(cid.multihash.code).then((mh) => mh.name),
    ])
    return await ipfs.block.put(block, { format, mhtype, version: cid.version, signal })
  }

  async _restrictCommitSize(cidInput: CID | string, signal?: AbortSignal): Promise<void> {
    const cid = toCID(cidInput)
    const ipfs = await this.#ipfsPromise
    const stat = await ipfs.block.stat(cid, { signal, timeout: NETWORK_QUERY_TIMEOUT })
    if (stat.size > MAX_COMMIT_SIZE) {
      throw new Error(
        `${cid.toString()} commit size ${
          stat.size
        } exceeds the maximum block size of ${MAX_COMMIT_SIZE}`
      )
    }
  }
}
