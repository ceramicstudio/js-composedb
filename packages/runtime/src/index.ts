/**
 * ComposeDB runtime module, converting a runtime composite to an executable GraphQL schema.
 *
 * ## Installation
 *
 * ```sh
 * npm install @composedb/runtime
 * ```
 *
 * @module runtime
 */

export { ComposeRuntime, type ComposeRuntimeParams } from './runtime.js'
export { Context, type ContextParams } from './context.js'
export type { DocumentCache } from './loader.js'
export { createGraphQLSchema } from './schema.js'
export { getSchema, printGraphQLSchema } from './utils.js'
export type { GetSchemaParams } from './utils.js'
