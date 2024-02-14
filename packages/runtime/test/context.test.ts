import { DocumentLoader } from '@composedb/loader'
import type { CeramicAPI } from '@composedb/types'
import { jest } from '@jest/globals'
import type { DID } from 'dids'

import { createContext } from '../src'

describe('context', () => {
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
      expect(load).toHaveBeenCalledWith({ id: 'testID' })
    })

    test('calls the clear() method of the loader if the fresh parameter is set', async () => {
      const clear = jest.fn()
      const load = jest.fn()
      const loader = { clear, load } as unknown as DocumentLoader
      const context = createContext({ ceramic, loader })

      await context.loadDoc('testID', true)
      expect(clear).toHaveBeenCalledWith({ id: 'testID' })
      expect(load).toHaveBeenCalledWith({ id: 'testID' })
    })
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
      const key = { id: model }
      const shouldIndex = jest.fn()
      const expectedDoc = { shouldIndex }
      const load = jest.fn(() => expectedDoc)
      const loadSingle = jest.fn(() => expectedDoc)
      const loader = { loadSingle, load } as unknown as DocumentLoader
      const ceramic = { did: { id: viewerID } } as unknown as CeramicAPI
      const context = createContext({ ceramic, loader })

      await expect(context.hideDoc(model)).resolves.toBeUndefined()

      expect(load).toHaveBeenCalledWith(key)
      expect(shouldIndex).toHaveBeenCalledWith(false, undefined)
    })
  })

  test('queryCount()', async () => {
    const count = jest.fn(() => 10)
    const ceramic = { index: { count } } as unknown as CeramicAPI
    const context = createContext({ ceramic })
    await expect(context.queryCount({ model: 'test' })).resolves.toBe(10)
    expect(count).toHaveBeenCalledWith({ model: 'test' })
  })
})
