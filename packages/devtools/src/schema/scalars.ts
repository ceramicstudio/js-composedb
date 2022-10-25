import { scalars as graphQLScalars } from '@composedb/graphql-scalars'
import type { CustomRuntimeScalarType, JSONSchema } from '@composedb/types'
import { GraphQLScalarType } from 'graphql'
import { isEqual } from 'lodash-es'

import type { ScalarSchema } from '../types.js'

export type ScalarTitle =
  | 'CeramicCommitID'
  | 'CeramicStreamID'
  | 'ChainAgnosticAccountID'
  | 'ChainAgnosticChainID'
  | 'GraphQLCountryCode'
  | 'GraphQLDate'
  | 'GraphQLDateTime'
  | 'GraphQLDID'
  | 'GraphQLDuration'
  | 'GraphQLID'
  | 'GraphQLLatitude'
  | 'GraphQLLocalDate'
  | 'GraphQLLocale'
  | 'GraphQLLocalTime'
  | 'GraphQLLongitude'
  | 'GraphQLTime'
  | 'GraphQLTimeZone'
  | 'GraphQLURL'
  | 'GraphQLUtcOffset'
  | 'InterPlanetaryCID'

type ScalarWithTitle = ScalarSchema & { title: ScalarTitle }

export const SCALAR_RUNTIME_TYPES: Record<ScalarTitle, CustomRuntimeScalarType> = {
  CeramicCommitID: 'commitid',
  CeramicStreamID: 'streamid',
  ChainAgnosticAccountID: 'accountid',
  ChainAgnosticChainID: 'chainid',
  GraphQLCountryCode: 'countrycode',
  GraphQLDate: 'date',
  GraphQLDateTime: 'datetime',
  GraphQLDID: 'did',
  GraphQLDuration: 'duration',
  GraphQLID: 'id',
  GraphQLLatitude: 'latitude',
  GraphQLLocalDate: 'localdate',
  GraphQLLocale: 'locale',
  GraphQLLocalTime: 'localtime',
  GraphQLLongitude: 'longitude',
  GraphQLTime: 'time',
  GraphQLTimeZone: 'timezone',
  GraphQLURL: 'url',
  GraphQLUtcOffset: 'utcoffset',
  InterPlanetaryCID: 'cid',
}

const SCALAR_SCHEMA_TITLES = Object.entries(SCALAR_RUNTIME_TYPES).reduce((acc, [title, type]) => {
  acc[type] = title
  return acc
}, {} as Record<string, string>) as Record<CustomRuntimeScalarType, ScalarTitle>

export function getGraphQLScalarSchema<T extends ScalarSchema = ScalarSchema>(
  type: CustomRuntimeScalarType
): T & { title: ScalarTitle } {
  // The GraphQL Scalars library provides the JSON schema matching the scalars it exposes
  const schema = graphQLScalars[type]?.extensions.jsonSchema as T | undefined
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
  AccountID: { type: 'string', title: 'ChainAgnosticAccountID', maxLength: 106 },
  ChainID: { type: 'string', title: 'ChainAgnosticChainID', maxLength: 41 },
  CID: { type: 'string', title: 'InterPlanetaryCID', maxLength: 100 },
  CommitID: { type: 'string', title: 'CeramicCommitID', maxLength: 200 },
  CountryCode: { ...getGraphQLScalarSchema<JSONSchema.String>('countrycode'), maxLength: 2 },
  Date: { ...getGraphQLScalarSchema<JSONSchema.String>('date'), maxLength: 100 },
  DateTime: { ...getGraphQLScalarSchema<JSONSchema.String>('datetime'), maxLength: 100 },
  DID: { ...getGraphQLScalarSchema<JSONSchema.String>('did'), maxLength: 100 },
  Latitude: getGraphQLScalarSchema('latitude'),
  LocalDate: { ...getGraphQLScalarSchema<JSONSchema.String>('localdate'), maxLength: 100 },
  Locale: { ...getGraphQLScalarSchema<JSONSchema.String>('locale'), maxLength: 100 },
  LocalTime: { ...getGraphQLScalarSchema<JSONSchema.String>('localtime'), maxLength: 100 },
  Longitude: getGraphQLScalarSchema('longitude'),
  StreamID: { type: 'string', title: 'CeramicStreamID', maxLength: 100 },
  Time: { ...getGraphQLScalarSchema<JSONSchema.String>('time'), maxLength: 100 },
  TimeZone: { ...getGraphQLScalarSchema<JSONSchema.String>('timezone'), maxLength: 100 },
  URL: { ...getGraphQLScalarSchema<JSONSchema.String>('url'), maxLength: 100 },
  UTCOffset: { ...getGraphQLScalarSchema<JSONSchema.String>('utcoffset'), maxLength: 100 },
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
