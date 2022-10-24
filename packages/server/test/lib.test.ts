import { VIEWER_ID_HEADER } from '@composedb/constants'
import type { Context } from '@composedb/runtime'
import { jest } from '@jest/globals'
import { GraphQLID, GraphQLObjectType, GraphQLSchema } from 'graphql'
import type { RawResponse, Request } from 'graphql-helix'

import { ComposeServer, getViewerID } from '../src'

describe('server', () => {
  describe('getViewerID()', () => {
    test('works with headers.get() function', () => {
      const get = jest.fn(() => 'did:test:123')
      expect(getViewerID({ headers: { get } } as unknown as Request)).toBe('did:test:123')
    })

    test('works with headers record', () => {
      expect(
        getViewerID({ headers: { [VIEWER_ID_HEADER]: 'did:test:456' } } as unknown as Request)
      ).toBe('did:test:456')
    })
  })

  describe('ComposeServer class', () => {
    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: {
          viewer: {
            type: new GraphQLObjectType({
              name: 'Viewer',
              fields: {
                id: {
                  type: GraphQLID,
                  resolve: (_self, _args, ctx: Context) => ctx.viewerID,
                },
              },
            }),
            resolve: () => ({}),
          },
        },
      }),
    })

    describe('handleHTTPRequest()', () => {
      const withGraphiQL = new ComposeServer({
        ceramic: 'http://local.test',
        graphiql: true,
        schema,
      })
      const withoutGraphiQL = new ComposeServer({
        ceramic: 'http://local.test',
        graphiql: false,
        schema,
      })

      test('Renders GraphiQL if enabled, method and headers match', async () => {
        const request: Request = {
          headers: { accept: 'text/html' },
          method: 'GET',
          query: '',
        }
        const setHeader = jest.fn()
        const end = jest.fn()
        const response = { setHeader, end } as unknown as RawResponse
        await withGraphiQL.handleHTTPRequest(request, response)
        expect(setHeader).toBeCalledWith('Content-Type', 'text/html')
        expect(end).toBeCalledWith(expect.any(String))
      })

      test('Does not render GraphiQL when not enabled, even if method and headers match', async () => {
        const request: Request = {
          headers: { accept: 'text/html' },
          method: 'GET',
          query: '',
        }
        const setHeader = jest.fn()
        const writeHead = jest.fn()
        const end = jest.fn()
        const response = { setHeader, writeHead, end } as unknown as RawResponse
        await withoutGraphiQL.handleHTTPRequest(request, response)
        expect(writeHead).toBeCalledWith(400, {
          'content-type': 'application/json',
          'content-length': expect.any(Number),
        })
        expect(end).toBeCalledWith(expect.any(String))
      })

      test('Does not render GraphiQL if enabled but method does not match', async () => {
        const request: Request = {
          headers: { accept: 'text/html' },
          method: 'POST',
          query: '',
        }
        const setHeader = jest.fn()
        const writeHead = jest.fn()
        const end = jest.fn()
        const response = { setHeader, writeHead, end } as unknown as RawResponse
        await withGraphiQL.handleHTTPRequest(request, response)
        expect(writeHead).toBeCalledWith(400, {
          'content-type': 'application/json',
          'content-length': expect.any(Number),
        })
        expect(end).toBeCalledWith(expect.any(String))
      })

      test('Does not render GraphiQL if enabled but headers do not match', async () => {
        const request: Request = {
          headers: { accept: 'application/json' },
          method: 'GET',
          query: '',
        }
        const setHeader = jest.fn()
        const writeHead = jest.fn()
        const end = jest.fn()
        const response = { setHeader, writeHead, end } as unknown as RawResponse
        await withGraphiQL.handleHTTPRequest(request, response)
        expect(writeHead).toBeCalledWith(400, {
          'content-type': 'application/json',
          'content-length': expect.any(Number),
        })
        expect(end).toBeCalledWith(expect.any(String))
      })

      test('Returns the GraphQL query result', async () => {
        const viewerID = 'did:test:789'
        const request: Request = {
          headers: { accept: 'application/json', [VIEWER_ID_HEADER]: viewerID },
          method: 'GET',
          query: {
            operationName: 'TestQuery',
            query: 'query TestQuery { viewer { id } }',
          },
        }
        const setHeader = jest.fn()
        const writeHead = jest.fn()
        const end = jest.fn()
        const response = { setHeader, writeHead, end } as unknown as RawResponse
        await withGraphiQL.handleHTTPRequest(request, response)
        expect(writeHead).toBeCalledWith(200, {
          'content-type': 'application/json',
          'content-length': expect.any(Number),
        })
        expect(end).toBeCalledWith(JSON.stringify({ data: { viewer: { id: viewerID } } }))
      })
    })

    describe('createGraphQLRoute()', () => {
      const server = new ComposeServer({ ceramic: 'http://local.test', schema })

      test('With default parameters', () => {
        expect(server.createGraphQLRoute()).toEqual({
          url: '/graphql',
          method: ['GET', 'POST'],
          handler: expect.any(Function),
        })
      })

      test('Supports a custom endpoint', () => {
        expect(server.createGraphQLRoute('/foo')).toEqual({
          url: '/foo',
          method: ['GET', 'POST'],
          handler: expect.any(Function),
        })
      })

      test('Suports custom methods', () => {
        expect(server.createGraphQLRoute('/foo', ['POST'])).toEqual({
          url: '/foo',
          method: ['POST'],
          handler: expect.any(Function),
        })
      })
    })
  })
})
