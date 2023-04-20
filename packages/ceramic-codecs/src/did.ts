import * as io from 'io-ts'

import { bytesCodec } from './binary.js'
import { DagJWSCodec } from './ipld.js'

export function isDID(input: unknown): input is string {
  return typeof input === 'string' && input.startsWith('did:')
}

export const didCodec = new io.Type<string>(
  'did',
  isDID,
  (input, context) => {
    return isDID(input)
      ? io.success(input)
      : io.failure(input, context, `Invalid DID string input to decode: ${typeof input}`)
  },
  io.identity
)

export const DagJWSResultCodec = io.intersection(
  [
    io.strict({
      jws: DagJWSCodec,
      linkedBlock: bytesCodec,
    }),
    io.partial({
      cacaoBlock: bytesCodec,
    }),
  ],
  'DagJWSResult'
)

export const CacaoHeaderCodec = io.strict(
  {
    t: io.keyof({ eip4361: null, caip122: null }),
  },
  'CacaoHeader'
)

export const CacaoPayloadCodec = io.intersection(
  [
    io.strict({
      domain: io.string,
      iss: io.string,
      aud: io.string,
      version: io.string,
      nonce: io.string,
      iat: io.string,
    }),
    io.partial({
      nbf: io.string,
      exp: io.string,
      statement: io.string,
      requestId: io.string,
      resources: io.array(io.string),
    }),
  ],
  'CacaoPayload'
)

export const CacaoSignatureCodec = io.strict(
  {
    t: io.keyof({
      eip191: null,
      eip1271: null,
      'solana:ed25519': null,
      'tezos:ed25519': null,
      'stacks:secp256k1': null,
    }),
    s: io.string,
  },
  'CacaoSignature'
)

export const CacaoCodec = io.intersection(
  [
    io.strict({ h: CacaoHeaderCodec, p: CacaoPayloadCodec }),
    io.partial({ s: CacaoSignatureCodec }),
  ],
  'Cacao'
)
