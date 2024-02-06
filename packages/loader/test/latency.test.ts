/**
 * @jest-environment composedb
 */

import { SyncOptions } from '@ceramicnetwork/common'
import { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import { StreamID } from '@ceramicnetwork/streamid'
import { Composite } from '@composedb/devtools'
import { favoriteSchema } from '@composedb/test-schemas'
import type { CeramicAPI } from '@composedb/types'

import { createDeterministicKey } from '../src/deterministic'
import { DocumentLoader } from '../src/loader'

declare global {
  const ceramic: CeramicAPI
}

describe('latency', () => {
  const controller = ceramic.did!.id
  let modelID: string

  beforeAll(async () => {
    const composite = await Composite.create({ ceramic, schema: favoriteSchema })
    modelID = composite.getModelID('Favorite')!
  })

  test('using ModelInstanceDocument.set()', async () => {
    const model = StreamID.fromString(modelID)
    console.time('using ModelInstanceDocument.set()')
    await ModelInstanceDocument.set(ceramic, { controller, model }, ['one', 'one'])
    console.timeLog('using ModelInstanceDocument.set()', 'first load')
    await ModelInstanceDocument.set(ceramic, { controller, model }, ['one', 'one'])
    console.timeEnd('using ModelInstanceDocument.set()')
  })

  test('using ceramic.multiQuery()', async () => {
    const { id, genesis } = await createDeterministicKey({
      controller,
      model: modelID,
      unique: ['two', 'two'],
    })
    console.time('using ceramic.multiQuery()')
    await ceramic.multiQuery([{ streamId: id, genesis, opts: { sync: SyncOptions.NEVER_SYNC } }])
    console.timeLog('using ceramic.multiQuery()', 'first load')
    await ceramic.multiQuery([{ streamId: id, genesis, opts: { sync: SyncOptions.NEVER_SYNC } }])
    console.timeEnd('using ceramic.multiQuery()')
  })

  test('using loader.loadSet()', async () => {
    const loader = new DocumentLoader({ ceramic })
    console.time('using loader.loadSet()')
    await loader.loadSet(controller, modelID, ['three', 'three'])
    console.timeLog('using loader.loadSet()', 'first load')
    await loader.loadSet(controller, modelID, ['three', 'three'])
    console.timeEnd('using loader.loadSet()')
  })

  test('using ceramic.index.query()', async () => {
    console.time('ceramic.index.query()')
    await ceramic.index.query({
      account: controller,
      models: [modelID],
      first: 1,
      queryFilters: { where: { docID: { equalTo: 'four' }, tag: { equalTo: 'four' } } },
    })
    console.timeLog('ceramic.index.query()', 'first load')
    await ceramic.index.query({
      account: controller,
      models: [modelID],
      first: 1,
      queryFilters: { where: { docID: { equalTo: 'four' }, tag: { equalTo: 'four' } } },
    })
    console.timeEnd('ceramic.index.query()')
  })
})
