# Supported directives

Directives provide extra metadata when declaring scalars, lists and shapes.

## Model identification

### `@createModel`

The `@createModel` directive applies to shapes, indicating the shape needs to be
created as a Model. A Composite must contain at least one Model to be valid,
otherwise there would be nothing to interact with.

When using the `@createModel` directive, two parameters must be provided:

- `accountRelation`: the type of relation between documents created using the
  Model and the account controlling the document, which can be `SINGLE` for a
  single document of the given Model (for example profile information), or
  `LIST` for a potentially infinite list of documents.
- `description`: a string describing the Model, to help with discovery.

Example:

```graphql
type Post @createModel(accountRelation: LIST, description: "A simple text post") {
  author: DID! @documentAccount
  title: String! @string(minLength: 10, maxLength: 100)
  text: String! @string(maxLength: 500)
}
```

### `@loadModel`

The `@loadModel` directive can be used to identify pre-existing models and use
them in a schema, by providing the model stream ID with the `id` argument of the
directive.

:::caution

When loading models, it is **not possible** to add extra content fields, but it
is possible to add extra [views](#views).

The GraphQL parser used by schemas does not allow empty types to be created. If
needed, an `id: ID` field can be added, as shown in the examples below.

:::

```graphql
# ❌ the following declaration will NOT work:
type MyModel @loadModel(id: "<existing model stream ID>") {}

# ✅ the following declaration will work:
type MyModel @loadModel(id: "<existing model stream ID>") {
  id: ID
}

# ✅ the following declaration will also work:
type MyModel @loadModel(id: "<existing model stream ID>") {
  owner: DID! @documentAccount
}
```

## Type validation

The following directives provide validation information on primitive scalars and
lists:

### `@int`

Defines the optional `max: Int` and `min: Int` value for
[`Int` scalars](./scalars.md#int).

### `@float`

Defines the optional `max: Float` and `min: Float` value for
[`Float` scalars](./scalars.md#float).

### `@string`

Defines the required `maxLength: Int` and optional `minLength: Int` value for
[`String` scalars](./scalars.md#string) and scalars extending `String`.

### `@list`

Defines the required `maxLength: Int` and optional `minLength: Int` numbers of
items in a list.

## Relations

Relations support can be added on individual fields by specifying the type of
reference the field can contain, using the following directives:

:::caution

Relation directives can only be set on fields **directly defined on a model**,
identified using the [`@createModel`](#createmodel) or
[`@loadModel`](#loadmodel) directive.

:::

### `@accountReference`

Defines relation to an account, using a [`DID` scalar](./scalars.md#did).

Example: `recipient: DID! @accountReference`.

### `@documentReference`

Defines a relation to a document, using a
[`StreamID` scalar](./scalars.md#streamid) and a `model` argument containing the
name of a model added in the schema using the [`@loadModel`](#loadmodel)
directive.

Example:

```graphql {2,8}
type Post @loadModel(id: "<Post model stream ID>") {
  id: ID!
}

type Comment @createModel(accountRelation: LIST, description: "A comment on a Post") {
  postID: StreamID! @documentReference(model: "Post")
  text: String! @string(maxLength: 500)
}
```

## Views

View directives represent read-only fields that are not stored in the contents
of the stream, but in its [metadata](#document-metadata-views) or used to access
[relations](#relation-views).

:::caution

View directives can only be set on fields **directly defined on a model**,
identified using the [`@createModel`](#createmodel) or
[`@loadModel`](#loadmodel) directive.

:::

## Document metadata views

### `@documentAccount`

Defines a field as being a view to the account controlling the document, using
the [`DID` scalar type](./scalars.md#did).

Example: `author: DID! @documentAccount`.

### `@documentVersion`

Defines a field as being a view to the current version of the document, using
the [`CommitID` scalar type](./scalars.md#commitid).

Example: `version: CommitID! @documentVersion`.

## Relation views

### `@relationDocument`

Defines a field representing another document in the graph, that have its stream
ID stored in another field of the current document, using a model identified by
the `model` argument of the directive.

Example where `post` fields allows to access the post document the comment is
made on, based on the `postID` value stored in the comment document:

```graphql {8,9}
type Post @loadModel(id: "<Post model stream ID>") {
  id: ID!
}

type Comment @createModel(accountRelation: LIST, description: "A comment on a Post") {
  postID: StreamID! @documentReference(model: "Post")
  post: Post! @relationDocument(property: "postID")
  text: String! @string(maxLength: 500)
}
```

### `@relationFrom`

Defines a field representing an inverse relation of documents pointing to the
current document for a given `model` and `property` identified by the arguments
of the directive.

Example where a `comments` view is added to an existing Post model, using the
Comment model described in the
[`@relationDocument` directive example](#relationdocument):

```graphql {2,8}
type Comment @loadModel(id: "<Comment model stream ID>") {
  id: ID!
}

type Post @loadModel(id: "<Post model stream ID>") {
  comments: [Comment] @relationFrom(model: "Comment", property: "postID")
}
```

### `@relationCountFrom`

Defines a field representing the number of documents pointing to the current
document for a given `model` and `property` identified by the arguments of the
directive.

Example where a `commentsCount` view is added to an existing Post model, using
the Comment model described in the
[`@relationDocument` directive example](#relationdocument):

```graphql {2,8}
type Comment @loadModel(id: "<Comment model stream ID>") {
  id: ID!
}

type Post @loadModel(id: "<Post model stream ID>") {
  commentsCount: Int! @relationCountFrom(model: "Comment", property: "postID")
}
```
