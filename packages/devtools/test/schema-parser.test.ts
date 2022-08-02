/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ImageMetadataType, mediaSchema, profilesSchema } from '@composedb/test-schemas'
import ajv from 'ajv/dist/2020'
import { inspect } from 'node:util'

import { SchemaParser } from '../src/schema/parser.js'

describe('schema parser', () => {
  test('media schema', () => {
    const parser = new SchemaParser(mediaSchema)
    const defs = parser.parse()
    console.log(inspect(defs, { colors: true, depth: null }))
  })

  test('profiles schema', () => {
    const parser = new SchemaParser(profilesSchema)
    const defs = parser.parse()
    console.log(inspect(defs, { colors: true, depth: null }))
  })
})
