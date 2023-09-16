
const profileIndex = 
`query ProfileIndex {
  basicProfileIndex(first: 10) {
    edges {
      node {
        id
        author{
          id
        }
        username
        description
        gender
        emoji
      }
    }
  }
}`

const knownDid = 
`query KnownDid {
  node(id: "did:pkh:eip155:11155111:0x8071f6f971b438f7c0ea72c950430ee7655fabce") {
  ... on CeramicAccount {
        basicProfile {
          id
          name
          username
          description
          gender
          emoji
        }
      }
  	}
	}`

const withPosts = 
`query WithPosts {
  basicProfileIndex(first: 10) {
    edges {
      node {
        username
        posts(first: 5) {
          edges {
            node {
              body
              created
            }
          }
        }
      }
    }
  }
}`

const withComments = 
`query WithComments {
  basicProfileIndex(first: 10) {
    edges {
      node {
        username
        posts(first: 5) {
          edges {
            node {
              body
              created
              responses(first: 10) {
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
      }
    }
  }
}`


const knownStream = 
`query KnownStream {
  node(id: "k2t6wzhkhabz3a7xz88mk93y1q2waejk1w2b5rs3kc82e42dgpe4l1h4mcibih") {
    ... on BasicProfile {
      id
      username
      description
      gender
      emoji
    }
  }
}`

  
const Profiles = {
  values: [
    {title: `Profile Index`, query: profileIndex},
    {title: `Known Did`, query: knownDid},
    {title: `Profile with Posts`, query: withPosts},
    {title: `Profile with Comments on Posts`, query: withComments},
    {title: `Known Stream`, query: knownStream},
  ]
}

export default Profiles
