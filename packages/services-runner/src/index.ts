import {
  Service as CeramicService,
  type ServiceConfig as CeramicConfig,
  router as ceramicRouter,
} from '@composedb/ceramic-service'
import {
  Service as CompositeService,
  router as compositeRouter,
} from '@composedb/composite-service'
import {
  Service as DatabaseService,
  type DataSourceOptions,
  router as databaseRouter,
} from '@composedb/database-service'
import {
  type Logger,
  type ServiceLifecycle,
  ServicesBus,
  createServiceHandler,
} from '@composedb/services-rpc'
import type { AnyRouter } from '@trpc/server'

import { type ServiceClientOf, type TargetRouter, createClient } from './clients.js'

type ServiceID = 'ceramic' | 'composite' | 'database'

const routers: Record<ServiceID, AnyRouter> = {
  ceramic: ceramicRouter,
  composite: compositeRouter,
  database: databaseRouter,
}

export type ServicesRunnerParams = {
  ceramic?: CeramicConfig
  dataSource: DataSourceOptions
  logger: Logger
}

export class ServicesRunner {
  #bus: ServicesBus
  #logger: Logger
  #services: Record<ServiceID, ServiceLifecycle>

  constructor(params: ServicesRunnerParams) {
    const { ceramic, dataSource, logger } = params

    const bus = new ServicesBus()

    const services = {
      ceramic: new CeramicService({
        config: ceramic ?? { pubsubTopic: '/test/local' },
        logger: logger.getSubLogger({ name: 'ceramic-service' }),
      }),
      composite: new CompositeService({
        bus,
        clients: {
          ceramic: createClient(bus, 'composite', 'ceramic'),
          database: createClient(bus, 'composite', 'database'),
        },
        logger: logger.getSubLogger({ name: 'composite-service' }),
      }),
      database: new DatabaseService({
        dataSource,
        logger: logger.getSubLogger({ name: 'database-service' }),
      }),
    }

    const servicesEntries = Object.entries(services) as Array<[ServiceID, ServiceLifecycle]>
    for (const [id, service] of servicesEntries) {
      // First pass over services to create RPC handlers
      createServiceHandler({ bus, context: { service }, service: id, router: routers[id] })
      logger.debug('Router added for service', { service: id })
    }
    for (const [id, service] of servicesEntries) {
      // Second pass over services to start them now that RPC handlers are created
      service.start?.()
      logger.debug('Service started', { service: id })
    }

    this.#bus = bus
    this.#logger = logger
    this.#services = services
  }

  get bus(): ServicesBus {
    return this.#bus
  }

  createClient<Target extends TargetRouter>(from: string, to: Target): ServiceClientOf<Target> {
    return createClient(this.#bus, from, to)
  }

  async stop() {
    await Promise.all(
      Object.entries(this.#services).map(async ([id, service]) => {
        try {
          await service.stop?.()
        } catch (err) {
          this.#logger.warn('Error stopping service', { service: id, error: err })
        }
      })
    )
  }
}
