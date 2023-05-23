import { applyWSSHandler } from '@trpc/server/adapters/ws'
import { WebSocketServer } from 'ws'

import { createContext, logger } from './context.js'
import { router } from './router.js'

const serverLogger = logger.getSubLogger({ name: 'server' })

const wss = new WebSocketServer({ port: 3001 })
// @ts-ignore router type mismatc
const handler = applyWSSHandler({ wss, router, createContext })

wss.on('connection', (ws) => {
  serverLogger.debug(`New connection (${wss.clients.size} total)`)
  ws.once('close', () => {
    serverLogger.debug(`Closed connection (${wss.clients.size} total)`)
  })
})
serverLogger.info('WebSocket server listening on ws://localhost:3001')

process.on('SIGTERM', () => {
  serverLogger.warn('SIGTERM')
  handler.broadcastReconnectNotification()
  wss.close()
})
