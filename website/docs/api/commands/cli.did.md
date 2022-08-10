---
id: "cli.did"
title: "CLI: did:* commands"
custom_edit_url: null
---

The group of [CLI](../modules/cli.md) `did:*` commands enables interactions with DIDs and private keys

## Command List

- [`composedb did:generate-private-key`](#composedb-didgenerate-private-key)
- [`composedb did:from-private-key`](#composedb-didfrom-private-key)

## Usage

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
  --did-private-key        A random 32 byte private key represented as a base16 string (pass only if not passed as positional argument)
```

