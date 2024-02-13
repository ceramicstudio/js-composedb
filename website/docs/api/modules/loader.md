---
id: "loader"
title: "Module: loader"
custom_edit_url: null
---

ComposeDB loader module, handling streams loading and caching.

## Installation

```sh
npm install @composedb/loader
```

## Classes

- [DocumentLoader](../classes/loader.DocumentLoader.md)

## Type Aliases

### CacheMap

Ƭ **CacheMap**\<`Value`, `Key`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `Value` |
| `Key` | `string` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clear` | () => `any` |
| `delete` | (`key`: `Key`) => `any` |
| `get` | (`key`: `Key`) => `void` \| `Promise`\<`Value`\> |
| `set` | (`key`: `Key`, `value`: `Promise`\<`Value`\>) => `any` |

___

### CreateOptions

Ƭ **CreateOptions**: `CreateOpts` & \{ `controller?`: `string`  }

___

### DeterministicKeysCache

Ƭ **DeterministicKeysCache**: [`CacheMap`](loader.md#cachemap)\<[`LoadKey`](loader.md#loadkey)\>

___

### DocID

Ƭ **DocID**: `CommitID` \| `StreamID` \| `string`

___

### DocumentCache

Ƭ **DocumentCache**: [`CacheMap`](loader.md#cachemap)\<`ModelInstanceDocument`\>

___

### DocumentLoaderParams

Ƭ **DocumentLoaderParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cache?` | [`DocumentCache`](loader.md#documentcache) \| `boolean` | A supported cache implementation, `true` to use the default implementation or `false` to disable the cache (default) |
| `ceramic` | `CeramicAPI` | A Ceramic client instance |
| `deterministicKeysCache?` | [`DeterministicKeysCache`](loader.md#deterministickeyscache) | Optional cache for deterministic streams keys |
| `multiqueryTimeout?` | `number` | MultiQuery request timeout in milliseconds |

___

### LoadKey

Ƭ **LoadKey**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `genesis?` | `GenesisCommit` | Optional genesis commit for deterministic streams |
| `id` | [`DocID`](loader.md#docid) | Document ID |
| `opts?` | `LoadOpts` | Stream load options |

___

### UpdateDocOptions

Ƭ **UpdateDocOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `replace?` | `boolean` |
| `version?` | `string` |

___

### UpdateOptions

Ƭ **UpdateOptions**: `UpdateOpts` & [`UpdateDocOptions`](loader.md#updatedocoptions)
