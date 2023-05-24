import cors from '@fastify/cors'
import ws from '@fastify/websocket'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import fastify from 'fastify'

import { createContext } from './context.js'
import { router } from './router.js'

export const server = fastify({
  maxParamLength: 5000,
})

await server.register(cors, { origin: true })
server.register(ws)
server.register(fastifyTRPCPlugin, {
  prefix: '/admin',
  trpcOptions: { router, createContext },
  useWSS: true,
})

try {
  await server.listen({ port: 3001 })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}
