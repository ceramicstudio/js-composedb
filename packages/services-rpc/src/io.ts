import * as fp from 'fp-ts'
import * as io from 'io-ts'
import PathReporter from 'io-ts/lib/PathReporter.js'

/**
 * Decoder logic from https://github.com/trpc/trpc/pull/3324#issuecomment-1422658244
 */

export function prettyError(err: io.Errors) {
  return fp.function.pipe(
    err,
    PathReporter.failure,
    fp.array.takeLeft(3),
    (a) => a.map((s) => `- ${s}`),
    (a) => a.join('\n')
  )
}

export function ioDecode<T>(schema: io.Decoder<unknown, T>) {
  return function decode(value: unknown): T {
    return fp.function.pipe(
      schema.decode(value),
      fp.either.fold((err) => {
        throw new Error(prettyError(err))
      }, fp.function.identity)
    )
  }
}

/**
 * Encoder logic to match the type detection logic in tRPC's parser
 * cf https://github.com/trpc/trpc/blob/7a95ee7ddfe09cf04d573fe63f42ec67c916fc71/packages/server/src/core/parser.ts#L1-L8
 */

export class Encoder<Input, Output> {
  // Store type information like Zod - https://github.com/colinhacks/zod/blob/d1ad5221900af640bc3093a2fb0476ec0c94953e/src/types.ts#L160-L161
  readonly _input!: Input
  readonly _output!: Output

  #schema: io.Encoder<Input, Output>

  constructor(schema: io.Encoder<Input, Output>) {
    this.#schema = schema
  }

  parse(input: Input): Output {
    return this.#schema.encode(input)
  }
}

export function ioEncode<Input, Output>(schema: io.Encoder<Input, Output>): Encoder<Input, Output> {
  return new Encoder(schema)
}
