---
id: 'client'
title: 'Module: client'
custom_edit_url: null
---

<head>
  <meta name="robots" content="noindex" />
  <meta name="googlebot" content="noindex" />
</head>

ComposeDB client.

## Installation

```sh
npm install @composedb/client
```

## Classes

- [ComposeClient](../classes/client.ComposeClient.md)
- [Context](../classes/client.Context.md)

## Type Aliases

### ComposeClientParams

Ƭ **ComposeClientParams**: `Object`

#### Type declaration

| Name         | Type                                                    | Description                                                                                                        |
| :----------- | :------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------- |
| `cache?`     | [`DocumentCache`](client.md#documentcache) \| `boolean` | Optional cache for documents.                                                                                      |
| `ceramic`    | `CeramicApi` \| `string`                                | Ceramic client instance or HTTP URL.                                                                               |
| `definition` | `RuntimeCompositeDefinition`                            | Runtime composite definition, created using the [`Composite`](../classes/devtools.Composite.md) development tools. |

---

### ContextParams

Ƭ **ContextParams**: `Object`

#### Type declaration

| Name      | Type                                                    | Description                   |
| :-------- | :------------------------------------------------------ | :---------------------------- |
| `cache?`  | [`DocumentCache`](client.md#documentcache) \| `boolean` | Optional cache for documents. |
| `ceramic` | `CeramicApi`                                            | Ceramic client instance.      |

---

### DocumentCache

Ƭ **DocumentCache**: `Object`

#### Type declaration

| Name     | Type                                                                                                    |
| :------- | :------------------------------------------------------------------------------------------------------ |
| `clear`  | () => `any`                                                                                             |
| `delete` | (`id`: `string`) => `any`                                                                               |
| `get`    | (`id`: `string`) => `void` \| `Promise`\<`ModelInstanceDocument`\<`Record`\<`string`, `any`\>\>\>       |
| `set`    | (`id`: `string`, `value`: `Promise`\<`ModelInstanceDocument`\<`Record`\<`string`, `any`\>\>\>) => `any` |

## Functions

### createGraphQLSchema

▸ **createGraphQLSchema**(`params`): `GraphQLSchema`

Create a GraphQL schema from a runtime composite definition

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `params` | `CreateSchemaParams` |

#### Returns

`GraphQLSchema`

---

### printGraphQLSchema

▸ **printGraphQLSchema**(`definition`, `readonly?`): `string`

Create a GraphQL schema from a runtime composite definition and return its string
representation.

#### Parameters

| Name         | Type                         | Default value |
| :----------- | :--------------------------- | :------------ |
| `definition` | `RuntimeCompositeDefinition` | `undefined`   |
| `readonly`   | `boolean`                    | `false`       |

#### Returns

`string`
