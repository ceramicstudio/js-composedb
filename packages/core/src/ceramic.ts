import { Ceramic, type CeramicConfig } from '@ceramicnetwork/core'
import type { IPFS } from 'ipfs-core-types'
import mergeOptions from 'merge-options'

import { resolvePath } from './fs.js'

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
  return await Ceramic.create(ipfs, ceramicConfig)
}
