---
id: 'runtime'
title: 'Module: runtime'
custom_edit_url: null
---

<head>
  <meta name="robots" content="noindex" />
  <meta name="googlebot" content="noindex" />
</head>

ComposeDB runtime module, converting a runtime composite to an executable GraphQL schema.

## Installation

```sh
npm install @composedb/runtime
```

## Classes

- [ComposeRuntime](../classes/runtime.ComposeRuntime.md)

## Type Aliases

### ComposeRuntimeParams

Ƭ **ComposeRuntimeParams**: [`GetSchemaParams`](runtime.md#getschemaparams) & \{ `cache?`: [`DocumentCache`](runtime.md#documentcache) \| `boolean` ; `ceramic`: `CeramicApi` \| `string` ; `context?`: [`Context`](runtime.md#context) \}

---

### Context

Ƭ **Context**: `Object`

#### Type declaration

| Name              | Type                                                                                                                                                 | Description                                                                                                                       |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `ceramic`         | `CeramicApi`                                                                                                                                         | Ceramic client instance used internally.                                                                                          |
| `createDoc`       | \<Content\>(`model`: `string`, `content`: `Content`) => `Promise`\<`ModelInstanceDocument`\<`Content`\>\>                                            | Create a new document with the given model and content.                                                                           |
| `createSingle`    | \<Content\>(`model`: `string`, `content`: `Content`) => `Promise`\<`ModelInstanceDocument`\<`Content`\>\>                                            | Create a new single document with the given model and content.                                                                    |
| `getViewerID`     | () => `string` \| `null`                                                                                                                             | ID of the current viewer (authenticated DID), if set.                                                                             |
| `isAuthenticated` | () => `boolean`                                                                                                                                      | Returns whether the Ceramic client instance used internally is authenticated or not. When not authenticated, mutations will fail. |
| `loadDoc`         | \<Content\>(`id`: `string` \| `CommitID` \| `StreamID`, `fresh?`: `boolean`) => `Promise`\<`ModelInstanceDocument`\<`Content`\>\>                    | Load a document by ID, using the cache if possible.                                                                               |
| `loader`          | `DocumentLoader`                                                                                                                                     | Document loader instance used internally.                                                                                         |
| `queryConnection` | (`query`: `ConnectionQuery`) => `Promise`\<`Connection`\<`ModelInstanceDocument` \| `null`\>\>                                                       | Query the index for a connection of documents.                                                                                    |
| `queryCount`      | (`query`: `BaseQuery`) => `Promise`\<`number`\>                                                                                                      | Query the index for the total number of documents matching the query parameters.                                                  |
| `querySingle`     | (`query`: `BaseQuery`) => `Promise`\<`ModelInstanceDocument` \| `null`\>                                                                             | Query the index for a single document.                                                                                            |
| `updateDoc`       | \<Content\>(`id`: `string` \| `StreamID`, `content`: `Content`, `options?`: `UpdateDocOptions`) => `Promise`\<`ModelInstanceDocument`\<`Content`\>\> | Update an existing document.                                                                                                      |

---

### ContextParams

Ƭ **ContextParams**: `Object`

#### Type declaration

| Name                | Type                                                     | Description                                                               |
| :------------------ | :------------------------------------------------------- | :------------------------------------------------------------------------ |
| `cache?`            | [`DocumentCache`](runtime.md#documentcache) \| `boolean` | Optional cache for documents.                                             |
| `ceramic`           | `CeramicApi`                                             | Ceramic client instance.                                                  |
| `fallbackViewerID?` | `string` \| `null`                                       | Fallback viewer ID to use when the Ceramic instance is not authenticated. |

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

---

### GetSchemaParams

Ƭ **GetSchemaParams**: `Object`

#### Type declaration

| Name          | Type                         | Description                                                                                                        |
| :------------ | :--------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| `definition?` | `RuntimeCompositeDefinition` | Runtime composite definition, created using the [`Composite`](../classes/devtools.Composite.md) development tools. |
| `readonly?`   | `boolean`                    | Set the schema to read-only, disabling mutations support.                                                          |
| `schema?`     | `GraphQLSchema`              | GraphQL Schema to use, ignores the `definition` and `readonly` parameters if provided.                             |

## Functions

### createContext

▸ **createContext**(`params`): [`Context`](runtime.md#context)

#### Parameters

| Name     | Type                                        |
| :------- | :------------------------------------------ |
| `params` | [`ContextParams`](runtime.md#contextparams) |

#### Returns

[`Context`](runtime.md#context)

---

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

### getSchema

▸ **getSchema**(`params`): `GraphQLSchema`

Use or create a GraphQL schema based on the provided parameters.

#### Parameters

| Name     | Type                                            |
| :------- | :---------------------------------------------- |
| `params` | [`GetSchemaParams`](runtime.md#getschemaparams) |

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
