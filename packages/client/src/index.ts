/**
 * ComposeDB client.
 *
 * ## Installation
 *
 * ```sh
 * npm install @composedb/client
 * ```
 *
 * @module client
 */

export { ComposeClient, type ComposeClientParams } from './client.js'
export { Context, type ContextParams } from './context.js'
export type { DocumentCache } from './loader.js'
export { createGraphQLSchema } from './schema.js'
export { printGraphQLSchema } from './utils.js'
