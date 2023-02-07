import { extraScalarsSchema } from '@composedb/test-schemas'

import { createRuntimeDefinition, mockDefinitionFromSchema } from '../src'

describe('scalars', () => {
  test('support extra scalars', () => {
    const scalarsDefinition = mockDefinitionFromSchema(extraScalarsSchema)
    expect(scalarsDefinition).toMatchSnapshot()
    const runtime = createRuntimeDefinition(scalarsDefinition)
    expect(runtime).toMatchSnapshot()
  })
})
