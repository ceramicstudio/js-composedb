// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore missing type definition
import ipfsBin from 'go-ipfs'
import type { IPFS } from 'ipfs-core-types'
import { type Controller, type IPFSOptions, createFactory } from 'ipfsd-ctl'
import { create as createIPFSClient } from 'ipfs-http-client'
import getPort from 'get-port'
import mergeOpts from 'merge-options'
import tmp from 'tmp-promise'

const mergeOptions = mergeOpts.bind({ ignoreUndefined: true })

const DEFAULT_OPTIONS: IPFSOptions = {
  start: true,
  config: {
    Pubsub: {
      Enabled: true,
      SeenMessagesTTL: '10m',
    },
    Bootstrap: [],
    // Peering: {
    //   Peers: [
    //     {
    //       Addrs: [
    //         '/dns4/go-ipfs-ceramic-private-mainnet-external.3boxlabs.com/tcp/4011/ws/p2p/QmXALVsXZwPWTUbsT8G6VVzzgTJaAWRUD7FWL5f7d5ubAL',
    //       ],
    //       ID: 'QmXALVsXZwPWTUbsT8G6VVzzgTJaAWRUD7FWL5f7d5ubAL',
    //     },
    //     {
    //       Addrs: [
    //         '/dns4/go-ipfs-ceramic-private-cas-mainnet-external.3boxlabs.com/tcp/4011/ws/p2p/QmUvEKXuorR7YksrVgA7yKGbfjWHuCRisw2cH9iqRVM9P8',
    //       ],
    //       ID: 'QmUvEKXuorR7YksrVgA7yKGbfjWHuCRisw2cH9iqRVM9P8',
    //     },
    //     {
    //       Addrs: [
    //         '/dns4/go-ipfs-ceramic-elp-1-1-external.3boxlabs.com/tcp/4011/ws/p2p/QmUiF8Au7wjhAF9BYYMNQRW5KhY7o8fq4RUozzkWvHXQrZ',
    //       ],
    //       ID: 'QmUiF8Au7wjhAF9BYYMNQRW5KhY7o8fq4RUozzkWvHXQrZ',
    //     },
    //     {
    //       Addrs: [
    //         '/dns4/go-ipfs-ceramic-elp-1-2-external.3boxlabs.com/tcp/4011/ws/p2p/QmRNw9ZimjSwujzS3euqSYxDW9EHDU5LB3NbLQ5vJ13hwJ',
    //       ],
    //       ID: 'QmRNw9ZimjSwujzS3euqSYxDW9EHDU5LB3NbLQ5vJ13hwJ',
    //     },
    //     {
    //       Addrs: [
    //         '/dns4/go-ipfs-ceramic-private-cas-clay-external.3boxlabs.com/tcp/4011/ws/p2p/QmbeBTzSccH8xYottaYeyVX8QsKyox1ExfRx7T1iBqRyCd',
    //       ],
    //       ID: 'QmbeBTzSccH8xYottaYeyVX8QsKyox1ExfRx7T1iBqRyCd',
    //     },
    //   ],
    // },
  },
}

export function createClient(url: string) {
  return createIPFSClient({ url })
}

const factory = createFactory(
  {
    ipfsHttpModule: {
      create: createClient,
    },
    ipfsOptions: {
      repoAutoMigrate: true,
    },
  },
  {
    go: {
      // eslint-disable-next-line
      ipfsBin: ipfsBin.path(),
    },
  }
)

async function createIPFSOptions(
  options: IPFSOptions = {},
  repoPath?: string
): Promise<IPFSOptions> {
  const swarmPort = await getPort()
  const apiPort = await getPort()
  const gatewayPort = await getPort()

  return mergeOptions(
    DEFAULT_OPTIONS,
    {
      config: {
        Addresses: {
          Swarm: [`/ip4/127.0.0.1/tcp/${swarmPort}`],
          Gateway: `/ip4/127.0.0.1/tcp/${gatewayPort}`,
          API: `/ip4/127.0.0.1/tcp/${apiPort}`,
        },
      },
    },
    repoPath ? { repo: `${repoPath}/ipfs${swarmPort}/` } : {},
    options
  ) as IPFSOptions
}

export async function createIPFSController(
  options?: IPFSOptions,
  disposable = true
): Promise<Controller> {
  const controller = await factory.spawn({
    type: 'go',
    ipfsOptions: await createIPFSOptions(options),
    disposable,
  })
  return disposable ? controller : await controller.init()
}

export async function createIPFS(options: IPFSOptions = {}): Promise<IPFS> {
  if (options.repo == null) {
    const tmpDir = await tmp.dir({ unsafeCleanup: true })
    options.repo = tmpDir.path
  }

  const controller = await createIPFSController(options)
  await controller.start()
  return controller.api
}
