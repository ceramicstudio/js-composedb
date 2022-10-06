import { ComposeClient } from '@composedb/client'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { Environment as RelayEnvironment, Network, RecordSource, Store } from 'relay-runtime'
import type { GraphQLResponse } from 'relay-runtime'

import { definition } from './__generated__/definition'
import { CERAMIC_URL, LOCAL_URL } from './constants'

export type Environment = {
  did: DID
  relay: RelayEnvironment
}

const client = new ComposeClient({
  ceramic: CERAMIC_URL,
  definition,
  serverURL: `${LOCAL_URL}/api/graphql`,
})

const network = Network.create(async (request, variables) => {
  const res = (await client.executeQuery(request.text as string, variables)) as GraphQLResponse
  console.log('graphQL response', request, res)
  return res
})

export function createRelayEnvironment(): RelayEnvironment {
  return new RelayEnvironment({ network, store: new Store(new RecordSource()) })
}

export async function createEnvironment(seed: Uint8Array): Promise<Environment> {
  const did = new DID({
    provider: new Ed25519Provider(seed),
    resolver: getResolver(),
  })
  await did.authenticate()
  client.setDID(did)

  return { did, relay: createRelayEnvironment() }
}

export const defaultRelayEnvironment: RelayEnvironment = createRelayEnvironment()
