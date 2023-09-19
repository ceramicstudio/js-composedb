
const profileIndex = 
`# gets the first 10 indexed BasicProfile instances

query ProfileIndex {
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
`# gets the BasicProfile instance (if exists) 
# known pkh:did (using chainID 1 for Eth Mainnet) 

query KnownDid {
  node(id: "did:pkh:eip155:1:0xc362c16a0dcbea78fb03a8f97f56deea905617bb") {
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
`# gets the first 10 indexed BasicProfile instances

# gets the first 5 posts published by each of the 
# 10 BasicProfile instances (if exists)

query WithPosts {
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
`# gets the first 10 indexed BasicProfile instances

# gets the first 5 posts published by each of the 
# 10 BasicProfile instances (if exists)

# gets the first 10 responses corresponding to each
# of the 5 posts (if exists) 

# gets the corresponding BasicProfile instance for
# each response & prints only the username property 

query WithComments {
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
`# gets the BasicProfile instance (if exists) 
# based on a known StreamID

query KnownStream {
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
