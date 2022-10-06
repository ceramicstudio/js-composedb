---
id: "cli.document"
title: "CLI: document:* commands"
custom_edit_url: null
---

The group of [CLI](../modules/cli.md) `document:*` commands enables the creation and interactions with [Documents](../../guides/concepts-overview.md#documents)

## Command List

- [`composedb document:create MODELSTREAMID CONTENT`](#composedb-documentcreate)
- [`composedb document:replace STREAMID CONTENT`](#composedb-documentreplace)
- [`composedb document:content STREAMID`](#composedb-documentcontent)

## Usage

### `composedb document:create`

Create a document with given content

You can use this command to test how document creation works, but in your DApp you will use [ComposeDB GraphQL Mutations](../../guides/interacting/mutations.mdx)
instead

```
USAGE
  $ composedb document:create MODELSTREAMID CONTENT

ARGUMENTS
  MODELSTREAMID            streamID of the model whose instance is being created
  CONTENT                  contents of the model instance encoded as JSON

OPTIONS
  -c, --ceramic-url        Ceramic API URL
  -k, --did-private-key    DID Private Key (you can generate a fresh private key using composedb did:generate-private-key)
```

### `composedb document:replace`

Replace content in a document with a given streamID

You can use this command to test how document updates work, but in your DApp you will use [ComposeDB GraphQL Mutations](../../guides/interacting/mutations.mdx)

```
USAGE
  $ composedb document:replace STREAMID CONTENT

ARGUMENTS
  STREAMID                 streamID of the model instance whose content is being replaced
  CONTENT                  new contents of the model instance encoded as JSON

OPTIONS
  -c, --ceramic-url        Ceramic API URL
  -k, --did-private-key    DID Private Key (you can generate a fresh private key using composedb did:generate-private-key)
```

### `composedb document:content`

Load and display the contents of a document with a given ID

You can use this command to manually check the contents of a given document, but in your DApp you will use [ComposeDB GraphQL Queries](../../guides/interacting/queries.md)

```
USAGE
  $ composedb document:content STREAMID

ARGUMENTS
  STREAMID                 ID of the stream

OPTIONS
  -c, --ceramic-url        Ceramic API URL
  -o, --output             Path to a file where the content should be saved
```



