// This is an auto-generated file, do not edit manually
export const definition = {
  models: {
    BasicProfile: {
      id: "kjzl6hvfrbw6c8i6k87cma2gvbnw3hgz2j2tc0hmc6yzzc1zikbwsryulsnmmak",
      accountRelation: { type: "single" },
    },
    Posts: {
      id: "kjzl6hvfrbw6cags7lvf5ajsgdfqwnnhoyp5fr3fhmitskk0ksydeaspzxckpub",
      accountRelation: { type: "list" },
    },
    Following: {
      id: "kjzl6hvfrbw6c930807bvmzvcqkqv6ni1q2jhv5bc59hima9r9ci1zk22tpxq3v",
      accountRelation: { type: "list" },
    },
    Comments: {
      id: "kjzl6hvfrbw6cb3x190263pxlza37ls1gxizt1ea21gtr9xwp7qln05elotk0h8",
      accountRelation: { type: "list" },
    },
  },
  objects: {
    BasicProfile: {
      name: { type: "string", required: true },
      emoji: { type: "string", required: false },
      gender: { type: "string", required: false },
      username: { type: "string", required: true },
      description: { type: "string", required: false },
      posts: {
        type: "view",
        viewType: "relation",
        relation: {
          source: "queryConnection",
          model:
            "kjzl6hvfrbw6cags7lvf5ajsgdfqwnnhoyp5fr3fhmitskk0ksydeaspzxckpub",
          property: "profileId",
        },
      },
    },
    Posts: {
      tag: { type: "string", required: true, indexed: true },
      body: { type: "string", required: true },
      edited: { type: "datetime", required: false, indexed: true },
      created: { type: "datetime", required: true, indexed: true },
      profileId: { type: "streamid", required: true },
      profile: {
        type: "view",
        viewType: "relation",
        relation: {
          source: "document",
          model:
            "kjzl6hvfrbw6c8i6k87cma2gvbnw3hgz2j2tc0hmc6yzzc1zikbwsryulsnmmak",
          property: "profileId",
        },
      },
      responses: {
        type: "view",
        viewType: "relation",
        relation: {
          source: "queryConnection",
          model:
            "kjzl6hvfrbw6cb3x190263pxlza37ls1gxizt1ea21gtr9xwp7qln05elotk0h8",
          property: "postId",
        },
      },
    },
    Following: {
      profileId: { type: "streamid", required: true },
      profile: {
        type: "view",
        viewType: "relation",
        relation: {
          source: "document",
          model:
            "kjzl6hvfrbw6c8i6k87cma2gvbnw3hgz2j2tc0hmc6yzzc1zikbwsryulsnmmak",
          property: "profileId",
        },
      },
    },
    Comments: {
      edited: { type: "datetime", required: false, indexed: true },
      postId: { type: "streamid", required: true },
      comment: { type: "string", required: true },
      created: { type: "datetime", required: true, indexed: true },
      profileId: { type: "streamid", required: true },
      post: {
        type: "view",
        viewType: "relation",
        relation: {
          source: "document",
          model:
            "kjzl6hvfrbw6cags7lvf5ajsgdfqwnnhoyp5fr3fhmitskk0ksydeaspzxckpub",
          property: "postId",
        },
      },
      profile: {
        type: "view",
        viewType: "relation",
        relation: {
          source: "document",
          model:
            "kjzl6hvfrbw6c8i6k87cma2gvbnw3hgz2j2tc0hmc6yzzc1zikbwsryulsnmmak",
          property: "profileId",
        },
      },
    },
  },
  enums: {},
  accountData: {
    basicProfile: { type: "node", name: "BasicProfile" },
    postsList: { type: "connection", name: "Posts" },
    followingList: { type: "connection", name: "Following" },
    commentsList: { type: "connection", name: "Comments" },
  },
};
