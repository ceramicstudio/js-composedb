
const postsIndex = 
`query PostsIndex{
  postsIndex(first: 10) {
    edges {
      node {
        id
        body
        tag
        created
        profile {
          username
        }
        author{
          id
        }
        responses(first: 1) {
          edges {
            node {
              comment
              created
              profile {
                username
              }
            }
          }
        }
      }
    }
  }
}`

const knownDid = 
`query KnownDid{
  node(id: "did:pkh:eip155:11155111:0x8071f6f971b438f7c0ea72c950430ee7655fabce") {
      ... on CeramicAccount {
      id
      postsList(first: 100) {
        edges {
        node {
            id
            body
            created
            profile {
              username
            }
          	responses(first: 5){
              edges{
                node{
                  comment
                }
              }
          	}
          }
        }
      }
    } 
  }
}`

const tagFiltered = 
`query TagFiltered {
  postsIndex(filters: { where: { tag: { equalTo: "Governance" } } }, first: 10) {
    edges {
      node {
        body
        created
        profile {
          username
        }
      }
    }
  }
}`

const dateFiltered = 
`query DateFiltered {
  postsIndex(filters: { where: { created: { greaterThan: "2022-05-10T14:15:00Z" } } }, first: 10) {
    edges {
      node {
        body
        created
        profile {
          username
        }
      }
    }
  }
}`


const combineFilters = 
`query CombineFilters {
  postsIndex(
    filters: {
      and: [
        { where: { created: { greaterThan: "2022-05-10T14:15:00Z" } } }
        { and: { where: { tag: { equalTo: "Governance" } } } }
      ]
    }
    first: 20
  ) {
    edges {
      node {
        body
        created
        tag
      }
    }
  }
}`

  
const Posts = {
  values: [
    {title: `Posts Index`, query: postsIndex},
    {title: `Known DID`, query: knownDid},
    {title: `Tag Filtered`, query: tagFiltered},
    {title: `Date Filtered`, query: dateFiltered},
    {title: `Combine Filters`, query: combineFilters},
  ]
}

export default Posts
