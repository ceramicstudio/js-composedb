import { AccountRelationCodec } from '@composedb/model-codecs'
import * as io from 'io-ts'

// TODO: move graph codecs to external package

export const ScalarCommonCodec = io.strict({ required: io.boolean })

export const BooleanScalarCodec = io.intersection(
  [ScalarCommonCodec, io.strict({ type: io.literal('boolean') })],
  'GraphBooleanScalar'
)

export const IntegerScalarCodec = io.intersection(
  [ScalarCommonCodec, io.strict({ type: io.literal('integer') })],
  'GraphIntegerScalar'
)

export const NumberScalarCodec = io.intersection(
  [ScalarCommonCodec, io.strict({ type: io.literal('number') })],
  'GraphNumberScalar'
)

export const StringScalarCodec = io.intersection(
  [
    ScalarCommonCodec,
    io.strict({ type: io.literal('string') }),
    io.partial({ maxLength: io.number }),
  ],
  'GraphStringScalar'
)

export const CustomScalarTypeCodec = io.keyof({
  accountid: null,
  chainid: null,
  cid: null,
  commitid: null,
  countrycode: null,
  date: null,
  datetime: null,
  did: null,
  duration: null,
  id: null,
  latitude: null,
  localdate: null,
  locale: null,
  localtime: null,
  longitude: null,
  streamid: null,
  time: null,
  timezone: null,
  uri: null,
  utcoffset: null,
})

export const CustomStringScalarCodec = io.intersection(
  [
    ScalarCommonCodec,
    io.strict({ type: CustomScalarTypeCodec }),
    io.partial({ maxLength: io.number }),
  ],
  'GraphCustomStringScalar'
)

export const ScalarCodec = io.union(
  [
    BooleanScalarCodec,
    IntegerScalarCodec,
    NumberScalarCodec,
    StringScalarCodec,
    CustomStringScalarCodec,
  ],
  'GraphScalar'
)

export const ReferenceTypeCodec = io.keyof(
  {
    connection: null, // to many documents relation
    enum: null, // string enum
    node: null, // to single document relation
    object: null, // embedded object in document
    // union: null, // embedded object union -- not supported yet
  },
  'GraphReferenceType'
)

function createReferenceCodec(refType: io.Mixed, name?: string) {
  return io.intersection(
    [ScalarCommonCodec, io.strict({ type: io.literal('reference'), refType, refName: io.string })],
    name
  )
}

export const ReferenceCodec = createReferenceCodec(ReferenceTypeCodec, 'GraphReference')

export const ListCodec = io.intersection(
  [
    ScalarCommonCodec,
    io.strict({
      type: io.literal('item'),
      item: io.union([ScalarCodec, createReferenceCodec(io.keyof({ enum: null, object: null }))]),
    }),
  ],
  'GraphList'
)

export const RelationSourceCodec = io.keyof(
  {
    document: null,
    queryConnection: null,
    queryCount: null,
  },
  'GraphRelationSource'
)

export const RelationCodec = io.strict(
  {
    source: RelationSourceCodec,
    model: io.string,
    property: io.string,
  },
  'GraphRelation'
)

export const ViewTypeCodec = io.keyof(
  { documentAccount: null, documentVersion: null },
  'GraphViewType'
)

export const ViewFieldCodec = io.union(
  [
    io.strict({
      type: io.literal('view'),
      viewType: io.literal('relation'),
      relation: RelationCodec,
    }),
    io.strict({ type: io.literal('view'), viewType: ViewTypeCodec }),
  ],
  'GraphViewField'
)

export const ObjectFieldCodec = io.union(
  [ScalarCodec, ListCodec, ReferenceCodec, ViewFieldCodec],
  'GraphObjectField'
)

export const ObjectFieldsCodec = io.record(io.string, ObjectFieldCodec, 'GraphObjectFields')

export const ViewReferenceTypeCodec = io.keyof(
  { connection: null, node: null },
  'GraphViewReferenceType'
)

export const ViewReferenceCodec = io.strict(
  { type: ViewReferenceTypeCodec, name: io.string },
  'GraphViewReference'
)

export const GraphModelCodec = io.strict(
  { id: io.string, accountRelation: AccountRelationCodec },
  'GraphModel'
)

export const GraphDefinitionCodec = io.intersection(
  [
    io.strict({
      models: io.record(io.string, GraphModelCodec),
      objects: io.record(io.string, ObjectFieldsCodec),
      enums: io.record(io.string, io.array(io.string)),
      accountData: io.record(io.string, ViewReferenceCodec),
    }),
    io.partial({ query: io.record(io.string, ViewReferenceCodec) }),
  ],
  'GraphDefinition'
)
