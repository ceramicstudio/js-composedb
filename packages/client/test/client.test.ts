/**
 * @jest-environment composedb
 */

import { Composite } from '@composedb/devtools'
import { postSchema, profilesSchema, ratingSchema } from '@composedb/test-schemas'
import type { Executor } from '@graphql-tools/utils'
import { jest } from '@jest/globals'

import { ComposeClient } from '../src'

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
      { input: { content: { name: 'Alice' } } },
    )
    expect(res.data?.createGenericProfile.document.id).toBeDefined()
  }, 30000)

  test('create and query post with comments', async () => {
    const composite = await Composite.create({ ceramic, schema: postSchema })
    const definition = composite.toRuntime()

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
      `,
    )
    expect(res).toMatchSnapshot()
  }, 60000)

  test('create and query ratings with filters and ordering', async () => {
    const composite = await Composite.create({ ceramic, schema: ratingSchema })
    const client = new ComposeClient({ ceramic, definition: composite.toRuntime() })

    const createRatingMutation = `
      mutation CreateRating($input: CreateRatingInput!) {
        createRating(input: $input) {
          document {
            id
          }
        }
      }
    `
    await client.executeQuery(createRatingMutation, {
      input: { content: { title: 'one', value: 5 } },
    })
    await client.executeQuery(createRatingMutation, {
      input: { content: { title: 'two', value: 2.5 } },
    })
    await client.executeQuery(createRatingMutation, {
      input: { content: { title: 'three', value: 3.5 } },
    })

    const filtered = await client.executeQuery(
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

    const ascending = await client.executeQuery(
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

    const descending = await client.executeQuery(
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
  }, 60000)

  test('with remote executor', async () => {
    const remoteExecutor = jest.fn(() => {
      return { data: {} }
    }) as Executor
    const composite = await Composite.create({ ceramic, schema: profilesSchema })
    const client = new ComposeClient({ ceramic, definition: composite.toRuntime(), remoteExecutor })
    const res = await client.executeQuery(`
      query {
        viewer {
          genericProfile {
            name
          }
        }
      }
    `)
    expect(res.errors).not.toBeDefined()
    expect(remoteExecutor).toHaveBeenCalled()
  }, 30000)
})
