import { join } from 'node:path'
import { createKeyDID, createModelCommit } from '@composedb/signing'
import type { ModelDefinition } from '@composedb/types'
import { create as createIPFS } from 'ipfs-core'
import type { IPFS } from 'ipfs-core-types'
import { type DirectoryResult, dir as createTempDir } from 'tmp-promise'

import { type CommitsRecord, ComposeCore } from '../src/index.js'

type ModelInput = { name: string; definition: ModelDefinition }

describe('core', () => {
  let core: ComposeCore
  let ipfs: IPFS
  let tempDir: DirectoryResult

  beforeAll(async () => {
    tempDir = await createTempDir({ unsafeCleanup: true })
    ipfs = await createIPFS({
      config: { Addresses: { Swarm: [] } },
      repo: join(tempDir.path, 'ipfs'),
      silent: true,
    })
  })

  afterAll(async () => {
    await ipfs.stop()
    await tempDir.cleanup()
  })

  beforeEach(() => {
    core = new ComposeCore({ dataDir: tempDir.path, ipfs })
  })

  afterEach(async () => {
    const ceramic = await core.context.getCeramic()
    await ceramic.close()
  })

  test('instantiate and initialize', async () => {
    await expect(core.context.dbPromise).resolves.toBeDefined()
    await expect(core.context.getCeramic()).resolves.toBeDefined()
  })

  describe('admin', () => {
    test.only('create a composite', async () => {
      const models: Array<ModelInput> = [
        {
          name: 'TestModel1',
          definition: {
            version: '2.0',
            name: 'TestModel1',
            description: 'Test model 1',
            interface: false,
            implements: [],
            accountRelation: { type: 'list' },
            schema: {
              type: 'object',
              properties: {
                test: { type: 'string' },
              },
              required: [],
              additionalProperties: false,
            },
          },
        },
      ]

      const did = createKeyDID()
      const commits: CommitsRecord = {}
      for await (const model of models) {
        commits[model.name] = await createModelCommit(did, model.definition)
      }

      const createModelsRes = await core.executeAdminQuery(
        `
        mutation CreateModels($input: CreateModelsInput!) {
          createModels(input: $input) {
            models {
              alias
              streamID
            }
          }
        }
      `,
        { input: { models: models.map((model) => model.name) } },
        commits,
      )

      console.log(JSON.stringify(createModelsRes, null, 2))
      const modelIDs = createModelsRes.data?.createModels.models.map((model) => model.streamID)

      const createCompositeQuery = `
        mutation CreateComposite($input: CreateCompositeInput!) {
          createComposite(input: $input) {
            compositeEdge {
              cursor
              node {
                id
              }
            }
          }
        }
      `

      const createCompositeRes1 = await core.executeAdminQuery(createCompositeQuery, {
        input: {
          label: 'Composite 1',
          modelIDs,
          commonEmbeds: [],
          enableQueries: true,
          enableMutations: true,
          enableSubscriptions: false,
        },
      })
      console.log(JSON.stringify(createCompositeRes1, null, 2))

      const createCompositeRes2 = await core.executeAdminQuery(createCompositeQuery, {
        input: {
          label: 'Composite 2',
          modelIDs,
          commonEmbeds: [],
          enableQueries: true,
          enableMutations: true,
          enableSubscriptions: false,
        },
      })
      console.log(JSON.stringify(createCompositeRes2, null, 2))
    })
  })
})
