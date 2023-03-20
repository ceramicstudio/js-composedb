import type { ServiceLifecycle, ServicesBus } from '@composedb/services-rpc'

import { ModelsManager } from './models.js'
import type { ServiceClients } from './types.js'

export type ServiceParams = {
  bus: ServicesBus
  clients: ServiceClients
}

export class Service implements ServiceLifecycle {
  #clients: ServiceClients
  #models: ModelsManager

  constructor(params: ServiceParams) {
    this.#clients = params.clients
    this.#models = new ModelsManager({ clients: params.clients })
  }

  start() {}

  stop() {}

  get models(): ModelsManager {
    return this.#models
  }

  async run() {
    const stream = await this.#clients.ceramic.loadStream.query({
      id: 'kjzl6cwe1jw1462ug6gnnij1hyc7zk4g96rqudrhbxwkm618zs54fnd4jaa81m5',
    })
    console.log('composite service got stream', stream)
  }
}
