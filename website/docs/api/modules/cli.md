---
id: "cli"
title: "Module: CLI"
custom_edit_url: null
---

ComposeDB CLI - the Command Line Interface that enables interactions with a Ceramic Node

You can check the [Getting Started](../../set-up-your-environment.mdx) Section for some examples.

<!-- You can also check documentation for particular commands to see more detailed usage explanations and links to examples. -->

## Installation

```sh
npm install @composedb/cli
```

## Usage

The CLI exposes commands with different prefixes which make it possible to:

| Command Prefix                                | Description                                                             |
|:----------------------------------------------|:------------------------------------------------------------------------|
| [`composedb did:*`](../commands/cli.did.md)   | generate private keys and create DIDs                                   |
| [`composedb composite:*`](../commands/cli.composite.md) | create and interact with Composites                                     |
| [`composedb model:*`](../commands/cli.model.md)         | create and interact with Models                                         |
| [`composedb document:*`](../commands/cli.document.md)   | create and interact with Documents                                      |
| [`composedb graphql:*`](../commands/cli.did.md)         | generate ComposeDB GraphQl Schemas and run a local GraphQL HTTP server  |

## Help

To see the list of all available commands with explanations, use:

```sh
composedb help
```

