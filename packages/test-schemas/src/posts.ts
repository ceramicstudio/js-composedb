/**
 * Relations and views schema
 */

export const postSchema = `
type Post 
  @createModel(accountRelation: LIST, description: "Simple post") 
  @createIndex(fields: [{path:["title"]}]) {
  author: DID! @documentAccount
  version: CommitID! @documentVersion
  date: DateTime
  title: String! @string(minLength: 10, maxLength: 100)
  text: String! @string(maxLength: 2000)
  commentsCount: Int! @relationCountFrom(model: "Comment", property: "postID")
  comments: [Comment]! @relationFrom(model: "Comment", property: "postID")
}

type Comment
  @createModel(accountRelation: LIST, description: "Comment on a Post")
  @createIndex(fields: [{path:["text"]}]) {
  author: DID! @documentAccount
  version: CommitID! @documentVersion 
  postID: StreamID! @documentReference(model: "Post")
  post: Post! @relationDocument(property: "postID")
  text: String! @string(maxLength: 2000)
}
`
