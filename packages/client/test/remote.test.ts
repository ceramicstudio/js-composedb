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
  }, 30000)

  describe('createHybridSchema()', () => {
    test('Runs mutations directly', async () => {
      const upsertSingle = jest.fn(() => {
        return {
          id: 'createdDocumentID',
          metadata: { model: definition.models['GenericProfile'].id },
        }
      })
      const remoteExecutor = jest.fn() as Executor
      const schema = createHybridSchema({ definition, remoteExecutor })

      const res = await execute({
        contextValue: {
          ceramic: {
            did: { authenticated: true },
          },
          upsertSingle,
        },
        schema,
        document: parse(`
        mutation SetProfile($input: SetGenericProfileInput!) {
          setGenericProfile(input: $input) {
            document {
              id
            }
          }
        }
      `),
        variableValues: { input: { content: { name: 'Alice' } } },
      })
      expect(res.errors).not.toBeDefined()
      expect(upsertSingle).toHaveBeenCalled()
      expect(remoteExecutor).not.toHaveBeenCalled()
    })

    test('Runs queries remotely', async () => {
      const remoteExecutor = jest.fn(() => {
        return { data: {} }
      }) as Executor
      const schema = createHybridSchema({ definition, remoteExecutor })

      const res = await execute({
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
      expect(res.errors).not.toBeDefined()
      expect(remoteExecutor).toHaveBeenCalledTimes(1)
    })
  })
})
