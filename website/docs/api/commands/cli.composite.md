---
id: "cli.composite"
title: "CLI: composite:* commands"
custom_edit_url: null
---

The group of [CLI](../modules/cli.md) `composite:*` commands enables the creation and interactions with [Composites](../../data-modeling-concepts.mdx#composites)

## Command List

- [`composedb composite:from-model STREAMIDS`](#composedb-compositefrom-model)
- [`composedb composite:create INPUT`](#composedb-compositecreate)
- [`composedb composite:models PATH`](#composedb-compositemodels)
- [`composedb composite:extract-model PATH MODELS`](#composedb-compositeextract-model)
- [`composedb composite:merge PATHS`](#composedb-compositemerge)
- [`composedb composite:deploy PATH`](#composedb-compositedeploy)
- [`composedb composite:compile PATH OUTPUTPATHS`](#composedb-compositecompile)

## Usage

### `composedb composite:from-model`

Create an encoded composite definition from a list of already existing model stream ids (usually found by [Composites Discovery](../../guides/using-composites/discovery.mdx))

You can find a detailed guide on using an existing model to create your composite [here](../../create-your-composite.mdx)

```
USAGE
  $ composedb composite:from-model PATH MODELS

ARGUMENTS
  PATH                     a path to an encoded composite definition file
  MODELS                   a list of models (identified by names of stream IDs) to extract from the given composite

OPTIONS
  -c, --ceramic-url        Ceramic API URL
  -o, --output             a path to file where the resulting encoded composite definition should be saved
```

### `composedb composite:create`

Create an encoded composite definition from GraphQL [Composite Schema](../../guides/creating-composites/overview.mdx#composite-schema)

<!-- You can find a detailed guide on the creation of Composites [here](../.././create-your-composite) 
replace with data modelling composites section -->

```
USAGE
  $ composedb composite:create INPUT

ARGUMENTS
  INPUT                    a path to file containing valid ceramic composite definition in GraphQL Schema Definition Language

OPTIONS
  -c, --ceramic-url        Ceramic API URL
  -k, --did-private-key    DID Private Key (you can generate a fresh private key using composedb did:generate-private-key)
  -o, --output             a path to file where the resulting encoded composite definition should be saved
```

### `composedb composite:models`

Display the list of models included in a composite

```
USAGE
  $ composedb composite:models PATH

ARGUMENTS
  PATH                     a path to a file containing a composite's encoded definition

OPTIONS
  --id-only                display only the stream IDs of models included in the composite (exclusive to --table)
  --table                  display the models in a table (excusive to --id-only)
```


### `composedb composite:extract-model`

Create an encoded composite definition from another one by extracting given models

```
USAGE
  $ composedb composite:extract-model PATH MODELS

ARGUMENTS
  PATH                     a path to encoded representation of a composite
  MODELS                   one or more models to use when extracting a new composite, identified by name or stream ID

OPTIONS
  -o, --output             a path to file where the resulting encoded composite definition should be saved
```

### `composedb composite:merge`

Create an encoded composite definition by merging other composites

```
USAGE
  $ composedb composite:merge PATHS

ARGUMENTS
  PATHS                    a list of paths to files containing encoded composites, separated by spaces

OPTIONS
  -e, --common-embeds      'all','none' or a list of comma-separated embeds to extract from input composites into the output composite
  -o, --output             a path to file where the resulting encoded composite definition should be saved
```

### `composedb composite:deploy`

Deploy models included in the composite on connected ceramic node

You will need to use this command to make sure that your DApp's Composite is available on the Ceramic Node that yor DApp
connects to. You can find a detailed guide on Composites' deployment [here](../../guides/using-composites/deployment.mdx)

```
USAGE
  $ composedb composite:deploy PATH

ARGUMENTS
  PATH                     a path to a file containing a composite's encoded definition
  
OPTIONS
  -c, --ceramic-url        Ceramic API URL
```

### `composedb composite:compile`

Creates a runtime definition of the composite and saves it in given path(s). 

You will need the runtime definition to configure your ComposeDB.

<!-- replace with client setup guide You can find a detailed guide on how to configure a ComposeDB Client [here](../../client-setup.mdx) -->

```
USAGE
  $ composedb composite:compile PATH OUTPUTPATHS

ARGUMENTS
  PATH                     a path to a file containing a composite's encoded definition
  OUTPUTPATHS              one or more paths to save runtime representation in. Supported extensions: .json, .js and .ts
```

