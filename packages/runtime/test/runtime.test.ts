/**
 * @jest-environment composedb
 */

import type { CeramicApi } from '@ceramicnetwork/common'
import { CommitID, StreamID } from '@ceramicnetwork/streamid'
import { Composite } from '@composedb/devtools'
import {
  extraScalarsSchema,
  noteSchema,
  postSchema,
  profilesSchema,
  ratingSchema,
  socialSchema,
} from '@composedb/test-schemas'
import { jest } from '@jest/globals'
import { AccountId, ChainId } from 'caip'
import { CID } from 'multiformats/cid'

import { ComposeRuntime, createContext, printGraphQLSchema } from '../src'

declare global {
  const ceramic: CeramicApi
}

describe('runtime', () => {
  test('create profile with custom sync timeout', async () => {
    const composite = await Composite.create({ ceramic, schema: profilesSchema })

    const context = createContext({ ceramic })
    const spy = jest.spyOn(context, 'createSingle')

    const runtime = new ComposeRuntime({ ceramic, context, definition: composite.toRuntime() })
    const res = await runtime.executeQuery<{ createGenericProfile: { document: { id: string } } }>(
      `
      mutation CreateProfile($input: CreateGenericProfileInput!) {
        createGenericProfile(input: $input) {
          document {
            id
          }
        }
      }
      `,
      { input: { content: { name: 'Alice' }, options: { syncTimeout: 1 } } },
    )
    expect(res.data?.createGenericProfile.document.id).toBeDefined()
    expect(spy).toHaveBeenCalledWith(
      expect.any(String),
      { name: 'Alice' },
      { syncTimeoutSeconds: 1 },
    )
  }, 30000)

  test('create and query post with comments', async () => {
    const composite = await Composite.create({ ceramic, schema: postSchema })
    const definition = composite.toRuntime()

    expect(printGraphQLSchema(definition)).toMatchSnapshot()

    const runtime = new ComposeRuntime({ ceramic, definition })

    const createPostMutation = `
      mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
          document {
            id
          }
        }
      }
    `
    await runtime.executeQuery(createPostMutation, {
      input: { content: { title: 'A first post', text: 'First post content' } },
    })
    const postRes = await runtime.executeQuery<{ createPost: { document: { id: string } } }>(
      createPostMutation,
      { input: { content: { title: 'A second post', text: 'Second post content' } } },
    )
    const postID = postRes.data?.createPost.document.id
    expect(postID).toBeDefined()

    const createCommentMutation = `
      mutation CreateComment($input: CreateCommentInput!) {
        createComment(input: $input) {
          document {
            id
          }
        }
      }
    `

    async function createComment(text: string): Promise<string> {
      const result = await runtime.executeQuery<{ createComment: { document: { id: string } } }>(
        createCommentMutation,
        { input: { content: { postID, text } } },
      )
      const id = result.data?.createComment.document.id
      if (id == null) {
        throw new Error(`Missing ID from comment creation result`)
      }
      return id
    }

    const comment1 = await createComment('A first comment')
    const comment2 = await createComment('A second comment')
    const comment3 = await createComment('A third comment')

    const res = await runtime.executeQuery(
      `
      fragment CommentFragment on Comment {
        text
      }

      query ($ids: [ID!]!) {
        comments: nodes(ids: $ids) {
          ...CommentFragment
        }
        viewer {
          postList(first: 5) {
            edges {
              node {
                title
                text
                commentsCount
                comments(first: 5) {
                  edges {
                    node {
                      ...CommentFragment
                    }
                  }
                }
              }
            }
          }
        }
      }
      `,
      { ids: [comment1, comment2, comment3] },
    )
    expect(res).toMatchSnapshot()
  }, 60000)

  test('create and query ratings with filters and ordering', async () => {
    const composite = await Composite.create({ ceramic, schema: ratingSchema })
    const definition = composite.toRuntime()
    const runtime = new ComposeRuntime({ ceramic, definition })

    await runtime.executeQuery(
      `
      mutation CreateRatings(
        $input1: CreateRatingInput!,
        $input2: CreateRatingInput!,
        $input3: CreateRatingInput!) {
        rating1: createRating(input: $input1) {
          document {
            id
          }
        }
        rating2: createRating(input: $input2) {
          document {
            id
          }
        }
        rating3: createRating(input: $input3) {
          document {
            id
          }
        }
      }
    `,
      {
        input1: { content: { title: 'one', value: 5 } },
        input2: { content: { title: 'two', value: 2.5 } },
        input3: { content: { title: 'three', value: 3.5 } },
      },
    )

    const filtered = await runtime.executeQuery(
      `
      query {
        viewer {
          ratingList(filters: { where: { value : { greaterThan: 4 } } }, first: 5) {
            edges {
              node {
                title
                value
              }
            }
          }
        }
      }
      `,
    )
    expect(filtered).toMatchSnapshot()

    const ascending = await runtime.executeQuery(
      `
      query {
        viewer {
          ratingList(sorting: { value: ASC }, first: 5) {
            edges {
              node {
                title
                value
              }
            }
          }
        }
      }
      `,
    )
    expect(ascending).toMatchSnapshot()

    const descending = await runtime.executeQuery(
      `
      query {
        viewer {
          ratingList(sorting: { value: DESC }, first: 5) {
            edges {
              node {
                title
                value
              }
            }
          }
        }
      }
      `,
    )
    expect(descending).toMatchSnapshot()

    const totalCount = await runtime.executeQuery<{
      ratingCount: number
      viewer: { ratingListCount: number }
    }>(
      `
      query {
        ratingCount
        viewer {
          ratingListCount
        }
      }
      `,
    )
    expect(totalCount.data?.ratingCount).toBe(3)
    expect(totalCount.data?.viewer?.ratingListCount).toBe(3)

    const filteredCount = await runtime.executeQuery<{
      ratingCount: number
      viewer: { ratingListCount: number }
    }>(
      `
      query {
        ratingCount(filters: { where: { value : { lessThan: 3 } } })
        viewer {
          ratingListCount(filters: { where: { value : { greaterThan: 4 } } })
        }
      }
      `,
    )
    expect(filteredCount.data?.ratingCount).toBe(1)
    expect(filteredCount.data?.viewer?.ratingListCount).toBe(1)
  }, 60000)

  test('can create a document using extra scalars', async () => {
    const composite = await Composite.create({ ceramic, schema: extraScalarsSchema })
    const runtime = new ComposeRuntime({ ceramic, definition: composite.toRuntime() })
    const res = await runtime.executeQuery<{ createExtraScalars: { document: { id: string } } }>(
      `
      mutation CreateScalars($input: CreateExtraScalarsInput!) {
        createExtraScalars(input: $input) {
          document {
            accountID
            chainID
            cid
            commitID
            countryCode
            date
            dateTime
            did {
              id
            }
            latitude
            localDate
            locale
            localTime
            longitude
            streamID
            time
            timeZone
            uri
            utcOffset
          }
        }
      }
      `,
      {
        input: {
          content: {
            accountID: new AccountId('eip155:1:0xabcdef'),
            chainID: new ChainId('eip155:1'),
            cid: CID.parse('bagcqcerakszw2vsovxznyp5gfnpdj4cqm2xiv76yd24wkjewhhykovorwo6a'),
            commitID: CommitID.fromString(
              'k1dpgaqe3i64kjqcp801r3sn7ysi5i0k7nxvs7j351s7kewfzr3l7mdxnj7szwo4kr9mn2qki5nnj0cv836ythy1t1gya9s25cn1nexst3jxi5o3h6qprfyju',
            ),
            countryCode: 'US',
            date: '2023-01-31',
            dateTime: '2023-01-31T16:04:16.475Z',
            did: 'did:test:123',
            latitude: 53.471,
            localDate: '2023-01-31',
            locale: 'en-gb',
            localTime: '14:25:06.123',
            longitude: 53.471,
            streamID: StreamID.fromString(
              'kjzl6cwe1jw147dvq16zluojmraqvwdmbh61dx9e0c59i344lcrsgqfohexp60s',
            ),
            time: '14:10:20+01:00',
            // TimeZone seem to fail in CI
            // timeZone: 'America/Costa_Rica',
            uri: 'https://ceramic.network',
            utcOffset: '+01:15',
          },
        },
      },
    )
    expect(res.data?.createExtraScalars.document).toMatchSnapshot()
  }, 20000)

  test('create a document with enum', async () => {
    const composite = await Composite.create({ ceramic, schema: noteSchema })
    const runtime = new ComposeRuntime({ ceramic, definition: composite.toRuntime() })
    const res = await runtime.executeQuery<{ createNote: { document: { id: string } } }>(
      `
      mutation CreateNote($input: CreateNoteInput!) {
        createNote(input: $input) {
          document {
            status
            title
            text
          }
        }
      }
      `,
      {
        input: {
          content: {
            status: 'DEFAULT',
            title: 'A test note',
            text: 'Test node contents',
          },
        },
      },
    )
    expect(res.data?.createNote.document).toMatchSnapshot()
  }, 20000)

  test('relation to account reference', async () => {
    const composite = await Composite.create({ ceramic, schema: socialSchema })
    const runtime = new ComposeRuntime({ ceramic, definition: composite.toRuntime() })

    await runtime.executeQuery(
      `
      mutation CreateMeetings(
        $aliceInput: CreatePersonMetInput!,
        $bobInput: CreatePersonMetInput!) {
        metBob1: createPersonMet(input: $bobInput) {
          document {
            id
          }
        }
        metAlice1: createPersonMet(input: $aliceInput) {
          document {
            id
          }
        }
        metBob2: createPersonMet(input: $bobInput) {
          document {
            id
          }
        }
        metBob3: createPersonMet(input: $bobInput) {
          document {
            id
          }
        }
      }
      `,
      {
        aliceInput: { content: { other: 'did:test:alice' } },
        bobInput: { content: { other: 'did:test:bob' } },
      },
    )

    const res = await runtime.executeQuery(`
      fragment MetRelations on CeramicAccount {
        met: personMetList(first: 10) {
          edges {
            node {
              other {
                id
              }
            }
          }
        }
        metCount: personMetListCount
        metBy: otherOfPersonMetList(first: 10) {
          edges {
            node {
              self {
                id
              }
            }
          }
        }
        metByCount: otherOfPersonMetListCount
      }

      query {
        alice: node(id: "did:test:alice") {
          ...MetRelations
        }
        bob: node(id: "did:test:bob") {
          ...MetRelations
        }
        viewer {
          id
          ...MetRelations
        }
      }
    `)
    expect(res).toMatchSnapshot()
  }, 20000)
})
