import type { ModelDefinition } from '@ceramicnetwork/stream-model'
import { createRuntimeDefinition, mockDefinitionFromSchema } from '@composedb/devtools'
import {
  extraScalarsSchema,
  favoriteSchema,
  mediaSchema,
  noteSchema,
  postSchema,
  profilesSchema,
  socialNetworkSchema,
} from '@composedb/test-schemas'
import type { RuntimeCompositeDefinition } from '@composedb/types'

import { printGraphQLSchema } from '../src'

function createSchemaDefinition(
  schema: string,
  providedModels?: Record<string, ModelDefinition>,
): RuntimeCompositeDefinition {
  return createRuntimeDefinition(mockDefinitionFromSchema(schema, providedModels))
}

describe('schema', () => {
  test('supported scalars', () => {
    expect(printGraphQLSchema(createSchemaDefinition(extraScalarsSchema))).toMatchSnapshot()
  })

  test('profiles with SINGLE account relation', () => {
    expect(printGraphQLSchema(createSchemaDefinition(profilesSchema))).toMatchSnapshot()
  })

  test('note with enum support', () => {
    expect(printGraphQLSchema(createSchemaDefinition(noteSchema))).toMatchSnapshot()
  })

  test('post and comments with relations', () => {
    expect(printGraphQLSchema(createSchemaDefinition(postSchema))).toMatchSnapshot()
  })

  test('media interfaces', () => {
    expect(printGraphQLSchema(createSchemaDefinition(mediaSchema))).toMatchSnapshot()
  })

  test('favorite schema with SET account relation', () => {
    expect(printGraphQLSchema(createSchemaDefinition(favoriteSchema))).toMatchSnapshot()
  })

  test('social network schema kitchen sink', () => {
    expect(printGraphQLSchema(createSchemaDefinition(socialNetworkSchema))).toMatchSnapshot()
  })
})
