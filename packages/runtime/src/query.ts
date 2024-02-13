import type { AnyValueFilter, ObjectFilter, QueryFilters } from '@ceramicnetwork/common'

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
