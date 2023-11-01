/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { noteSchema, postSchema, profilesSchema, socialSchema } from '@composedb/test-schemas'

import { createRuntimeDefinition, getName, mockDefinitionFromSchema } from '../src'

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
    const runtime = createRuntimeDefinition(postDefinition)
    expect(runtime).toMatchSnapshot()
  })

  test('Social with account reference', () => {
    const socialDefinition = mockDefinitionFromSchema(socialSchema)
    const runtime = createRuntimeDefinition(socialDefinition)
    expect(runtime).toMatchSnapshot()
  })
})
