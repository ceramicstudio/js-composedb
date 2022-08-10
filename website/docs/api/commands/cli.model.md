---
id: "cli.model"
title: "CLI: model:* commands"
custom_edit_url: null
---

The group of [CLI](../modules/cli.md) `model:*` commands enables the creation and interactions with Models

## Command List

- [`composedb model:create CONTENT`](#composedb-modelcreate-content)
- [`composedb model:content STREAMID`](#composedb-modelcontent-streamid)
- [`composedb model:controller STREAMID`](#composedb-modelcontroller-streamid)
- [`composedb model:list`](#composedb-modellist)

## Usage

### `composedb model:create`

create a model stream with given content

```
USAGE
  $ composedb model:create CONTENT

ARGUMENTS
  CONTENT                  contents of the model encoded as JSON

OPTIONS
  -c, --ceramic-url        Ceramic API URL
  -k, --did-private-key    DID Private Key
```

### `composedb model:content`

load the contents of a model stream with a given ID

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

load the model stream with a given ID and display its controller DID

```
USAGE
  $ composedb model:controller STREAMID

ARGUMENTS
  STREAMID                 ID of the stream

OPTIONS
  -c, --ceramic-url        Ceramic API URL
```

### `composedb model:list`

display a paginated list of models indexed on the connected ceramic node

```
USAGE
  $ composedb model:list

OPTIONS
  --table                  display results as a table rather than as formatted JSON
  -c, --ceramic-url        Ceramic API URL
```


