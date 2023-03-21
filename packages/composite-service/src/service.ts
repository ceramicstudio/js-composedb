import type { Logger, ServiceLifecycle, ServicesBus } from '@composedb/services-rpc'

import { ModelsManager } from './models.js'
import type { ServiceClients } from './types.js'

export type ServiceParams = {
  bus: ServicesBus
  clients: ServiceClients
  logger: Logger
}

export class Service implements ServiceLifecycle {
  #models: ModelsManager

  constructor(params: ServiceParams) {
    this.#models = new ModelsManager({ clients: params.clients })
  }

  start() {}

  stop() {}

  get models(): ModelsManager {
    return this.#models
  }
}
