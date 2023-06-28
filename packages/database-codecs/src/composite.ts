import { GraphDefinitionCodec } from '@composedb/graph-codecs'
import * as io from 'io-ts'

import { nullableDate, nullableString } from './nullable.js'

export const CompositeEntityCodec = io.intersection(
  [
    io.strict({
      id: io.string,
      commonEmbeds: io.array(io.string),
      graph: GraphDefinitionCodec,
      isEnabled: io.boolean,
      mutationsEnabled: io.boolean,
      subscriptionsEnabled: io.boolean,
    }),
    io.partial({
      label: nullableString,
      description: nullableString,
      createdAt: nullableDate,
      updatedAt: nullableDate,
    }),
  ],
  'CompositeEntity'
)
export type CompositeEntity = io.TypeOf<typeof CompositeEntityCodec>

export const CompositesQueryCodec = io.partial({ model: io.string }, 'CompositesQuery')
export type CompositesQuery = io.TypeOf<typeof CompositesQueryCodec>
