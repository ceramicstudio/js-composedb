import { Knex } from 'knex'

import * as migration0 from './migrations/0-init.js'

const MIGRATIONS = {
  '0-init': migration0,
} satisfies Record<string, Knex.Migration>

type MigrationName = keyof typeof MIGRATIONS

export class MigrationSource implements Knex.MigrationSource<MigrationName> {
  getMigrations(): Promise<Array<MigrationName>> {
    return Promise.resolve(Object.keys(MIGRATIONS) as Array<MigrationName>)
  }

  getMigrationName(name: MigrationName): MigrationName {
    return name
  }

  getMigration(name: MigrationName): Promise<Knex.Migration> {
    const migration = MIGRATIONS[name]
    if (migration == null) {
      throw new Error(`Migration not found: ${name}`)
    }
    return Promise.resolve(migration)
  }
}
