---
id: "client"
title: "Module: client"
custom_edit_url: null
---

High-level ComposeDB client, based on the [`ComposeDB runtime`](runtime.md).

## Installation

```sh
npm install @composedb/client
```

## Classes

- [ComposeClient](../classes/client.ComposeClient.md)

## Type Aliases

### ComposeClientParams

Ƭ **ComposeClientParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cache?` | `DocumentCache` | Optional cache for documents. |
| `ceramic` | `CeramicAPI` \| `string` | Ceramic client instance or HTTP URL. |
| `definition` | `RuntimeCompositeDefinition` | Runtime composite definition, created using the [`Composite`](../classes/devtools.Composite.md) development tools. |
| `loader?` | `DocumentLoader` | Optional document loader. |
| `remoteExecutor?` | `Executor` | Optional remote query executor. |
| `serverURL?` | `string` | Optional [`query server`](server.md) URL. |
