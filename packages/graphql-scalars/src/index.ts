import { RuntimeScalarType } from '@composedb/types'
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  type GraphQLScalarType,
  GraphQLString,
} from 'graphql'
import {
  GraphQLCountryCode,
  GraphQLDate,
  //GraphQLDateTime,
  GraphQLDID,
  GraphQLTime,
} from 'graphql-scalars'

import { CeramicCommitID, CeramicStreamID } from './ceramic.js'

//@TODO Remove these imports when https://github.com/Urigo/graphql-scalars/pull/1641 is merged
import { DateTime as GraphQLDateTime } from './datetime.js'
export { DateTime as GraphQLDateTime } from './datetime.js'

export {
  GraphQLCountryCode,
  GraphQLDate,
  //GraphQLDateTime,
  GraphQLDID,
  GraphQLTime,
} from 'graphql-scalars'
export { CeramicCommitID, CeramicStreamID } from './ceramic.js'

export type ScalarMap = Record<RuntimeScalarType, GraphQLScalarType>

export const scalars: ScalarMap = {
  boolean: GraphQLBoolean,
  commitid: CeramicCommitID,
  countrycode: GraphQLCountryCode,
  date: GraphQLDate,
  datetime: GraphQLDateTime,
  did: GraphQLDID,
  float: GraphQLFloat,
  id: GraphQLID,
  integer: GraphQLInt,
  streamid: CeramicStreamID,
  string: GraphQLString,
  time: GraphQLTime,
}

export const scalarTypes = Object.keys(scalars)

export function isSupportedScalar(type: string): type is RuntimeScalarType {
  return scalarTypes.includes(type)
}

export function getScalar(type: RuntimeScalarType): GraphQLScalarType {
  if (isSupportedScalar(type)) {
    return scalars[type]
  }
  throw new Error(`Unsupported scalar type: ${type as string}`)
}
