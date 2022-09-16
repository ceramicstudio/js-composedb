export const postSchema = `
type Post @createModel(accountRelation: LIST, description: "Simple post") {
  author: DID! @documentAccount
  version: CommitID! @documentVersion
  date: DateTime
  title: String! @string(minLength: 10, maxLength: 100)
  text: String! @string(maxLength: 2000)
}
`

export function createCommentSchemaWithPost(postModelID: string, postModelName = 'Post'): string {
  return `
type ${postModelName} @loadModel(id: "${postModelID}") {
  id: ID!
}

type Comment @createModel(accountRelation: LIST, description: "Comment on a Post") {
  author: DID! @documentAccount
  version: CommitID! @documentVersion 
  postID: StreamID! @documentReference(model: "${postModelName}")
  post: ${postModelName} @relationDocument(property: "postID")
  text: String! @string(maxLength: 2000)
}
`
}

export function loadPostSchemaWithComments(
  id: string,
  commentModelID: string,
  commentModelProperty = 'postID',
  commentModelName = 'Comment'
): string {
  return `
type ${commentModelName} @loadModel(id: "${commentModelID}") {
  id: ID!
}

type Post @loadModel(id: ${id}) {
  commentsCount: Int! @relationCountFrom(model: "${commentModelName}", property: "${commentModelProperty}")
  comments: [${commentModelName}]! @relationFrom(model: "${commentModelName}", property: "${commentModelProperty}")
}
`
}
