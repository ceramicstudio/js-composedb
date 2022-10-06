import type { ModelDefinition } from '@ceramicnetwork/stream-model'
import { createRuntimeDefinition, mockDefinitionFromSchema } from '@composedb/devtools'
import {
  createCommentSchemaWithPost,
  loadPostSchemaWithComments,
  noteSchema,
  postSchema,
  profilesSchema,
} from '@composedb/test-schemas'
import type { RuntimeCompositeDefinition } from '@composedb/types'

import { printGraphQLSchema } from '../src'

function createSchemaDefinition(
  schema: string,
  providedModels?: Record<string, ModelDefinition>
): RuntimeCompositeDefinition {
  return createRuntimeDefinition(mockDefinitionFromSchema(schema, providedModels))
}

describe('schema', () => {
  test('printGraphQLSchema()', () => {
    expect(printGraphQLSchema(createSchemaDefinition(profilesSchema))).toMatchSnapshot()
    expect(printGraphQLSchema(createSchemaDefinition(noteSchema))).toMatchSnapshot()

    const postDefinition = mockDefinitionFromSchema(postSchema)
    const commentDefinition = mockDefinitionFromSchema(
      createCommentSchemaWithPost('PostID'),
      postDefinition.models
    )
    const postWithCommentsDefinition = mockDefinitionFromSchema(
      loadPostSchemaWithComments('PostID', 'CommentID'),
      commentDefinition.models
    )
    expect(
      printGraphQLSchema(createRuntimeDefinition(postWithCommentsDefinition))
    ).toMatchSnapshot()
  })
})
