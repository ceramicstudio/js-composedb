import type { Router as DatabaseRouter } from '@composedb/database-service'
import type { ServiceClient } from '@composedb/services-rpc'

export type DatabaseClient = ServiceClient<DatabaseRouter>

export type ServiceClients = {
  database: DatabaseClient
}
