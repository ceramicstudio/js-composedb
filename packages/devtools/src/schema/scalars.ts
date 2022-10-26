import { scalars as graphQLScalars } from '@composedb/graphql-scalars'
import type { CustomRuntimeScalarType, JSONSchema } from '@composedb/types'
import { GraphQLScalarType } from 'graphql'
import { isEqual } from 'lodash-es'

import type { ScalarSchema } from '../types.js'

export type ScalarTitle =
  | 'CeramicCommitID'
  | 'GraphQLCountryCode'
  | 'GraphQLDate'
  | 'GraphQLDateTime'
  | 'GraphQLDID'
  | 'GraphQLID'
  | 'CeramicStreamID'
  | 'GraphQLTime'

type ScalarWithTitle = ScalarSchema & { title: ScalarTitle }
type StringScalarWithTile = JSONSchema.String & { title: ScalarTitle }

export const SCALAR_RUNTIME_TYPES: Record<ScalarTitle, CustomRuntimeScalarType> = {
  CeramicCommitID: 'commitid',
  CeramicStreamID: 'streamid',
  GraphQLCountryCode: 'countrycode',
  GraphQLDate: 'date',
  GraphQLDateTime: 'datetime',
  GraphQLDID: 'did',
  GraphQLID: 'id',
  GraphQLTime: 'time',
}

const SCALAR_SCHEMA_TITLES = Object.entries(SCALAR_RUNTIME_TYPES).reduce((acc, [title, type]) => {
  acc[type] = title
  return acc
}, {} as Record<string, string>) as Record<CustomRuntimeScalarType, ScalarTitle>

export function getGraphQLScalarSchema(type: CustomRuntimeScalarType): StringScalarWithTile {
  // The GraphQL Scalars library provides the JSON schema matching the scalars it exposes
  const schema = graphQLScalars[type]?.extensions.jsonSchema as JSONSchema.String | undefined
  if (schema == null) {
    throw new Error(`Missing JSON schema in scalar extensions for type: ${type}`)
  }
  // Ensure we have an explicit set title for the scalar for unique identification between tools and runtime
  const title = SCALAR_SCHEMA_TITLES[type]
  if (title == null) {
    throw new Error(`Missing schema title for scalar: ${type}`)
  }
  return { ...schema, title }
}

export const extraScalars: Record<string, ScalarWithTitle> = {
  CommitID: { type: 'string', title: 'CeramicCommitID', maxLength: 200 },
  CountryCode: { ...getGraphQLScalarSchema('countrycode'), maxLength: 2 },
  Date: { ...getGraphQLScalarSchema('date'), maxLength: 100 },
  DateTime: { ...getGraphQLScalarSchema('datetime'), maxLength: 100 },
  DID: { ...getGraphQLScalarSchema('did'), maxLength: 100 },
  StreamID: { type: 'string', title: 'CeramicStreamID', maxLength: 100 },
  Time: { ...getGraphQLScalarSchema('time'), maxLength: 100 },
}

const scalars: Record<string, ScalarSchema> = {
  ...extraScalars,
  Boolean: { type: 'boolean' },
  Float: { type: 'number' },
  ID: { type: 'string', title: 'GraphQLID', maxLength: 100 },
  Int: { type: 'integer' },
  String: { type: 'string' },
}

export type SupportedScalarName = keyof typeof scalars

export function getScalarSchema(scalar: GraphQLScalarType | string): ScalarSchema {
  const name = scalar instanceof GraphQLScalarType ? scalar.name : scalar
  const schema = scalars[name]
  if (schema == null) {
    throw new Error(`Unsupported scalar name: ${name}`)
  }
  return { ...schema }
}

const scalarsByTitle = Object.values(scalars).reduce((acc, schema) => {
  if (schema.title != null) {
    acc[schema.title] = schema
  }
  return acc
}, {} as Record<string, ScalarSchema>)

export function isCommonScalar(schema: ScalarSchema): boolean {
  if (schema.title == null) {
    return false
  }
  const scalar = scalarsByTitle[schema.title]
  return isEqual(scalar, schema)
}
