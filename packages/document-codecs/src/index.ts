import { didCodec } from '@composedb/ceramic-codecs'
import * as io from 'io-ts'

export const DocumentCodec = io.strict(
  {
    id: io.string,
    tip: io.string,
    model: io.string,
    controller: didCodec,
    content: io.UnknownRecord,
  },
  'Document'
)
export type Document<Content extends Record<string, unknown> = Record<string, unknown>> = io.TypeOf<
  typeof DocumentCodec
> & { content: Content }

export const UniqueDocumentCodec = io.intersection(
  [DocumentCodec, io.strict({ unique: io.string })],
  'UniqueDocument'
)
export type UniqueDocument = io.TypeOf<typeof UniqueDocumentCodec>

export const StringFilterCodec = io.partial(
  {
    is: io.string,
    not: io.string,
    in: io.array(io.string),
  },
  'StringFilter'
)
export type StringFilter = io.TypeOf<typeof StringFilterCodec>

export const SortOrderCodec = io.keyof({ ASC: null, DESC: null }, 'sortOrder')
export type SortOrder = io.TypeOf<typeof SortOrderCodec>

export const SortByCodec = io.strict(
  {
    field: io.string,
    order: SortOrderCodec,
    nullsFirst: io.boolean,
  },
  'SortBy'
)
export type SortBy = io.TypeOf<typeof SortByCodec>

export const DocumentQueryCodec = io.intersection(
  [
    io.strict({ models: io.array(io.string) }),
    io.partial({
      account: io.string,
      filter: io.record(io.string, StringFilterCodec),
      sort: io.array(SortByCodec),
    }),
  ],
  'DocumentQuery'
)
export type DocumentQuery = io.TypeOf<typeof DocumentQueryCodec>

export const cursorCodec = io.union([io.string, io.null], 'cursor')

export const PaginationCodec = io.partial(
  {
    first: io.union([io.number, io.null]),
    after: cursorCodec,
    last: io.union([io.number, io.null]),
    before: cursorCodec,
  },
  'Pagination'
)
export type Pagination = io.TypeOf<typeof PaginationCodec>

export const PaginationQueryCodec = io.intersection(
  [DocumentQueryCodec, PaginationCodec],
  'PaginationQuery'
)
export type PaginationQuery = io.TypeOf<typeof PaginationQueryCodec>

export const DocumentEdgeCodec = io.strict(
  { cursor: io.string, node: DocumentCodec },
  'DocumentEdge'
)
export type DocumentEdge = io.TypeOf<typeof DocumentEdgeCodec>

export const PageInfoCodec = io.strict(
  {
    totalCount: io.number,
    startCursor: cursorCodec,
    endCursor: cursorCodec,
    hasPreviousPage: io.boolean,
    hasNextPage: io.boolean,
  },
  'PageInfo'
)
export type PageInfo = io.TypeOf<typeof PageInfoCodec>

export const PaginationResultCodec = io.strict(
  {
    edges: io.array(DocumentEdgeCodec),
    pageInfo: PageInfoCodec,
  },
  'PaginationResult'
)
export type PaginationResult = io.TypeOf<typeof PaginationResultCodec>
