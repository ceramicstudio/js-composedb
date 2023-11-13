import type { ModelDefinition } from '@ceramicnetwork/stream-model'
import { createRuntimeDefinition, mockDefinitionFromSchema } from '@composedb/devtools'
import { extraScalarsSchema, noteSchema, postSchema, profilesSchema } from '@composedb/test-schemas'
import type { RuntimeCompositeDefinition } from '@composedb/types'

import { printGraphQLSchema } from '../src'

function createSchemaDefinition(
  schema: string,
  providedModels?: Record<string, ModelDefinition>,
): RuntimeCompositeDefinition {
  return createRuntimeDefinition(mockDefinitionFromSchema(schema, providedModels))
}

describe('schema', () => {
  test('extra scalars', () => {
    expect(printGraphQLSchema(createSchemaDefinition(extraScalarsSchema))).toMatchSnapshot()
  })

  test('profile', () => {
    expect(printGraphQLSchema(createSchemaDefinition(profilesSchema))).toMatchSnapshot()
  })

  test('note', () => {
    expect(printGraphQLSchema(createSchemaDefinition(noteSchema))).toMatchSnapshot()
  })

  test('post and comments', () => {
    expect(printGraphQLSchema(createSchemaDefinition(postSchema))).toMatchSnapshot()
  })
})
