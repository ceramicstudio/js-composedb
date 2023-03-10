import type { IPFSOptions } from 'ipfsd-ctl'
import type { IPFS } from 'ipfs-core-types'

import { createIPFS } from './ipfs.js'
import { type Logger, createLogger } from './logger.js'
import { PubsubChannel } from './pubsub-channel.js'
import { StreamsHandler } from './streams-handler.js'

export type ServiceConfig = Readonly<{
  ipfs?: IPFSOptions
  pubsubTopic: string
}>

export type ServiceParams = {
  config: ServiceConfig
}

export class Service {
  #config: ServiceConfig
  #ipfsPromise: Promise<IPFS>
  #logger: Logger
  #pubsubPromise: Promise<PubsubChannel>
  #streamsHandler: StreamsHandler

  constructor(params: ServiceParams) {
    const ipfsPromise = createIPFS(params.config.ipfs)
    const logger = createLogger()
    const pubsubPromise = ipfsPromise.then(
      (ipfs) => new PubsubChannel({ ipfs, logger, topic: params.config.pubsubTopic })
    )

    this.#config = params.config
    this.#ipfsPromise = ipfsPromise
    this.#logger = logger
    this.#pubsubPromise = pubsubPromise
    this.#streamsHandler = new StreamsHandler({ ipfsPromise, logger, pubsubPromise })
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
}

export const service = new Service({
  config: {
    pubsubTopic: '/test/local',
  },
})
