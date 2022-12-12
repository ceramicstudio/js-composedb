# Using Relay

:::tip What is Relay?

[Relay](https://relay.dev/) is a popular GraphQL client for React.

It is **not** necessary to use to execute queries and mutations on ComposeDB, but it can help simplify the developer experience for common use-cases.

:::

The ComposeDB client can be used with [Relay](https://relay.dev/) by creating a custom [network layer](https://relay.dev/docs/guides/network-layer/), as shown in the example below:

Make sure you have the `composedb` packages [installed](../../set-up-your-environment.mdx), before running the code below. Additionally, you'll need the `relay-runtime` package.

```js
import { ComposeClient } from '@composedb/client'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

// Path to the generated runtime composite definition
import { definition } from './__generated__/definition.js'

const compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition })

// Create a custom Network using the ComposeClient instance to execute operations
const network = Network.create(async (request, variables) => {
  return await client.executeQuery(request.text, variables)
})

// Use the created Network instance to create the Relay Environment
export const environment = new Environment({ network, store: new Store(new RecordSource()) })
```
