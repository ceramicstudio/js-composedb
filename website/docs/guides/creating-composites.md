# Creating Composites

Composites are the abstraction ComposeDB tools and client use to represent and manipulate data models used by applications.

In order to create new Composites, especially to create new Models that do not already exist on the Ceramic network, a high-level Schema can be used as an abstraction for the Composite structure, based on [GraphQL's Schema Definition Language](https://graphql.org/learn/schema/).

## Schema Definition Language

The Schema Definition Language (SDL) allows to represent scalars (primitive values), shapes (key-value mappings) and lists to describe the Models structure, as well as validation and other metadata information using directives (keywords preceded by the character `@`).

An example Composite Schema can look like the following:

```graphql
type Profile @createModel(accountRelation: SINGLE, description: "Very basic profile") {
  displayName: String! @string(minLength: 3, maxLength: 50)
}

type Note @createModel(accountRelation: LIST, description: "Very basic note") {
  author: DID! @documentAuthor
  version: CommitID! @documentVersion
  title: String! @string(minLength: 10, maxLength: 100)
  text: String @string(maxLength: 2000)
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

Scalars and shapes can be composed together in lists and other shapes, such as the `ImageMetadata` shape embedded in the `ImageSources` shape in the following example:

```graphql
type ImageMetadata {
  src: String! @string(maxLength: 150)
  mimeType: String! @string(maxLength: 50)
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
  size: Int @int(min: 1)
}

type ImageSources {
  original: ImageMetadata!
  alternatives: [ImageMetadata] @list(maxLength: 20)
}
```

## Directives

Directives provide extra metadata when declaring scalars, lists and shapes.

### Model identification

The `@createModel` directive applies to shapes, indicating the shape needs to be created as a Model. A Composite must contain at least one Model to be valid, otherwise there would be nothing to interact with.

When using the `@createModel` directive, two parameters must be provided:

- `accountRelation`: the type of relation between documents created using the Model and the account controlling the document, which can be `SINGLE` for a single document of the given Model (for example profile information), or `LIST` for a potentially infinite list of documents.
- `description`: a string describing the Model, to help with discovery.

### Constraint validation

The following directives provide validation information on primitive scalars and lists:

- `@int`: defines the optional `max` and `min` value for `Int` scalars.
- `@float`: defines the optional `max` and `min` value for `Float` scalars.
- `@string`: defines the required `maxLength` and optional `minLength` value for `String` scalars and scalars extending `String`.
- `@list`: defines the required `maxLength` and optional `minLength` numbers of items in a list.

### Views

View directives represent read-only fields that are not part of the document contents, but rather from metadata.

- `@documentAccount`: defines a field as being a view to the account controlling the document, using the `DID` scalar type. For example: `author: DID! @documentAccount`.
- `@documentVersion`: defines a field as being a view to the current version of the document, using the `CommitID` scalar type. For example: `version: CommitID! @documentVersion`.
