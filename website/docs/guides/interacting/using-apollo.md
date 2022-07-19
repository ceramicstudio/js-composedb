# Using Apollo

The ComposeDB client can be used with the [Apollo client](https://www.apollographql.com/docs/react/api/core/ApolloClient) by creating a custom [Apollo link](https://www.apollographql.com/docs/react/api/link/introduction), as shown in the example below:

```js
import { ApolloClient, ApolloLink, InMemoryCache, Observable } from '@apollo/client'
import { ComposeClient } from '@composedb/client'

// Path to the generated runtime composite definition
import { definition } from './__generated__/definition'

const compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition })

// Create a custom ApolloLink using the ComposeClient instance to execute operations
const link = new ApolloLink((operation) => {
  return new Observable((observer) => {
    compose.execute(operation.query, operation.variables).then(
      (result) => {
        observer.next(result)
        observer.complete()
      },
      (error) => {
        observer.error(error)
      }
    )
  })
})

// Use the created ApolloLink instance in your ApolloClient configuration
export const client = new ApolloClient({ cache: new InMemoryCache(), link })
```
