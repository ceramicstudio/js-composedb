import * as io from 'io-ts'
import { CID } from 'multiformats/cid'

import { createDecoder } from './utils.js'

export const cidCodec = new io.Type<CID, string, unknown>(
  'cid',
  (input): input is CID => input instanceof CID,
  (input, context) => {
    try {
      const cid = CID.asCID(input)
      if (cid != null) {
        return io.success(cid)
      }
      if (typeof input === 'string') {
        return io.success(CID.parse(input))
      }
      if (input instanceof Uint8Array) {
        return io.success(CID.decode(input))
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to decode CID'
      return io.failure(input, context, message)
    }
    return io.failure(input, context, 'Failed to decode CID')
  },
  (cid) => cid.toString()
)

export type CIDInput = string | CID | Uint8Array

export const parseCID = createDecoder(cidCodec)

export const JWSSignatureCodec = io.strict(
  {
    protected: io.string,
    signature: io.string,
  },
  'JWSSignature'
)

export const DagJWSCodec = io.intersection(
  [
    io.strict({
      payload: io.string,
      signatures: io.array(JWSSignatureCodec),
    }),
    io.partial({
      link: cidCodec,
    }),
  ],
  'DagJWS'
)
