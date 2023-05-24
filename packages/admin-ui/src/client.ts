import type { Router } from '@composedb/server'
import {
  type CreateTRPCProxyClient,
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink,
} from '@trpc/client'

export type Client = CreateTRPCProxyClient<Router>

export function createClient(endpoint: string): CreateTRPCProxyClient<Router> {
  const wsClient = createWSClient({ url: `ws://${endpoint}` })
  return createTRPCProxyClient<Router>({
    links: [
      splitLink({
        condition(op) {
          return op.type === 'subscription'
        },
        true: wsLink({ client: wsClient }),
        false: httpBatchLink({ url: `http://${endpoint}` }),
      }),
    ],
  })
}
