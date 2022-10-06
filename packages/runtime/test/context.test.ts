import type { CeramicApi, StreamState } from '@ceramicnetwork/common'
import { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import { jest } from '@jest/globals'
import type { DID } from 'dids'

import { Context } from '../src'
import { DocumentLoader } from '../src/loader'

describe('context', () => {
  const testState = {
    type: ModelInstanceDocument.STREAM_TYPE_ID,
    log: [{ cid: 'bagcqcerakszw2vsovxznyp5gfnpdj4cqm2xiv76yd24wkjewhhykovorwo6a' }],
  } as unknown as StreamState

  test('authenticated getter', () => {
    const ceramic = {} as unknown as CeramicApi
    const context = new Context({ ceramic })
    expect(context.authenticated).toBe(false)

    ceramic.did = { authenticated: true } as unknown as DID
    expect(context.authenticated).toBe(true)
  })

  test('ceramic getter', () => {
    const ceramic = {} as unknown as CeramicApi
    const context = new Context({ ceramic })
    expect(context.ceramic).toBe(ceramic)
  })

  test('loader getter', () => {
    const ceramic = {} as unknown as CeramicApi
    const context = new Context({ ceramic })
    expect(context.loader).toBeInstanceOf(DocumentLoader)
  })

  test('viewerID getter', () => {
    const ceramic = {} as unknown as CeramicApi
    const context = new Context({ ceramic })
    expect(context.viewerID).toBeNull()

    ceramic.did = { id: 'did:test:123' } as unknown as DID
    expect(context.viewerID).toBe('did:test:123')
  })

  describe('loadDoc()', () => {
    const ceramic = {} as unknown as CeramicApi

    test('calls the load() method of the loader', async () => {
      const expectedDoc = {}
      const load = jest.fn(() => expectedDoc)
      const loader = { load } as unknown as DocumentLoader
      const context = new Context({ ceramic, loader })

      await expect(context.loadDoc('testID')).resolves.toBe(expectedDoc)
      expect(load).toHaveBeenCalledWith('testID')
    })

    test('calls the clear() method of the loader if the fresh parameter is set', async () => {
      const clear = jest.fn()
      const load = jest.fn()
      const loader = { clear, load } as unknown as DocumentLoader
      const context = new Context({ ceramic, loader })

      await context.loadDoc('testID', true)
      expect(clear).toHaveBeenCalledWith('testID')
      expect(load).toHaveBeenCalledWith('testID')
    })
  })

  test('createDoc()', async () => {
    const expectedDoc = {}
    const create = jest.fn(() => expectedDoc)
    const loader = { create } as unknown as DocumentLoader
    const ceramic = {} as unknown as CeramicApi
    const context = new Context({ ceramic, loader })

    const content = {}
    await expect(context.createDoc('testID', content)).resolves.toBe(expectedDoc)
    expect(create).toHaveBeenCalledWith('testID', content)
  })

  describe('createSingle', () => {
    test('throws an error if the viewerID is not set', async () => {
      const replace = jest.fn()
      const expectedDoc = { replace }
      const single = jest.fn(() => expectedDoc)
      const loader = { single } as unknown as DocumentLoader
      const ceramic = {} as unknown as CeramicApi
      const context = new Context({ ceramic, loader })

      const content = {}
      await expect(context.createSingle('testID', content)).rejects.toThrow(
        'Document can only be created with an authenticated account'
      )
      expect(single).not.toHaveBeenCalled()
      expect(replace).not.toHaveBeenCalled()
    })

    test('uses the single() method of the loader and sets contents', async () => {
      const replace = jest.fn()
      const expectedDoc = { replace }
      const single = jest.fn(() => expectedDoc)
      const loader = { single } as unknown as DocumentLoader
      const ceramic = { did: { id: 'did:test:123' } } as unknown as CeramicApi
      const context = new Context({ ceramic, loader })

      const content = {}
      await expect(context.createSingle('testID', content)).resolves.toBe(expectedDoc)
      expect(single).toHaveBeenCalledWith('did:test:123', 'testID')
      expect(replace).toHaveBeenCalledWith(content)
    })
  })

  test('updateDoc()', async () => {
    const expectedDoc = {}
    const update = jest.fn(() => expectedDoc)
    const loader = { update } as unknown as DocumentLoader
    const ceramic = {} as unknown as CeramicApi
    const context = new Context({ ceramic, loader })

    const content = {}
    await expect(context.updateDoc('testID', content)).resolves.toBe(expectedDoc)
    expect(update).toHaveBeenCalledWith('testID', content, undefined)
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
    const context = new Context({ ceramic })

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

  test('querySingle()', async () => {
    const expectedNode = {}
    const buildStreamFromState = jest.fn(() => expectedNode)
    const query = jest.fn(() => ({
      edges: [{ cursor: 'cursor1', node: testState }],
      pageInfo: { hasNextPage: false, hasPreviousPage: false },
    }))
    const ceramic = { buildStreamFromState, index: { query } } as unknown as CeramicApi
    const context = new Context({ ceramic })

    await expect(context.querySingle({ model: 'test' })).resolves.toBe(expectedNode)
    expect(query).toHaveBeenCalledWith({ model: 'test', last: 1 })
  })

  test('queryCount()', async () => {
    const count = jest.fn(() => 10)
    const ceramic = { index: { count } } as unknown as CeramicApi
    const context = new Context({ ceramic })
    await expect(context.queryCount({ model: 'test' })).resolves.toBe(10)
    expect(count).toHaveBeenCalledWith({ model: 'test' })
  })
})
