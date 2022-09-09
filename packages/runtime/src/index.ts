/**
 * ComposeDB runtime.
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
export { printGraphQLSchema } from './utils.js'
