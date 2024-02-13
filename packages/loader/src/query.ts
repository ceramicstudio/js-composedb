import type {
  BaseQuery,
  Page,
  Pagination,
  PaginationQuery,
  StreamState,
} from '@ceramicnetwork/common'
import { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import type { CeramicAPI } from '@composedb/types'
import type { Connection, ConnectionArguments } from 'graphql-relay'

export type ConnectionQuery = BaseQuery & ConnectionArguments

export function toPaginationQuery(source: ConnectionQuery): PaginationQuery {
  const { after, before, first, last, ...base } = source

  let pagination: Pagination | undefined
  if (first != null) {
    pagination = { first }
    if (after != null) {
      pagination.after = after
    }
  } else if (last != null) {
    pagination = { last }
    if (before != null) {
      pagination.before = before
    }
  }
  if (pagination == null) {
    throw new Error('Missing "first" or "last" connection argument')
  }

  return { ...base, ...pagination }
}

export function toRelayConnection(
  ceramic: CeramicAPI,
  page: Page<StreamState | null>,
): Connection<ModelInstanceDocument | null> {
  return {
    edges: (page.edges ?? []).map(({ cursor, node }) => {
      return {
        cursor,
        node: node ? ceramic.buildStreamFromState<ModelInstanceDocument>(node) : null,
      }
    }),
    pageInfo: {
      ...page.pageInfo,
      startCursor: page.pageInfo.startCursor ?? null,
      endCursor: page.pageInfo.endCursor ?? null,
    },
  }
}

export async function queryConnection(
  ceramic: CeramicAPI,
  query: ConnectionQuery,
): Promise<Connection<ModelInstanceDocument | null>> {
  const indexQuery = toPaginationQuery(query)
  const page = await ceramic.index.query(indexQuery)
  return toRelayConnection(ceramic, page)
}

export async function queryOne(
  ceramic: CeramicAPI,
  query: BaseQuery,
): Promise<ModelInstanceDocument | null> {
  const indexQuery = { ...query, last: 1 }
  const result = await ceramic.index.query(indexQuery)
  const node = result.edges?.[0]?.node
  return node ? ceramic.buildStreamFromState<ModelInstanceDocument>(node) : null
}
