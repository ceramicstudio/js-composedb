import type { Router as CeramicRouter } from '@composedb/ceramic-service'
import type { Router as CompositeRouter } from '@composedb/composite-service'
import type { Router as DatabaseRouter } from '@composedb/database-service'
import { type ServicesBus, type ServiceClient, createServiceClient } from '@composedb/services-rpc'

export type Routers = {
  ceramic: CeramicRouter
  composite: CompositeRouter
  database: DatabaseRouter
}
export type TargetRouter = keyof Routers

export type ServiceClientOf<RouterKey extends TargetRouter> = ServiceClient<Routers[RouterKey]>

export function createClient<RouterKey extends TargetRouter>(
  bus: ServicesBus,
  from: string,
  to: RouterKey
): ServiceClientOf<RouterKey> {
  return createServiceClient({ bus, from, to })
}
