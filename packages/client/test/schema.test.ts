import {
  type CreateModelDefinition,
  createAbstractCompositeDefinition,
  createRuntimeDefinition,
} from '@composedb/devtools'
import { noteSchema, profilesSchema } from '@composedb/test-schemas'
import type { RuntimeCompositeDefinition } from '@composedb/types'

import { printGraphQLSchema } from '../src'

function createSchemaDefinition(schema: string): RuntimeCompositeDefinition {
  const { models, commonEmbeds } = createAbstractCompositeDefinition(schema)
  return createRuntimeDefinition({
    version: '1.0',
    commonEmbeds,
    models: Object.values(models).reduce((acc, model) => {
      const definition = (model as CreateModelDefinition).definition
      acc[`${definition.name}ID`] = definition
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
