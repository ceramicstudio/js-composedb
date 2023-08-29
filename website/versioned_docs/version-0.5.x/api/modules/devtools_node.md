---
id: "devtools_node"
title: "Module: devtools-node"
custom_edit_url: null
---

Node.js-specific development tools.

## Installation

```sh
npm install --dev @composedb/devtools-node
```

## Type Aliases

### PathInput

Ƭ **PathInput**: `URL` \| `string`

Path to a local file. If relative, it will get resolved from the current working directory.

___

### ServeDefinitionParams

Ƭ **ServeDefinitionParams**: [`ServeParams`](devtools_node.md#serveparams) & { `path`: [`PathInput`](devtools_node.md#pathinput)  }

___

### ServeGraphQLParams

Ƭ **ServeGraphQLParams**: [`ServeParams`](devtools_node.md#serveparams) & { `definition`: `RuntimeCompositeDefinition` ; `readonly?`: `boolean`  }

___

### ServeParams

Ƭ **ServeParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `ceramicURL` | `string` | URL of the Ceramic node. |
| `did?` | `DID` | Optional DID instance attached to the Ceramic client. |
| `graphiql?` | `boolean` | Enable GraphiQL on the server. |
| `port?` | `number` \| `number`[] | Port to use, if available. |

___

### ServerHandler

Ƭ **ServerHandler**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `stop` | () => `Promise`<`void`\> | Stop the server. |
| `url` | `string` | URL of the local GraphQL endpoint. |

## Functions

### createComposite

▸ **createComposite**(`ceramic`, `path`): `Promise`<`Composite`\>

Create a Composite from a GraphQL schema path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ceramic` | `CeramicClient` |
| `path` | [`PathInput`](devtools_node.md#pathinput) |

#### Returns

`Promise`<`Composite`\>

___

### mergeEncodedComposites

▸ **mergeEncodedComposites**(`ceramic`, `source`, `destination`): `Promise`<`string`\>

Merge the encoded `source` composite(s) to the `destination` path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ceramic` | `string` \| `CeramicClient` |
| `source` | [`PathInput`](devtools_node.md#pathinput) \| [`PathInput`](devtools_node.md#pathinput)[] |
| `destination` | [`PathInput`](devtools_node.md#pathinput) |

#### Returns

`Promise`<`string`\>

___

### readEncodedComposite

▸ **readEncodedComposite**(`ceramic`, `path`, `index?`): `Promise`<`Composite`\>

Create a Composite from a JSON-encoded definition path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ceramic` | `string` \| `CeramicClient` |
| `path` | [`PathInput`](devtools_node.md#pathinput) |
| `index?` | `boolean` |

#### Returns

`Promise`<`Composite`\>

___

### serveEncodedDefinition

▸ **serveEncodedDefinition**(`params`): `Promise`<`GraphQLServer`\>

Create a local GraphQL server to interact with an encoded composite definition.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ServeDefinitionParams`](devtools_node.md#servedefinitionparams) |

#### Returns

`Promise`<`GraphQLServer`\>

___

### serveGraphQL

▸ **serveGraphQL**(`params`): `Promise`<`GraphQLServer`\>

Create a local GraphQL server to interact with a runtime composite definition.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ServeGraphQLParams`](devtools_node.md#servegraphqlparams) |

#### Returns

`Promise`<`GraphQLServer`\>

___

### writeEncodedComposite

▸ **writeEncodedComposite**(`composite`, `path`): `Promise`<`string`\>

Write a JSON-encoded definition for the given composite to the given file path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `composite` | `Composite` |
| `path` | [`PathInput`](devtools_node.md#pathinput) |

#### Returns

`Promise`<`string`\>

___

### writeEncodedCompositeRuntime

▸ **writeEncodedCompositeRuntime**(`ceramic`, `definitionPath`, `runtimePath`, `schemaPath?`): `Promise`<`void`\>

Write the runtime definition based on the encoded definition path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ceramic` | `string` \| `CeramicClient` |
| `definitionPath` | [`PathInput`](devtools_node.md#pathinput) |
| `runtimePath` | [`PathInput`](devtools_node.md#pathinput) |
| `schemaPath?` | [`PathInput`](devtools_node.md#pathinput) |

#### Returns

`Promise`<`void`\>

___

### writeGraphQLSchema

▸ **writeGraphQLSchema**(`definition`, `path`, `readonly?`): `Promise`<`string`\>

Write the runtime GraphQL schema from the runtime composite definition.

#### Parameters

| Name | Type |
| :------ | :------ |
| `definition` | `RuntimeCompositeDefinition` |
| `path` | [`PathInput`](devtools_node.md#pathinput) |
| `readonly?` | `boolean` |

#### Returns

`Promise`<`string`\>

___

### writeRuntimeDefinition

▸ **writeRuntimeDefinition**(`definition`, `path`): `Promise`<`string`\>

Write the runtime definition for a given path, based on the file extension. Supports `.json`,
`.js` and `.ts` extensions.

#### Parameters

| Name | Type |
| :------ | :------ |
| `definition` | `RuntimeCompositeDefinition` |
| `path` | [`PathInput`](devtools_node.md#pathinput) |

#### Returns

`Promise`<`string`\>
