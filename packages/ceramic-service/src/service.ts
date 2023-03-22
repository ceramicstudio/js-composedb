import type { CeramicCommit, CeramicStream } from '@composedb/ceramic-codecs'
import type { Logger, ServiceLifecycle } from '@composedb/services-rpc'
import type { IPFSOptions } from 'ipfsd-ctl'
import type { IPFS } from 'ipfs-core-types'

import { createIPFS } from './ipfs.js'
import { PubsubChannel } from './pubsub-channel.js'
import { StreamsHandler } from './streams-handler.js'

export type ServiceConfig = Readonly<{
  ipfs?: IPFSOptions
  pubsubTopic: string
}>

export type ServiceParams = {
  config: ServiceConfig
  logger: Logger
}

export class Service implements ServiceLifecycle {
  #config: ServiceConfig
  #ipfsPromise: Promise<IPFS>
  #logger: Logger
  #pubsubPromise: Promise<PubsubChannel>
  #streamsHandler: StreamsHandler

  constructor(params: ServiceParams) {
    const ipfsPromise = createIPFS(params.config.ipfs)
    const logger = params.logger
    const pubsubPromise = ipfsPromise.then((ipfs) => {
      return new PubsubChannel({
        ipfs,
        logger: logger.getSubLogger({ name: 'pubsub' }),
        topic: params.config.pubsubTopic,
      })
    })

    this.#config = params.config
    this.#ipfsPromise = ipfsPromise
    this.#logger = logger
    this.#pubsubPromise = pubsubPromise
    this.#streamsHandler = new StreamsHandler({
      ipfsPromise,
      logger: logger.getSubLogger({ name: 'streams' }),
      pubsubPromise,
    })
  }

  async stop() {
    // TODO: stop IPFS?
  }

  get config(): ServiceConfig {
    return this.#config
  }

  get logger(): Logger {
    return this.#logger
  }

  get streams(): StreamsHandler {
    return this.#streamsHandler
  }

  getIPFS(): Promise<IPFS> {
    return this.#ipfsPromise
  }

  getPubsub(): Promise<PubsubChannel> {
    return this.#pubsubPromise
  }

  async createStream(commit: CeramicCommit): Promise<CeramicStream> {
    const tip = await this.#streamsHandler.storeCommit(commit)
    const commitData = await this.#streamsHandler.loadCommitData(tip)
    return { tip, log: [commitData] }
  }
}
