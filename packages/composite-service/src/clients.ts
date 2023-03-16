import type { Router as CeramicRouter } from '@composedb/ceramic-service'
import type { Router as DatabaseRouter } from '@composedb/database-service'
import { type ServicesBus, createServiceLink } from '@composedb/services-rpc'
import { type CreateTRPCProxyClient, createTRPCProxyClient } from '@trpc/client'

export type CeramicClient = CreateTRPCProxyClient<CeramicRouter>

export function createCeramicClient(bus: ServicesBus): CeramicClient {
  return createTRPCProxyClient<CeramicRouter>({
    links: [createServiceLink({ bus, service: 'ceramic' })],
  })
}

export type DatabaseClient = CreateTRPCProxyClient<DatabaseRouter>

export function createDatabaseClient(bus: ServicesBus): DatabaseClient {
  return createTRPCProxyClient<DatabaseRouter>({
    links: [createServiceLink({ bus, service: 'database' })],
  })
}
