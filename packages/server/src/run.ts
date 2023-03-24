import { inspect } from 'node:util'
import { META_MODEL_BYTES, type ContentDefinition } from '@composedb/model-codecs'
import { createLogger } from '@composedb/services-rpc'
import { ServicesRunner } from '@composedb/services-runner'
import { type DagJWSResult, DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'

import { router } from './router.js'

async function createModelGenesis(did: DID, data: ContentDefinition): Promise<DagJWSResult> {
  if (!did.authenticated) {
    await did.authenticate()
  }

  return await did.createDagJWS({
    data,
    header: {
      controllers: [did.hasParent ? did.parent : did.id],
      model: META_MODEL_BYTES,
      sep: 'model', // See CIP-120 for more details on this field
    },
  })
}

const logger = createLogger({ minLevel: 0 })
const runner = new ServicesRunner({
  dataSource: {
    type: 'sqlite',
    database: 'data/test.db',
  },
  logger,
})
const composite = runner.createClient('server', 'composite')
const caller = router.createCaller({ composite })

const did = new DID({ provider: new Ed25519Provider(new Uint8Array(32)), resolver: getResolver() })

const [commit1, commit2] = await Promise.all([
  createModelGenesis(did, {
    version: '1.0',
    accountRelation: { type: 'single' },
    name: 'Test1',
    schema: { type: 'object', properties: { foo: { type: 'string' } } },
  }),
  createModelGenesis(did, {
    version: '1.0',
    accountRelation: { type: 'single' },
    name: 'Test2',
    schema: { type: 'object', properties: { bar: { type: 'string' } } },
  }),
])

const created = await caller.saveComposite({
  composite: {
    models: {
      Test1: { action: 'create', commit: commit1 },
      Test2: { action: 'create', commit: commit2 },
    },
    commonEmbeds: [],
  },
})
console.log('created composite graph', inspect(created.graph, { colors: true, depth: null }))
