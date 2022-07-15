import { setup } from 'jest-dev-server'
import { Model } from '@ceramicnetwork/stream-model'
import fs from 'fs-extra'
import './globalConsts.js'
import {
  CONFIG_DIR_PATH,
  CONFIG_PATH,
  INDEXING_DB_FILENAME,
  STATE_STORE_DIRECTORY,
  TEMP_DIR_PATH
} from "./globalConsts.js"


// Create the custom config here to make sure that we start with a clear indexing db setup each time
// TODO: Investigate why the indexing API throws errors when we run tests several times without cleaning the db
const TEST_DAEMON_CONFIG = {
  anchor: {},
  'http-api': { 'cors-allowed-origins': [new RegExp('.*')] },
  ipfs: { mode: 'bundled' },
  logger: { 'log-level': 2, 'log-to-files': false },
  metrics: {
    'metrics-exporter-enabled': false,
    'metrics-port': 9090,
  },
  network: { name: 'testnet-clay' },
  node: {},
  'state-store': {
    mode: 'fs',
    'local-directory': STATE_STORE_DIRECTORY.pathname,
  },
  indexing: {
    db: `sqlite://${INDEXING_DB_FILENAME.pathname}`,
    "allow-queries-before-historical-sync": true,
    models: [Model.MODEL.toString()],
  },
}

export default async function globalSetup() {
  await fs.ensureDir(TEMP_DIR_PATH)
  await fs.ensureDir(CONFIG_DIR_PATH)
  await fs.writeJson(CONFIG_PATH, TEST_DAEMON_CONFIG)

  await setup({
    command:
      `CERAMIC_ENABLE_EXPERIMENTAL_INDEXING=\'true\' rm -rf ~/.goipfs && rm -rf ${STATE_STORE_DIRECTORY.pathname} && rm -rf ./test/test_output_files && rm -rf ${INDEXING_DB_FILENAME.pathname} && rm -rf ${CONFIG_PATH} && mkdir ./test/test_output_files  && pnpm dlx @ceramicnetwork/cli@^2.4.0 daemon --config ${CONFIG_PATH}`,
    debug: true,
    launchTimeout: 240000,
    port: 7007,
  })
}
