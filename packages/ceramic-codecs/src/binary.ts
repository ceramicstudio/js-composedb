import * as io from 'io-ts'
import { fromString, toString } from 'uint8arrays'

const BYTES_ENCODING = 'base64'

export const bytesCodec = new io.Type<Uint8Array, string>(
  'bytes',
  (input): input is Uint8Array => input instanceof Uint8Array,
  (input, context) => {
    return typeof input === 'string'
      ? io.success(fromString(input, BYTES_ENCODING))
      : io.failure(
          input,
          context,
          `Invalid bytes input to decode, expecting a string but got ${typeof input}`
        )
  },
  (bytes) => toString(bytes, BYTES_ENCODING)
)
