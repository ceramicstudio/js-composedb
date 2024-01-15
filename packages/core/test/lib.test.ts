import { join } from 'node:path'
import { create as createIPFS } from 'ipfs-core'
import type { IPFS } from 'ipfs-core-types'
import { type DirectoryResult, dir as createTempDir } from 'tmp-promise'

import { ComposeCore } from '../src/index.js'

describe('core', () => {
  let core: ComposeCore
  let ipfs: IPFS
  let tempDir: DirectoryResult

  beforeAll(async () => {
    tempDir = await createTempDir({ unsafeCleanup: true })
    ipfs = await createIPFS({
      config: {
        Addresses: {
          Swarm: [],
        },
      },
      repo: join(tempDir.path, 'ipfs'),
      silent: true,
    })
  })

  afterAll(async () => {
    await ipfs.stop()
    await tempDir.cleanup()
  })

  beforeEach(() => {
    core = new ComposeCore({
      dataDir: tempDir.path,
      ipfs,
    })
  })

  afterEach(async () => {
    const ceramic = await core.context.getCeramic()
    await ceramic.close()
  })

  test('instantiate and initialize', async () => {
    await expect(core.context.dbPromise).resolves
    await expect(core.context.getCeramic()).resolves
  })
})
