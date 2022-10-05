import path from 'path'
import { Ceramic } from '@ceramicnetwork/core'
import { DID } from 'dids'
import { create } from 'ipfs-core'
import NodeEnv from 'jest-environment-node'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { dir } from 'tmp-promise'
import { fromString } from 'uint8arrays/from-string'

const NodeEnvironment = NodeEnv.default ?? NodeEnv

export default class ComposeEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)
    const seed = config.projectConfig?.seed
    this.seed = seed ? fromString(seed) : new Uint8Array(32)
    this.indexingConfig = {
      db: config.db,
      models: config.models,
    }
  }

  async setup() {
    this.originalEnvValue = process.env.CERAMIC_ENABLE_EXPERIMENTAL_COMPOSE_DB
    process.env.CERAMIC_ENABLE_EXPERIMENTAL_COMPOSE_DB = 'true'

    this.tmpFolder = await dir({ unsafeCleanup: true })

    this.global.ipfs = await create({
      // Note: the "test" profile doesn't seem to do much to disable networking,
      // so we need to set the relevant config explicitly to run tests in parallel
      config: {
        Addresses: {
          Swarm: [],
        },
        Pubsub: {
          // default "gossipsub" uses CJS and fails to import
          PubSubRouter: 'floodsub',
        },
      },
      repo: path.join(this.tmpFolder.path, 'ipfs'),
      silent: true,
    })

    const did = new DID({
      resolver: getResolver(),
      provider: new Ed25519Provider(this.seed),
    })
    await did.authenticate()

    const stateStoreDirectory = path.join(this.tmpFolder.path, 'ceramic')
    const ceramic = await Ceramic.create(this.global.ipfs, {
      stateStoreDirectory: stateStoreDirectory,
      indexing: {
        db: this.indexingConfig.db ?? `sqlite://${stateStoreDirectory}/ceramic.sqlite`,
        models: this.indexingConfig.models ?? [],
        allowQueriesBeforeHistoricalSync: true,
      },
    })
    ceramic.did = did

    this.global.ceramic = ceramic
  }

  async teardown() {
    process.env.CERAMIC_ENABLE_EXPERIMENTAL_COMPOSE_DB = this.originalEnvValue
    await this.global.ceramic.close()
    await this.global.ipfs.stop()
    await this.tmpFolder.cleanup()
    await super.teardown()
  }
}
