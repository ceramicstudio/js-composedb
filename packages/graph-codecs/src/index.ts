import { AccountRelationCodec } from '@composedb/model-codecs'
import * as io from 'io-ts'

export const GraphScalarCommonCodec = io.strict({ required: io.boolean })

export const GraphBooleanScalarCodec = io.intersection(
  [GraphScalarCommonCodec, io.strict({ type: io.literal('boolean') })],
  'GraphBooleanScalar'
)

export const GraphIntegerScalarCodec = io.intersection(
  [GraphScalarCommonCodec, io.strict({ type: io.literal('integer') })],
  'GraphIntegerScalar'
)

export const GraphFloatScalarCodec = io.intersection(
  [GraphScalarCommonCodec, io.strict({ type: io.literal('float') })],
  'GraphFloatScalar'
)

export const GraphStringScalarCodec = io.intersection(
  [
    GraphScalarCommonCodec,
    io.strict({ type: io.literal('string') }),
    io.partial({ maxLength: io.number }),
  ],
  'GraphStringScalar'
)

export const GraphCustomScalarTypeCodec = io.keyof({
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
export type GraphCustomScalarType = io.TypeOf<typeof GraphCustomScalarTypeCodec>

export const GraphCustomStringScalarCodec = io.intersection(
  [
    GraphScalarCommonCodec,
    io.strict({ type: GraphCustomScalarTypeCodec }),
    io.partial({ maxLength: io.number }),
  ],
  'GraphCustomStringScalar'
)
export type GraphCustomStringScalar = io.TypeOf<typeof GraphCustomStringScalarCodec>

export const GraphScalarCodec = io.union(
  [
    GraphBooleanScalarCodec,
    GraphIntegerScalarCodec,
    GraphFloatScalarCodec,
    GraphStringScalarCodec,
    GraphCustomStringScalarCodec,
  ],
  'GraphScalar'
)
export type GraphScalar = io.TypeOf<typeof GraphScalarCodec>

export const GraphReferenceTypeCodec = io.keyof(
  {
    connection: null, // to many documents relation
    enum: null, // string enum
    node: null, // to single document relation
    object: null, // embedded object in document
    // union: null, // embedded object union -- not supported yet
  },
  'GraphReferenceType'
)
export type GraphReferenceType = io.TypeOf<typeof GraphReferenceTypeCodec>

function createReferenceCodec(refType: io.Mixed, name?: string) {
  return io.intersection(
    [
      GraphScalarCommonCodec,
      io.strict({ type: io.literal('reference'), refType, refName: io.string }),
    ],
    name
  )
}

export const GraphReferenceCodec = createReferenceCodec(GraphReferenceTypeCodec, 'GraphReference')
export type GraphReference<Type extends GraphReferenceType> = io.TypeOf<
  typeof GraphReferenceCodec
> & { refType: Type }

export const GraphListCodec = io.intersection(
  [
    GraphScalarCommonCodec,
    io.strict({
      type: io.literal('list'),
      item: io.union([
        GraphScalarCodec,
        createReferenceCodec(io.keyof({ enum: null, object: null })),
      ]),
    }),
  ],
  'GraphList'
)
export type GraphList = io.TypeOf<typeof GraphListCodec>

export const GraphRelationSourceCodec = io.keyof(
  {
    document: null,
    queryConnection: null,
    queryCount: null,
  },
  'GraphRelationSource'
)
export type GraphRelationSource = io.TypeOf<typeof GraphRelationSourceCodec>

export const GraphRelationCodec = io.strict(
  {
    source: GraphRelationSourceCodec,
    model: io.string,
    property: io.string,
  },
  'GraphRelation'
)
export type GraphRelation = io.TypeOf<typeof GraphRelationCodec>

export const GraphViewTypeCodec = io.keyof(
  { documentAccount: null, documentVersion: null },
  'GraphViewType'
)
export type GraphViewType = io.TypeOf<typeof GraphViewTypeCodec>

export const GraphViewFieldCodec = io.union(
  [
    io.strict({
      type: io.literal('view'),
      viewType: io.literal('relation'),
      relation: GraphRelationCodec,
    }),
    io.strict({ type: io.literal('view'), viewType: GraphViewTypeCodec }),
  ],
  'GraphViewField'
)
export type GraphViewField = io.TypeOf<typeof GraphViewFieldCodec>

export const GraphObjectFieldCodec = io.union(
  [GraphScalarCodec, GraphListCodec, GraphReferenceCodec, GraphViewFieldCodec],
  'GraphObjectField'
)
export type GraphObjectField = io.TypeOf<typeof GraphObjectFieldCodec>

export const GraphObjectFieldsCodec = io.record(
  io.string,
  GraphObjectFieldCodec,
  'GraphObjectFields'
)
export type GraphObjectFields = io.TypeOf<typeof GraphObjectFieldsCodec>

export const GraphViewReferenceTypeCodec = io.keyof(
  { connection: null, node: null },
  'GraphViewReferenceType'
)
export type GraphViewReferenceType = io.TypeOf<typeof GraphViewReferenceTypeCodec>

export const GraphViewReferenceCodec = io.strict(
  { type: GraphViewReferenceTypeCodec, name: io.string },
  'GraphViewReference'
)
export type GraphViewReference = io.TypeOf<typeof GraphViewReferenceCodec>

export const GraphModelCodec = io.strict(
  { id: io.string, accountRelation: AccountRelationCodec },
  'GraphModel'
)
export type GraphModel = io.TypeOf<typeof GraphModelCodec>

export const GraphDefinitionCodec = io.intersection(
  [
    io.strict({
      models: io.record(io.string, GraphModelCodec),
      objects: io.record(io.string, GraphObjectFieldsCodec),
      enums: io.record(io.string, io.array(io.string)),
      accountData: io.record(io.string, GraphViewReferenceCodec),
    }),
    io.partial({ query: io.record(io.string, GraphViewReferenceCodec) }),
  ],
  'GraphDefinition'
)
export type GraphDefinition = io.TypeOf<typeof GraphDefinitionCodec>
