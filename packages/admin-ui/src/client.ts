import type { Router } from '@composedb/server'
import {
  type CreateTRPCProxyClient,
  createTRPCProxyClient,
  createWSClient,
  wsLink,
} from '@trpc/client'

export type Client = CreateTRPCProxyClient<Router>

export function createClient(url: string): CreateTRPCProxyClient<Router> {
  const wsClient = createWSClient({ url })
  return createTRPCProxyClient<Router>({
    links: [wsLink({ client: wsClient })],
  })
}
