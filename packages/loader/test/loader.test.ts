import type { StreamState } from '@ceramicnetwork/common'
import { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import { CommitID, StreamID } from '@ceramicnetwork/streamid'
import type { CeramicAPI } from '@composedb/types'
import { jest } from '@jest/globals'

import { createDeterministicKey, getDeterministicCacheKey } from '../src/deterministic'
import {
  DEFAULT_DETERMINISTIC_OPTIONS,
  DocumentLoader,
  getKeyID,
  removeNullValues,
} from '../src/loader'
import type { DocumentCache } from '../src/types'

const multiqueryTimeout = 2000

describe('loader', () => {
  const testCID = 'bagcqcerakszw2vsovxznyp5gfnpdj4cqm2xiv76yd24wkjewhhykovorwo6a'
  const testCommitID = new CommitID(1, testCID)
  const testStreamID = new StreamID(1, testCID)
  const testID1 = testStreamID.toString()
  const testID2 = 'kjzl6cwe1jw147dvq16zluojmraqvwdmbh61dx9e0c59i344lcrsgqfohexp60s'
  const testState = {
    type: ModelInstanceDocument.STREAM_TYPE_ID,
    log: [{ cid: 'bagcqcerakszw2vsovxznyp5gfnpdj4cqm2xiv76yd24wkjewhhykovorwo6a' }],
  } as unknown as StreamState

  describe('getKeyID()', () => {
    test('with string key', () => {
      expect(getKeyID({ id: testID1 })).toBe(testID1)
    })

    test('with URL key', () => {
      expect(getKeyID({ id: testStreamID.toUrl() })).toBe(testID1)
    })

    test('with CommitID key', () => {
      expect(getKeyID({ id: testCommitID })).toBe(testCommitID.toString())
    })

    test('with StreamID key', () => {
      expect(getKeyID({ id: testStreamID })).toBe(testID1)
    })
  })

  describe('removeNullValues()', () => {
    test('returns a copy of the object', () => {
      const source = { foo: 'foo', bar: null }
      expect(removeNullValues(source)).toStrictEqual({ foo: 'foo' })
      expect(source).toEqual({ foo: 'foo', bar: null })
    })

    test('does not remove null values from arrays', () => {
      const source = { foo: 'foo', bar: ['bar', null, 'baz'] }
      expect(removeNullValues(source)).toStrictEqual(source)
    })

    test('recursively removes null values', () => {
      const source = { foo: 'foo', bar: { bar: 'bar', foo: null } }
      expect(removeNullValues(source)).toStrictEqual({ foo: 'foo', bar: { bar: 'bar' } })
    })
  })

  describe('DocumentLoader', () => {
    test('provides batching', async () => {
      const multiQuery = jest.fn(() => ({ [testID1]: {}, [testID2]: {} }))
      const loader = new DocumentLoader({
        ceramic: { multiQuery } as unknown as CeramicAPI,
        multiqueryTimeout,
      })
      await Promise.all([loader.load({ id: testID1 }), loader.load({ id: testID2 })])
      expect(multiQuery).toHaveBeenCalledTimes(1)
      expect(multiQuery).toHaveBeenCalledWith(
        [{ streamId: testID1 }, { streamId: testID2 }],
        multiqueryTimeout,
      )
    })

    test('throws if one of the streams is not found', async () => {
      const multiQuery = jest.fn(() => ({ [testID1]: {} }))
      const loader = new DocumentLoader({
        ceramic: { multiQuery } as unknown as CeramicAPI,
      })
      await expect(
        Promise.all([loader.load({ id: testID1 }), loader.load({ id: testID2 })]),
      ).rejects.toThrow(`Failed to load document: ${testID2}`)
    })

    test('does not throw when using the loadMany() method', async () => {
      const multiQuery = jest.fn(() => ({ [testID1]: {} }))
      const loader = new DocumentLoader({
        ceramic: { multiQuery } as unknown as CeramicAPI,
      })
      await expect(loader.loadMany([{ id: testID1 }, { id: testID2 }])).resolves.toEqual([
        {},
        new Error(`Failed to load document: ${testID2}`),
      ])
    })

    test('does not cache by default', async () => {
      const multiQuery = jest.fn(() => ({ [testID1]: {}, [testID2]: {} }))
      const loader = new DocumentLoader({
        ceramic: { multiQuery } as unknown as CeramicAPI,
        multiqueryTimeout,
      })

      await loader.load({ id: testID1 })
      expect(multiQuery).toHaveBeenCalledTimes(1)

      await Promise.all([loader.load({ id: testID1 }), loader.load({ id: testID2 })])
      expect(multiQuery).toHaveBeenCalledTimes(2)
      expect(multiQuery).toHaveBeenLastCalledWith(
        [{ streamId: testID1 }, { streamId: testID2 }],
        multiqueryTimeout,
      )
    })

    test('has opt-in cache', async () => {
      const multiQuery = jest.fn(() => ({ [testID1]: {}, [testID2]: {} }))
      const loader = new DocumentLoader({
        cache: true,
        ceramic: { multiQuery } as unknown as CeramicAPI,
        multiqueryTimeout,
      })

      await loader.load({ id: testID1 })
      expect(multiQuery).toHaveBeenCalledTimes(1)

      await Promise.all([loader.load({ id: testID1 }), loader.load({ id: testID2 })])
      expect(multiQuery).toHaveBeenCalledTimes(2)
      expect(multiQuery).toHaveBeenLastCalledWith([{ streamId: testID2 }], multiqueryTimeout)
    })

    test('use provided cache', async () => {
      const cache = new Map()
      const multiQuery = jest.fn(() => ({ [testID1]: {}, [testID2]: {} }))
      const loader = new DocumentLoader({
        cache,
        ceramic: { multiQuery } as unknown as CeramicAPI,
        multiqueryTimeout,
      })

      await loader.load({ id: testID1 })
      expect(multiQuery).toHaveBeenCalledTimes(1)
      expect(cache.has(testID1)).toBe(true)
      cache.delete(testID1)

      await Promise.all([loader.load({ id: testID1 }), loader.load({ id: testID2 })])
      expect(multiQuery).toHaveBeenCalledTimes(2)
      expect(multiQuery).toHaveBeenLastCalledWith(
        [{ streamId: testID1 }, { streamId: testID2 }],
        multiqueryTimeout,
      )
      expect(cache.has(testID1)).toBe(true)
      expect(cache.has(testID2)).toBe(true)
    })

    describe('cache() method allows to add streams to the internal cache', () => {
      test('returns false and does not affect the cache unless enabled', async () => {
        const stream = { id: testStreamID } as ModelInstanceDocument
        const multiQuery = jest.fn(() => ({}))
        const loader = new DocumentLoader({
          ceramic: { multiQuery } as unknown as CeramicAPI,
        })

        expect(loader.cache(stream)).toBe(false)
        await expect(loader.load({ id: testStreamID })).rejects.toThrow(
          `Failed to load document: ${testID1}`,
        )
      })

      test('returns true and writes to the cache if enabled', async () => {
        const stream1 = {
          id: testStreamID,
          content: { ok: false },
        } as unknown as ModelInstanceDocument
        const stream2 = {
          id: testStreamID,
          content: { ok: true },
        } as unknown as ModelInstanceDocument

        const multiQuery = jest.fn(() => ({}))
        const loader = new DocumentLoader({
          cache: true,
          ceramic: { multiQuery } as unknown as CeramicAPI,
        })

        expect(loader.cache(stream1)).toBe(true)
        // Should replace in cache
        expect(loader.cache(stream2)).toBe(true)

        await expect(loader.load({ id: testStreamID })).resolves.toBe(stream2)
        expect(multiQuery).not.toHaveBeenCalled()
      })
    })

    test('create() method adds the stream to the cache', async () => {
      const create = jest.fn((_ceramic, content: Record<string, unknown>) => ({
        id: testStreamID,
        content,
      }))
      ModelInstanceDocument.create = create as unknown as typeof ModelInstanceDocument.create

      const multiQuery = jest.fn(() => ({}))
      const ceramic = { multiQuery } as unknown as CeramicAPI
      const loader = new DocumentLoader({ cache: true, ceramic })

      const content = { foo: 'bar' }
      await loader.create(testStreamID, content)
      expect(create).toHaveBeenCalledTimes(1)
      expect(create).toHaveBeenCalledWith(
        ceramic,
        content,
        { controller: undefined, model: testStreamID },
        {},
      )

      await expect(loader.load({ id: testStreamID })).resolves.toEqual({
        id: testStreamID,
        content,
      })
      expect(multiQuery).not.toHaveBeenCalled()
    })

    test('loadSingle() method calls ModelInstanceDocument.single() and adds the stream to the cache', async () => {
      const metadata = { controller: 'did:test:123', model: testStreamID }
      const loadKey = await createDeterministicKey(metadata)
      const { id, genesis } = loadKey
      const multiQuery = jest.fn(() => ({ [id.toString()]: { id, metadata } }))
      const ceramic = { multiQuery } as unknown as CeramicAPI
      const deterministicKeysCache = new Map()
      const loader = new DocumentLoader({ cache: true, ceramic, deterministicKeysCache })

      const cacheKey = getDeterministicCacheKey(metadata)
      expect(deterministicKeysCache.has(cacheKey)).toBe(false)

      const opts = { anchor: false }
      const stream = await loader.loadSingle('did:test:123', testStreamID, opts)
      expect(multiQuery).toHaveBeenCalledTimes(1)
      expect(multiQuery).toHaveBeenCalledWith(
        [{ streamId: id, genesis, opts: { ...DEFAULT_DETERMINISTIC_OPTIONS, ...opts } }],
        undefined,
      )
      expect(deterministicKeysCache.has(cacheKey)).toBe(true)
      expect(loader._getDeterministicKey(metadata)).toBeDefined()

      await expect(loader.load(loadKey)).resolves.toBe(stream)
      expect(multiQuery).toHaveBeenCalledTimes(1)
    })

    test('loadSet() method calls ModelInstanceDocument.set() and adds the stream to the cache', async () => {
      const metadata = { controller: 'did:test:123', model: testStreamID }
      const unique = ['foo']
      const loadKey = await createDeterministicKey({ ...metadata, unique })
      const { id, genesis } = loadKey
      const multiQuery = jest.fn(() => ({ [id.toString()]: { id, metadata } }))
      const ceramic = { multiQuery } as unknown as CeramicAPI
      const deterministicKeysCache = new Map()
      const loader = new DocumentLoader({ cache: true, ceramic, deterministicKeysCache })

      const cacheKey = getDeterministicCacheKey({ ...metadata, unique })
      expect(deterministicKeysCache.has(cacheKey)).toBe(false)

      const opts = { anchor: false }
      const stream = await loader.loadSet('did:test:123', testStreamID, unique, opts)
      expect(multiQuery).toHaveBeenCalledTimes(1)
      expect(multiQuery).toHaveBeenCalledWith(
        [{ streamId: id, genesis, opts: { ...DEFAULT_DETERMINISTIC_OPTIONS, ...opts } }],
        undefined,
      )
      expect(deterministicKeysCache.has(cacheKey)).toBe(true)
      expect(loader._getDeterministicKey({ ...metadata, unique })).toBeDefined()

      await expect(loader.load(loadKey)).resolves.toBe(stream)
      expect(multiQuery).toHaveBeenCalledTimes(1)
    })

    describe('update() method', () => {
      test('removes the stream from the cache before loading and updating', async () => {
        const cacheMap = new Map<string, Promise<ModelInstanceDocument>>()
        const cacheDelete = jest.fn((key: string) => cacheMap.delete(key))
        const cacheSet = jest.fn(
          (key: string, value: Promise<ModelInstanceDocument<Record<string, any>>>) => {
            return cacheMap.set(key, value)
          },
        )
        const cache: DocumentCache = {
          clear: () => cacheMap.clear(),
          get: (key) => cacheMap.get(key),
          delete: cacheDelete,
          set: cacheSet,
        }

        const replace = jest.fn()
        const multiQuery = jest.fn(() => ({
          [testID1]: { content: { foo: 'bar', test: false }, replace },
        }))

        const loader = new DocumentLoader({
          cache,
          ceramic: { multiQuery } as unknown as CeramicAPI,
        })

        await loader.load({ id: testID1 })
        expect(cacheDelete).not.toHaveBeenCalled()
        expect(cacheMap.has(testID1)).toBe(true)
        expect(cacheSet).toHaveBeenCalledTimes(1)

        await loader.update(testID1, { test: true }, { publish: true })
        expect(replace).toHaveBeenCalledWith({ foo: 'bar', test: true }, undefined, {
          publish: true,
        })
        expect(cacheDelete).toHaveBeenCalledWith(testID1)
        expect(cacheMap.has(testID1)).toBe(true)
        expect(cacheSet).toHaveBeenCalledTimes(2)
      })

      test('fails if the provided version does not match the loaded one', async () => {
        const replace = jest.fn()
        const multiQuery = jest.fn(() => ({
          [testID1]: { commitId: testCommitID, replace },
        }))

        const loader = new DocumentLoader({
          ceramic: { multiQuery } as unknown as CeramicAPI,
        })
        await expect(loader.update(testID1, { test: true }, { version: 'test' })).rejects.toThrow(
          'Stream version mismatch',
        )
        expect(replace).not.toHaveBeenCalled()
      })

      test('applies the update if the provided version matches the loaded one', async () => {
        const replace = jest.fn()
        const multiQuery = jest.fn(() => ({
          [testID1]: { commitId: testCommitID, content: { foo: 'bar', test: false }, replace },
        }))

        const loader = new DocumentLoader({
          ceramic: { multiQuery } as unknown as CeramicAPI,
        })
        await loader.update(testID1, { test: true }, { version: testCommitID.toString() })
        expect(replace).toHaveBeenCalledWith({ foo: 'bar', test: true }, undefined, {})
      })

      test('performs a full replacement if the option is set', async () => {
        const replace = jest.fn()
        const multiQuery = jest.fn(() => ({
          [testID1]: { commitId: testCommitID, content: { foo: 'bar', test: false }, replace },
        }))

        const loader = new DocumentLoader({
          ceramic: { multiQuery } as unknown as CeramicAPI,
        })
        await loader.update(testID1, { test: true }, { replace: true })
        expect(replace).toHaveBeenCalledWith({ test: true }, undefined, {})
      })
    })

    test('queryConnection() method queries the index and caches the results', async () => {
      const expectedNode = { id: testStreamID }
      const buildStreamFromState = jest.fn(() => expectedNode)
      const query = jest.fn(() => ({
        edges: [
          { cursor: 'cursor1', node: testState },
          { cursor: 'cursor2', node: null },
          { cursor: 'cursor3', node: testState },
        ],
        pageInfo: { hasNextPage: true, hasPreviousPage: false },
      }))
      const set = jest.fn()
      const noop = jest.fn()
      const cache = { set, get: noop, delete: noop, clear: noop } as DocumentCache
      const ceramic = { buildStreamFromState, index: { query } } as unknown as CeramicAPI
      const loader = new DocumentLoader({ cache, ceramic })

      await expect(loader.queryConnection({ model: 'test', first: 3 })).resolves.toEqual({
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
      expect(set).toHaveBeenCalledTimes(2)
    })

    test('queryOne() method queries the index and caches the result', async () => {
      const expectedNode = { id: testStreamID }
      const buildStreamFromState = jest.fn(() => expectedNode)
      const query = jest.fn(() => ({
        edges: [{ cursor: 'cursor1', node: testState }],
        pageInfo: { hasNextPage: false, hasPreviousPage: false },
      }))
      const set = jest.fn()
      const noop = jest.fn()
      const cache = { set, get: noop, delete: noop, clear: noop } as DocumentCache
      const ceramic = { buildStreamFromState, index: { query } } as unknown as CeramicAPI
      const loader = new DocumentLoader({ cache, ceramic })

      await expect(loader.queryOne({ model: 'test' })).resolves.toBe(expectedNode)
      expect(query).toHaveBeenCalledWith({ model: 'test', last: 1 })
      expect(set).toHaveBeenCalledTimes(1)
    })
  })
})
