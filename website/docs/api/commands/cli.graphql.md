---
id: "cli.graphql"
title: "CLI: graphql:* commands"
custom_edit_url: null
---

The group of [CLI](../modules/cli.md) `graphql:*` commands makes it possible to generate GraphQL Schemas from [runtime definitions](./cli.composite#composedb-compositecompile) of your [Composites](./cli.composite) and run a local GraphQL HTTP server

## Command List

- [`composedb graphql:schema PATH`](#composedb-graphqlschema)
- [`composedb graphql:server PATH`](#composedb-graphqlserver)

## Usage

### `composedb graphql:schema`

load the runtime graphql schema for the composite with given runtime representation

```
USAGE
  $ composedb graphql:schema PATH

ARGUMENTS
  PATH                     a path to a runtime representation of a composite encoded as JSON

OPTIONS
  -o, --output             a path to a file where the schema should be saved
```

### `composedb graphql:server`

launch a graphQL server supporting the runtime schema of a given composite

```
USAGE
  $ composedb graphql:server PATH

ARGUMENTS
  PATH                     a path to a runtime representation of a composite encoded as JSON

OPTIONS
  --readonly               a boolean indicating whether the server should load the schema without mutations
  --port                   the port that the server should listen on
  --graphiql               a boolean indicating whether the GraphiQL IDE should be available when opening the server's url in the browser. See https://github.com/graphql/graphiql for more info on GraphiQL
  
```
