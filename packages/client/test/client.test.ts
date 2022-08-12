/**
 * @jest-environment composedb
 */

import type { CeramicApi } from '@ceramicnetwork/common'
import { Composite } from '@composedb/devtools'
import { profilesSchema } from '@composedb/test-schemas'

import { ComposeClient } from '../src'

declare global {
  const ceramic: CeramicApi
}

describe('client', () => {
  test('create profile', async () => {
    const composite = await Composite.create({ ceramic, schema: profilesSchema })
    const client = new ComposeClient({ ceramic, definition: composite.toRuntime() })
    const res = await client.executeQuery<{ createGenericProfile: { document: { id: string } } }>(
      `
      mutation CreateProfile($input: CreateGenericProfileInput!) {
        createGenericProfile(input: $input) {
          document {
            id
          }
        }
      }
      `,
      { input: { content: { name: 'Alice' } } }
    )
    expect(res.data?.createGenericProfile.document.id).toBeDefined()
  })
})
