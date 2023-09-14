
const commentsPost = 
`query CommentsWithPost {
    commentsIndex(last: 20) {
      edges {
        node {
          comment
          post {
            body
            profile {
              username
            }
          }
        }
      }
    }
  }`

const orderedComments = 
`query OrderedComments {
    commentsIndex(sorting: { created: ASC }, first: 10) {
      edges {
        node {
          comment
          created
          post {
            body
            profile {
              username
            }
          }
        }
      }
    }
  }`

const Comments = {
  values: [
    {title: `Comments With Posts`, query: commentsPost},
    {title: `Ordered Comments`, query: orderedComments}
  ]
}

export default Comments
