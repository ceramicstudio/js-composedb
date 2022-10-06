# Concepts overview

ComposeDB provides a **graph structure** for interacting with data on the
[Ceramic network](https://ceramic.network/).

The **nodes** in the graph can be **accounts** or **documents**, while the
**edges** in the graph represent relations between **nodes**.

Currently, ComposeDB only supports edges between an **account** and
**documents**, but relations between **accounts** and **documents** are planned
on being supported.

## Nodes

All nodes in the graph use a globally unique identifier, allowing direct access
to any known node.

ComposeDB supports two types of nodes: **accounts** that are able to manipulate
data in the graph, and **documents** containing mutable data of a given shape.

## Accounts

Ceramic uses [Decentralized Identifiers (DIDs)](https://w3c.github.io/did-core/)
for accounts, which get translated to
[`CeramicAccount` objects](./interacting/queries.md#ceramicaccount-object) by
the ComposeDB client.

DIDs can represent any entity that is able to write data on Ceramic and
therefore in ComposeDB, which can be end-users of an application, groups,
applications or any kind of authenticated service.

In order to write data in ComposeDB, a DID must be attached to the ComposeDB
client instance, as documented in the
[mutations page](./interacting/mutations.mdx).

## Documents

Documents in ComposeDB are
[Ceramic streams](https://developers.ceramic.network/learn/advanced/overview/#streams)
storing structured data defined by a [model](#models).

Ceramic nodes can be configured to index specific models, storing all the
documents using a model in a local database in order to provide fast access and
query capabilities.

Using [GraphQL](https://graphql.org/), the ComposeDB client allows to query
documents indexed by a Ceramic node, as well as creating new documents and
updating existing ones when
[mutations are enabled](./interacting/mutations.mdx).

## Models

Models are
[Ceramic streams](https://developers.ceramic.network/learn/advanced/overview/#streams)
storing metadata about [documents](#documents), notably their data structure,
[validation rules](#validation) and [relations](#relations), as well as
[discovery information](./using-composites/discovery.mdx).

ComposeDB tools abstract the creation of models using GraphQL's Schema
Definition Language, as described in the
[dedicated documentation page](./creating-composites/schema.md).

### Validation

All [documents](#documents) in ComposeDB must use a model, which contains
information about the data structure the document must conform to. The
validation is performed directly by all Ceramic nodes, allowing application to
have guaranties about the documents they interact with even if they don't
implement validation themselves.

Currently Ceramic uses
[draft 2020-12 of the JSON Schema specification](https://json-schema.org/specification-links.html#2020-12)
to define the data structure and validation rules of documents.

### Relations

ComposeDB uses models to define direct relations between [accounts](#accounts)
and [documents](#documents) with different constraints, described in the
[dedicated section of the data composition guide](./data-composition.mdx#relations).

## Composites

Composites are the primary data structures used by ComposeDB, essentially
defining a mutable set of [models](#models) with additional metadata.

The ComposeDB developer tools and client library use complementary
representations of composites to support various development flows such as
managing data models, deploying them to Ceramic nodes and generating the runtime
[GraphQL](https://graphql.org/) schema applications can interact with.
