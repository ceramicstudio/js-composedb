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
- [Context](../classes/runtime.Context.md)

## Type Aliases

### ComposeRuntimeParams

Ƭ **ComposeRuntimeParams**: [`GetSchemaParams`](runtime.md#getschemaparams) & { `cache?`: [`DocumentCache`](runtime.md#documentcache) \| `boolean` ; `ceramic`: `CeramicApi` \| `string` ; `context?`: [`Context`](../classes/runtime.Context.md)  }

___

### ContextParams

Ƭ **ContextParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cache?` | [`DocumentCache`](runtime.md#documentcache) \| `boolean` | Optional cache for documents. |
| `ceramic` | `CeramicApi` | Ceramic client instance. |
| `fallbackViewerID?` | `string` \| ``null`` | Fallback viewer ID to use when the Ceramic instance is not authenticated. |

___

### DocumentCache

Ƭ **DocumentCache**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clear` | () => `any` |
| `delete` | (`id`: `string`) => `any` |
| `get` | (`id`: `string`) => `void` \| `Promise`<`ModelInstanceDocument`<`Record`<`string`, `any`\>\>\> |
| `set` | (`id`: `string`, `value`: `Promise`<`ModelInstanceDocument`<`Record`<`string`, `any`\>\>\>) => `any` |

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
