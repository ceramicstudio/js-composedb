export const CWD = new URL(`file://${process.cwd()}/`);
export const TEST_DIR_PATH = new URL('test/', CWD)
export const TEMP_DIR_PATH = new URL('tmp/', TEST_DIR_PATH)
export const CONFIG_DIR_PATH = new URL('config/', TEMP_DIR_PATH)
export const CONFIG_PATH = new URL('daemon.config.json', CONFIG_DIR_PATH)
export const STATE_STORE_DIRECTORY = new URL('statestore/', TEMP_DIR_PATH)
export const INDEXING_DB_FILENAME = new URL('indexing.sqlite', TEMP_DIR_PATH)
