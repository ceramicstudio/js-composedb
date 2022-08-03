/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { noteSchema, profilesSchema } from '@composedb/test-schemas'

import { createRuntimeDefinition, getName, createAbstractCompositeDefinition } from '../src'
import type { CreateModelDefinition } from '../src/schema/types'

describe('Runtime format', () => {
  const parsedProfiles = createAbstractCompositeDefinition(profilesSchema)
  const profilesDefinition = {
    version: '1.0',
    commonEmbeds: parsedProfiles.commonEmbeds,
    models: Object.values(parsedProfiles.models).reduce((acc, model) => {
      const definition = (model as CreateModelDefinition).definition
      acc[`${definition.name}ID`] = definition
      return acc
    }, {}),
  }

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
    const { models } = createAbstractCompositeDefinition(noteSchema)
    const runtime = createRuntimeDefinition({
      version: '1.0',
      models: Object.values(models).reduce((acc, model) => {
        const definition = (model as CreateModelDefinition).definition
        acc[`${definition.name}ID`] = definition
        return acc
      }, {}),
    })
    expect(runtime).toMatchSnapshot()
  })
})
