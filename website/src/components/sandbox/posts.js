
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
    {title: `Tag Filtered`, query: tagFiltered},
    {title: `Date Filtered`, query: dateFiltered},
    {title: `Combine Filters`, query: combineFilters},
  ]
}

export default Posts
