import { Service as CeramicService, router as ceramicRouter } from '@composedb/ceramic-service'
import {
  Service as CompositeService,
  router as compositeRouter,
} from '@composedb/composite-service'
import { Service as DatabaseService, router as databaseRouter } from '@composedb/database-service'
import { type ServiceLifecycle, ServicesBus, createServiceHandler } from '@composedb/services-rpc'
import type { AnyRouter } from '@trpc/server'

import { type Clients, createClients } from './clients.js'
import { createLogger } from './logger.js'

type Services = {
  ceramic: CeramicService
  composite: CompositeService
  database: DatabaseService
}
type ServiceID = keyof Services

const routers: Record<ServiceID, AnyRouter> = {
  ceramic: ceramicRouter,
  composite: compositeRouter,
  database: databaseRouter,
}

export class ServicesRunner {
  #bus: ServicesBus
  #clients: Clients
  #services: Services

  constructor() {
    const bus = new ServicesBus()
    this.#bus = bus

    const clients = createClients(bus)
    this.#clients = clients

    const logger = createLogger()
    bus.subscribe((msg) => {
      logger.trace('bus message', msg)
    })

    const services = {
      ceramic: new CeramicService({
        config: {
          pubsubTopic: '/test/local',
        },
      }),
      composite: new CompositeService({
        bus,
        clients: { ceramic: clients.ceramic, database: clients.database },
      }),
      database: new DatabaseService({
        dataSource: {
          type: 'sqlite',
          database: 'test.db',
        },
      }),
    }
    this.#services = services

    const servicesEntries = Object.entries(services) as Array<[ServiceID, ServiceLifecycle]>
    for (const [id, service] of servicesEntries) {
      // First pass over services to create RPC handlers
      createServiceHandler({ bus, context: { service }, service: id, router: routers[id] })
      logger.debug(`Router added for service: ${id}`)
    }
    for (const [id, service] of servicesEntries) {
      // Second pass over services to start them now that RPC handlers are created
      service.start()
      logger.debug(`Service started: ${id} `)
    }
  }

  get bus(): ServicesBus {
    return this.#bus
  }

  get clients(): Clients {
    return this.#clients
  }

  async stop() {
    await Promise.all(
      Object.entries(this.#services).map(async ([id, service]) => {
        try {
          await service.stop()
        } catch (err) {
          console.warn(`Error stopping service ${id}: ${(err as Error).message}`)
        }
      })
    )
  }
}
