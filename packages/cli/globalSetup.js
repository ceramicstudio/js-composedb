import { setup } from 'jest-dev-server'
import { Model } from '@ceramicnetwork/stream-model'
import fs from 'fs-extra'
import {
  CONFIG_DIR_PATH,
  CONFIG_PATH,
  INDEXING_DB_FILENAME,
  STATE_STORE_DIR_PATH,
  GOIPFS_DIR_PATH,
  TEMP_DIR_PATH,
  TEST_OUTPUT_DIR_PATH,
} from './globalConsts.js'

// Create the custom config here to make sure that we start with a clear indexing db setup each time
// TODO: Investigate why the indexing API throws errors when we run tests several times without cleaning the db
const TEST_DAEMON_CONFIG = {
  anchor: {},
  'http-api': {
    'admin-dids': [
      'did:key:z6Mkh3VVZHjMWmBFkmixiYsZmJYAEkASk4ScjZDkawn6Npcu', // used in composites.test.ts
      'did:key:z6MkpRhEWywReoFtQMQGqSmTu5mp9vQVok86Qha2sn6e32Db', // used in models.test.ts
    ],
    'cors-allowed-origins': [new RegExp('.*')],
  },
  ipfs: { mode: 'bundled' },
  logger: { 'log-level': 2, 'log-to-files': false },
  metrics: {
    'metrics-exporter-enabled': false,
    'metrics-port': 9090,
  },
  network: { name: 'inmemory' },
  node: {},
  'state-store': {
    mode: 'fs',
    'local-directory': STATE_STORE_DIR_PATH.pathname,
  },
  indexing: {
    db: `sqlite://${INDEXING_DB_FILENAME.pathname}`,
    'allow-queries-before-historical-sync': true,
    models: [Model.MODEL.toString()],
  },
}

export default async function globalSetup() {
  await fs.rm(TEMP_DIR_PATH, { force: true, recursive: true })

  // Create all of the dirs required for testing
  await Promise.all([
    fs.ensureDir(TEST_OUTPUT_DIR_PATH),
    fs.ensureDir(CONFIG_DIR_PATH),
    fs.ensureDir(STATE_STORE_DIR_PATH),
    fs.ensureDir(GOIPFS_DIR_PATH),
  ])

  // Write the config file so that its path can be passed to deamon below
  await fs.writeJson(CONFIG_PATH, TEST_DAEMON_CONFIG)

  await setup({
    command: `IPFS_PATH=\'${GOIPFS_DIR_PATH.pathname}\' CERAMIC_ENABLE_EXPERIMENTAL_COMPOSE_DB=\'true\' pnpm dlx @ceramicnetwork/cli daemon --config ${CONFIG_PATH.pathname}`,
    debug: true,
    launchTimeout: 240000,
    port: 7007,
  })
}
