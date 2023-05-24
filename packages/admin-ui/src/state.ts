import { atom } from 'jotai'
import type { Environment } from 'relay-runtime'

import { type Client, createClient } from './client.js'
import { createEnvironment } from './relay.js'

export const clientAPIAtom = atom<string | null>('localhost:3001/admin')

export const clientAtom = atom<Client | null>((get) => {
  const api = get(clientAPIAtom)
  return api ? createClient(api) : null
})

export const relayEnvironmentAtom = atom<Environment | null>((get) => {
  const client = get(clientAtom)
  return client ? createEnvironment(client) : null
})

export const compositeEditorValueAtom = atom<string>('')
