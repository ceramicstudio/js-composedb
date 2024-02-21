/**
 * @jest-environment composedb
 */

import { getRandomValues } from 'node:crypto'
import { Composite } from '@composedb/devtools'
import { socialNetworkSchema } from '@composedb/test-schemas'
import type { CeramicAPI, RuntimeCompositeDefinition } from '@composedb/types'
import { jest } from '@jest/globals'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'

import { ComposeRuntime, printGraphQLSchema } from '../src'

declare global {
  const ceramic: CeramicAPI
}

async function createDID(): Promise<DID> {
  const seed = getRandomValues(new Uint8Array(32))
  const did = new DID({
    resolver: getResolver(),
    provider: new Ed25519Provider(seed),
  })
  await did.authenticate()
  return did
}

describe('social network', () => {
  jest.setTimeout(30000)

  let composite: Composite
  let definition: RuntimeCompositeDefinition
  let runtime: ComposeRuntime
  let user1: DID
  let user2: DID
  let user3: DID
  let user4: DID
  let user5: DID

  beforeAll(async () => {
    composite = await Composite.create({ ceramic, schema: socialNetworkSchema })
    definition = composite.toRuntime()
    runtime = new ComposeRuntime({ ceramic, definition })
    const users: [DID, DID, DID, DID, DID] = await Promise.all([
      createDID(),
      createDID(),
      createDID(),
      createDID(),
      createDID(),
    ])
    user1 = users[0]
    user2 = users[1]
    user3 = users[2]
    user4 = users[3]
    user5 = users[4]
  }, 10000)

  test('generates the GraphQL schema', () => {
    expect(printGraphQLSchema(definition)).toMatchSnapshot()
  })

  test('add followers', async () => {
    async function setFollows(follower: DID, following: DID) {
      ceramic.did = follower
      await runtime.executeQuery(
        `mutation follows($input: SetFollowsInput!) { setFollows(input: $input) { document { id } } }`,
        { input: { content: { following: following.id } } },
      )
    }

    // /!\ Calls need to be made sequentially as the DID used for signing gets changed
    await setFollows(user1, user2)
    await setFollows(user1, user3)
    await setFollows(user1, user4)
    await setFollows(user2, user1)
    await setFollows(user2, user4)
    await setFollows(user3, user1)
    await setFollows(user4, user3)
    await setFollows(user5, user1)
    await setFollows(user5, user2)
    await setFollows(user5, user4)

    await expect(
      runtime.executeQuery(`
        fragment AccountNetwork on CeramicAccount {
          followers: followingOfFollowsListCount
          following: followsListCount
        }

        query {
          followsCount
          user1: node(id: "${user1.id}") { ...AccountNetwork }
          user2: node(id: "${user2.id}") { ...AccountNetwork }
          user3: node(id: "${user3.id}") { ...AccountNetwork }
          user4: node(id: "${user4.id}") { ...AccountNetwork }
          user5: node(id: "${user5.id}") { ...AccountNetwork }
        }
      `),
    ).resolves.toMatchSnapshot()
  })

  test('create posts and tags', async () => {
    async function createPostsAndTags(user: DID, variables: Record<string, unknown>) {
      ceramic.did = user
      await runtime.executeQuery(
        `
        mutation createPostsAndTags($post1: CreateTextPostInput!, $post2: CreateTextPostInput!, $post3: CreateTextPostInput!, $tag1: SetTagInput!, $tag2: SetTagInput!) {
          post1: createTextPost(input: $post1) { document { id } }
          post2: createTextPost(input: $post2) { document { id } }
          post3: createTextPost(input: $post3) { document { id } }
          tag1: setTag(input: $tag1) { document { id } }
          tag2: setTag(input: $tag2) { document { id } }
        }
        `,
        variables,
      )
    }

    // /!\ Calls need to be made sequentially as the DID used for signing gets changed
    await createPostsAndTags(user1, {
      post1: { content: { date: '2024-02-01T01:10:00Z', text: 'Hello world' } },
      post2: { content: { date: '2024-02-03T09:30:00Z', text: 'ComposeDB on Ceramic' } },
      post3: { content: { date: '2024-02-07T06:15:00Z', text: 'Testing ComposeDB' } },
      tag1: { content: { name: 'Ceramic' } },
      tag2: { content: { name: 'ComposeDB' } },
    })
    await createPostsAndTags(user2, {
      post1: { content: { date: '2024-02-10T01:10:00Z', text: 'Hello there' } },
      post2: { content: { date: '2024-02-13T09:30:00Z', text: 'Hello again' } },
      post3: { content: { date: '2024-02-16T06:15:00Z', text: 'Whats up?' } },
      tag1: { content: { name: 'Hello' } },
      tag2: { content: { name: 'Random' } },
    })
    await createPostsAndTags(user3, {
      post1: { content: { date: '2024-02-02T01:10:00Z', text: 'Hello' } },
      post2: { content: { date: '2024-02-05T09:30:00Z', text: 'Ceramic rocks' } },
      post3: { content: { date: '2024-02-10T06:15:00Z', text: 'Ceramic is great' } },
      tag1: { content: { name: 'Ceramic' } },
      tag2: { content: { name: 'Hello' } },
    })

    await expect(
      runtime.executeQuery(`
      query {
        textPostIndex(first: 10) { edges { node { date text } } }
        tagIndex(first: 10) { edges { node { name } } }
      }
    `),
    ).resolves.toMatchSnapshot()
  })

  test('tag and like posts', async () => {
    const postsResult = await runtime.executeQuery<{
      postIndex: { edges: Array<{ node: { id: string } }> }
    }>(` query { postIndex(last: 10) { edges { node { id } } } }`)
    const postIDs = postsResult.data!.postIndex.edges.map((e) => e.node.id)

    async function likeAndTag(user: DID, offset = 0) {
      ceramic.did = user
      const userTagsResult = await runtime.executeQuery<{
        viewer: { tagList: { edges: Array<{ node: { id: string } }> } }
      }>(`query { viewer { tagList(first: 2) { edges { node { id } } } } }`)
      const tagIDs = userTagsResult.data!.viewer.tagList.edges.map((e) => e.node.id)

      await runtime.executeQuery<{
        like1: { document: { postID: string } }
        like2: { document: { postID: string } }
        postTag1: { document: { postID: string; tagID: string } }
        postTag2: { document: { postID: string; tagID: string } }
        postTag3: { document: { postID: string; tagID: string } }
      }>(`
        mutation addTagsAndLikes {
          like1: setLike(input: { content: { postID: "${postIDs[offset]}" } }) { document { postID } }
          like2: setLike(input: { content: { postID: "${postIDs[offset + 1]}" } }) { document { postID } }
          # Duplicate to check SET behavior
          like3: setLike(input: { content: { postID: "${postIDs[offset + 1]}" } }) { document { postID } }
          postTag1: setPostTag(input: { content: { postID: "${postIDs[offset]}", tagID: "${tagIDs[0]}" } }) { document { postID tagID } }
          postTag2: setPostTag(input: { content: { postID: "${postIDs[offset]}", tagID: "${tagIDs[1]}" } }) { document { postID tagID } }
          postTag3: setPostTag(input: { content: { postID: "${postIDs[offset + 1]}", tagID: "${tagIDs[1]}" } }) { document { postID tagID } }
          # Duplicate to check SET behavior
          postTag4: setPostTag(input: { content: { postID: "${postIDs[offset + 1]}", tagID: "${tagIDs[1]}" } }) { document { postID tagID } }
        }
      `)
    }

    // /!\ Calls need to be made sequentially as the DID used for signing gets changed
    await likeAndTag(user1)
    await likeAndTag(user2, 1)
    await likeAndTag(user3, 2)

    await expect(
      runtime.executeQuery(`
      fragment TagOfPostTag on PostTag { tag { ...on Tag { name } } }
      fragment TextOfPostTag on PostTag { post { ...on TextPost { text } } }

      query {
        likeCount
        postTagCount
        tagIndex(first: 10) { 
          edges { 
            node { 
              name
              postTagsCount
              postTags(first: 10) { edges { node { ...TextOfPostTag } } }
              user1Post1: postTag(account: "${user1.id}", with: { postID: "${postIDs[0]}" }) { ...TextOfPostTag }
              user1Post2: postTag(account: "${user1.id}", with: { postID: "${postIDs[1]}" }) { ...TextOfPostTag }
              user1Post3: postTag(account: "${user1.id}", with: { postID: "${postIDs[2]}" }) { ...TextOfPostTag }
              user2Post1: postTag(account: "${user2.id}", with: { postID: "${postIDs[0]}" }) { ...TextOfPostTag }
              user2Post2: postTag(account: "${user2.id}", with: { postID: "${postIDs[1]}" }) { ...TextOfPostTag }
              user2Post3: postTag(account: "${user2.id}", with: { postID: "${postIDs[2]}" }) { ...TextOfPostTag }
              user3Post1: postTag(account: "${user3.id}", with: { postID: "${postIDs[0]}" }) { ...TextOfPostTag }
              user3Post2: postTag(account: "${user3.id}", with: { postID: "${postIDs[1]}" }) { ...TextOfPostTag }
              user3Post3: postTag(account: "${user3.id}", with: { postID: "${postIDs[2]}" }) { ...TextOfPostTag }
            } 
          } 
        }
        textPostIndex(first: 10) { 
          edges { 
            node { 
              likesCount
              postTagsCount
              user1Like: like(account: "${user1.id}") { date }
              user2Like: like(account: "${user2.id}") { date }
              user3Like: like(account: "${user3.id}") { date }
              allTags: postTags(first: 10) { edges { node { ...TagOfPostTag } } }
              user1Tags: postTags(account: "${user1.id}", first: 10) { edges { node { ...TagOfPostTag } } }
              user2Tags: postTags(account: "${user2.id}", first: 10) { edges { node { ...TagOfPostTag } } }
              user3Tags: postTags(account: "${user3.id}", first: 10) { edges { node { ...TagOfPostTag } } }
            }
          }
        }
        
      }
    `),
    ).resolves.toMatchSnapshot()
  })

  test('untag and unlike posts', async () => {
    const postsResult = await runtime.executeQuery<{
      postIndex: { edges: Array<{ node: { id: string } }> }
    }>(`query { postIndex(last: 10) { edges { node { id } } } }`)
    const postIDs = postsResult.data!.postIndex.edges.map((e) => e.node.id)

    async function unlikeAndUntag(user: DID) {
      ceramic.did = user
      const userResult = await runtime.executeQuery<{
        viewer: {
          likeList: { edges: Array<{ node: { id: string } }> }
          postTagList: { edges: Array<{ node: { id: string } }> }
        }
      }>(`
        query {
          viewer {
            likeList(first: 1) { edges { node { id } } } 
            postTagList(first: 1) { edges { node { id } } } 
          } 
        }
      `)
      const likeID = userResult.data!.viewer.likeList.edges[0].node.id
      const postTagID = userResult.data!.viewer.postTagList.edges[0].node.id

      await runtime.executeQuery<{
        like: { document: { postID: string } }
        postTag: { document: { postID: string; tagID: string } }
      }>(`
        mutation removeTagsAndLikes {
          like: enableIndexingLike(input: { id: "${likeID}", shouldIndex: false }) { document { postID } }
          postTag: enableIndexingPostTag(input: { id: "${postTagID}", shouldIndex: false }) { document { postID tagID } }
        }
      `)
    }

    // /!\ Calls need to be made sequentially as the DID used for signing gets changed
    await unlikeAndUntag(user1)
    await unlikeAndUntag(user2)

    await expect(
      runtime.executeQuery(`
      fragment TagOfPostTag on PostTag { tag { ...on Tag { name } } }
      fragment TextOfPostTag on PostTag { post { ...on TextPost { text } } }

      query {
        likeCount
        postTagCount
        tagIndex(first: 10) { 
          edges { 
            node { 
              name
              postTagsCount
              postTags(first: 10) { edges { node { ...TextOfPostTag } } }
              user1Post1: postTag(account: "${user1.id}", with: { postID: "${postIDs[0]}" }) { ...TextOfPostTag }
              user1Post2: postTag(account: "${user1.id}", with: { postID: "${postIDs[1]}" }) { ...TextOfPostTag }
              user1Post3: postTag(account: "${user1.id}", with: { postID: "${postIDs[2]}" }) { ...TextOfPostTag }
              user2Post1: postTag(account: "${user2.id}", with: { postID: "${postIDs[0]}" }) { ...TextOfPostTag }
              user2Post2: postTag(account: "${user2.id}", with: { postID: "${postIDs[1]}" }) { ...TextOfPostTag }
              user2Post3: postTag(account: "${user2.id}", with: { postID: "${postIDs[2]}" }) { ...TextOfPostTag }
              user3Post1: postTag(account: "${user3.id}", with: { postID: "${postIDs[0]}" }) { ...TextOfPostTag }
              user3Post2: postTag(account: "${user3.id}", with: { postID: "${postIDs[1]}" }) { ...TextOfPostTag }
              user3Post3: postTag(account: "${user3.id}", with: { postID: "${postIDs[2]}" }) { ...TextOfPostTag }
            } 
          } 
        }
        textPostIndex(first: 10) { 
          edges { 
            node { 
              likesCount
              postTagsCount
              user1Like: like(account: "${user1.id}") { date }
              user2Like: like(account: "${user2.id}") { date }
              user3Like: like(account: "${user3.id}") { date }
              allTags: postTags(first: 10) { edges { node { ...TagOfPostTag } } }
              user1Tags: postTags(account: "${user1.id}", first: 10) { edges { node { ...TagOfPostTag } } }
              user2Tags: postTags(account: "${user2.id}", first: 10) { edges { node { ...TagOfPostTag } } }
              user3Tags: postTags(account: "${user3.id}", first: 10) { edges { node { ...TagOfPostTag } } }
            }
          }
        }
        
      }
    `),
    ).resolves.toMatchSnapshot()
  })
})
