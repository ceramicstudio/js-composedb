import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { printSchema } from 'graphql'

import { schema } from '../dist/graphql/schema.js'

const dest = fileURLToPath(new URL('../schema.graphql', import.meta.url))
writeFileSync(dest, printSchema(schema))
