# @composedb/graphql-scalars

## 0.7.0

### Minor Changes

- Add support for models using the new `set` account relation
- Add support for the `shouldIndex` metadata flag
- Add support for immutable fields
- Add support for optional relation fields

## 0.6.0

### Minor Changes

- Add support for model interfaces

## 0.5.0

### Minor Changes

- Add support for query filters and ordering on indexed fields

### Patch Changes

- Updated dependencies
  - @composedb/types@0.5.0

## 0.4.4

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @composedb/types@0.4.4

## 0.4.3

### Patch Changes

- Updated Ceramic dependencies
- Updated dependencies
  - @composedb/types@0.4.3

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

### Patch Changes

- Updated dependencies
  - @composedb/types@0.4.0

## 0.3.2-rc.0

### Patch Changes

- Added support for `version` field in models

## 0.3.1

### Patch Changes

- Fix DateTime scalar encoding (PR
  https://github.com/ceramicstudio/js-composedb/pull/54)
- Updated dependencies
  - @composedb/types@0.3.1

## 0.3.0

### Patch Changes

- Release v0.3
- Updated dependencies
  - @composedb/types@0.3.0

## 0.3.0-rc.0

### Minor Changes

- Add support for relations between documents

### Patch Changes

- Updated dependencies
  - @composedb/types@0.3.0-rc.0

## 0.2.0

### Minor Changes

- Update version for developer preview #1

### Patch Changes

- Updated dependencies
  - @composedb/types@0.2.0
