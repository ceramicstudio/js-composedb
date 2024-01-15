import type { Ceramic } from '@ceramicnetwork/core'
import type { IPFS } from 'ipfs-core-types'
import type { Knex } from 'knex'

export type GetCeramic = () => Promise<Ceramic>

export type CoreContext = {
  dbPromise: Promise<Knex>
  getCeramic: GetCeramic
  ipfs: IPFS
}
