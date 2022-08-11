# Querying the graph

The [`ComposeClient`](../../api/classes/client.ComposeClient.md) automatically generates a GraphQL Schema from the runtime composite definition.

It notablly creates a [`CeramicAccount` object](#ceramicaccount-object) that replaces [`DID` scalar](../creating-composites/scalars.md#did) representations, and the root [`Query` object](#query-object) used as an entry-point to acces the graph.

## CeramicAccount object

The `CeramicAccount` object replaces all the [`DID` scalars](../creating-composites/scalars.md#did) from the composite definition, using the following fields:

- `id: ID!`: the DID string value.
- `isViewer: Boolean!`: whether the account authenticated to the Ceramic instance matches the `id`.
- Other fields will be generated based on the models present in the definition.

## Query object

The `Query` object provides entry-points for accessing data in the graph, using the following fields:

- `node(id: ID!): Node`: loads any `Node` (account or document) by its `id`.
- `viewer: CeramicAccount`: the account attached to the Ceramic instance, if authenticated.
- Other fields will be generated based on the models present in the definition, providing entry-points by querying the index.
