---
id: "server.ComposeServer"
title: "Class: ComposeServer"
custom_edit_url: null
---

[server](../modules/server.md).ComposeServer

## Constructors

### constructor

• **new ComposeServer**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ComposeServerParams`](../modules/server.md#composeserverparams) |

## Methods

### handleHTTPRequest

▸ **handleHTTPRequest**(`request`, `response`): `Promise`<`void`\>

Handle a GraphQL query from an incoming HTTP `request`, sending the `response` back.

If the `graphiql` option is set to `true` when creating the
[`ComposeServer instance`](server.ComposeServer.md), this handler can serve the GraphiQL
UI.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Request` | [GraphQL Helix `Request` object](https://graphql-helix.vercel.app/docs/types) |
| `response` | `RawResponse` | [GraphQL Helix `Response` object](https://graphql-helix.vercel.app/docs/types) |

#### Returns

`Promise`<`void`\>

___

### startGraphQLServer

▸ **startGraphQLServer**(`params?`): `Promise`<[`HTTPServerHandler`](../modules/server.md#httpserverhandler)\>

Start a local HTTP server with a `/graphql` endpoint handling GraphQL queries.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GraphQLServerParams`](../modules/server.md#graphqlserverparams) |

#### Returns

`Promise`<[`HTTPServerHandler`](../modules/server.md#httpserverhandler)\>
