---
id: "cli.document"
title: "CLI: document:* commands"
custom_edit_url: null
---

The group of [CLI](../modules/cli.md) `document:*` commands enables the creation and interactions with Documents (Instances of [Models](./cli.model))

## Command List

- [`composedb document:create MODELSTREAMID CONTENT`](#composedb-documentcreate)
- [`composedb document:replace STREAMID CONTENT`](#composedb-documentreplace)
- [`composedb document:content STREAMID`](#composedb-documentcontent)

## Usage

### `composedb document:create`

create a document with given content

```
USAGE
  $ composedb document:create MODELSTREAMID CONTENT

ARGUMENTS
  MODELSTREAMID            streamID of the model whose instance is being created
  CONTENT                  contents of the model instance encoded as JSON

OPTIONS
  -k, --did-private-key    DID Private Key
  -c, --ceramic-url        Ceramic API URL
```

### `composedb document:replace`

replace content in a document with a given streamID

```
USAGE
  $ composedb document:replace STREAMID CONTENT

ARGUMENTS
  STREAMID                 streamID of the model instance whose content is being replaced
  CONTENT                  new contents of the model instance encoded as JSON

OPTIONS
  -k, --did-private-key    DID Private Key
  -c, --ceramic-url        Ceramic API URL
```

### `composedb document:content`

load and display the contents of a document with a given ID

```
USAGE
  $ composedb document:content STREAMID

ARGUMENTS
  STREAMID                 ID of the stream

OPTIONS
  -c, --ceramic-url        Ceramic API URL
  -o, --output             Path to a file where the content should be saved
```



