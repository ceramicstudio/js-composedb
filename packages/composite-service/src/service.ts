import type { ServicesBus } from '@composedb/services-rpc'

import { type CeramicClient, createCeramicClient } from './clients.js'

export type ServiceParams = {
  bus: ServicesBus
}

export class Service {
  #ceramic: CeramicClient

  constructor(params: ServiceParams) {
    this.#ceramic = createCeramicClient(params.bus)
  }

  async run() {
    const stream = await this.#ceramic.loadStream.query({
      id: 'kjzl6cwe1jw1462ug6gnnij1hyc7zk4g96rqudrhbxwkm618zs54fnd4jaa81m5',
    })
    console.log('composite service got stream', stream)
  }
}
