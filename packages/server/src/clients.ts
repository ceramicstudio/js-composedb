import type { Router as CompositeRouter } from '@composedb/composite-service'
import { type ServicesBus, createServiceLink } from '@composedb/services-rpc'
import { type CreateTRPCProxyClient, createTRPCProxyClient } from '@trpc/client'

export type CompositeClient = CreateTRPCProxyClient<CompositeRouter>

export function createCompositeClient(bus: ServicesBus): CompositeClient {
  return createTRPCProxyClient<CompositeRouter>({
    links: [createServiceLink({ bus, service: 'composite' })],
  })
}
