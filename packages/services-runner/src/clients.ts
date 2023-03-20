import type { Router as CeramicRouter } from '@composedb/ceramic-service'
import type { Router as CompositeRouter } from '@composedb/composite-service'
import type { Router as DatabaseRouter } from '@composedb/database-service'
import { type ServicesBus, type ServiceClient, createServiceClient } from '@composedb/services-rpc'

export type Clients = {
  ceramic: ServiceClient<CeramicRouter>
  composite: ServiceClient<CompositeRouter>
  database: ServiceClient<DatabaseRouter>
}

export function createClients(bus: ServicesBus): Clients {
  return {
    ceramic: createServiceClient<CeramicRouter>({ bus, service: 'ceramic' }),
    composite: createServiceClient<CompositeRouter>({ bus, service: 'composite' }),
    database: createServiceClient<DatabaseRouter>({ bus, service: 'database' }),
  }
}
