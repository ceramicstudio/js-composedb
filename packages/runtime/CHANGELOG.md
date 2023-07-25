# @composedb/runtime

## 0.5.0-rc.0

### Minor Changes

- Add support for query filters and ordering on indexed fields

### Patch Changes

- Updated dependencies
  - @composedb/graphql-scalars@0.5.0-rc.0

## 0.4.2

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @composedb/graphql-scalars@0.4.4

## 0.4.1

### Patch Changes

- Updated Ceramic dependencies
- Updated dependencies
  - @composedb/graphql-scalars@0.4.3

## 0.4.0

### Minor Changes

- New packages:
  - `@composedb/runtime`: runtime GraphQL execution logic, used by the
    `@composedb/client` and `@composedb/server` packages.
  - `@composedb/server`: server-side query execution.
- Other changes:
  - Added new built-in scalars and support for enums to the Schema Definition
    Language and execution runtime.
  - Added support for hybrid GraphQL execution (server-side queries /
    client-side mutations) to the `@composedb/client` package.
  - Documentation updates.
