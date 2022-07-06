import { createRuntimeDefinition, parseCompositeSchema } from '@composedb/devtools'
import { noteSchema, profilesSchema } from '@composedb/test-schemas'
import type { RuntimeCompositeDefinition } from '@composedb/types'

import { printGraphQLSchema } from '../src'

function createSchemaDefinition(schema: string): RuntimeCompositeDefinition {
  const { models, commonEmbeds } = parseCompositeSchema(schema)
  return createRuntimeDefinition({
    version: '1.0',
    commonEmbeds,
    models: models.reduce((acc, model) => {
      acc[`${model.name}ID`] = model
      return acc
    }, {}),
  })
}

describe('schema', () => {
  test('printGraphQLSchema()', () => {
    expect(printGraphQLSchema(createSchemaDefinition(profilesSchema))).toMatchSnapshot()
    expect(printGraphQLSchema(createSchemaDefinition(noteSchema))).toMatchSnapshot()
  })
})
