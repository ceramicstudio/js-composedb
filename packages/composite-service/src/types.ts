import type { Router as CeramicRouter } from '@composedb/ceramic-service'
import type { Router as DatabaseRouter } from '@composedb/database-service'
import type { ServiceClient } from '@composedb/services-rpc'

export type ServiceClients = {
  ceramic: ServiceClient<CeramicRouter>
  database: ServiceClient<DatabaseRouter>
}
