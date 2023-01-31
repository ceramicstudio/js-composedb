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
  GraphQLDID,
  GraphQLDuration,
  GraphQLLatitude,
  GraphQLLocalDate,
  GraphQLLocale,
  GraphQLLocalTime,
  GraphQLLongitude,
  GraphQLTimeZone,
  GraphQLUtcOffset,
} from 'graphql-scalars'

import { CeramicCommitID, CeramicStreamID } from './ceramic.js'
import { ChainAgnosticAccountID, ChainAgnosticChainID } from './chain-agnostic.js'
// TODO: Remove these imports when https://github.com/Urigo/graphql-scalars/pull/1641 is merged
import { GraphQLDate, GraphQLDateTime, GraphQLTime } from './datetime.js'
import { InterPlanetaryCID } from './inter-planetary.js'
import { GraphQLURI } from './uri.js'

export {
  GraphQLCountryCode,
  GraphQLDID,
  GraphQLDuration,
  GraphQLLatitude,
  GraphQLLocalDate,
  GraphQLLocale,
  GraphQLLocalTime,
  GraphQLLongitude,
  GraphQLTimeZone,
  GraphQLUtcOffset,
} from 'graphql-scalars'
export { CeramicCommitID, CeramicStreamID } from './ceramic.js'
export { ChainAgnosticAccountID, ChainAgnosticChainID } from './chain-agnostic.js'
export { GraphQLDate, GraphQLDateTime, GraphQLTime } from './datetime.js'
export { InterPlanetaryCID } from './inter-planetary.js'
export { GraphQLURI } from './uri.js'

export type ScalarMap = Record<RuntimeScalarType, GraphQLScalarType>

export const scalars: ScalarMap = {
  accountid: ChainAgnosticAccountID,
  boolean: GraphQLBoolean,
  chainid: ChainAgnosticChainID,
  cid: InterPlanetaryCID,
  commitid: CeramicCommitID,
  countrycode: GraphQLCountryCode,
  date: GraphQLDate,
  datetime: GraphQLDateTime,
  did: GraphQLDID,
  duration: GraphQLDuration,
  float: GraphQLFloat,
  id: GraphQLID,
  integer: GraphQLInt,
  latitude: GraphQLLatitude,
  localdate: GraphQLLocalDate,
  locale: GraphQLLocale,
  localtime: GraphQLLocalTime,
  longitude: GraphQLLongitude,
  streamid: CeramicStreamID,
  string: GraphQLString,
  time: GraphQLTime,
  timezone: GraphQLTimeZone,
  uri: GraphQLURI,
  utcoffset: GraphQLUtcOffset,
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
