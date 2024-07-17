---
id: "runtime"
title: "Module: runtime"
custom_edit_url: null
---

ComposeDB runtime module, converting a runtime composite to an executable GraphQL schema.

## Installation

```sh
npm install @composedb/runtime
```

## Classes

- [ComposeRuntime](../classes/runtime.ComposeRuntime.md)

## Type Aliases

### ComposeRuntimeParams

Ƭ **ComposeRuntimeParams**: [`GetSchemaParams`](runtime.md#getschemaparams) & \{ `cache?`: `DocumentCache` \| `boolean` ; `ceramic`: `CeramicAPI` \| `string` ; `context?`: [`Context`](runtime.md#context) ; `loader?`: `DocumentLoader`  }

___

### Context

Ƭ **Context**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `ceramic` | `CeramicAPI` | Ceramic client instance used internally. |
| `enableDocIndexing` | (`id`: `string`, `shouldIndex`: `boolean`, `opts?`: `UpdateOpts`) => `Promise`\<`void`\> | - |
| `getViewerID` | () => `string` \| ``null`` | - |
| `isAuthenticated` | () => `boolean` | - |
| `loadDoc` | \<Content\>(`id`: `string` \| `CommitID` \| `StreamID`, `fresh?`: `boolean`) => `Promise`\<`ModelInstanceDocument`\<`Content`\> \| ``null``\> | - |
| `loader` | `DocumentLoader` | Document loader instance used internally. |
| `queryCount` | (`query`: `BaseQuery`) => `Promise`\<`number`\> | - |
| `upsertSet` | \<Content\>(`model`: `string`, `unique`: `string`[], `content`: `Content`, `options?`: `UpsertOptions`) => `Promise`\<`ModelInstanceDocument`\<`Content`\> \| ``null``\> | - |
| `upsertSingle` | \<Content\>(`model`: `string`, `content`: `Content`, `options?`: `UpsertOptions`) => `Promise`\<`ModelInstanceDocument`\<`Content`\> \| ``null``\> | - |

___

### ContextParams

Ƭ **ContextParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cache?` | `DocumentCache` \| `boolean` | Optional cache for documents. |
| `ceramic` | `CeramicAPI` | Ceramic client instance. |
| `fallbackViewerID?` | `string` \| ``null`` | Fallback viewer ID to use when the Ceramic instance is not authenticated. |

___

### GetSchemaParams

Ƭ **GetSchemaParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `definition?` | `RuntimeCompositeDefinition` | Runtime composite definition, created using the [`Composite`](../classes/devtools.Composite.md) development tools. |
| `readonly?` | `boolean` | Set the schema to read-only, disabling mutations support. |
| `schema?` | `GraphQLSchema` | GraphQL Schema to use, ignores the `definition` and `readonly` parameters if provided. |

## Functions

### createContext

▸ **createContext**(`params`): [`Context`](runtime.md#context)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ContextParams`](runtime.md#contextparams) |

#### Returns

[`Context`](runtime.md#context)

___

### createGraphQLSchema

▸ **createGraphQLSchema**(`params`): `GraphQLSchema`

Create a GraphQL schema from a runtime composite definition

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `CreateSchemaParams` |

#### Returns

`GraphQLSchema`

___

### getSchema

▸ **getSchema**(`params`): `GraphQLSchema`

Use or create a GraphQL schema based on the provided parameters.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetSchemaParams`](runtime.md#getschemaparams) |

#### Returns

`GraphQLSchema`

___

### printGraphQLSchema

▸ **printGraphQLSchema**(`definition`, `readonly?`): `string`

Create a GraphQL schema from a runtime composite definition and return its string
representation.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `definition` | `RuntimeCompositeDefinition` | `undefined` |
| `readonly` | `boolean` | `false` |

#### Returns

`string`
