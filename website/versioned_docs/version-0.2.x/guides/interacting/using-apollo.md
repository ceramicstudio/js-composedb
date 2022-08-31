# Using Apollo

:::tip What is Apollo?

[Apollo](https://www.apollographql.com/docs/react/api/core/ApolloClient) is a popular GraphQL client for React and other platforms.

It is **not necessary to use it** to [execute queries](queries.md) and [mutations](mutations.mdx) on ComposeDB, but it can help simplify the developer experience for common use-cases.

:::

The ComposeDB client can be used with the [Apollo client](https://www.apollographql.com/docs/react/api/core/ApolloClient) by creating a custom [Apollo link](https://www.apollographql.com/docs/react/api/link/introduction), as shown in the example below:

Make sure you have the `composedb` packages [installed](../../installation.mdx), before running the code below. In this case, you'll also need `@apollo/client`, as well as a [compiled](../../client-setup.mdx#compiling-the-composite) runtime definition for your composite.

```js
import { ApolloClient, ApolloLink, InMemoryCache, Observable } from '@apollo/client'
import { ComposeClient } from '@composedb/client'

// Path to the generated runtime composite definition
import { definition } from './__generated__/definition.js'

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
