import { isAbsolute, resolve } from 'node:path'

export function resolvePath(path: string, base?: string): string {
  return isAbsolute(path) ? path : resolve(base ?? process.cwd(), path)
}
