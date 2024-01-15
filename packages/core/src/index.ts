import type { CeramicConfig } from '@ceramicnetwork/core'
import type { IPFS } from 'ipfs-core-types'
import type { Options as IPFSOptions } from 'ipfs-http-client'
import type { Knex } from 'knex'

import { createCeramic, createCeramicConfig } from './ceramic.js'
import { connect as dbConnect } from './db/connection.js'
import { resolvePath } from './fs.js'
import { createIPFS } from './ipfs.js'
import type { CoreContext } from './types.js'

export type CoreParams = {
  ceramic?: CeramicConfig
  dataDir?: string
  db?: Knex.Config
  ipfs?: IPFS
  ipfsClient?: IPFSOptions
}

export class ComposeCore {
  #context: CoreContext

  constructor(params: CoreParams) {
    const dataDir = resolvePath(params.dataDir ?? './data')
    const ipfs = createIPFS({ dataDir, ipfs: params.ipfs, options: params.ipfsClient })
    const ceramicConfig = createCeramicConfig({ config: params.ceramic, dataDir })
    const ceramicPromise = createCeramic({ config: ceramicConfig, dataDir, ipfs })
    const dbPromise = dbConnect(ceramicConfig.indexing!.db)

    this.#context = {
      dbPromise,
      getCeramic: () => ceramicPromise,
      ipfs,
    }
  }

  get context(): CoreContext {
    return this.#context
  }
}
