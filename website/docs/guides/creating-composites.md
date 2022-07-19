# Creating Composites

Composites are the abstraction ComposeDB tools and client use to represent and manipulate data models used by applications.

In order to create new Composites, especially to create new Models that do not already exist on the Ceramic network, a high-level Schema can be used as an abstraction for the Composite structure, based on [GraphQL's Schema Definition Language](https://graphql.org/learn/schema/).

## Schema Definition Language

The Schema Definition Language (SDL) allows to represent scalars (primitive values), shapes (key-value mappings) and lists to describe the Models structure, as well as validation and other metadata information using directives (keywords preceded by the character `@`).

TODO: example schema

```graphql
type Profile @model(accountRelation: SINGLE, description: "Very basic profile") {
  displayName: String! @length(min: 3, max: 50)
}
```

## Scalars

Scalars represent the leaf values in the graph, either as part of key-value properties in shapes, or value of items in lists. You can learn more about scalars in the [GraphQL specification](https://graphql.org/learn/schema/#scalar-types).

### Primitive types

The following scalars are part of the [GraphQL specification](https://graphql.org/learn/schema/#scalar-types).

- `Boolean`: `true` or `false`.
- `Int`: A signed 32-bit integer.
- `Float`: A signed double-precision floating-point value.
- `String`: A UTF-8 character sequence.

### Identifiers

The following scalars represent unique identifiers in the graph. In ComposedDB, they are all stored as string values.

- `ID`: A Node identifier used by GraphQL.
- `CommitID`: Identifies a specific version of a Stream in the Ceramic network.
- `DID`: A Decentralized Identifier, representing an actor able to create and mutate Documents in the graph, using [GraphQL Scalars](https://www.graphql-scalars.dev/docs/scalars/did).

### Date and time

The following scalars can be used to store date and time values using standard representations.

- `Date`: RFC 3339 compliant date string without time information, `2007-12-03` for example, using [GraphQL Scalars](https://www.graphql-scalars.dev/docs/scalars/date).
- `DateTime`: A date-time string at UTC, such as `2007-12-03T10:15:30Z`, using [GraphQL Scalars](https://www.graphql-scalars.dev/docs/scalars/date-time).
- `Time`: A time string at UTC, such as `10:15:30Z`, using [GraphQL Scalars](https://www.graphql-scalars.dev/docs/scalars/time).

## Shapes and lists

Models vs embedded objects, lists and connections.

## Directives

### Model identification

`@model` directive with account relation and description

### Field validation

- `@intRange`
- `@floatRange`
- `@length`
- `@arrayLength`

### Views

- `@documentAccount`
- `@documentVersion`
