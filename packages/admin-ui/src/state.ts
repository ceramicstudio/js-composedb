import type { DID } from 'dids'
import { atom } from 'jotai'
import type { Environment } from 'relay-runtime'

import type { Client } from './client.js'
import { createEnvironment } from './relay.js'

export type AdminState = {
  client: Client
  did: DID
}

export const adminStateAtom = atom<AdminState | null>(null)

export const relayEnvironmentAtom = atom<Environment | null>((get) => {
  const admin = get(adminStateAtom)
  return admin ? createEnvironment(admin.client) : null
})

export const compositeEditorValueAtom = atom<string>('')
