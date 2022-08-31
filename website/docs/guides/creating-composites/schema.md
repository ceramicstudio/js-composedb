# Schema definition

Composite schemas are based on [GraphQL's Schema Definition Language](https://graphql.org/learn/schema/), using a subset of functionalities offered by GraphQL to describe models used by ComposeDB.

## Schema Definition Language

The Schema Definition Language (SDL) allows to represent [scalars](#scalars) (values), [shapes](#shapes-and-lists) (key-value mappings) and [lists](#shapes-and-lists) to describe the models structure, as well as validation and other metadata information using [directives](#directives).

An example composite schema can look like the following:

```graphql
type Profile @createModel(accountRelation: SINGLE, description: "Very basic profile") {
  displayName: String! @string(minLength: 3, maxLength: 50)
}

type Note @createModel(accountRelation: LIST, description: "Very basic note") {
  author: DID! @documentAccount
  version: CommitID! @documentVersion
  title: String! @string(minLength: 10, maxLength: 100)
  text: String @string(maxLength: 2000)
}
```

## Scalars

Scalars represent the type of a single value in the schema, such as `String` for UTF-8 character sequences, or `Int` for signed 32-bit integers.

When scalars are followed by a `!` in the schema, it means providing a value is required, for example:

```graphql
type SomeShape {
  requiredInt: Int!
  optionalString: String
}
```

Scalars can be followed by [directives](#directives) providing additional information about the value, such as validation rules.

Scalars supported by ComposeDB are described in the [scalars page of the documentation](./scalars.md).

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

:::caution

The [the `@list` directive](./directives.md#list) **must be used** along with lists to define the `maxLength` of the list.

:::

## Directives

Directives are known keywords preceded by the character `@`, for example `@string` to provide validation rules about a `String` value:

```graphql
type SomeShape {
  someString: String! @string(minLength: 10, maxLength: 30)
}
```

Directives supported by ComposeDB are described in the [directives page of the documentation](./directives.md).
