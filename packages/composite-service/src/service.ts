import type { ServicesBus } from '@composedb/services-rpc'

import {
  type CeramicClient,
  // type DatabaseClient,
  createCeramicClient,
  createDatabaseClient,
} from './clients.js'
import { ModelsManager } from './models.js'

export type ServiceParams = {
  bus: ServicesBus
}

export class Service {
  #ceramic: CeramicClient
  // #db: DatabaseClient
  #models: ModelsManager

  constructor(params: ServiceParams) {
    const ceramic = createCeramicClient(params.bus)
    const db = createDatabaseClient(params.bus)

    this.#ceramic = ceramic
    // this.#db = db
    this.#models = new ModelsManager({ ceramic, db })
  }

  get models(): ModelsManager {
    return this.#models
  }

  async run() {
    const stream = await this.#ceramic.loadStream.query({
      id: 'kjzl6cwe1jw1462ug6gnnij1hyc7zk4g96rqudrhbxwkm618zs54fnd4jaa81m5',
    })
    console.log('composite service got stream', stream)
  }
}
