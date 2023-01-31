import type { CeramicApi, StreamState } from '@ceramicnetwork/common'
import { jest } from '@jest/globals'

import { queryConnection, querySingle, toPaginationQuery, toRelayConnection } from '../src/query'

describe('query', () => {
  const testState = {} as unknown as StreamState

  describe('toPaginationQuery()', () => {
    test('throws if invalid parameters are provided', () => {
      expect(() => {
        // @ts-expect-error invalid parameters
        toPaginationQuery({ foo: 'bar' })
      }).toThrow('Missing "first" or "last" connection argument')
    })

    test('creates a forward pagination object by default', () => {
      expect(toPaginationQuery({ model: 'test', first: 10, last: 10, before: 'cursor' })).toEqual({
        model: 'test',
        first: 10,
        after: undefined,
      })
    })

    test('creates a backward pagination object', () => {
      expect(toPaginationQuery({ model: 'test', last: 10, before: 'cursor' })).toEqual({
        model: 'test',
        last: 10,
        before: 'cursor',
      })
    })
  })

  test('toRelayConnection()', () => {
    const expectedNode = {}
    const buildStreamFromState = jest.fn(() => expectedNode)
    expect(
      toRelayConnection({ buildStreamFromState } as unknown as CeramicApi, {
        edges: [
          { cursor: 'cursor1', node: testState },
          { cursor: 'cursor2', node: testState },
        ],
        pageInfo: { hasNextPage: true, hasPreviousPage: false },
      })
    ).toEqual({
      edges: [
        { cursor: 'cursor1', node: expectedNode },
        { cursor: 'cursor2', node: expectedNode },
      ],
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
      },
    })
    expect(buildStreamFromState).toHaveBeenCalledTimes(2)
  })

  test('queryConnection()', async () => {
    const expectedNode = {}
    const buildStreamFromState = jest.fn(() => expectedNode)
    const query = jest.fn(() => ({
      edges: [
        { cursor: 'cursor1', node: testState },
        { cursor: 'cursor2', node: null },
        { cursor: 'cursor3', node: testState },
      ],
      pageInfo: { hasNextPage: true, hasPreviousPage: false },
    }))
    const ceramic = { buildStreamFromState, index: { query } } as unknown as CeramicApi

    await expect(queryConnection(ceramic, { model: 'test', first: 3 })).resolves.toEqual({
      edges: [
        { cursor: 'cursor1', node: expectedNode },
        { cursor: 'cursor2', node: null },
        { cursor: 'cursor3', node: expectedNode },
      ],
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
      },
    })
    expect(query).toHaveBeenCalledWith({ model: 'test', first: 3, after: undefined })
  })

  describe('querySingle()', () => {
    test('with result', async () => {
      const expectedNode = {}
      const buildStreamFromState = jest.fn(() => expectedNode)
      const query = jest.fn(() => ({
        edges: [{ cursor: 'cursor1', node: testState }],
        pageInfo: { hasNextPage: false, hasPreviousPage: false },
      }))
      const ceramic = { buildStreamFromState, index: { query } } as unknown as CeramicApi

      await expect(querySingle(ceramic, { model: 'test' })).resolves.toBe(expectedNode)
      expect(query).toHaveBeenCalledWith({ model: 'test', last: 1 })
    })

    test('with no result', async () => {
      const query = jest.fn(() => ({
        edges: [],
        pageInfo: { hasNextPage: false, hasPreviousPage: false },
      }))
      const ceramic = { index: { query } } as unknown as CeramicApi
      await expect(querySingle(ceramic, { model: 'test' })).resolves.toBeNull()
    })
  })
})
