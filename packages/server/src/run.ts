import { inspect } from 'node:util'
import { StreamID } from '@ceramicnetwork/streamid'
import { META_MODEL_BYTES } from '@composedb/model-codecs'
import { createLogger } from '@composedb/services-rpc'
import { ServicesRunner } from '@composedb/services-runner'
import { type DagJWSResult, DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'

import { router } from './router.js'

/**
 * Common utilities
 */

function logObject(message: string, data: unknown) {
  console.log(message, inspect(data, { colors: true, depth: null }))
}

const did = new DID({ provider: new Ed25519Provider(new Uint8Array(32)), resolver: getResolver() })

async function createGenesis(
  model: string | Uint8Array,
  data: Record<string, unknown>
): Promise<DagJWSResult> {
  if (!did.authenticated) {
    await did.authenticate()
  }

  return await did.createDagJWS({
    data,
    header: {
      controllers: [did.hasParent ? did.parent : did.id],
      model: typeof model === 'string' ? StreamID.fromString(model).bytes : model,
      sep: 'model',
    },
  })
}

/**
 * Server logic
 */

const runner = new ServicesRunner({
  dataSource: {
    type: 'sqlite',
    database: 'data/test.db',
  },
  logger: createLogger({ minLevel: 0, name: 'services' }),
})
const composite = runner.createClient('server', 'composite')
const caller = router.createCaller({ composite })

/**
 * Dev flow
 */

const postModelCommit = await createGenesis(META_MODEL_BYTES, {
  version: '1.0',
  accountRelation: { type: 'list' },
  name: 'Post',
  schema: {
    type: 'object',
    properties: {
      title: { type: 'string', minLength: 5, maxLength: 100 },
      text: { type: 'string' },
    },
    required: ['title'],
  },
})

const postComposite = await caller.saveComposite({
  composite: {
    models: {
      Post: { action: 'create', commit: postModelCommit },
    },
    commonEmbeds: [],
  },
})

/**
 * Client
 */

async function createPost(content: Record<string, unknown>): Promise<unknown> {
  const commit = await createGenesis(postComposite.graph.models.Post.id, content)

  return await caller.graphql({
    composite: postComposite.id,
    commit,
    source: `
      mutation CreatePost ($input: CreatePostInput!) {
        createPost(input: $input) {
          document {
            id
            title
          }
        }
      }
    `,
    variables: {
      input: { content },
    },
  })
}

const firstPost = await createPost({
  title: 'My first post',
  text: 'Hello world',
})
logObject('first post created', firstPost)

const secondPost = await createPost({
  title: 'A second post',
  text: 'Hello again',
})
logObject('second post created', secondPost)

const postsQuery = await caller.graphql({
  composite: postComposite.id,
  source: `
    query {
      postIndex(last: 10) {
        edges {
          cursor
          node {
            id
            title
            text
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  `,
  variables: {
    input: { content: { foo: 'hello' } },
  },
})
logObject('query result', postsQuery)
