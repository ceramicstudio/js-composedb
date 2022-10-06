import { ComposeServer } from '@composedb/server'
import type { NextApiRequest, NextApiResponse } from 'next'

import { definition } from '../../__generated__/definition'
import { CERAMIC_URL } from '../../constants'

const server = new ComposeServer({ ceramic: CERAMIC_URL, definition })

export default async function handler(
  req: NextApiRequest & { method: string },
  res: NextApiResponse
) {
  await server.handleHTTPRequest(req, res)
}
