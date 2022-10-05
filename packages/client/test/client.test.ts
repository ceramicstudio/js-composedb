/**
 * @jest-environment composedb
 */

import type { CeramicApi } from '@ceramicnetwork/common'
import { Composite } from '@composedb/devtools'
import {
  createCommentSchemaWithPost,
  loadPostSchemaWithComments,
  postSchema,
  profilesSchema,
} from '@composedb/test-schemas'

import { ComposeClient, printGraphQLSchema } from '../src'

declare global {
  const ceramic: CeramicApi
}

describe('client', () => {
  test('create profile', async () => {
    const composite = await Composite.create({ ceramic, schema: profilesSchema })
    const client = new ComposeClient({ ceramic, definition: composite.toRuntime() })
    const res = await client.executeQuery<{ createGenericProfile: { document: { id: string } } }>(
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

    const client = new ComposeClient({ ceramic, definition })

    const createPostMutation = `
      mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
          document {
            id
          }
        }
      }
    `
    await client.executeQuery(createPostMutation, {
      input: { content: { title: 'A first post', text: 'First post content' } },
    })
    const postRes = await client.executeQuery<{ createPost: { document: { id: string } } }>(
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
    await client.executeQuery(createCommentMutation, {
      input: { content: { postID, text: 'A first comment' } },
    })
    await client.executeQuery(createCommentMutation, {
      input: { content: { postID, text: 'A second comment' } },
    })
    await client.executeQuery(createCommentMutation, {
      input: { content: { postID, text: 'A third comment' } },
    })

    const res = await client.executeQuery(
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
})
