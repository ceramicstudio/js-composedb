/**
 * @jest-environment composedb
 */

import { CommitID, StreamID } from '@ceramicnetwork/streamid'
import { Composite } from '@composedb/devtools'
import {
  extraScalarsSchema,
  favoriteSchema,
  mediaSchema,
  noteSchema,
  postSchema,
  ratingSchema,
  socialSchema,
} from '@composedb/test-schemas'
import type { CeramicAPI } from '@composedb/types'
import { jest } from '@jest/globals'
import { AccountId, ChainId } from 'caip'
import { CID } from 'multiformats/cid'
import { ComposeRuntime, createContext, printGraphQLSchema } from '../src'

declare global {
  const ceramic: CeramicAPI
}

describe('runtime', () => {
  test('set and unset profile with custom sync timeout', async () => {
    const composite = await Composite.create({
      ceramic,
      schema: `
        type Profile @createModel(description: "Test profile", accountRelation: SINGLE) {
          name: String! @string(minLength: 2, maxLength: 20)
        }
      `,
    })

    const context = createContext({ ceramic })
    const spy = jest.spyOn(context, 'upsertSingle')

    const runtime = new ComposeRuntime({ ceramic, context, definition: composite.toRuntime() })
    const setRes = await runtime.executeQuery<{
      setProfile: { document: { id: string }; viewer: { profile: { name: string } } }
    }>(
      `
      mutation SetProfile($input: SetProfileInput!) {
        setProfile(input: $input) {
          document {
            id
          }
          viewer {
            profile {
              name
            }
          }
        }
      }
      `,
      { input: { content: { name: 'Alice' }, options: { syncTimeout: 1 } } },
    )
    const profileID = setRes.data?.setProfile.document.id
    expect(profileID).toBeDefined()
    expect(setRes.data?.setProfile.viewer.profile.name).toBe('Alice')
    expect(spy).toHaveBeenCalledWith(
      expect.any(String),
      { name: 'Alice' },
      { syncTimeoutSeconds: 1 },
    )

    async function runQuery() {
      return await runtime.executeQuery(`
        query Profiles {
          profileIndex (first: 1) {
            edges {
              node {
                name
              }
            }
          }
        }
      `)
    }
    // Check profile is returned by indexer
    await expect(runQuery()).resolves.toMatchSnapshot()

    const updateRes = await runtime.executeQuery<{
      updateProfile: { viewer: { profile: { name: string } } }
    }>(
      `
      mutation UpdateProfile($input: UpdateProfileInput!) {
        updateProfile(input: $input) {
          viewer {
            profile {
              name
            }
          }
        }
      }
    `,
      { input: { id: profileID, content: {}, options: { shouldIndex: false } } },
    )
    // Profile should no longer be returned
    expect(updateRes.data?.updateProfile.viewer.profile).toBeNull()

    // Check profile is no longer returned by indexer
    await expect(runQuery()).resolves.toMatchSnapshot()

    // Document is still accessible by direct access using its stream ID
    const directLoadRes = await runtime.executeQuery(
      `
        query LoadProfile($id: ID!) {
          node(id: $id) {
            ... on Profile {
              name
            }
          }
        }
      `,
      { id: profileID },
    )
    expect(directLoadRes).toMatchSnapshot()
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
            duration
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
            duration: 'P1Y2M22DT5H24M15S',
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

  test('create and update a document with enum', async () => {
    const composite = await Composite.create({ ceramic, schema: noteSchema })
    const runtime = new ComposeRuntime({ ceramic, definition: composite.toRuntime() })
    const created = await runtime.executeQuery<{ createNote: { document: { id: string } } }>(
      `
      mutation CreateNote($input: CreateNoteInput!) {
        createNote(input: $input) {
          document {
            id
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
    const { id, ...content } = created.data?.createNote.document ?? {}
    expect(content).toMatchSnapshot()

    const updated = await runtime.executeQuery<{
      updateNote: { document: Record<string, unknown> }
    }>(
      `
      mutation UpdateNote($input: UpdateNoteInput!) {
        updateNote(input: $input) {
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
          id,
          content: {
            status: null,
            title: 'A test note',
            text: 'New note contents',
          },
        },
      },
    )
    expect(updated.data?.updateNote.document).toMatchSnapshot()
  }, 20000)

  test('create and enable indexing post with comments', async () => {
    const composite = await Composite.create({ ceramic, schema: postSchema })
    const definition = composite.toRuntime()

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

    const postRes = await runtime.executeQuery<{ createPost: { document: { id: string } } }>(
      createPostMutation,
      { input: { content: { title: 'A first post', text: 'First post content' } } },
    )
    const { id } = postRes.data?.createPost.document ?? {}

    const enableIndexingPostMutation = `mutation EnableIndexingPost($input: EnableIndexingPostInput!) {
      enableIndexingPost(input: $input) {
          document {
            id
          }
        }
      }`
    const res = await runtime.executeQuery<{ enableIndexingPost: { document: { id: string } } }>(
      enableIndexingPostMutation,
      { input: { id, shouldIndex: false } },
    )

    expect(res.errors).toBeUndefined()
  }, 60000)

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

  test('interfaces queries', async () => {
    const composite = await Composite.create({ ceramic, schema: mediaSchema })
    const runtime = new ComposeRuntime({ ceramic, definition: composite.toRuntime() })

    const createdMedia = await runtime.executeQuery<Record<string, { document: { id: string } }>>(
      `
      mutation CreateMedia(
        $image1Input: CreateMyImageInput!,
        $image2Input: CreateMyImageInput!,
        $audio1Input: CreateMyAudioInput!,
        $audio2Input: CreateMyAudioInput!,
        $video1Input: CreateMyVideoInput!,
        $video2Input: CreateMyVideoInput!) {
        image1: createMyImage(input: $image1Input) {
          document {
            id
          }
        }
        image2: createMyImage(input: $image2Input) {
          document {
            id
          }
        }
        audio1: createMyAudio(input: $audio1Input) {
          document {
            id
          }
        }
        audio2: createMyAudio(input: $audio2Input) {
          document {
            id
          }
        }
        video1: createMyVideo(input: $video1Input) {
          document {
            id
          }
        }
        video2: createMyVideo(input: $video2Input) {
          document {
            id
          }
        }
      }
      `,
      {
        image1Input: { content: { src: 'http://my/image1', width: 800, height: 600 } },
        image2Input: { content: { src: 'http://my/image2', width: 1600, height: 800 } },
        audio1Input: { content: { src: 'http://my/audio1', duration: 'PT2M36S' } },
        audio2Input: { content: { src: 'http://my/audio2', duration: 'PT5M4S' } },
        video1Input: {
          content: { src: 'http://my/video1', duration: 'PT2H5M48S', width: 1920, height: 1080 },
        },
        video2Input: {
          content: { src: 'http://my/video2', duration: 'PT1H34M15S', width: 4096, height: 2160 },
        },
      },
    )

    const res = await runtime.executeQuery(`
      query {
        mediaMetadataIndex(first: 10) {
          edges {
            node {
              __typename
              src
              ...on TimeMedia {
                duration
              }
              ...on VisualMedia {
                width
                height
              }
            }
          }
        }
      }
    `)
    expect(res).toMatchSnapshot()

    const visualRes = await runtime.executeQuery(`
      query {
        visualMediaIndex(first: 10, filters: { where: { width: { greaterThan: 1000 } } }, sorting: { width: DESC }) {
          edges {
            node {
              __typename
              width
              height
              ...on MediaMetadata {
                src
              }
            }
          }
        }
      }
    `)
    expect(visualRes).toMatchSnapshot()

    const createdCollections = await runtime.executeQuery<
      Record<string, { document: { id: string } }>
    >(
      `
      mutation CreateCollections(
        $collection1Input: CreateMyMediaCollectionInput!,
        $collection2Input: CreateMyMediaCollectionInput!,
      ) {
        collection1: createMyMediaCollection(input: $collection1Input) {
          document {
            id
          }
        }
        collection2: createMyMediaCollection(input: $collection2Input) {
          document {
            id
          }
        }
      }
      `,
      {
        collection1Input: {
          content: { name: 'First collection', createdAt: '2023-11-01T10:26:04Z' },
        },
        collection2Input: {
          content: { name: 'Second collection', createdAt: '2023-11-02T05:15:46Z' },
        },
      },
    )

    const image1ID = createdMedia.data!.image1.document.id
    const image2ID = createdMedia.data!.image2.document.id
    const audio1ID = createdMedia.data!.audio1.document.id
    const audio2ID = createdMedia.data!.audio2.document.id
    const video1ID = createdMedia.data!.video1.document.id
    const video2ID = createdMedia.data!.video2.document.id
    const collection1ID = createdCollections.data!.collection1.document.id
    const collection2ID = createdCollections.data!.collection2.document.id

    await runtime.executeQuery(
      `
      mutation CreateItems(
        $item1Input: CreateMyMediaCollectionItemInput!,
        $item2Input: CreateMyMediaCollectionItemInput!,
        $item3Input: CreateMyMediaCollectionItemInput!,
        $item4Input: CreateMyMediaCollectionItemInput!,
        $item5Input: CreateMyMediaCollectionItemInput!,
        $item6Input: CreateMyMediaCollectionItemInput!,
        $item7Input: CreateMyMediaCollectionItemInput!,
        $item8Input: CreateMyMediaCollectionItemInput!,
      ) {
        item1: createMyMediaCollectionItem(input: $item1Input) {
          document {
            id
          }
        }
        item2: createMyMediaCollectionItem(input: $item2Input) {
          document {
            id
          }
        }
        item3: createMyMediaCollectionItem(input: $item3Input) {
          document {
            id
          }
        }
        item4: createMyMediaCollectionItem(input: $item4Input) {
          document {
            id
          }
        }
        item5: createMyMediaCollectionItem(input: $item5Input) {
          document {
            id
          }
        }
        item6: createMyMediaCollectionItem(input: $item6Input) {
          document {
            id
          }
        }
        item7: createMyMediaCollectionItem(input: $item7Input) {
          document {
            id
          }
        }
        item8: createMyMediaCollectionItem(input: $item8Input) {
          document {
            id
          }
        }
      }
      `,
      {
        item1Input: {
          content: {
            collectionID: collection1ID,
            itemID: video1ID,
            createdAt: '2023-11-01T11:06:27Z',
          },
        },
        item2Input: {
          content: {
            collectionID: collection1ID,
            itemID: video2ID,
            createdAt: '2023-11-01T11:06:27Z',
          },
        },
        item3Input: {
          content: {
            collectionID: collection2ID,
            itemID: video2ID,
            createdAt: '2023-11-01T11:06:27Z',
          },
        },
        item4Input: {
          content: {
            collectionID: collection1ID,
            itemID: image2ID,
            createdAt: '2023-11-01T11:06:27Z',
          },
        },
        item5Input: {
          content: {
            collectionID: collection2ID,
            itemID: image2ID,
            createdAt: '2023-11-01T11:06:27Z',
          },
        },
        item6Input: {
          content: {
            collectionID: collection1ID,
            itemID: image1ID,
            createdAt: '2023-11-01T11:06:27Z',
          },
        },
        item7Input: {
          content: {
            collectionID: collection1ID,
            itemID: audio2ID,
            createdAt: '2023-11-01T11:06:27Z',
          },
        },
        item8Input: {
          content: {
            collectionID: collection2ID,
            itemID: audio1ID,
            createdAt: '2023-11-01T11:06:27Z',
          },
        },
      },
    )

    const relationsRes = await runtime.executeQuery(
      `
      query {
        collection1: node(id: "${collection1ID}") {
          ...on Collection {
            itemsCount
            items(first: 10) {
              edges {
                node {
                  item {
                    __typename
                    ...on MediaMetadata {
                      src
                    }
                  } 
                }
              }
            }
          }
        }
        video2: node(id: "${video2ID}") {
          ...on MediaMetadata {
            collectionItemsCount
            collectionItems(first: 10) {
              edges {
                node {
                  collection {
                    ...on Collection {
                      name
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
    expect(relationsRes).toMatchSnapshot()
  }, 30000)

  test('SET account relation support', async () => {
    const [favoriteComposite, postComposite] = await Promise.all([
      Composite.create({ ceramic, schema: favoriteSchema }),
      Composite.create({ ceramic, schema: postSchema }),
    ])
    const favoriteModelID = favoriteComposite.getModelID('Favorite')!
    const postModelID = postComposite.getModelID('Post')!
    const composite = Composite.from([favoriteComposite, postComposite], {
      views: {
        models: {
          [postModelID]: {
            favorites: { type: 'relationFrom', model: favoriteModelID, property: 'docID' },
          },
        },
      },
    })

    const definition = composite.toRuntime()
    expect(printGraphQLSchema(definition)).toMatchSnapshot()
    const runtime = new ComposeRuntime({ ceramic, definition: composite.toRuntime() })

    const createdPosts = await runtime.executeQuery<Record<string, { document: { id: string } }>>(
      `
      mutation CreatePosts(
        $post1Input: CreatePostInput!,
        $post2Input: CreatePostInput!) {
        post1: createPost(input: $post1Input) {
          document {
            id
          }
        }
        post2: createPost(input: $post2Input) {
          document {
            id
          }
        }
      }
      `,
      {
        post1Input: { content: { title: 'Test post 1', text: 'First post' } },
        post2Input: { content: { title: 'Test post 2', text: 'Second post' } },
      },
    )
    const post1ID = createdPosts.data!.post1.document.id
    const post2ID = createdPosts.data!.post2.document.id

    const setFavorite = `
      mutation SetFavorite($input: SetFavoriteInput!) {
        setFavorite(input: $input) {
          document {
            id
            doc {
              ... on Post {
                title
              }
            }
          }
          viewer {
            favoriteList(first: 10) {
              edges {
                node {
                  doc {
                    ... on Post {
                      title
                    }
                  }
                  tag
                }
              }
            }
          }
        }
      }
    `

    const favorite1Res = await runtime.executeQuery<{
      setFavorite: { document: { id: string }; viewer: unknown }
    }>(setFavorite, { input: { content: { docID: post1ID, tag: 'posts' } } })
    expect(favorite1Res.data?.setFavorite.viewer).toMatchSnapshot()
    const favorite1ID = favorite1Res.data?.setFavorite.document.id

    const favorite2Res = await runtime.executeQuery<{
      setFavorite: { document: { id: string }; viewer: unknown }
    }>(setFavorite, {
      input: { content: { docID: post2ID, tag: 'posts' } },
    })
    expect(favorite2Res.data?.setFavorite.viewer).toMatchSnapshot()

    const unsetRes = await runtime.executeQuery(
      `
      mutation UnsetFavorite($input: UpdateFavoriteInput!) {
        updateFavorite(input: $input) {
          viewer {
            favoriteList(first: 10) {
              edges {
                node {
                  doc {
                    ... on Post {
                      title
                    }
                  }
                  tag
                }
              }
            }
          }
        }
      }
      `,
      { input: { id: favorite1ID, content: {}, options: { shouldIndex: false } } },
    )
    expect(unsetRes.data).toMatchSnapshot()
  }, 30000)

  test('runtime operations on models with immutable field random', async () => {
    const postWithImmutableFieldSchema = `
    interface TestInterface @createModel(description: "Test interface with immutable field") {
      testField: String @string(maxLength: 50) @immutable
    }

    type Post implements TestInterface
      @createModel(accountRelation: LIST, description: "Simple post with immutable field") 
      @createIndex(fields: [{path:["title"]}]) {
      author: DID! @documentAccount
      date: DateTime 
      title: String! @string(minLength: 10, maxLength: 100) @immutable
      text: String! @string(maxLength: 2000)
      testField: String @string(maxLength: 50) 
    }
    `
    const originalTitle = 'An Original Post'
    const date = '2024-01-01T10:15:30Z'
    const text = 'First post content'
    const testField = 'A test field'

    const composite = await Composite.create({ ceramic, schema: postWithImmutableFieldSchema })
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

    const res = await runtime.executeQuery<{ createPost: { document: { id: string } } }>(
      createPostMutation,
      {
        input: {
          content: {
            title: originalTitle,
            text,
            date,
            testField,
          },
        },
      },
    )

    const docID = res.data?.createPost.document.id
    expect(docID).toBeDefined()

    const updatePost = `mutation UpdatePost($i: UpdatePostInput!) {
      updatePost(input: $i) {
          document {
              id
              title
              text
              date
          }
      }
    }`

    const res2 = await runtime.executeQuery(updatePost, {
      i: { id: docID, content: { title: 'A different title' } },
    })

    expect(res2.errors).toBeDefined()
    expect(res2.errors![0].message).toEqual(
      `Variable "$i" got invalid value { title: "A different title" } at "i.content"; Field "title" is not defined by type "PartialPostInput". Did you mean "date"?`,
    )
  }, 60000)

  test('toggling `shouldIndex` metadata', async () => {
    const composite = await Composite.create({
      ceramic,
      schema: `
        type Post @createModel(description: "Test post") {
          title: String! @string(maxLength: 1000)
        }
      `,
    })
    const definition = composite.toRuntime()
    const runtime = new ComposeRuntime({ ceramic, definition })

    const createdRes = await runtime.executeQuery<{
      post1: { document: { id: string } }
      post2: { document: { id: string } }
    }>(
      `
      mutation CreatePosts($input1: CreatePostInput!, $input2: CreatePostInput!) {
        post1: createPost(input: $input1) {
          document {
            id
          }
        }
        post2: createPost(input: $input2) {
          document {
            id
          }
        }
      }
      `,
      {
        input1: { content: { title: 'A first post' } },
        input2: { content: { title: 'A second post' } },
      },
    )
    const postID = createdRes.data?.post1.document.id
    expect(postID).toBeDefined()

    async function runQuery() {
      return await runtime.executeQuery(`
        query Posts {
          postIndex (first: 2) {
            edges {
              node {
                title
              }
            }
          }
        }
      `)
    }

    await expect(runQuery()).resolves.toMatchSnapshot()

    async function togglePostShouldIndex(shouldIndex: boolean, content = {}) {
      await runtime.executeQuery(
        `mutation UpdatePost($input: UpdatePostInput!) {
          updatePost(input: $input) {
            document {
              id
            }
          }
        }`,
        { input: { id: postID, content, options: { shouldIndex } } },
      )
    }

    await togglePostShouldIndex(false)
    await expect(runQuery()).resolves.toMatchSnapshot()

    await togglePostShouldIndex(true, { title: 'First post is back' })
    await expect(runQuery()).resolves.toMatchSnapshot()
  }, 30000)
})
