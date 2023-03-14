import { Logger as TSLogger } from 'tslog'

export type Logger = TSLogger<any>

export function createLogger(): Logger {
  return new TSLogger({ minLevel: 0 })
}
