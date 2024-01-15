import knex, { type Knex } from 'knex'

import { resolvePath } from '../fs.js'

import { MigrationSource } from './migration-source.js'

function getConnection(url: URL, base?: string): Knex {
  const protocol = url.protocol.slice(0, -1) // remove trailing ":"
  switch (protocol) {
    case 'sqlite':
    case 'sqlite3':
      return knex({
        client: 'sqlite3',
        connection: {
          filename: resolvePath(url.hostname + url.pathname, base),
        },
        useNullAsDefault: true,
      })
    case 'postgres':
    case 'postgresql':
      return knex({
        client: 'pg',
        connection: url.toString(),
        pool: { min: 0 },
      })
    default:
      throw new Error(`Unsupported database connection protocol: ${protocol}`)
  }
}

export async function connect(url: URL | string, base?: string): Promise<Knex> {
  let connectionURL: URL
  if (typeof url === 'string') {
    try {
      connectionURL = new URL(url)
    } catch (err) {
      throw new Error(`Invalid database connection string: ${url}`)
    }
  } else {
    connectionURL = url
  }

  const connection = getConnection(connectionURL, base)
  await connection.migrate.latest({ migrationSource: new MigrationSource() })

  return connection
}
