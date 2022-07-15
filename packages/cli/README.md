
# ComposeDB CLI

## [Documentation](https://developers.ceramic.network/tools/composedb/development/#cli)

## Installation

```sh
npm install -g @composedbd/cli
```

## Usage

```sh
composedb COMMAND
```

<!-- commands -->

- [`composedb did:generate-private-key`](#composedb-didgenerateprivatekey)
- [`composedb did:from-private-key`](#composedb-didfromprivatekey)
- [`composedb help [COMMAND]`](#composedb-help-command)
- [`composedb model:create CONTENT`](#composedb-modelcreate-content)
- [`composedb model:content STREAMID`](#composedb-modelcontent-streamid)
- [`composedb model:controller STREAMID`](#composedb-modelcontroller-streamid)
- [`composedb model:list`](#composedb-modellist)
- [`composedb composite:create INPUT`](#composedb-compositecreate)
- [`composedb composite:from-model STREAMIDS`](#composedb-compositefrommodel-streamids)
- [`composedb composite:extract-model PATH MODELS`](#composedb-compositeextractmodel-path-models)
- [`composedb composite:merge PATHS`](#composedb-compositemerge-paths)
- [`composedb composite:models PATH`](#composedb-compositemodels-path)
- [`composedb composite:deploy PATH`](#composedb-compositedeploy-path)
- [`composedb composite:compile PATH OUTPUTPATHS`](#composedb-compositecompile-path-outputpaths)
- [`composedb model-instance:create MODELSTREAMID CONTENT`](#composedb-modelinstancecreate-modelstreamid-content)
- [`composedb model-instance:replace STREAMID CONTENT`](#composedb-modelinstancereplace-streamid-content)
- [`composedb model-instance:content STREAMID`](#composedb-modelinstancecontent-streamid)
- [`composedb graphql:schema PATH`](#composedb-graphqlschema-path)
- [`composedb graphql:server PATH`](#composedb-graphqlserver-path)
- [`composedb pin:add STREAMID`](#composedb-pinadd-streamid)
- [`composedb pin:ls [STREAMID]`](#composedb-pinls-streamid)
- [`composedb pin:rm STREAMID`](#composedb-pinrm-streamid)
- [`composedb stream:commits STREAMID`](#composedb-streamcommits-streamid)
- [`composedb stream:state STREAMID`](#composedb-streamstate-streamid)
- [`composedb tile:create CONTENT`](#composedb-tilecreate-content)
- [`composedb tile:deterministic METADATA`](#composedb-tiledeterministic-metadata)
- [`composedb tile:content STREAMID`](#composedb-tileshow-streamid)
- [`composedb tile:update STREAMID CONTENT`](#composedb-tileupdate-streamid-content)
- [`composedb tile:show STREAMID`](#composedb-tileshow-streamid)

### `composedb did:generate-private-key`

generate a new random 32 byte private key and return its base 16 representation

```
USAGE
  $ composedb did:generate-private-key
```

### `composedb did:from-private-key`

create a new DID from a private key passed either as an argument or as a value of the flag

```
USAGE
  $ composedb did:from-private-key KEY
  
OPTIONS
  --did-private-key  A random 32 byte private key represented as a base16 string (pass only if not passed as positional argument)
```

### `composedb help [COMMAND]`

display help for composedb

```
USAGE
  $ composedb help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

### `composedb model:add NAME TYPE ALIAS STREAM`

add a stream to a model

```
USAGE
  $ composedb model:add NAME TYPE ALIAS STREAM

ARGUMENTS
  NAME
  TYPE    (schema|definition|tile)
  ALIAS
  STREAM  Stream reference or string-encoded JSON content

OPTIONS
  -c, --ceramic-url=ceramic  Ceramic API URL
  --schema=schema            tile schema
```

### `composedb model:create CONTENT`

create a model stream with given content

```
USAGE
  $ composedb model:create CONTENT

ARGUMENTS
  CONTENT contents of the model encoded as JSON

OPTIONS
  -c, --ceramic-url=ceramic    Ceramic API URL
  -k, --did-private-key=key    DID Private Key
```

### `composedb model:content STREAMID`

load the contents of a model stream with a given ID

```
USAGE
  $ composedb model:content STREAMID

ARGUMENTS
  STREAMID ID of the stream

OPTIONS
  -c, --ceramic-url=ceramic  Ceramic API URL
  -o, --output               Path to a file where the content should be saved
```

### `composedb model:controller STREAMID`

load the model stream with a given ID and display its controller DID

```
USAGE
  $ composedb model:controller STREAMID

ARGUMENTS
  STREAMID ID of the stream

OPTIONS
  -c, --ceramic-url=ceramic  Ceramic API URL
```

### `composedb model:list`

display a paginated list of models indexed on the connected ceramic node

```
USAGE
  $ composedb model:list

OPTIONS
  --table                    display results as a table rather than as formatted JSON
  -c, --ceramic-url=ceramic  Ceramic API URL
```

### `composedb composite:create`

create an encoded composite definition from GraphQL schema

```
USAGE
  $ composedb composite:create INPUT

ARGUMENTS
  INPUT  a path to file containing valid ceramic composite definition in GraphQL Schema Definition Language

OPTIONS
  -c, --ceramic-url=ceramic  Ceramic API URL
  -k, --did-private-key=key  DID Private Key
  -o, --output               a path to file where the resulting encoded composite definition should be saved
```

### `composedb composite:from-model`

create an encoded composite definition from a list of model stream ids

```
USAGE
  $ composedb composite:from-model PATH MODELS

ARGUMENTS
  PATH    a path to an encoded composite definition file
  MODELS  a list of models (identified by names of stream IDs) to extract from the given composite

OPTIONS
  -k, --did-private-key=key    DID Private Key
  -o, --output                 a path to file where the resulting encoded composite definition should be saved
```

### `composedb composite:extract-model`

create an encoded composite definition from another one by extracting given models

```
USAGE
  $ composedb composite:extract-model PATH MODELS

ARGUMENTS
  PATH      a path to encoded representation of a composite
  MODELS    one or more models to use when extracting a new composite, identified by name or stream ID

OPTIONS
  -k, --did-private-key=key    DID Private Key
  -o, --output                 a path to file where the resulting encoded composite definition should be saved
```

### `composedb composite:merge`

create an encoded composite definition by merging other composites

```
USAGE
  $ composedb composite:merge PATHS

ARGUMENTS
  PATHS  a list of paths to files containing encoded composites, separated by spaces

OPTIONS
  -k, --did-private-key=key    DID Private Key
  -e, --common-embeds          'all','none' or a list of comma-separated embeds to extract from input composites into the output composite
  -o, --output                 a path to file where the resulting encoded composite definition should be saved
```

### `composedb composite:models`

display the list of models included in a composite

```
USAGE
  $ composedb composite:models PATH

ARGUMENTS
  PATH  a path to a file containing a composite's encoded definition

OPTIONS
  --id-only   display only the stream IDs of models included in the composite (exclusive to --table)
  --table     display the models in a table (excusive to --id-only)
```

### `composedb composite:deploy`

deploy models included in the composite on connected ceramic node

```
USAGE
  $ composedb composite:deploy PATH

ARGUMENTS
  PATH  a path to a file containing a composite's encoded definition
```

### `composedb composite:compile`

creates a runtime representation of the composite and saves it in given path(s)

```
USAGE
  $ composedb composite:compile PATH OUTPUTPATHS

ARGUMENTS
  PATH          a path to a file containing a composite's encoded definition
  OUTPUTPATHS   one or more paths to save runtime representation in. Supported extensions: .json, .js and .ts
```

### `composedb model-instance:create MODELSTREAMID CONTENT`

create a model instance stream with given content

```
USAGE
  $ composedb model-instance:create MODELSTREAMID CONTENT

ARGUMENTS
  MODELSTREAMID  streamID of the model whose instance is being created
  CONTENT        contents of the model instance encoded as JSON

OPTIONS
  -k, --did-private-key=key    DID Private Key
  -c, --ceramic-url=ceramic    Ceramic API URL
```

### `composedb model-instance:replace STREAMID CONTENT`

replace content in a model instance stream with given streamID

```
USAGE
  $ composedb model-instance:replace STREAMID CONTENT

ARGUMENTS
  STREAMID  streamID of the model instance whose content is being replaced
  CONTENT   new contents of the model instance encoded as JSON

OPTIONS
  -k, --did-private-key=key    DID Private Key
  -c, --ceramic-url=ceramic    Ceramic API URL
```

### `composedb model-instance:content STREAMID`

load the contents of a model instance stream with a given ID

```
USAGE
  $ composedb model-instance:content STREAMID

ARGUMENTS
  STREAMID ID of the stream

OPTIONS
  -c, --ceramic-url=ceramic  Ceramic API URL
  -o, --output               Path to a file where the content should be saved
```

### `composedb graphql:schema PATH`

load the runtime graphql schema for the composite with given runtime representation

```
USAGE
  $ composedb graphql:schema PATH

ARGUMENTS
  PATH           a path to a runtime representation of a composite encoded as JSON

OPTIONS
  -o, --output   Path to a file where the schema should be saved
```

### `composedb graphql:server PATH`

launch a graphQL server supporting the runtime schema of a given composite

```
USAGE
  $ composedb graphql:server PATH

ARGUMENTS
  PATH      a path to a runtime representation of a composite encoded as JSON

OPTIONS
  --readonly   a boolean indicating whether the server should load the schema without mutations
  --port       the port that the server should listen on
  --graphiql   a boolean indicating whether the GraphiQL IDE should be available when opening the server's url in the 
               browser. See https://github.com/graphql/graphiql for more info on GraphiQL.
```

### `composedb pin:add STREAMID`

pin a stream

```
USAGE
  $ composedb pin:add STREAMID

ARGUMENTS
  STREAMID  ID of stream to be pinned

OPTIONS
  -c, --ceramic-url=ceramic  Ceramic API URL
```

### `composedb pin:ls [STREAMID]`

list pinned streams

```
USAGE
  $ composedb pin:ls [STREAMID]

ARGUMENTS
  STREAMID  optional stream ID filter

OPTIONS
  -c, --ceramic-url=ceramic  Ceramic API URL
```

### `composedb pin:rm STREAMID`

unpin a stream

```
USAGE
  $ composedb pin:rm STREAMID

ARGUMENTS
  STREAMID  ID of stream to be unpinned

OPTIONS
  -c, --ceramic-url=ceramic  Ceramic API URL
```

### `composedb stream:commits STREAMID`

list commits contained within a stream

```
USAGE
  $ composedb stream:commits STREAMID

ARGUMENTS
  STREAMID  ID of the stream


OPTIONS
  -c, --ceramic-url=ceramic  Ceramic API URL
  --sync  Controls if the current stream state should be synced over the network or not. 'prefer-cache' will return the state from the node's local cache if present, and will sync from the network if the stream isn't in the cache. 'always-sync' always syncs from the network, even if there is cached state for the stream. 'never-sync' never syncs from the network.
```

### `composedb stream:state STREAMID`

get the state of a Stream

```
USAGE
  $ composedb stream:state STREAMID

ARGUMENTS
  STREAMID  ID of the Stream

OPTIONS
  -c, --ceramic-url=ceramic  Ceramic API URL
  --sync  Controls if the current stream state should be synced over the network or not. 'prefer-cache' will return the state from the node's local cache if present, and will sync from the network if the stream isn't in the cache. 'always-sync' always syncs from the network, even if there is cached state for the stream. 'never-sync' never syncs from the network.
```

### `composedb tile:create`

create a new Tile stream

```
USAGE
  $ composedb tile:create

OPTIONS
  -b, --content=content        stream contents (JSON encoded as string)
  -c, --ceramic-url=ceramic    Ceramic API URL
  -k, --did-private-key=key    DID Private Key
  -m, --metadata=metadata      stream metadata
```

### `composedb tile:deterministic METADATA`

load a deterministic Tile stream, or create it if it doesn't already exist

```
USAGE
  $ composedb tile:deterministic METADATA

ARGUMENTS
  METADATA  stream metadata

OPTIONS
  -c, --ceramic-url=ceramic    Ceramic API URL
  -k, --did-private-key=key    DID Private Key
  --sync                       Controls if the current stream state should be synced over the network or not. 'prefer-cache' will return the state from the node's local cache if present, and will sync from the network if the stream isn't in the cache. 'always-sync' always syncs from the network, even if there is cached state for the stream. 'never-sync' never syncs from the network.
```

### `composedb tile:content STREAMID`

show the contents of a Tile stream

```
USAGE
  $ composedb tile:content STREAMID

ARGUMENTS
  STREAMID  ID of the stream

OPTIONS
  -c, --ceramic-url=ceramic  Ceramic API URL
  --sync                 Controls if the current stream state should be synced over the network or not. 'prefer-cache' will return the state from the node's local cache if present, and will sync from the network if the stream isn't in the cache. 'always-sync' always syncs from the network, even if there is cached state for the stream. 'never-sync' never syncs from the network.
```

### `composedb tile:update STREAMID`

Update a stream

```
USAGE
  $ composedb tile:update STREAMID

ARGUMENTS
  STREAMID  ID of the stream

OPTIONS
  -b, --content=content        new contents for the stream
  -c, --ceramic-url=ceramic    Ceramic API URL
  -k, --did-private-key=key    DID Private Key
  -m, --metadata=metadata      Optional metadata for the stream
```

### `composedb tile:show STREAMID`

show the contents of a Tile stream

```
USAGE
  $ composedb tile:show STREAMID

ARGUMENTS
  STREAMID  ID of the stream

OPTIONS
  -c, --ceramic-url=ceramic  Ceramic API URL
  --sync                 Controls if the current stream state should be synced over the network or not. 'prefer-cache' will return the state from the node's local cache if present, and will sync from the network if the stream isn't in the cache. 'always-sync' always syncs from the network, even if there is cached state for the stream. 'never-sync' never syncs from the network.
```

<!-- commandsstop -->

## License

Apache-2.0 OR MIT
