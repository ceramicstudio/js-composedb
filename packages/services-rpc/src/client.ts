import { type CreateTRPCProxyClient, createTRPCProxyClient } from '@trpc/client'
import type { AnyRouter } from '@trpc/server'

import { type ServiceLinkParams, createServiceLink } from './link.js'

export type ServiceClient<Router extends AnyRouter> = CreateTRPCProxyClient<Router>

export function createServiceClient<Router extends AnyRouter>(
  params: ServiceLinkParams
): ServiceClient<Router> {
  const link = createServiceLink(params)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore options type mismatch somehow
  return createTRPCProxyClient<Router>({ links: [link] })
}
