---
id: "server"
title: "Module: server"
custom_edit_url: null
---

ComposeDB server for hybrid execution on the [`ComposeDB client`](client.md).

## Installation

```sh
npm install @composedb/server
```

## Classes

- [ComposeServer](../classes/server.ComposeServer.md)

## Type Aliases

### ComposeServerParams

Ƭ **ComposeServerParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cache?` | `DocumentCache` | Optional cache for documents. |
| `ceramic` | `CeramicApi` \| `string` | Ceramic client instance or HTTP URL. |
| `contextFactory?` | [`ContextFactoryFunction`](server.md#contextfactoryfunction) | Per-request context factory. |
| `definition?` | `RuntimeCompositeDefinition` | Runtime composite definition, created using the [`Composite`](../classes/devtools.Composite.md) development tools. |
| `graphiql?` | `boolean` | Enable GraphiQL support. |
| `schema?` | `GraphQLSchema` | GraphQL Schema to use, ignores the `definition` parameter if provided. |

___

### ContextFactoryFunction

Ƭ **ContextFactoryFunction**: (`executionContext`: `ExecutionContext`) => `Context`

#### Type declaration

▸ (`executionContext`): `Context`

##### Parameters

| Name | Type |
| :------ | :------ |
| `executionContext` | `ExecutionContext` |

##### Returns

`Context`

___

### GraphQLServerParams

Ƭ **GraphQLServerParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `options?` | `FastifyServerOptions` |
| `port?` | `number` \| `number`[] |

___

### HTTPServerHandler

Ƭ **HTTPServerHandler**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `port` | `number` |
| `stop` | () => `Promise`<`void`\> |

## Functions

### getViewerID

▸ **getViewerID**(`request`): `string` \| ``null`` \| `undefined`

Returns the viewer ID sent by the client, if set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Request` | [GraphQL Helix `Request` object](https://graphql-helix.vercel.app/docs/types) |

#### Returns

`string` \| ``null`` \| `undefined`
