
const commentsPost = 
`# gets the last 20 indexed Comments instances (if exists)

# gets the corresponding Posts instance that the comment
# is responding to

# gets the BasicProfile instance and its username property
# corresponding to the Posts instance

query CommentsWithPost {
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
`# gets the first 10 indexed Comments instances (if exists)
# based on sorting by each instance's created (date) field
# in ascending order

# gets the corresponding Posts instance that the comment
# is responding to

# gets the BasicProfile instance and its username property
# corresponding to the Posts instance

query OrderedComments {
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
