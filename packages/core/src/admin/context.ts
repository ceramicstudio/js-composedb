import type { CeramicApi, SignedCommitContainer } from '@ceramicnetwork/common'
import type { Knex } from 'knex'

import type { CoreContext } from '../types.js'

export type CommitsRecord = Record<string, SignedCommitContainer>

export type AdminContext = {
  ceramic: CeramicApi
  commits: CommitsRecord
  db: Knex
}

export type AdminContextParams = {
  commits?: CommitsRecord
  coreContext: CoreContext
}

export async function createAdminContext({
  commits,
  coreContext,
}: AdminContextParams): Promise<AdminContext> {
  const [ceramic, db] = await Promise.all([coreContext.getCeramic(), coreContext.dbPromise])
  return { ceramic, commits: commits ?? {}, db }
}
