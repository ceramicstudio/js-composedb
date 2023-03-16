import * as fp from 'fp-ts'
import * as io from 'io-ts'

export function decode<A = unknown, I = unknown>(codec: io.Type<A, unknown, I>, input: I): A {
  return fp.function.pipe(
    codec.decode(input),
    fp.either.fold(() => {
      throw new Error(`Codec ${codec.name} failed to parse input: ${input}`)
    }, fp.function.identity)
  )
}

export function createDecoder<A = unknown, I = unknown>(codec: io.Type<A, unknown, I>) {
  return (input: I): A => decode<A, I>(codec, input)
}
