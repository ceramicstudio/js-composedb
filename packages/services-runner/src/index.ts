import { Service as CeramicService, router as ceramicRouter } from '@composedb/ceramic-service'
import {
  Service as CompositeService,
  // router as compositeRouter,
} from '@composedb/composite-service'
import { ServicesBus, createServiceHandler } from '@composedb/services-rpc'

import { createLogger } from './logger.js'

export type ServicesRunnerParams = {}

export class ServicesRunner {
  #bus: ServicesBus
  #compositeService: CompositeService

  constructor() {
    const bus = new ServicesBus()
    this.#bus = bus

    const logger = createLogger()
    bus.subscribe((msg) => {
      logger.trace('bus message', msg)
    })

    const ceramicService = new CeramicService({
      config: {
        pubsubTopic: '/test/local',
      },
    })
    createServiceHandler({
      bus,
      context: { service: ceramicService },
      service: 'ceramic',
      router: ceramicRouter,
    })

    const compositeService = new CompositeService({
      bus,
    })
    this.#compositeService = compositeService

    // createServiceHandler({
    //   bus: this.#bus,
    //   context: { service: compositeService },
    //   service: 'composite',
    //   router: compositeRouter,
    // })
  }

  get bus(): ServicesBus {
    return this.#bus
  }

  async run() {
    await this.#compositeService.run()
  }
}

const runner = new ServicesRunner()
await runner.run()
