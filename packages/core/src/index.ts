import type { CeramicConfig } from '@ceramicnetwork/core'
import type { DocumentNode, ExecutionResult, Source } from 'graphql'
import type { IPFS } from 'ipfs-core-types'
import type { Options as IPFSOptions } from 'ipfs-http-client'
import type { Knex } from 'knex'

import { type CommitsRecord, createAdminContext } from './admin/context.js'
import { executeAdmin, executeAdminQuery } from './admin/schema.js'
import { createCeramic, createCeramicConfig } from './ceramic.js'
import { connect as connectDB } from './db/connection.js'
import { resolvePath } from './fs.js'
import { createIPFS } from './ipfs.js'
import type { CoreContext } from './types.js'

export type { CommitsRecord } from './admin/context.js'

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
    const dbPromise = connectDB(ceramicConfig.indexing!.db)

    this.#context = {
      dbPromise,
      getCeramic: () => ceramicPromise,
      ipfs,
    }
  }

  get context(): CoreContext {
    return this.#context
  }

  async executeAdmin<Data = Record<string, unknown>>(
    document: DocumentNode,
    variableValues?: Record<string, unknown>,
    commits?: CommitsRecord,
  ): Promise<ExecutionResult<Data>> {
    const context = await createAdminContext({ coreContext: this.#context, commits })
    return await executeAdmin<Data>(document, context, variableValues)
  }

  async executeAdminQuery<Data = Record<string, unknown>>(
    source: string | Source,
    variableValues?: Record<string, unknown>,
    commits?: CommitsRecord,
  ): Promise<ExecutionResult<Data>> {
    const context = await createAdminContext({ coreContext: this.#context, commits })
    return await executeAdminQuery<Data>(source, context, variableValues)
  }
}
