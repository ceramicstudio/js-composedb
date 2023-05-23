import type { Router as AdminRouter } from '@composedb/admin-service'
import type { Router as CompositeRouter } from '@composedb/composite-service'
import type { ServiceClient } from '@composedb/services-rpc'
import { createLogger } from '@composedb/services-rpc'
import { ServicesRunner } from '@composedb/services-runner'

export type Context = {
  admin: ServiceClient<AdminRouter>
  composite: ServiceClient<CompositeRouter>
}

export const logger = createLogger({ hideLogPositionForProduction: true, minLevel: 0 })

export const runner = new ServicesRunner({
  admin: {
    dids: [],
  },
  dataSource: {
    type: 'sqlite',
    database: 'data/test.db',
  },
  logger,
})

export function createContext(): Context {
  const admin = runner.createClient('server', 'admin')
  const composite = runner.createClient('server', 'composite')
  return { admin, composite }
}
