# @composedb/cli

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
  - @composedb/client@0.5.0
  - @composedb/devtools@0.5.0
  - @composedb/devtools-node@0.5.0
  - @composedb/runtime@0.5.0

## 0.4.4

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @composedb/devtools-node@0.4.4
  - @composedb/devtools@0.4.4
  - @composedb/runtime@0.4.2
  - @composedb/client@0.4.4

## 0.4.3

### Patch Changes

- Updated Ceramic dependencies
- Updated dependencies
  - @composedb/devtools-node@0.4.3
  - @composedb/devtools@0.4.3
  - @composedb/runtime@0.4.1
  - @composedb/client@0.4.3

## 0.4.2

### Patch Changes

- Don't explicitly pin streams
- Updated dependencies
  - @composedb/devtools@0.4.2
  - @composedb/devtools-node@0.4.2

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
  - @composedb/client@0.4.0
  - @composedb/devtools@0.4.0
  - @composedb/devtools-node@0.4.0
  - @composedb/runtime@0.4.0

## 0.3.2-rc.0

### Patch Changes

- Added support for `version` field in models

## 0.3.1

### Patch Changes

- Fix DateTime scalar encoding (PR
  https://github.com/ceramicstudio/js-composedb/pull/54)
- Updated dependencies
  - @composedb/client@0.3.1
  - @composedb/devtools@0.3.1
  - @composedb/devtools-node@0.3.1

## 0.3.0

### Patch Changes

- Release v0.3
- Updated dependencies
  - @composedb/client@0.3.0
  - @composedb/devtools@0.3.0
  - @composedb/devtools-node@0.3.0

## 0.3.0-rc.1

### Patch Changes

- Add admin APIs support for composites creation and deployment
- Updated dependencies
  - @composedb/client@0.3.0-rc.1
  - @composedb/devtools@0.3.0-rc.1
  - @composedb/devtools-node@0.3.0-rc.1

## 0.3.0-rc.0

### Minor Changes

- Add support for relations between documents

### Patch Changes

- Updated dependencies
  - @composedb/client@0.3.0-rc.0
  - @composedb/devtools@0.3.0-rc.0
  - @composedb/devtools-node@0.3.0-rc.0

## 0.2.0

### Minor Changes

- Update version for developer preview #1

### Patch Changes

- Updated dependencies
  - @composedb/devtools@0.2.0
  - @composedb/devtools-node@0.2.0
  - @composedb/client@0.2.0
