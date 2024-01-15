import type { Knex } from 'knex'

export function up(knex: Knex) {
  return knex.schema
    .createTable('composedb_composite', (table) => {
      table.string('id').notNullable().primary()
      table.string('label').notNullable()
      table.text('description').nullable()
      // Postgres doesn't support JSON arrays so we use a text column here instead
      // cf https://knexjs.org/guide/schema-builder.html#json
      table.text('commonEmbeds').notNullable().defaultTo('[]')
      table.jsonb('graph').notNullable()
      table.boolean('enableQueries').notNullable().defaultTo(true)
      table.boolean('enableMutations').notNullable().defaultTo(true)
      table.boolean('enableSubscriptions').notNullable().defaultTo(false)
      table.timestamps()
    })
    .createTable('composedb_composite_model', (table) => {
      table.string('composite_id').notNullable()
      table.string('model_id').notNullable()
      table.primary(['composite_id', 'model_id'])
    })
}

export function down(knex: Knex) {
  return knex.schema
    .dropTableIfExists('composedb_composite')
    .dropTableIfExists('composedb_composite_model')
}
