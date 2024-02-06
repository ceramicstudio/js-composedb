/**
 * @jest-environment composedb
 */

import { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import { StreamID } from '@ceramicnetwork/streamid'
import { Composite } from '@composedb/devtools'
import { favoriteSchema, profilesSchema } from '@composedb/test-schemas'
import type { CeramicAPI } from '@composedb/types'

import { createDeterministicKey } from '../src/deterministic'

declare global {
  const ceramic: CeramicAPI
}

describe('deterministic', () => {
  const controller = ceramic.did!.id
  let favoriteModelID: string
  let profileModelID: string

  beforeAll(async () => {
    const [favoriteComposite, profileComposite] = await Promise.all([
      Composite.create({ ceramic, schema: favoriteSchema }),
      Composite.create({ ceramic, schema: profilesSchema }),
    ])
    favoriteModelID = favoriteComposite.getModelID('Favorite')!
    profileModelID = profileComposite.getModelID('PersonProfile')!
  })

  test('with SINGLE account relation', async () => {
    const stream = await ModelInstanceDocument.single(ceramic, {
      controller,
      model: StreamID.fromString(profileModelID),
    })
    const loadKey = await createDeterministicKey({ controller, model: profileModelID })
    expect(loadKey.id.toString()).toBe(stream.id.toString())
  })

  test('with SET account relation', async () => {
    const stream = await ModelInstanceDocument.set(
      ceramic,
      { controller, model: StreamID.fromString(favoriteModelID) },
      ['foo', 'bar'],
    )
    const loadKey = await createDeterministicKey({
      controller,
      model: favoriteModelID,
      unique: ['foo', 'bar'],
    })
    expect(loadKey.id.toString()).toBe(stream.id.toString())
  })
})
