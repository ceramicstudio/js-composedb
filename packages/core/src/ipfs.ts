import type { IPFS } from 'ipfs-core-types'
import { type Options as IPFSOptions, create as createIPFSClient } from 'ipfs-http-client'
import mergeOptions from 'merge-options'

import { resolvePath } from './fs.js'

export type IPFSOptionsParams = {
  dataDir: string
  options?: IPFSOptions
}

export function createIPFSOptions({ dataDir, options }: IPFSOptionsParams): IPFSOptions {
  return mergeOptions({ repo: resolvePath('ipfs', dataDir) }, options)
}

export type IPFSParams = IPFSOptionsParams & {
  ipfs?: IPFS
}

export function createIPFS({ dataDir, ipfs, options }: IPFSParams): IPFS {
  return ipfs ?? createIPFSClient(createIPFSOptions({ dataDir, options }))
}
