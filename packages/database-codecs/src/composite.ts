import { GraphDefinitionCodec } from '@composedb/graph-codecs'
import * as io from 'io-ts'

const nullableString = io.union([io.string, io.null])

export const CompositeEntityCodec = io.intersection(
  [
    io.strict({
      id: io.string,
      graph: GraphDefinitionCodec,
      isEnabled: io.boolean,
      mutationsEnabled: io.boolean,
      subscriptionsEnabled: io.boolean,
    }),
    io.partial({
      label: nullableString,
      description: nullableString,
      createdAt: nullableString,
      updatedAt: nullableString,
    }),
  ],
  'CompositeEntity'
)
export type CompositeEntity = io.TypeOf<typeof CompositeEntityCodec>

export const CompositesQueryCodec = io.partial({ model: io.string }, 'CompositesQuery')
export type CompositesQuery = io.TypeOf<typeof CompositesQueryCodec>
