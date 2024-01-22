import type {
  AnyValueFilter,
  BaseQuery,
  CeramicApi,
  ObjectFilter,
  Page,
  Pagination,
  PaginationQuery,
  QueryFilters,
  StreamState,
} from '@ceramicnetwork/common'
import { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
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
  ceramic: CeramicApi,
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
  ceramic: CeramicApi,
  query: ConnectionQuery,
): Promise<Connection<ModelInstanceDocument | null>> {
  const indexQuery = toPaginationQuery(query)
  const page = await ceramic.index.query(indexQuery)
  return toRelayConnection(ceramic, page)
}

export async function queryOne(
  ceramic: CeramicApi,
  query: BaseQuery,
): Promise<ModelInstanceDocument | null> {
  const indexQuery = { ...query, last: 1 }
  const result = await ceramic.index.query(indexQuery)
  const node = result.edges?.[0]?.node
  return node ? ceramic.buildStreamFromState<ModelInstanceDocument>(node) : null
}

const GREATER_THAN_CONDITIONS = ['greaterThan', 'greaterThanOrEqualTo']
const LESS_THAN_CONDITIONS = ['lessThan', 'lessThanOrEqualTo']
export function areValidRangeValueConditions(a: string, b: string): boolean {
  return (
    (GREATER_THAN_CONDITIONS.includes(a) && LESS_THAN_CONDITIONS.includes(b)) ||
    (GREATER_THAN_CONDITIONS.includes(b) && LESS_THAN_CONDITIONS.includes(a))
  )
}

export function assertValidAnyValueFilter(
  filter: Record<string, unknown>,
): asserts filter is AnyValueFilter {
  if (filter == null) {
    throw new Error('No value filter provided')
  }

  const keys = Object.keys(filter)
  if (keys.length === 0) {
    throw new Error('Invalid empty value filter')
  }
  if (keys.length > 2) {
    throw new Error('Too many conditions provided in value filter')
  }
  if (keys.length === 2) {
    if (areValidRangeValueConditions(keys[0], keys[1])) {
      return
    }
    throw new Error('Invalid range conditions in value filter')
  }

  const key = keys[0]
  const value = filter[key]
  switch (key) {
    case 'in':
    case 'notIn':
      if (!Array.isArray(value)) {
        throw new Error(`Invalid value for condition "${key}": must be an array`)
      }
      return
    case 'isNull':
    case 'equalTo':
    case 'notEqualTo':
      return
    default:
      if (GREATER_THAN_CONDITIONS.includes(key) || LESS_THAN_CONDITIONS.includes(key)) {
        return
      }
      throw new Error(`Unexpected condition "${key}" in value filter`)
  }
}

export function assertValidObjectFilter(
  filter: Record<string, Record<string, unknown>>,
): asserts filter is ObjectFilter {
  if (filter == null) {
    throw new Error('No object filter provided')
  }

  const values = Object.values(filter)
  if (values.length === 0) {
    throw new Error('Empty object filter')
  }
  values.forEach(assertValidAnyValueFilter)
}

export function assertValidQueryFilters(
  filters: Record<string, unknown>,
): asserts filters is QueryFilters {
  if (filters == null) {
    throw new Error('No query filters provided')
  }

  const keys = Object.keys(filters)
  if (keys.length !== 1) {
    throw new Error('Invalid query filters: a single key must be provided')
  }

  const key = keys[0]
  const value = filters[key]
  if (value == null) {
    throw new Error('Invalid query filters: missing filter value')
  }

  switch (key) {
    case 'where':
      assertValidObjectFilter(value as Record<string, Record<string, unknown>>)
      return
    case 'not':
      assertValidQueryFilters(value as Record<string, Record<string, unknown>>)
      return
    case 'and':
    case 'or':
      if (!Array.isArray(value)) {
        throw new Error(`Invalid value for "${key}" filter: must be an array`)
      }
      value.forEach(assertValidQueryFilters)
      return
    default:
      throw new Error(
        `Invalid query filter type: expecting "where", "and", "or" or "not" key but got "${key}"`,
      )
  }
}

export function createRelationQueryFilters(
  relationKey: string,
  targetID: string,
  customFilters?: QueryFilters,
): QueryFilters {
  const filters: QueryFilters = {
    where: { [relationKey]: { equalTo: targetID } },
  }
  if (customFilters == null) {
    return filters
  }

  assertValidQueryFilters(customFilters)
  return { and: [filters, customFilters] }
}
