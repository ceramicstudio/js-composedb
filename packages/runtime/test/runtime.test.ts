/**
 * @jest-environment composedb
 */

import type { CeramicApi } from '@ceramicnetwork/common'
import { CommitID, StreamID } from '@ceramicnetwork/streamid'
import { Composite } from '@composedb/devtools'
import {
  createCommentSchemaWithPost,
  loadPostSchemaWithComments,
  postSchema,
  profilesSchema,
  extraScalarsSchema,
} from '@composedb/test-schemas'
import { AccountId, ChainId } from 'caip'
import { CID } from 'multiformats/cid'

import { ComposeRuntime, printGraphQLSchema } from '../src'

declare global {
  const ceramic: CeramicApi
}

describe('runtime', () => {
  test('create profile', async () => {
    const composite = await Composite.create({ ceramic, schema: profilesSchema })
    const runtime = new ComposeRuntime({ ceramic, definition: composite.toRuntime() })
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
      { input: { content: { name: 'Alice' } } }
    )
    expect(res.data?.createGenericProfile.document.id).toBeDefined()
  }, 30000)

  test('create and query post with comments', async () => {
    const postComposite = await Composite.create({ ceramic, schema: postSchema })
    const postModelID = postComposite.modelIDs[0]

    const commentComposite = await Composite.create({
      ceramic,
      schema: createCommentSchemaWithPost(postModelID),
    })
    const commentModelID = commentComposite.modelIDs.find((id) => id !== postModelID) as string

    const composite = await Composite.create({
      ceramic,
      schema: loadPostSchemaWithComments(postModelID, commentModelID),
    })
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
      { input: { content: { title: 'A second post', text: 'Second post content' } } }
    )
    const postID = postRes.data?.createPost.document.id

    const createCommentMutation = `
      mutation CreateComment($input: CreateCommentInput!) {
        createComment(input: $input) {
          document {
            id
          }
        }
      }
    `
    await runtime.executeQuery(createCommentMutation, {
      input: { content: { postID, text: 'A first comment' } },
    })
    await runtime.executeQuery(createCommentMutation, {
      input: { content: { postID, text: 'A second comment' } },
    })
    await runtime.executeQuery(createCommentMutation, {
      input: { content: { postID, text: 'A third comment' } },
    })

    const res = await runtime.executeQuery(
      `
      query {
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
                      text
                    }
                  }
                }
              }
            }
          }
        }
      }
      `
    )
    expect(res).toMatchSnapshot()
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
              'k1dpgaqe3i64kjqcp801r3sn7ysi5i0k7nxvs7j351s7kewfzr3l7mdxnj7szwo4kr9mn2qki5nnj0cv836ythy1t1gya9s25cn1nexst3jxi5o3h6qprfyju'
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
              'kjzl6cwe1jw147dvq16zluojmraqvwdmbh61dx9e0c59i344lcrsgqfohexp60s'
            ),
            time: '14:10:20+01:00',
            timeZone: 'America/Costa_Rica',
            uri: 'https://ceramic.network',
            utcOffset: '+01:15',
          },
        },
      }
    )
    expect(res.data?.createExtraScalars.document).toMatchSnapshot()
  }, 20000)
})
