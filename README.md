# ComposeDB monorepo

Packages providing the reference TypeScript implementation of ComposeDB.

## ⚠️ Preview releases

ComposeDB packages and tools are still under early development, breaking changes are to be expected between releases until a stable v1 is released.

## Installation

This monorepo uses [pnpm](https://pnpm.io/), make sure to install it first if you don't already have it.

1. `pnpm install` to install the dependencies
1. `pnpm run build` to build all the packages

### Additional scripts

- `pnpm run lint` to run the linter in all packages
- `pnpm run test` to run tests in all packages
- `pnpm run docs` to generate API documentation

## Packages

| Name                                                       | Description                                                    | Version                                                                     |
| ---------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Client libraries**                                       |
| [`@composedb/client`](./packages/client)                   | ComposeDB client for executing GraphQL query on a Ceramic node | ![npm version](https://img.shields.io/npm/v/@composedb/client.svg)          |
| **Developer tools**                                        |
| [`@composedb/cli`](./packages/cli)                         | Command Line Interface                                         | ![npm version](https://img.shields.io/npm/v/@composedb/cli.svg)             |
| [`@composedb/devtools`](./packages/devtools)               | Development tools library                                      | ![npm version](https://img.shields.io/npm/v/@composedb/devtools.svg)        |
| [`@composedb/devtools-node`](./packages/devtools-node)     | Node.js-specific development tools library                     | ![npm version](https://img.shields.io/npm/v/@composedb/devtools-node.svg)   |
| **Shared libraries**                                       |
| [`@composedb/graphql-scalars`](./packages/graphql-scalars) | Shared GraphQL scalars                                         | ![npm version](https://img.shields.io/npm/v/@composedb/graphql-scalars.svg) |
| [`@composedb/types`](./packages/types)                     | Shared types                                                   | ![npm version](https://img.shields.io/npm/v/@composedb/types.svg)           |

## License

Dual licensed under [MIT](LICENSE-MIT) and [Apache 2](LICENSE-APACHE)
