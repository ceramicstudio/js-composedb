import type { Knex } from 'knex'

export type CompositeRow = {
  id: string
  label: string
  description?: string
  commonEmbeds: string // JSON-encoded Array<string>
  definition: string // JSON-encoded RuntimeCompositeDefinition
  enableQueries: boolean
  enableMutations: boolean
  enableSubscriptions: boolean
  createdAt: number
  updatedAt?: number
}

export type CompositeQueryBuilder = Knex.QueryBuilder<CompositeRow>

export function compositeTable(knex: Knex): CompositeQueryBuilder {
  return knex<CompositeRow>('composedb_composite')
}

export type CompositeModelRow = {
  compositeID: string
  modelID: string
}

export type CompositeModelQueryBuilder = Knex.QueryBuilder<CompositeModelRow>

export function compositeModelTable(knex: Knex): CompositeModelQueryBuilder {
  return knex<CompositeModelRow>('composedb_composite_model')
}
