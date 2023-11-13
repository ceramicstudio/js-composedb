---
id: 'client.ComposeClient'
title: 'Class: ComposeClient'
custom_edit_url: null
---

[client](../modules/client.md).ComposeClient

The ComposeClient class provides APIs to execute queries on a GraphQL schema generated from a
`RuntimeCompositeDefinition`, leveraging the [`ComposeRuntime class`](runtime.ComposeRuntime.md).

It is exported by the [`client`](../modules/client.md) module.

```sh
import { ComposeClient } from '@composedb/client'
```

## Constructors

### constructor

• **new ComposeClient**(`params`)

#### Parameters

| Name     | Type                                                              |
| :------- | :---------------------------------------------------------------- |
| `params` | [`ComposeClientParams`](../modules/client.md#composeclientparams) |

## Accessors

### context

• `get` **context**(): `Context`

Context instance used internally.

#### Returns

`Context`

---

### did

• `get` **did**(): `undefined` \| `DID`

DID instance used internally by the Ceramic client instance.

#### Returns

`undefined` \| `DID`

---

### id

• `get` **id**(): `null` \| `string`

ID of the DID attached to the Ceramic client instance used internally. If `null`, the
Ceramic instance is not authenticated and mutations will fail.

#### Returns

`null` \| `string`

---

### resources

• `get` **resources**(): `string`[]

CACAO resources URLs for the models the client interacts with.

#### Returns

`string`[]

## Methods

### execute

▸ **execute**\<`Data`\>(`document`, `variableValues?`): `Promise`\<`ExecutionResult`\<`Data`, `ObjMap`\<`unknown`\>\>\>

Execute a GraphQL query from a DocumentNode and optional variables.

#### Type parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `Data` | `Record`\<`string`, `unknown`\> |

#### Parameters

| Name              | Type                            |
| :---------------- | :------------------------------ |
| `document`        | `DocumentNode`                  |
| `variableValues?` | `Record`\<`string`, `unknown`\> |

#### Returns

`Promise`\<`ExecutionResult`\<`Data`, `ObjMap`\<`unknown`\>\>\>

---

### executeQuery

▸ **executeQuery**\<`Data`\>(`source`, `variableValues?`): `Promise`\<`ExecutionResult`\<`Data`, `ObjMap`\<`unknown`\>\>\>

Execute a GraphQL query from its source and optional variables.

#### Type parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `Data` | `Record`\<`string`, `unknown`\> |

#### Parameters

| Name              | Type                            |
| :---------------- | :------------------------------ |
| `source`          | `string` \| `Source`            |
| `variableValues?` | `Record`\<`string`, `unknown`\> |

#### Returns

`Promise`\<`ExecutionResult`\<`Data`, `ObjMap`\<`unknown`\>\>\>

---

### setDID

▸ **setDID**(`did`): `void`

Attach the given DID instance to the Ceramic client instance used internally. An authenticated
DID instance is necessary to perform GraphQL mutations.

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `did` | `DID` |

#### Returns

`void`
