---
id: "loader.DocumentLoader"
title: "Class: DocumentLoader"
custom_edit_url: null
---

[loader](../modules/loader.md).DocumentLoader

The DocumentLoader class provides APIs to batch load and cache ModelInstanceDocument streams.

It is exported by the [`loader`](../modules/loader.md) module.

```sh
import { DocumentLoader } from '@composedb/loader'
```

## Hierarchy

- `DataLoader`\<[`LoadKey`](../modules/loader.md#loadkey), `ModelInstanceDocument`, `string`\>

  ↳ **`DocumentLoader`**

## Constructors

### constructor

• **new DocumentLoader**(`params`): [`DocumentLoader`](loader.DocumentLoader.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`DocumentLoaderParams`](../modules/loader.md#documentloaderparams) |

#### Returns

[`DocumentLoader`](loader.DocumentLoader.md)

#### Overrides

DataLoader\&lt;LoadKey, ModelInstanceDocument, string\&gt;.constructor

## Methods

### \_getDeterministicKey

▸ **_getDeterministicKey**(`meta`): `Promise`\<[`LoadKey`](../modules/loader.md#loadkey)\>

Get or create the LoadKey for a deterministic stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `meta` | `GenesisMetadata` |

#### Returns

`Promise`\<[`LoadKey`](../modules/loader.md#loadkey)\>

___

### \_loadDeterministic

▸ **_loadDeterministic**\<`T`\>(`meta`, `options?`): `Promise`\<``null`` \| `ModelInstanceDocument`\<`T`\>\>

Load a deterministic stream and add it to the cache.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `meta` | `GenesisMetadata` |
| `options` | [`DeterministicLoadOptions`](../modules/loader.md#deterministicloadoptions) |

#### Returns

`Promise`\<``null`` \| `ModelInstanceDocument`\<`T`\>\>

___

### cache

▸ **cache**(`stream`): `boolean`

Add a ModelInstanceDocument to the local cache, if enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `ModelInstanceDocument`\<`Record`\<`string`, `any`\>\> |

#### Returns

`boolean`

___

### create

▸ **create**\<`T`\>(`model`, `content`, `«destructured»?`): `Promise`\<`ModelInstanceDocument`\<`T`\>\>

Create a new ModelInstanceDocument and add it to the cache, if enabled.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `string` \| `StreamID` |
| `content` | `T` |
| `«destructured»` | [`CreateOptions`](../modules/loader.md#createoptions) |

#### Returns

`Promise`\<`ModelInstanceDocument`\<`T`\>\>

___

### load

▸ **load**\<`T`\>(`key`): `Promise`\<`ModelInstanceDocument`\<`T`\>\>

Load a ModelInstanceDocument from the cache (if enabled) or remotely.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | [`LoadKey`](../modules/loader.md#loadkey) |

#### Returns

`Promise`\<`ModelInstanceDocument`\<`T`\>\>

#### Overrides

DataLoader.load

___

### loadSet

▸ **loadSet**\<`T`\>(`controller`, `model`, `unique`, `options?`): `Promise`\<``null`` \| `ModelInstanceDocument`\<`T`\>\>

Create or load a deterministic ModelInstanceDocument using the SET account
relation and cache it.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `controller` | `string` |
| `model` | `string` \| `StreamID` |
| `unique` | `string`[] |
| `options?` | [`DeterministicLoadOptions`](../modules/loader.md#deterministicloadoptions) |

#### Returns

`Promise`\<``null`` \| `ModelInstanceDocument`\<`T`\>\>

___

### loadSingle

▸ **loadSingle**\<`T`\>(`controller`, `model`, `options?`): `Promise`\<``null`` \| `ModelInstanceDocument`\<`T`\>\>

Create or load a deterministic ModelInstanceDocument and cache it.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `controller` | `string` |
| `model` | `string` \| `StreamID` |
| `options?` | [`DeterministicLoadOptions`](../modules/loader.md#deterministicloadoptions) |

#### Returns

`Promise`\<``null`` \| `ModelInstanceDocument`\<`T`\>\>

___

### queryConnection

▸ **queryConnection**(`query`): `Promise`\<`Connection`\<``null`` \| `ModelInstanceDocument`\<`Record`\<`string`, `any`\>\>\>\>

Query the index for multiple ModelInstanceDocument streams and cache the results.

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`ConnectionQuery`](../modules/loader.md#connectionquery) |

#### Returns

`Promise`\<`Connection`\<``null`` \| `ModelInstanceDocument`\<`Record`\<`string`, `any`\>\>\>\>

___

### queryOne

▸ **queryOne**(`query`): `Promise`\<``null`` \| `ModelInstanceDocument`\<`Record`\<`string`, `any`\>\>\>

Query the index for a single ModelInstanceDocument stream and cache it.

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `BaseQuery` |

#### Returns

`Promise`\<``null`` \| `ModelInstanceDocument`\<`Record`\<`string`, `any`\>\>\>

___

### update

▸ **update**\<`T`\>(`streamID`, `content`, `«destructured»?`): `Promise`\<`ModelInstanceDocument`\<`T`\>\>

Update a ModelInstanceDocument after loading the stream remotely, bypassing the cache.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `streamID` | `string` \| `StreamID` |
| `content` | `T` |
| `«destructured»` | [`UpdateOptions`](../modules/loader.md#updateoptions) |

#### Returns

`Promise`\<`ModelInstanceDocument`\<`T`\>\>
