import type { RuntimeCompositeDefinition } from '@composedb/types'
import { type GraphQLSchema, printSchema } from 'graphql'

import { createGraphQLSchema } from './schema.js'

export type GetSchemaParams = {
  /**
   * Runtime composite definition, created using the {@linkcode devtools.Composite Composite}
   * development tools.
   */
  definition?: RuntimeCompositeDefinition
  /**
   * Set the schema to read-only, disabling mutations support.
   */
  readonly?: boolean
  /**
   * GraphQL Schema to use, ignores the `definition` and `readonly` parameters if provided.
   */
  schema?: GraphQLSchema
}

/**
 * Use or create a GraphQL schema based on the provided parameters.
 */
export function getSchema(params: GetSchemaParams): GraphQLSchema {
  const { definition, readonly, schema } = params
  if (schema != null) {
    return schema
  }
  if (definition == null) {
    throw new Error(`Invalid parameters to get schema: missing definition or schema`)
  }
  return createGraphQLSchema({ definition, readonly })
}

/**
 * Create a GraphQL schema from a runtime composite definition and return its string
 * representation.
 */
export function printGraphQLSchema(
  definition: RuntimeCompositeDefinition,
  readonly = false,
): string {
  return printSchema(createGraphQLSchema({ definition, readonly }))
}
