---
id: "client.Context"
title: "Class: Context"
custom_edit_url: null
---

[client](../modules/client.md).Context

GraphQL execution context, exported by the [`client`](../modules/client.md) module.

```sh
import { Context } from '@composedb/client'
```

## Constructors

### constructor

• **new Context**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ContextParams`](../modules/client.md#contextparams) |

## Accessors

### authenticated

• `get` **authenticated**(): `boolean`

Returns whether the Ceramic client instance used internally is authenticated or not. When not
authenticated, mutations will fail.

#### Returns

`boolean`

___

### ceramic

• `get` **ceramic**(): `CeramicApi`

Ceramic client instance used internally.

#### Returns

`CeramicApi`

___

### loader

• `get` **loader**(): `DocumentLoader`

Document loader instance used internally.

#### Returns

`DocumentLoader`

___

### viewerID

• `get` **viewerID**(): ``null`` \| `string`

ID of the current viewer (authenticated DID), if set.

#### Returns

``null`` \| `string`

## Methods

### createDoc

▸ **createDoc**<`Content`\>(`model`, `content`): `Promise`<`ModelInstanceDocument`<`Content`\>\>

Create a new document with the given model and content.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Content` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `string` |
| `content` | `Content` |

#### Returns

`Promise`<`ModelInstanceDocument`<`Content`\>\>

___

### createSingle

▸ **createSingle**<`Content`\>(`model`, `content`): `Promise`<`ModelInstanceDocument`<`Content`\>\>

Create a new single document with the given model and content.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Content` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `string` |
| `content` | `Content` |

#### Returns

`Promise`<`ModelInstanceDocument`<`Content`\>\>

___

### loadDoc

▸ **loadDoc**<`Content`\>(`id`, `fresh?`): `Promise`<`ModelInstanceDocument`<`Content`\>\>

Load a document by ID, using the cache if possible.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Content` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` \| `StreamID` \| `CommitID` | `undefined` |
| `fresh` | `boolean` | `false` |

#### Returns

`Promise`<`ModelInstanceDocument`<`Content`\>\>

___

### queryConnection

▸ **queryConnection**(`query`): `Promise`<`Connection`<``null`` \| `ModelInstanceDocument`<`Record`<`string`, `any`\>\>\>\>

Query the index for a connection of documents.

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `ConnectionQuery` |

#### Returns

`Promise`<`Connection`<``null`` \| `ModelInstanceDocument`<`Record`<`string`, `any`\>\>\>\>

___

### queryCount

▸ **queryCount**(`query`): `Promise`<`number`\>

Query the index for the total number of documents matching the query parameters.

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `BaseQuery` |

#### Returns

`Promise`<`number`\>

___

### querySingle

▸ **querySingle**(`query`): `Promise`<``null`` \| `ModelInstanceDocument`<`Record`<`string`, `any`\>\>\>

Query the index for a single document.

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `BaseQuery` |

#### Returns

`Promise`<``null`` \| `ModelInstanceDocument`<`Record`<`string`, `any`\>\>\>

___

### updateDoc

▸ **updateDoc**<`Content`\>(`id`, `content`, `options?`): `Promise`<`ModelInstanceDocument`<`Content`\>\>

Update an existing document.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Content` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| `StreamID` |
| `content` | `Content` |
| `options?` | `UpdateDocOptions` |

#### Returns

`Promise`<`ModelInstanceDocument`<`Content`\>\>
