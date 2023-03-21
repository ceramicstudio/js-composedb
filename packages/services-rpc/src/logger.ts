import { type ILogObj, type ISettingsParam, Logger as TSLogger } from 'tslog'

export type Logger = TSLogger<ILogObj>

export function createLogger(params: ISettingsParam<ILogObj>): Logger {
  return new TSLogger(params)
}
