import { type Context, getSchema } from '@composedb/runtime'
import { jest } from '@jest/globals'
import { GraphQLID, GraphQLObjectType, GraphQLSchema } from 'graphql'

const mockYogaServerInstance = {}
const createYoga = jest.fn(() => mockYogaServerInstance)

jest.unstable_mockModule('graphql-yoga', () => {
  return { createYoga }
})

describe('server', () => {
  test('getViewerID() extracts the viewer ID from headers', async () => {
    const { getViewerID } = await import('../src')
    const get = jest.fn(() => 'did:test:123')
    expect(getViewerID({ headers: { get } } as unknown as Request)).toBe('did:test:123')
  })

  describe('createHandler()', () => {
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
                  resolve: (_self, _args, ctx: Context) => ctx.getViewerID(),
                },
              },
            }),
            resolve: () => ({}),
          },
        },
      }),
    })

    test('calls createYoga() with the expected options', async () => {
      const { createHandler } = await import('../src')

      expect(createHandler({ ceramic: 'http://localhost:7007', schema })).toBe(
        mockYogaServerInstance,
      )
      expect(createYoga).toHaveBeenCalledWith({
        context: expect.any(Function),
        graphiql: false,
        schema: getSchema({ schema, readonly: true }),
      })
    })
  })
})
