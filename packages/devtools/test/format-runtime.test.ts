/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { ModelDefinition } from '@ceramicnetwork/stream-model'
import {
  createCommentSchemaWithPost,
  loadPostSchemaWithComments,
  noteSchema,
  postSchema,
  profilesSchema,
} from '@composedb/test-schemas'
import type { InternalCompositeDefinition } from '@composedb/types'

import { createRuntimeDefinition, getName, createAbstractCompositeDefinition } from '../src'
import type { AbstractCompositeDefinition } from '../src/schema/types'

function mockDefinition(
  definition: AbstractCompositeDefinition,
  providedModels: Record<string, ModelDefinition> = {}
): InternalCompositeDefinition {
  const models: Record<string, ModelDefinition> = {}
  const views = { models: {} }

  for (const model of Object.values(definition.models)) {
    if (model.action === 'create') {
      const definition = model.definition
      models[`${definition.name}ID`] = definition
    } else {
      const definition = providedModels[model.id]
      if (definition == null) {
        throw new Error(`Missing provided model ${model.id}`)
      }
      models[model.id] = definition
      views.models[model.id] = model.views
    }
  }

  return {
    version: '1.0',
    commonEmbeds: definition.commonEmbeds,
    models,
    views,
  }
}

function mockDefinitionFromSchema(
  schema: string,
  providedModels?: Record<string, ModelDefinition>
): InternalCompositeDefinition {
  return mockDefinition(createAbstractCompositeDefinition(schema), providedModels)
}

describe('Runtime format', () => {
  const profilesDefinition = mockDefinitionFromSchema(profilesSchema)

  describe('getName()', () => {
    test('converts input to pascal case', () => {
      expect(getName('Foo bar')).toBe('FooBar')
      expect(getName('foo_bar')).toBe('FooBar')
      expect(getName('Foo-bar')).toBe('FooBar')
    })

    test('adds the prefix', () => {
      expect(getName('bar', 'Foo')).toBe('FooBar')
      expect(getName('foo_bar', 'Bar')).toBe('BarFooBar')
    })

    test('ignores the prefix if already included', () => {
      expect(getName('foo_bar', 'Foo')).toBe('FooBar')
    })
  })

  test('Profile - multiples models with common local references', () => {
    const runtime = createRuntimeDefinition(profilesDefinition)
    expect(runtime).toMatchSnapshot()
  })

  test('Profile definition with added model view', () => {
    const runtime = createRuntimeDefinition({
      ...profilesDefinition,
      views: { models: { GenericProfileID: { version: { type: 'documentVersion' } } } },
    })
    expect(runtime).toMatchSnapshot()
  })

  test('Note model definition with views', () => {
    const noteDefinition = mockDefinitionFromSchema(noteSchema)
    const runtime = createRuntimeDefinition(noteDefinition)
    expect(runtime).toMatchSnapshot()
  })

  test('Post with comments relations', () => {
    const postDefinition = mockDefinitionFromSchema(postSchema)
    expect(createRuntimeDefinition(postDefinition)).toMatchSnapshot()

    const commentDefinition = mockDefinitionFromSchema(
      createCommentSchemaWithPost('PostID'),
      postDefinition.models
    )
    expect(createRuntimeDefinition(commentDefinition)).toMatchSnapshot()

    const postWithCommentsDefinition = mockDefinitionFromSchema(
      loadPostSchemaWithComments('PostID', 'CommentID'),
      commentDefinition.models
    )
    expect(createRuntimeDefinition(postWithCommentsDefinition)).toMatchSnapshot()
  })
})
