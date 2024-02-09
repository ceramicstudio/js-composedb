/**
 * Social network kitchen sink schema
 */

export const socialNetworkSchema = `
interface Post @createModel(description: "Shared post interface") {
  date: DateTime!
  threadID: StreamID @documentReference(model: "Node")
  threadPost: Node @relationDocument(property: "threadID")
  like: Like @relationSetFrom(property: "postID")
  likesCount: Int! @relationCountFrom(model: "Like", property: "postID")
  postTag: PostTag @relationSetFrom(property: "postID")
  postTags: [PostTag]! @relationFrom(property: "postID")
  postTagsCount: Int! @relationCountFrom(model: "PostTag", property: "postID")
}

type TextPost implements Post @createModel(description: "Text post") {
  date: DateTime!
  threadID: StreamID @documentReference(model: "Node")
  threadPost: Node @relationDocument(property: "threadID")
  text: String! @string(minLength: 1, maxLength: 500)
  like: Like @relationSetFrom(property: "postID")
  likesCount: Int! @relationCountFrom(model: "Like", property: "postID")
  postTag: PostTag @relationSetFrom(property: "postID")
  postTags: [PostTag]! @relationFrom(property: "postID")
  postTagsCount: Int! @relationCountFrom(model: "PostTag", property: "postID")
}

type Like @createModel(
  description: "A like on a post",
  accountRelation: SET,
  accountRelationFields: ["postID"]
) {
  postID: StreamID! @documentReference(model: "Node")
  post: Node @relationDocument(property: "postID")
}

type Like @createModel(
  description: "A like on a post",
  accountRelation: SET,
  accountRelationFields: ["postID"]
) {
  postID: StreamID! @documentReference(model: "Node")
  post: Node @relationDocument(property: "postID")
}

type Tag @createModel(
  description: "A generic tag",
	accountRelation: SET,
	accountRelationFields: ["name"] 
) {
	name: String! @string(minLength: 2, maxLength: 20)
  description: String @string(maxLength: 1000)
  postTag: PostTag @relationSetFrom(property: "tagID")
  postTags: [PostTag]! @relationFrom(property: "tagID")
  postTagsCount: Int! @relationCountFrom(model: "PostTag", property: "tagID")
}

type PostTag @createModel(
  description: "A tag on a post",
	accountRelation: SET,
	accountRelationFields: ["postID", "tagID"] 
)
@createIndex(fields: [{ path: "postID" }]) 
@createIndex(fields: [{ path: "tagID" }]) {
	postID: StreamID! @documentReference(model: "Node")
  post: Node! @relationDocument(property: "postID")
  tagID: StreamID! @documentReference(model: "Node")
  tag: Node! @relationDocument(property: "tagID")
}

type Follows @createModel(description: "Follow an account", accountRelation: SET, accountRelationFields: ["following"])
  @createIndex(fields: [{ path: ["date"] }]) {
  follower: DID! @documentAccount
  following: DID! @accountReference
  date: Date
}
`
