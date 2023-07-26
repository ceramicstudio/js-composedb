import type { ModelDefinition } from '@ceramicnetwork/stream-model'
import { createRuntimeDefinition, mockDefinitionFromSchema } from '@composedb/devtools'
import {
  createCommentSchemaWithPost,
  extraScalarsSchema,
  loadPostSchemaWithComments,
  noteSchema,
  postSchema,
  profilesSchema,
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
    const postDefinition = mockDefinitionFromSchema(postSchema)
    const commentDefinition = mockDefinitionFromSchema(
      createCommentSchemaWithPost('PostID'),
      postDefinition.models,
    )
    const postWithCommentsDefinition = mockDefinitionFromSchema(
      loadPostSchemaWithComments('PostID', 'CommentID'),
      commentDefinition.models,
    )
    expect(
      printGraphQLSchema(createRuntimeDefinition(postWithCommentsDefinition)),
    ).toMatchSnapshot()
  })
})
