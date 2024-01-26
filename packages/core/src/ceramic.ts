import type { CeramicApi, SignedCommitContainer } from '@ceramicnetwork/common'
import { Ceramic, type CeramicConfig } from '@ceramicnetwork/core'
import { Model } from '@ceramicnetwork/stream-model'
import { DID } from 'dids'
import type { IPFS } from 'ipfs-core-types'
import { getResolver as getKeyResolver } from 'key-did-resolver'
import mergeOptions from 'merge-options'
import { getResolver as getPKHResolver } from 'pkh-did-resolver'

import { resolvePath } from './fs.js'

const MODEL_GENESIS_OPTS = {
  anchor: true,
  publish: true,
}

export type CeramicConfigParams = {
  config?: CeramicConfig
  dataDir: string
}

export function createCeramicConfig({ config, dataDir }: CeramicConfigParams): CeramicConfig {
  const ceramicDir = resolvePath('ceramic', dataDir)
  return mergeOptions(
    {
      stateStoreDirectory: ceramicDir,
      indexing: {
        db: `sqlite://${ceramicDir}/indexing.sqlite`,
        disableComposedb: false,
        allowQueriesBeforeHistoricalSync: true,
        enableHistoricalSync: false,
      },
    },
    config,
  )
}

export type CeramicParams = CeramicConfigParams & {
  ipfs: IPFS
}

export async function createCeramic({ config, dataDir, ipfs }: CeramicParams): Promise<Ceramic> {
  const ceramicConfig = createCeramicConfig({ config, dataDir })
  const ceramic = await Ceramic.create(ipfs, ceramicConfig)
  ceramic.did = new DID({ resolver: { ...getKeyResolver(), ...getPKHResolver() } })
  return ceramic
}

export async function createModelFromGenesis(
  ceramic: CeramicApi,
  genesis: SignedCommitContainer,
): Promise<Model> {
  return await ceramic.createStreamFromGenesis<Model>(
    Model.STREAM_TYPE_ID,
    genesis,
    MODEL_GENESIS_OPTS,
  )
}
