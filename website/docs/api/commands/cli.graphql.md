---
id: "cli.graphql"
title: "CLI: graphql:* commands"
custom_edit_url: null
---

The group of [CLI](../modules/cli.md) `graphql:*` commands makes it possible to generate GraphQL Schemas from [runtime definitions](./cli.composite.md#composedb-compositecompile) of your [Composites](../../data-modeling-concepts.mdx#composites) and run a local GraphQL HTTP server

## Command List

- [`composedb graphql:schema PATH`](#composedb-graphqlschema)
- [`composedb graphql:server PATH`](#composedb-graphqlserver)

## Usage

### `composedb graphql:schema`

Load the runtime graphql schema for the composite with given runtime definition

You can use this command to see the ComposeDB GraphQL Execution Schema for your composite.
You will be using this schema in your DApp to perform Queries and Mutations. <!-- [Queries](../../guides/interacting/mutations.mdx) and [Mutations](../../guides/interacting/mutations.mdx) -->

```
USAGE
  $ composedb graphql:schema PATH

ARGUMENTS
  PATH                     a path to a runtime representation of a composite encoded as JSON

OPTIONS
  -o, --output             a path to a file where the schema should be saved
```

### `composedb graphql:server`

Launch a graphQL server supporting the runtime schema of the composite with given runtime definition

You can use this command to launch a local GraphQL HTTP server that will be able to process queries and mutations against
your Composite's [GraphQL Execution Schema](./cli.graphql.md#composedb-graphqlschema)

```
USAGE
  $ composedb graphql:server PATH

ARGUMENTS
  PATH                     a path to a runtime representation of a composite encoded as JSON

OPTIONS
  -c, --ceramic-url        Ceramic API URL
  -k, --did-private-key    DID Private Key that should be used to authenticate the queries and mutations (you can generate a fresh private key using composedb did:generate-private-key)
  --readonly               a boolean indicating whether the server should load the schema without mutations
  --port                   the port that the server should listen on
  --graphiql               a boolean indicating whether the GraphiQL IDE should be available when opening the server's url in the browser. See https://github.com/graphql/graphiql for more info on GraphiQL
  
```
