import React from 'react'
import useIsBrowser from '@docusaurus/useIsBrowser'
import { GraphiQL } from 'graphiql'
import 'graphiql/graphiql.min.css'
import { ComposeClient } from '@composedb/client'
import ReactGA from 'react-ga4'
import Profiles from './profiles'
import Posts from './posts'
import Comments from './comments'

const definition = {
  models: {
    BasicProfile: {
      id: 'kjzl6hvfrbw6c8i6k87cma2gvbnw3hgz2j2tc0hmc6yzzc1zikbwsryulsnmmak',
      accountRelation: { type: 'single' },
    },
    Posts: {
      id: 'kjzl6hvfrbw6cags7lvf5ajsgdfqwnnhoyp5fr3fhmitskk0ksydeaspzxckpub',
      accountRelation: { type: 'list' },
    },
    Following: {
      id: 'kjzl6hvfrbw6c930807bvmzvcqkqv6ni1q2jhv5bc59hima9r9ci1zk22tpxq3v',
      accountRelation: { type: 'list' },
    },
    Comments: {
      id: 'kjzl6hvfrbw6cb3x190263pxlza37ls1gxizt1ea21gtr9xwp7qln05elotk0h8',
      accountRelation: { type: 'list' },
    },
  },
  objects: {
    BasicProfile: {
      name: { type: 'string', required: true },
      emoji: { type: 'string', required: false },
      gender: { type: 'string', required: false },
      username: { type: 'string', required: true },
      description: { type: 'string', required: false },
      posts: {
        type: 'view',
        viewType: 'relation',
        relation: {
          source: 'queryConnection',
          model: 'kjzl6hvfrbw6cags7lvf5ajsgdfqwnnhoyp5fr3fhmitskk0ksydeaspzxckpub',
          property: 'profileId',
        },
      },
    },
    Posts: {
      tag: { type: 'string', required: true, indexed: true },
      body: { type: 'string', required: true },
      edited: { type: 'datetime', required: false, indexed: true },
      created: { type: 'datetime', required: true, indexed: true },
      profileId: { type: 'streamid', required: true },
      profile: {
        type: 'view',
        viewType: 'relation',
        relation: {
          source: 'document',
          model: 'kjzl6hvfrbw6c8i6k87cma2gvbnw3hgz2j2tc0hmc6yzzc1zikbwsryulsnmmak',
          property: 'profileId',
        },
      },
      responses: {
        type: 'view',
        viewType: 'relation',
        relation: {
          source: 'queryConnection',
          model: 'kjzl6hvfrbw6cb3x190263pxlza37ls1gxizt1ea21gtr9xwp7qln05elotk0h8',
          property: 'postId',
        },
      },
    },
    Following: {
      profileId: { type: 'streamid', required: true },
      profile: {
        type: 'view',
        viewType: 'relation',
        relation: {
          source: 'document',
          model: 'kjzl6hvfrbw6c8i6k87cma2gvbnw3hgz2j2tc0hmc6yzzc1zikbwsryulsnmmak',
          property: 'profileId',
        },
      },
    },
    Comments: {
      edited: { type: 'datetime', required: false, indexed: true },
      postId: { type: 'streamid', required: true },
      comment: { type: 'string', required: true },
      created: { type: 'datetime', required: true, indexed: true },
      profileId: { type: 'streamid', required: true },
      post: {
        type: 'view',
        viewType: 'relation',
        relation: {
          source: 'document',
          model: 'kjzl6hvfrbw6cags7lvf5ajsgdfqwnnhoyp5fr3fhmitskk0ksydeaspzxckpub',
          property: 'postId',
        },
      },
      profile: {
        type: 'view',
        viewType: 'relation',
        relation: {
          source: 'document',
          model: 'kjzl6hvfrbw6c8i6k87cma2gvbnw3hgz2j2tc0hmc6yzzc1zikbwsryulsnmmak',
          property: 'profileId',
        },
      },
    },
  },
  enums: {},
  accountData: {
    basicProfile: { type: 'node', name: 'BasicProfile' },
    postsList: { type: 'connection', name: 'Posts' },
    followingList: { type: 'connection', name: 'Following' },
    commentsList: { type: 'connection', name: 'Comments' },
  },
}

const fetcher = async (graphQLParams) => {
  ReactGA.initialize('G-V2Y8T342EX')

  const composeClient = new ComposeClient({
    ceramic: 'https://ceramic-temp.hirenodes.io',
    definition,
  })

  ReactGA.event({
    category: 'sandbox-query',
    action: 'general-submit',
  })

  const data = await composeClient.executeQuery(`${graphQLParams.query}`)
  console.log(data)

  if (data.errors) {
    ReactGA.event({
      category: 'sandbox-query',
      action: 'query-error',
    })
  } else {
    ReactGA.event({
      category: 'sandbox-query',
      action: 'query-success',
    })
  }
  if (!data.data.__schema) {
    return data.data
  }
}

const settings = {
  profiles: Profiles,
  comments: Comments,
  posts: Posts,
}

export default function Sandbox(props) {
  const isBrowser = useIsBrowser()
  return isBrowser ? (
    <GraphiQL defaultTabs={settings[props.queries].values} storage={null} fetcher={fetcher} />
  ) : (
    <div>loading...</div>
  )
}
