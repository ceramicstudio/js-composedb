import { teardown } from 'jest-dev-server'
import { TEMP_DIR_PATH } from "./globalConsts.js"
import fs from "fs-extra";

export default async function globalTeardown() {
  await fs.rm(TEMP_DIR_PATH, { force: true, recursive: true })
  await teardown()
}
