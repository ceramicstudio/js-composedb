
const postsIndex = 
`# gets the first 10 indexed Posts instances

# gets the last 1 indexed Responses instance corresponding
# to each of the 10 Posts instances (if exists)

# gets the corresponding BasicProfile instance for
# each response & prints only the username property 

query PostsIndex{
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
        responses(last: 1) {
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
`# gets the first 100 Posts instances (if exists) 
# for known pkh:did (using chainID 11155111 for Sepolia)

# gets the BasicProfile instance corresponding to
# each Posts instance

# gets the first 5 Responses instances (if exists)
# for each of the 100 Posts and prints both the
# comment and created field

query KnownDid{
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
                  created
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
`# gets the first 10 indexed Posts instances (if exists)
# using a filter that grabs only the Posts instances
# that have a tag property equal to "Governance"

# also gets the BasicProfile instance and corresponding
# username property for each of those Posts instances

query TagFiltered {
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
`# gets the last 10 indexed Posts instances (if exists)
# using a filter that grabs only the Posts instances
# that have a created property greater than "2022-05-10T14:15:00Z"

# also gets the BasicProfile instance and corresponding
# username property for each of those Posts instances

query DateFiltered {
  postsIndex(filters: { where: { created: { greaterThan: "2022-05-10T14:15:00Z" } } }, last: 10) {
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
`# gets the first 20 indexed Posts instances (if exists)
# using a double filter that grabs only the Posts instances
# that have a created property greater than "2022-05-10T14:15:00Z"
# AND a tag property equal to "Governance"

query CombineFilters {
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
