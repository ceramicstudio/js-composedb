import { inspect } from 'util'

import { SyncOptions } from '@ceramicnetwork/common'
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { Command as CoreCommand, Flags } from '@oclif/core'
import { type DIDProvider, DID } from 'dids'
import type { ResolverRegistry } from 'did-resolver'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver as getKeyResolver } from 'key-did-resolver'
import ora from 'ora'
import type { Ora } from 'ora'
import { fromString } from 'uint8arrays'

type StringRecord = Record<string, unknown>

// TODO: SYNC_OPTIONS_MAP is also used in js-ceramic/packages/cli. Move this const to '@ceramicnetwork/common'
export const SYNC_OPTIONS_MAP: Record<string, SyncOptions | undefined> = {
  'prefer-cache': SyncOptions.PREFER_CACHE,
  'sync-always': SyncOptions.SYNC_ALWAYS,
  'never-sync': SyncOptions.NEVER_SYNC,
}

export interface CommandFlags {
  'ceramic-url': string
  'did-private-key': string
  [key: string]: unknown
}

export type QueryCommandFlags = CommandFlags & {
  sync?: string
}

export const STREAM_ID_ARG = {
  name: 'streamId',
  required: true,
  description: 'ID of the stream',
}

/* Not using Flags.string.parse, because it's not supported anymore to either:
   a. have a Flags.integer flag with a string input and parse(...) returning an integer
   b. have a Flags.string flag with and parse(...) returning an integer
   , and the httpClient expects an integer, while we want to have this option as a string flag in the cli
**/
export const parseSyncFlag = (value: string | undefined) => {
  if (value === undefined || SYNC_OPTIONS_MAP[value] === undefined) {
    return SyncOptions.PREFER_CACHE
  }
  return SYNC_OPTIONS_MAP[value]
}

export const SYNC_OPTION_FLAG = Flags.string({
  required: false,
  options: Object.keys(SYNC_OPTIONS_MAP),
  description: `Controls if the current stream state should be synced over the network or not. 'prefer-cache' will return the state from the node's local cache if present, and will sync from the network if the stream isn't in the cache. 'always-sync' always syncs from the network, even if there is cached state for the stream. 'never-sync' never syncs from the network.`,
})

const readPipe: () => Promise<string | undefined> = () => {
  return new Promise((resolve) => {
    let data = ''
    const stdin = process.openStdin()
    const finish = () => {
      resolve(data.length > 0 ? data.trim() : undefined)
      stdin.pause()
    }

    stdin.setEncoding('utf-8')
    stdin.on('data', (chunk) => {
      data += chunk
    })

    stdin.on('end', () => {
      finish()
    })

    if (stdin.isTTY) {
      finish()
    } else {
      setTimeout(() => {
        finish()
      }, 8000)
    }
  })
}

export abstract class BaseCommand<
  Flags extends StringRecord = StringRecord,
  Args extends StringRecord = StringRecord
> extends CoreCommand {
  args!: Args
  flags!: Flags
  stdin!: string | undefined
  spinner!: Ora

  async init(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore constructor type
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { args, flags } = await this.parse(this.constructor)
    this.args = args as Args
    this.flags = flags as unknown as Flags
    this.spinner = ora()
    this.stdin = await readPipe()
  }

  logJSON(data: unknown): void {
    this.log(inspect(data, { colors: true, depth: null }))
  }
}

export abstract class Command<
  Flags extends CommandFlags = CommandFlags,
  Args extends StringRecord = StringRecord
> extends BaseCommand {
  static flags = {
    'ceramic-url': Flags.string({
      char: 'c',
      description: 'Ceramic API URL',
      env: 'CERAMIC_URL',
    }),
    'did-private-key': Flags.string({
      char: 'k',
      description: 'DID private key',
      env: 'DID_PRIVATE_KEY',
    }),
  }

  args!: Args
  flags!: Flags

  #authenticatedDID: DID | null = null
  #ceramic: CeramicClient | null = null
  #resolverRegistry: ResolverRegistry | null = null

  async init(): Promise<void> {
    await super.init()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore constructor type
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { args, flags } = await this.parse(this.constructor)
    this.args = args as Args
    this.flags = flags as unknown as Flags
    // Authenticate the Ceramic instance whenever a key is provided
    if (this.flags['did-private-key'] != null) {
      const did = await this.getAuthenticatedDID(this.flags['did-private-key'])
      this.spinner.info(`Using DID ${did.id}`)
      this.#authenticatedDID = did
      this.ceramic.did = did
    }
  }

  async finally(): Promise<void> {
    if (this.#ceramic != null) {
      await this.#ceramic.close()
    }
  }

  get authenticatedDID(): DID {
    if (this.#authenticatedDID == null) {
      throw new Error(
        'DID is not authenticated, make sure to provide a private key using the "did-private-key" flag'
      )
    }
    return this.#authenticatedDID
  }

  get ceramic(): CeramicClient {
    if (this.#ceramic == null) {
      this.#ceramic = new CeramicClient(this.flags['ceramic-url'])
    }
    return this.#ceramic
  }

  get resolverRegistry(): ResolverRegistry {
    if (this.#resolverRegistry == null) {
      this.#resolverRegistry = { ...getKeyResolver(), ...get3IDResolver(this.ceramic) }
    }
    return this.#resolverRegistry
  }

  getProvider(seed: string): DIDProvider {
    return new Ed25519Provider(fromString(seed, 'base16')) as DIDProvider
  }

  getDID(): DID {
    return new DID({ resolver: this.resolverRegistry })
  }

  async getAuthenticatedDID(seed: string): Promise<DID> {
    const did = this.getDID()
    did.setProvider(this.getProvider(seed))
    await did.authenticate()
    return did
  }
}
