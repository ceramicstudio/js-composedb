# Supported directives

Directives provide extra metadata when declaring scalars, lists and shapes.

## Model identification

### `@createModel`

The `@createModel` directive applies to shapes, indicating the shape needs to be created as a Model. A Composite must contain at least one Model to be valid, otherwise there would be nothing to interact with.

When using the `@createModel` directive, two parameters must be provided:

- `accountRelation`: the type of relation between documents created using the Model and the account controlling the document, which can be `SINGLE` for a single document of the given Model (for example profile information), or `LIST` for a potentially infinite list of documents.
- `description`: a string describing the Model, to help with discovery.

## Type validation

The following directives provide validation information on primitive scalars and lists:

### `@int`

Defines the optional `max: Int` and `min: Int` value for [`Int` scalars](./scalars.md#int).

### `@float`

Defines the optional `max: Float` and `min: Float` value for [`Float` scalars](./scalars.md#float).

### `@string`

Defines the required `maxLength: Int` and optional `minLength: Int` value for [`String` scalars](./scalars.md#string) and scalars extending `String`.

### `@list`

Defines the required `maxLength: Int` and optional `minLength: Int` numbers of items in a list.

## Views

View directives represent read-only fields that are not part of the document contents, but rather from metadata.

### `@documentAccount`

Defines a field as being a view to the account controlling the document, using the [`DID` scalar type](./scalars.md#did).

For example: `author: DID! @documentAccount`.

### `@documentVersion`

Defines a field as being a view to the current version of the document, using the [`CommitID` scalar type](./scalars.md#commitid).

For example: `version: CommitID! @documentVersion`.