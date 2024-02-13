import type { StreamState } from '@ceramicnetwork/common'
import { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import type { CeramicAPI } from '@composedb/types'
import { jest } from '@jest/globals'
import type { DID } from 'dids'

import { createContext } from '../src'
import { DocumentLoader } from '../src/loader'

describe('context', () => {
  const testState = {
    type: ModelInstanceDocument.STREAM_TYPE_ID,
    log: [{ cid: 'bagcqcerakszw2vsovxznyp5gfnpdj4cqm2xiv76yd24wkjewhhykovorwo6a' }],
  } as unknown as StreamState

  test('isAuthenticated()', () => {
    const ceramic = {} as unknown as CeramicAPI
    const context = createContext({ ceramic })
    expect(context.isAuthenticated()).toBe(false)

    ceramic.did = { authenticated: true } as unknown as DID
    expect(context.isAuthenticated()).toBe(true)
  })

  test('ceramic field', () => {
    const ceramic = {} as unknown as CeramicAPI
    const context = createContext({ ceramic })
    expect(context.ceramic).toBe(ceramic)
  })

  test('loader field', () => {
    const ceramic = {} as unknown as CeramicAPI
    const context = createContext({ ceramic })
    expect(context.loader).toBeInstanceOf(DocumentLoader)
  })

  test('getViewerID()', () => {
    const ceramic = {} as unknown as CeramicAPI
    const context = createContext({ ceramic })
    expect(context.getViewerID()).toBeNull()

    ceramic.did = { id: 'did:test:123' } as unknown as DID
    expect(context.getViewerID()).toBe('did:test:123')
  })

  describe('loadDoc()', () => {
    const ceramic = {} as unknown as CeramicAPI

    test('calls the load() method of the loader', async () => {
      const expectedDoc = {}
      const load = jest.fn(() => expectedDoc)
      const loader = { load } as unknown as DocumentLoader
      const context = createContext({ ceramic, loader })

      await expect(context.loadDoc('testID')).resolves.toBe(expectedDoc)
      expect(load).toHaveBeenCalledWith('testID')
    })

    test('calls the clear() method of the loader if the fresh parameter is set', async () => {
      const clear = jest.fn()
      const load = jest.fn()
      const loader = { clear, load } as unknown as DocumentLoader
      const context = createContext({ ceramic, loader })

      await context.loadDoc('testID', true)
      expect(clear).toHaveBeenCalledWith('testID')
      expect(load).toHaveBeenCalledWith('testID')
    })
  })

  test('createDoc()', async () => {
    const expectedDoc = {}
    const create = jest.fn(() => expectedDoc)
    const loader = { create } as unknown as DocumentLoader
    const ceramic = {} as unknown as CeramicAPI
    const context = createContext({ ceramic, loader })

    const content = {}
    await expect(context.createDoc('testID', content)).resolves.toBe(expectedDoc)
    expect(create).toHaveBeenCalledWith('testID', content)
  })

  describe('upsertSingle', () => {
    test('throws an error if the viewerID is not set', async () => {
      const replace = jest.fn()
      const expectedDoc = { replace }
      const loadSingle = jest.fn(() => expectedDoc)
      const loader = { loadSingle } as unknown as DocumentLoader
      const ceramic = {} as unknown as CeramicAPI
      const context = createContext({ ceramic, loader })

      const content = {}
      await expect(context.upsertSingle('testID', content)).rejects.toThrow(
        'Document can only be created with an authenticated account',
      )
      expect(loadSingle).not.toHaveBeenCalled()
      expect(replace).not.toHaveBeenCalled()
    })

    test('uses the loadSingle() method of the loader and sets contents', async () => {
      const replace = jest.fn()
      const expectedDoc = { replace }
      const loadSingle = jest.fn(() => expectedDoc)
      const loader = { loadSingle } as unknown as DocumentLoader
      const ceramic = { did: { id: 'did:test:123' } } as unknown as CeramicAPI
      const context = createContext({ ceramic, loader })

      const content = {}
      await expect(context.upsertSingle('testID', content)).resolves.toBe(expectedDoc)
      expect(loadSingle).toHaveBeenCalledWith('did:test:123', 'testID', undefined)
      expect(replace).toHaveBeenCalledWith(content)
    })

    test('uses the loadSingle() method of the loader with options', async () => {
      const replace = jest.fn()
      const expectedDoc = { replace }
      const loadSingle = jest.fn(() => expectedDoc)
      const loader = { loadSingle } as unknown as DocumentLoader
      const ceramic = { did: { id: 'did:test:123' } } as unknown as CeramicAPI
      const context = createContext({ ceramic, loader })

      const content = {}
      await expect(
        context.upsertSingle('testID', content, { syncTimeoutSeconds: 30 }),
      ).resolves.toBe(expectedDoc)
      expect(loadSingle).toHaveBeenCalledWith('did:test:123', 'testID', { syncTimeoutSeconds: 30 })
    })
  })

  describe('upsertSet', () => {
    test('throws an error if the viewerID is not set', async () => {
      const replace = jest.fn()
      const expectedDoc = { replace }
      const loadSet = jest.fn(() => expectedDoc)
      const loader = { loadSet } as unknown as DocumentLoader
      const ceramic = {} as unknown as CeramicAPI
      const context = createContext({ ceramic, loader })

      const content = {}
      await expect(context.upsertSet('testID', ['test'], content)).rejects.toThrow(
        'Document can only be created with an authenticated account',
      )
      expect(loadSet).not.toHaveBeenCalled()
      expect(replace).not.toHaveBeenCalled()
    })

    test('uses the loadSet() method of the loader and sets contents', async () => {
      const replace = jest.fn()
      const expectedDoc = { replace }
      const loadSet = jest.fn(() => expectedDoc)
      const loader = { loadSet } as unknown as DocumentLoader
      const ceramic = { did: { id: 'did:test:123' } } as unknown as CeramicAPI
      const context = createContext({ ceramic, loader })

      const unique = ['test']
      const content = {}
      await expect(context.upsertSet('testID', unique, content)).resolves.toBe(expectedDoc)
      expect(loadSet).toHaveBeenCalledWith('did:test:123', 'testID', unique, undefined)
      expect(replace).toHaveBeenCalledWith(content)
    })

    test('uses the loadSet() method of the loader with options', async () => {
      const replace = jest.fn()
      const expectedDoc = { replace }
      const loadSet = jest.fn(() => expectedDoc)
      const loader = { loadSet } as unknown as DocumentLoader
      const ceramic = { did: { id: 'did:test:123' } } as unknown as CeramicAPI
      const context = createContext({ ceramic, loader })

      const unique = ['test']
      const content = {}
      await expect(
        context.upsertSet('testID', unique, content, { syncTimeoutSeconds: 30 }),
      ).resolves.toBe(expectedDoc)
      expect(loadSet).toHaveBeenCalledWith('did:test:123', 'testID', unique, {
        syncTimeoutSeconds: 30,
      })
    })
  })

  test('updateDoc()', async () => {
    const expectedDoc = {}
    const update = jest.fn(() => expectedDoc)
    const loader = { update } as unknown as DocumentLoader
    const ceramic = {} as unknown as CeramicAPI
    const context = createContext({ ceramic, loader })

    const content = {}
    await expect(context.updateDoc('testID', content)).resolves.toBe(expectedDoc)
    expect(update).toHaveBeenCalledWith('testID', content, undefined)
  })

  describe('hideDoc', () => {
    test('throws an error if the viewerID is not set', async () => {
      const shouldIndex = jest.fn()
      const expectedDoc = { shouldIndex }
      const loadSingle = jest.fn(() => expectedDoc)
      const loader = { loadSingle } as unknown as DocumentLoader
      const ceramic = {} as unknown as CeramicAPI
      const context = createContext({ ceramic, loader })

      await expect(context.hideDoc('testID')).rejects.toThrow(
        'Document can only be hidden with an authenticated account',
      )
      expect(loadSingle).not.toHaveBeenCalled()
      expect(shouldIndex).not.toHaveBeenCalled()
    })

    test('sets shouldIndex as false', async () => {
      const viewerID = 'did:test:123'
      const model = 'testID'
      const shouldIndex = jest.fn()
      const expectedDoc = { shouldIndex }
      const loadSingle = jest.fn(() => expectedDoc)
      const loader = { loadSingle } as unknown as DocumentLoader
      const ceramic = { did: { id: viewerID } } as unknown as CeramicAPI
      const context = createContext({ ceramic, loader })

      await expect(context.hideDoc(model)).resolves.toBeUndefined()

      expect(loadSingle).toHaveBeenCalledWith(viewerID, model, {})
      expect(shouldIndex).toHaveBeenCalledWith(false, undefined)
    })
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
    const ceramic = { buildStreamFromState, index: { query } } as unknown as CeramicAPI
    const context = createContext({ ceramic })

    await expect(context.queryConnection({ model: 'test', first: 3 })).resolves.toEqual({
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

  test('queryOne()', async () => {
    const expectedNode = {}
    const buildStreamFromState = jest.fn(() => expectedNode)
    const query = jest.fn(() => ({
      edges: [{ cursor: 'cursor1', node: testState }],
      pageInfo: { hasNextPage: false, hasPreviousPage: false },
    }))
    const ceramic = { buildStreamFromState, index: { query } } as unknown as CeramicAPI
    const context = createContext({ ceramic })

    await expect(context.queryOne({ model: 'test' })).resolves.toBe(expectedNode)
    expect(query).toHaveBeenCalledWith({ model: 'test', last: 1 })
  })

  test('queryCount()', async () => {
    const count = jest.fn(() => 10)
    const ceramic = { index: { count } } as unknown as CeramicAPI
    const context = createContext({ ceramic })
    await expect(context.queryCount({ model: 'test' })).resolves.toBe(10)
    expect(count).toHaveBeenCalledWith({ model: 'test' })
  })
})
