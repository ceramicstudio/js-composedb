---
id: "cli.did"
title: "CLI: did:* commands"
custom_edit_url: null
---

The group of [CLI](../modules/cli.md) `did:*` commands enables interactions with DIDs and private keys

DIDs are identifiers for [Ceramic Accounts](../../guides/concepts-overview.md#accounts)

## Command List

- [`composedb did:generate-private-key`](#composedb-didgenerate-private-key)
- [`composedb did:from-private-key`](#composedb-didfrom-private-key)

## Usage

### `composedb did:generate-private-key`

Generate a new random 32 byte private key and return its base 16 representation

You can use this command to generate a fresh private key which you can later use a the `--did-private-key` flag to 
authenticate other ComposeDB CLI command calls

```
USAGE
  $ composedb did:generate-private-key
```

### `composedb did:from-private-key`

Create a new DID from a private key passed either as an argument or as a value of the flag

You can use this command to see what DID corresponds to a given private key

```
USAGE
  $ composedb did:from-private-key KEY
  
OPTIONS
  --did-private-key        A random 32 byte private key represented as a base16 string (pass only if not passed as positional argument)
```

