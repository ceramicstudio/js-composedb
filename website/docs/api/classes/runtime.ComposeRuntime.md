---
id: "runtime.ComposeRuntime"
title: "Class: ComposeRuntime"
custom_edit_url: null
---

[runtime](../modules/runtime.md).ComposeRuntime

The ComposeRuntime class provides APIs to execute queries on a GraphQL schema generated from a
`RuntimeCompositeDefinition`. It allows applications to interact with documents using known
models on a Ceramic node.

It is exported by the [`runtime`](../modules/runtime.md) module.

```sh
import { ComposeRuntime } from '@composedb/runtime'
```

## Constructors

### constructor

• **new ComposeRuntime**(`params`): [`ComposeRuntime`](runtime.ComposeRuntime.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ComposeRuntimeParams`](../modules/runtime.md#composeruntimeparams) |

#### Returns

[`ComposeRuntime`](runtime.ComposeRuntime.md)

## Accessors

### context

• `get` **context**(): [`Context`](../modules/runtime.md#context)

Context object used internally.

#### Returns

[`Context`](../modules/runtime.md#context)

## Methods

### execute

▸ **execute**\<`Data`\>(`document`, `variableValues?`): `Promise`\<`ExecutionResult`\<`Data`, `ObjMap`\<`unknown`\>\>\>

Execute a GraphQL query from a DocumentNode and optional variables.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | `Record`\<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `DocumentNode` |
| `variableValues?` | `Record`\<`string`, `unknown`\> |

#### Returns

`Promise`\<`ExecutionResult`\<`Data`, `ObjMap`\<`unknown`\>\>\>

___

### executeQuery

▸ **executeQuery**\<`Data`\>(`source`, `variableValues?`): `Promise`\<`ExecutionResult`\<`Data`, `ObjMap`\<`unknown`\>\>\>

Execute a GraphQL query from its source and optional variables.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | `Record`\<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` \| `Source` |
| `variableValues?` | `Record`\<`string`, `unknown`\> |

#### Returns

`Promise`\<`ExecutionResult`\<`Data`, `ObjMap`\<`unknown`\>\>\>
