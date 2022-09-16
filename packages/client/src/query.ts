import type { BaseQuery, CeramicApi, Page, Pagination, StreamState } from '@ceramicnetwork/common'
import { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import type { Connection, ConnectionArguments } from 'graphql-relay'

export type ConnectionQuery = BaseQuery & ConnectionArguments
export type IndexQuery = BaseQuery & Pagination

export function toIndexQuery(source: ConnectionQuery): IndexQuery {
  const { after, before, first, last, ...base } = source
  let query: IndexQuery
  if (first != null) {
    query = { ...base, first }
    if (after != null) {
      // eslint-disable-next-line
      // @ts-ignore defined as read-only
      query.after = after
    }
    return query
  }
  if (last != null) {
    query = { ...base, last }
    if (before != null) {
      // eslint-disable-next-line
      // @ts-ignore defined as read-only
      query.before = before
    }
    return query
  }
  throw new Error('Missing "first" or "last" connection argument')
}

export function toRelayConnection(
  ceramic: CeramicApi,
  page: Page<StreamState>
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
  ceramic: CeramicApi,
  query: ConnectionQuery
): Promise<Connection<ModelInstanceDocument | null>> {
  const page = await ceramic.index.queryIndex(toIndexQuery(query))
  return toRelayConnection(ceramic, page)
}

export async function querySingle(
  ceramic: CeramicApi,
  query: BaseQuery
): Promise<ModelInstanceDocument | null> {
  const result = await ceramic.index.queryIndex({ ...query, last: 1 })
  const node = result.edges?.[0]?.node
  return node ? ceramic.buildStreamFromState<ModelInstanceDocument>(node) : null
}
