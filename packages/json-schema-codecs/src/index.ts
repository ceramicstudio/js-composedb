import Ajv from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import * as io from 'io-ts'
import type { JSONSchema } from 'json-schema-typed/draft-2020-12'

const ajv = new Ajv({
  strict: true,
  allErrors: true,
  allowMatchingProperties: false,
  ownProperties: false,
  unevaluated: false,
})
addFormats(ajv)

export type { JSONSchema } from 'json-schema-typed/draft-2020-12'

export type SchemaType =
  | JSONSchema.Boolean
  | JSONSchema.Integer
  | JSONSchema.Number
  | JSONSchema.String
  | JSONSchema.Array
  | JSONSchema.Object

export function createSchemaCodec<T extends SchemaType>(type: T['type'], name: string): io.Type<T> {
  function isSchemaType(input: unknown): input is T {
    return typeof input === 'object' && input != null && (input as T).type === type
  }

  return new io.Type<T>(
    name,
    isSchemaType,
    (input, context) => {
      if (!isSchemaType(input)) {
        return io.failure(input, context, `Input is not a JSON schema of type: ${type as string}`)
      }

      const isValid = ajv.validateSchema(input)
      // Remove schema from the Ajv instance's cache, otherwise the ajv cache grows unbounded
      ajv.removeSchema(input)

      return isValid
        ? io.success(input)
        : io.failure(input, context, `Schema validation failed: ${ajv.errorsText()}`)
    },
    io.identity
  )
}

export const BooleanSchemaCodec = createSchemaCodec<JSONSchema.Boolean>('boolean', 'BooleanSchema')
export type BooleanSchema = io.TypeOf<typeof BooleanSchemaCodec>

export const IntegerSchemaCodec = createSchemaCodec<JSONSchema.Integer>('integer', 'IntegerSchema')
export type IntegerSchema = io.TypeOf<typeof IntegerSchemaCodec>

export const NumberSchemaCodec = createSchemaCodec<JSONSchema.Number>('number', 'NumberSchema')
export type NumberSchema = io.TypeOf<typeof NumberSchemaCodec>

export const StringSchemaCodec = createSchemaCodec<JSONSchema.String>('string', 'StringSchema')
export type StringSchema = io.TypeOf<typeof StringSchemaCodec>

export const ScalarSchemaCodec = io.union(
  [BooleanSchemaCodec, IntegerSchemaCodec, NumberSchemaCodec, StringSchemaCodec],
  'ScalarSchema'
)
export type ScalarSchema = io.TypeOf<typeof ScalarSchemaCodec>

export const ArraySchemaCodec = createSchemaCodec<JSONSchema.Array>('array', 'ArraySchema')
export type ArraySchema = io.TypeOf<typeof ArraySchemaCodec>

export const ObjectSchemaCodec = createSchemaCodec<JSONSchema.Object>('object', 'ObjectSchema')
export type ObjectSchema = io.TypeOf<typeof ObjectSchemaCodec>

export const AnySchemaCodec = io.union(
  [ScalarSchemaCodec, ArraySchemaCodec, ObjectSchemaCodec],
  'AnySchema'
)
export type AnySchema = io.TypeOf<typeof AnySchemaCodec>
