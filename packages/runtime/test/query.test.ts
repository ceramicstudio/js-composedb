import {
  areValidRangeValueConditions,
  assertValidAnyValueFilter,
  assertValidObjectFilter,
  assertValidQueryFilters,
  createRelationQueryFilters,
} from '../src/query'

describe('query', () => {
  describe('areValidRangeValueConditions()', () => {
    test('fails for invalid condition name', () => {
      expect(areValidRangeValueConditions('lessThan', 'foo')).toBe(false)
    })

    test('fails for invalid matches', () => {
      expect(areValidRangeValueConditions('greaterThan', 'greaterThanOrEqualTo')).toBe(false)
      expect(areValidRangeValueConditions('greaterThanOrEqualTo', 'greaterThan')).toBe(false)
      expect(areValidRangeValueConditions('lessThan', 'lessThanOrEqualTo')).toBe(false)
      expect(areValidRangeValueConditions('lessThanOrEqualTo', 'lessThan')).toBe(false)
    })

    test('succeeds for valid matches', () => {
      expect(areValidRangeValueConditions('greaterThan', 'lessThan')).toBe(true)
      expect(areValidRangeValueConditions('greaterThanOrEqualTo', 'lessThan')).toBe(true)
      expect(areValidRangeValueConditions('greaterThan', 'lessThanOrEqualTo')).toBe(true)
      expect(areValidRangeValueConditions('greaterThanOrEqualTo', 'lessThanOrEqualTo')).toBe(true)
      expect(areValidRangeValueConditions('lessThan', 'greaterThan')).toBe(true)
      expect(areValidRangeValueConditions('lessThan', 'greaterThanOrEqualTo')).toBe(true)
      expect(areValidRangeValueConditions('lessThanOrEqualTo', 'greaterThan')).toBe(true)
      expect(areValidRangeValueConditions('lessThanOrEqualTo', 'greaterThanOrEqualTo')).toBe(true)
    })
  })

  describe('assertValidAnyValueFilter()', () => {
    test('throws if no argument is provided', () => {
      // @ts-expect-error missing argument
      expect(() => assertValidAnyValueFilter()).toThrow('No value filter provided')
    })

    test('throws if no conditions are provided', () => {
      expect(() => assertValidAnyValueFilter({})).toThrow('Invalid empty value filter')
    })

    test('throws if too many conditions are provided', () => {
      expect(() =>
        assertValidAnyValueFilter({ isNull: false, equalTo: 'foo', in: ['foo', 'bar'] }),
      ).toThrow('Too many conditions provided in value filter')
    })

    test('throws if two conditions are provided but not a valid range', () => {
      expect(() => assertValidAnyValueFilter({ lessThan: '2023', equalTo: 'foo' })).toThrow(
        'Invalid range conditions in value filter',
      )
    })

    test('throws if values are not array for "in" and "notIn" conditions', () => {
      expect(() => assertValidAnyValueFilter({ in: 'foo' })).toThrow(
        'Invalid value for condition "in": must be an array',
      )
      expect(() => assertValidAnyValueFilter({ notIn: 'foo' })).toThrow(
        'Invalid value for condition "notIn": must be an array',
      )
    })

    test('throws on unknown condition', () => {
      expect(() => assertValidAnyValueFilter({ foo: 'foo' })).toThrow(
        'Unexpected condition "foo" in value filter',
      )
    })

    test('succeeds with supported conditions', () => {
      expect(() => assertValidAnyValueFilter({ isNull: true })).not.toThrow()
      expect(() => assertValidAnyValueFilter({ equalTo: 'foo' })).not.toThrow()
      expect(() => assertValidAnyValueFilter({ notEqualTo: 'foo' })).not.toThrow()
      expect(() => assertValidAnyValueFilter({ in: ['foo'] })).not.toThrow()
      expect(() => assertValidAnyValueFilter({ notIn: ['foo', 'bar'] })).not.toThrow()
      expect(() => assertValidAnyValueFilter({ lessThan: 5 })).not.toThrow()
      expect(() =>
        assertValidAnyValueFilter({ greaterThan: 5, lessThanOrEqualTo: 2 }),
      ).not.toThrow()
    })
  })

  describe('assertValidObjectFilter()', () => {
    test('throws if no argument is provided', () => {
      // @ts-expect-error missing argument
      expect(() => assertValidObjectFilter()).toThrow('No object filter provided')
    })

    test('throws if the object filter is empty', () => {
      expect(() => assertValidObjectFilter({})).toThrow('Empty object filter')
    })

    test('throws if any value filter fails', () => {
      expect(() =>
        assertValidObjectFilter({ foo: { isNull: false }, bar: { test: false } }),
      ).toThrow('Unexpected condition "test" in value filter')
    })

    test('succeeds if all value filters pass validation', () => {
      expect(() =>
        assertValidObjectFilter({ foo: { isNull: false }, bar: { equalTo: 'baz' } }),
      ).not.toThrow()
    })
  })

  describe('assertValidQueryFilters()', () => {
    test('throws if no argument is provided', () => {
      // @ts-expect-error missing argument
      expect(() => assertValidQueryFilters()).toThrow('No query filters provided')
    })

    test('throws if no filters are provided', () => {
      expect(() => assertValidQueryFilters({})).toThrow(
        'Invalid query filters: a single key must be provided',
      )
    })

    test('throws if too many filters are provided', () => {
      expect(() => assertValidQueryFilters({ where: {}, not: { where: {} } })).toThrow(
        'Invalid query filters: a single key must be provided',
      )
    })

    test('throws if no filter value is provided', () => {
      expect(() => assertValidQueryFilters({ where: null })).toThrow(
        'Invalid query filters: missing filter value',
      )
    })

    test('throws if an invalid filter key is provided', () => {
      expect(() => assertValidQueryFilters({ foo: {} })).toThrow(
        'Invalid query filter type: expecting "where", "and", "or" or "not" key but got "foo"',
      )
    })

    test('throws the filter value for "and" is not an array', () => {
      expect(() => assertValidQueryFilters({ and: {} })).toThrow(
        'Invalid value for "and" filter: must be an array',
      )
    })

    test('throws the filter value for "or" is not an array', () => {
      expect(() => assertValidQueryFilters({ or: {} })).toThrow(
        'Invalid value for "or" filter: must be an array',
      )
    })

    test('recursively validates for "not" filter', () => {
      expect(() => assertValidQueryFilters({ not: { where: null } })).toThrow(
        'Invalid query filters: missing filter value',
      )
    })

    test('recursively validates for "and" filter', () => {
      expect(() =>
        assertValidQueryFilters({ and: [{ where: { foo: { equalTo: 'foo' } } }, { not: null }] }),
      ).toThrow('Invalid query filters: missing filter value')
    })

    test('recursively validates for "or" filter', () => {
      expect(() =>
        assertValidQueryFilters({ or: [{ where: { foo: { equalTo: 'foo' } } }, { not: null }] }),
      ).toThrow('Invalid query filters: missing filter value')
    })

    test('passes with valid filters', () => {
      expect(() =>
        assertValidQueryFilters({
          and: [
            { where: { foo: { equalTo: 'foo' } } },
            {
              or: [
                { not: { where: { foo: { equalTo: 'foo' } } } },
                { where: { foo: { equalTo: 'foo' } } },
              ],
            },
          ],
        }),
      ).not.toThrow()
    })
  })

  describe('createRelationQueryFilters()', () => {
    test('creates the query filter for the relation', () => {
      expect(createRelationQueryFilters('myKey', 'streamID')).toEqual({
        where: { myKey: { equalTo: 'streamID' } },
      })
    })

    test('validates the custom query filters when provided', () => {
      // @ts-expect-error invalid filter value
      expect(() => createRelationQueryFilters('myKey', 'streamID', { not: null })).toThrow(
        'Invalid query filters: missing filter value',
      )
    })

    test('combines the relation filter with the custom filters', () => {
      expect(
        createRelationQueryFilters('myKey', 'streamID', { where: { someKey: { equalTo: 'foo' } } }),
      ).toEqual({
        and: [
          { where: { myKey: { equalTo: 'streamID' } } },
          { where: { someKey: { equalTo: 'foo' } } },
        ],
      })
    })
  })
})
