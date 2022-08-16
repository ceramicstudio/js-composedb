# Supported scalars

Scalars represent the leaf values in the graph, either as part of key-value properties in shapes, or value of items in lists. You can learn more about scalars in the [GraphQL specification](https://graphql.org/learn/schema/#scalar-types).

## Primitive types

The following scalars are part of the [GraphQL specification](https://graphql.org/learn/schema/#scalar-types).

### `Boolean`

A `true` or `false` value.

### `Int`

A signed 32-bit integer.

A range of valid values can be defined using [the `@int` directive](./directives.md#int).

### `Float`

A signed double-precision floating-point value.

A range of valid values can be defined using [the `@float` directive](./directives.md#float).

### `String`

A UTF-8 character sequence.

:::caution

The [`@string` directive](./directives.md#string) **must be used** along with `String` scalars to define the `maxLength` of the string.

:::

## Identifiers

The following scalars represent unique identifiers in the graph. In ComposedDB, they are all stored as string values.

### `ID`

A Node identifier used by GraphQL.

:::caution

The [`@string` directive](./directives.md#string) **must be used** along with `ID` scalars to define the `maxLength` of the ID string.

:::

### `CommitID`

Identifies a specific version of a Stream in the Ceramic network.

### `DID`

A Decentralized Identifier, representing an actor able to create and mutate Documents in the graph, using [GraphQL Scalars](https://www.graphql-scalars.dev/docs/scalars/did).

## Date and time

The following scalars can be used to store date and time values using standard representations.

### `Date`

RFC 3339 compliant date string without time information, `2007-12-03` for example, using [GraphQL Scalars](https://www.graphql-scalars.dev/docs/scalars/date).

### `DateTime`

A date-time string at UTC, such as `2007-12-03T10:15:30Z`, using [GraphQL Scalars](https://www.graphql-scalars.dev/docs/scalars/date-time).

### `Time`

A time string at UTC, such as `10:15:30Z`, using [GraphQL Scalars](https://www.graphql-scalars.dev/docs/scalars/time).