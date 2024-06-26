---
id: "cli.model"
title: "CLI: model:* commands"
custom_edit_url: null
---

<head>
  <meta name="robots" content="noindex" />
  <meta name="googlebot" content="noindex" />
</head>

The group of [CLI](../modules/cli.md) `model:*` commands enables discovery of [Models](https://developers.ceramic.network/docs/composedb/core-concepts#models), as well as their creation and interactions with them

## Command List

- [`composedb model:list`](#composedb-modellist)
- [`composedb model:content STREAMID`](#composedb-modelcontent-streamid)
- [`composedb model:controller STREAMID`](#composedb-modelcontroller-streamid)
- [`composedb model:create CONTENT`](#composedb-modelcreate-content)

## Usage

### `composedb model:list`

Display a paginated list of models indexed on the connected ceramic node, which needs to be indexing model streams.

This currently is the main entry path to [Composites Discovery](https://developers.ceramic.network/docs/composedb/core-concepts#model-catalog)

```
USAGE
  $ composedb model:list

OPTIONS
  --table                  display results as a table rather than as formatted JSON
  -i, --indexer-url        URL of a Ceramic API that indexes model streams.
```

### `composedb model:content`

Load the contents of a model stream with a given ID.

You should use this command to check if an existing model found through [Composites Discovery](https://developers.ceramic.network/docs/composedb/core-concepts#model-catalog)
has the fields you need.

```
USAGE
  $ composedb model:content STREAMID

ARGUMENTS
  STREAMID                 ID of the stream

OPTIONS
  -c, --ceramic-url        Ceramic API URL
  -o, --output             Path to a file where the content should be saved
```

### `composedb model:controller`

Load the model stream with a given ID and display its controller DID (identifier for the [Ceramic Account](https://developers.ceramic.network/docs/composedb/core-concepts#accounts) that owns the model)

```
USAGE
  $ composedb model:controller STREAMID

ARGUMENTS
  STREAMID                 ID of the stream

OPTIONS
  -c, --ceramic-url        Ceramic API URL
```

### `composedb model:create`

Create a model stream with given content.

Most of the time you shouldn't be using this command directly. Instead, you should first check if a model you need
already exists, using [Composites Discovery](https://developers.ceramic.network/docs/composedb/core-concepts#model-catalog) and only if you can't
find a model that you need, you should create one indirectly by [creating a Composite](https://developers.ceramic.network/docs/composedb/core-concepts#composites) from a GraphQL Composite Schema.

```
USAGE
  $ composedb model:create CONTENT

ARGUMENTS
  CONTENT                  contents of the model encoded as JSON

OPTIONS
  -c, --ceramic-url        Ceramic API URL
  -k, --did-private-key    DID Private Key (you can generate a fresh private key using composedb did:generate-private-key)
```
