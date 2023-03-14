import { initTRPC } from '@trpc/server'

import type { Service } from './service.js'

export type Context = {
  service: Service
}

const t = initTRPC.context<Context>().create()

export const router = t.router({})

export type Router = typeof router
