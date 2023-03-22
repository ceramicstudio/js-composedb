import { StreamID } from '@ceramicnetwork/streamid'
import * as io from 'io-ts'

import { CommitDataCodec } from './commit.js'
import { cidCodec } from './ipld.js'

export const streamIDCodec = new io.Type<StreamID, string>(
  'streamID',
  (input): input is StreamID => input instanceof StreamID,
  (input, context) => {
    if (input instanceof StreamID) {
      return io.success(input)
    }
    return typeof input === 'string'
      ? io.success(StreamID.fromString(input.replace('ceramic://', '')))
      : io.failure(
          input,
          context,
          `Invalid streamID input to decode, expecting a string but got ${typeof input}`
        )
  },
  (streamID) => streamID.toString()
)

export const StreamLogCodec = io.strict(
  {
    log: io.array(CommitDataCodec),
    tip: cidCodec,
  },
  'StreamLog'
)
export type StreamLog = io.TypeOf<typeof StreamLogCodec>
