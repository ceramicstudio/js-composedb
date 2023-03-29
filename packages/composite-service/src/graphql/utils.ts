import type { GraphDefinition } from '@composedb/graph-codecs'
import { type GraphQLSchema, printSchema } from 'graphql'

import { createGraphQLSchema } from './schema.js'

export type GetSchemaParams = {
  definition?: GraphDefinition
  readonly?: boolean
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
 * Create a GraphQL schema from a graph definition and return its string representation.
 */
export function printGraphQLSchema(definition: GraphDefinition, readonly = false): string {
  return printSchema(createGraphQLSchema({ definition, readonly }))
}
