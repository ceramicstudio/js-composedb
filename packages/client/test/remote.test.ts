/**
 * @jest-environment composedb
 */

import { Composite } from '@composedb/devtools'
import { profilesSchema } from '@composedb/test-schemas'
import type { RuntimeCompositeDefinition } from '@composedb/types'
import type { Executor } from '@graphql-tools/utils'
import { jest } from '@jest/globals'
import { execute, parse } from 'graphql'

import { createHybridSchema } from '../src/remote'

describe('remote', () => {
  let definition: RuntimeCompositeDefinition

  beforeAll(async () => {
    const composite = await Composite.create({ ceramic, schema: profilesSchema })
    definition = composite.toRuntime()
  })

  describe('createHybridSchema()', () => {
    test('Runs mutations directly', async () => {
      const remoteExecutor = jest.fn() as Executor
      const schema = createHybridSchema({ definition, remoteExecutor })

      await execute({
        schema,
        document: parse(`
        mutation CreateProfile($input: CreateGenericProfileInput!) {
          createGenericProfile(input: $input) {
            document {
              id
            }
            viewer {
              genericProfile {
                name
              }
            }
          }
        }
      `),
        variableValues: { input: { content: { name: 'Alice' } } },
      })
      expect(remoteExecutor).not.toHaveBeenCalled()
    })

    test('Runs queries remotely', async () => {
      const remoteExecutor = jest.fn() as Executor
      const schema = createHybridSchema({ definition, remoteExecutor })

      await execute({
        schema,
        document: parse(`
        query {
          viewer {
            genericProfile {
              name
            }
          }
        }
      `),
      })
      expect(remoteExecutor).toHaveBeenCalledTimes(1)
    })
  })
})
