# Concepts overview

ComposeDB provides a **graph structure** for interacting with data on the Ceramic network.

The **nodes** in the graph can be **accounts** or **documents**, while the **edges** in the graph represent relations between **nodes**.

Currently, ComposeDB only supports edges between an **account** and **documents**, but relations between **accounts** and **documents** are planned on being supported.

## Nodes

All nodes in the graph use a globally unique identifier, allowing direct access to any known node.

ComposeDB supports two types of nodes: **accounts** that are able to manipulate data in the graph, and **documents** containing mutable data of a given shape.

## Accounts

TODO: DID

## Documents

TODO: StreamID

## Models

Immutable structure and metadata for documents, universally usable.

### Validation

Ceramic validation uses JSON schema, ComposeDB abstract it as GraphQL scalars and directives

### Relations

Only account to document(s) at first, single or list options

## Composites

- Mutable set of Models with additional metadata.
- Primary API for managing data models with ComposeDB.
- Can be combined and edited to match applications requirements.
