import type { Router as AdminRouter } from '@composedb/admin-service'
import type { Router as CompositeRouter } from '@composedb/composite-service'
import type { ServiceClient } from '@composedb/services-rpc'
import { createLogger } from '@composedb/services-rpc'
import { ServicesRunner } from '@composedb/services-runner'
import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import { nanoid } from 'nanoid'

export type Context = {
  admin: ServiceClient<AdminRouter>
  composite: ServiceClient<CompositeRouter>
}

export const logger = createLogger({ hideLogPositionForProduction: true, minLevel: 0 })

export const runner = new ServicesRunner({
  admin: {
    dids: ['did:key:z6MkgsZ8QM2xquJMpBfb2762XpRNSjsEHfyFcygyXz5cMAa3'],
  },
  dataSource: {
    type: 'sqlite',
    database: 'data/test.db',
  },
  logger,
})

export function createContext(_options: CreateFastifyContextOptions): Context {
  const id = nanoid()
  const admin = runner.createClient(id, 'admin')
  const composite = runner.createClient(id, 'composite')
  return { admin, composite }
}
