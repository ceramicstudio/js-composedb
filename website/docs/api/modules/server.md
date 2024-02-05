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

## Type Aliases

### GraphQLParams

Ƭ **GraphQLParams**\<`ServerContext`\>: [`HandlerParams`](server.md#handlerparams)\<`ServerContext`\> & \{ `port?`: `number` \| `number`[]  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ServerContext` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

___

### GraphQLServer

Ƭ **GraphQLServer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `port` | `number` |
| `stop` | () => `Promise`\<`void`\> |

___

### HandlerParams

Ƭ **HandlerParams**\<`ServerContext`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ServerContext` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cache?` | `DocumentCache` | Optional cache for documents. |
| `ceramic` | `CeramicAPI` \| `string` | Ceramic client instance or HTTP URL. |
| `definition?` | `RuntimeCompositeDefinition` | Runtime composite definition, created using the [`Composite`](../classes/devtools.Composite.md) development tools. |
| `options?` | `YogaServerOptions`\<`ServerContext`, `Context`\> | [Yoga server](https://the-guild.dev/graphql/yoga-server/docs) options. |
| `schema?` | `GraphQLSchema` | GraphQL Schema to use, ignores the `definition` parameter if provided. |

## Functions

### createHandler

▸ **createHandler**\<`ServerContext`\>(`params`): `YogaServerInstance`\<`ServerContext`, `Context`\>

Create a [Yoga server](https://the-guild.dev/graphql/yoga-server/docs) handling GraphQL requests.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ServerContext` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`HandlerParams`](server.md#handlerparams)\<`ServerContext`\> |

#### Returns

`YogaServerInstance`\<`ServerContext`, `Context`\>

___

### getViewerID

▸ **getViewerID**(`request`): `string` \| ``null`` \| `undefined`

Returns the viewer ID sent by the client, if set.

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Request` |

#### Returns

`string` \| ``null`` \| `undefined`

___

### startGraphQLServer

▸ **startGraphQLServer**\<`ServerContext`\>(`params`): `Promise`\<[`GraphQLServer`](server.md#graphqlserver)\>

Start a local GraphQL server.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ServerContext` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GraphQLParams`](server.md#graphqlparams)\<`ServerContext`\> |

#### Returns

`Promise`\<[`GraphQLServer`](server.md#graphqlserver)\>
