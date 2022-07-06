import type { JSONSchema } from '@composedb/types'

export type ScalarSchema =
  | JSONSchema.Boolean
  | JSONSchema.Integer
  | JSONSchema.Number
  | JSONSchema.String

export type AnySchema = ScalarSchema | JSONSchema.Array | JSONSchema.Object
