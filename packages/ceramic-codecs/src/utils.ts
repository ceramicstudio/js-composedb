import * as fp from 'fp-ts'
import * as io from 'io-ts'
import PathReporter from 'io-ts/lib/PathReporter.js'

// From https://github.com/trpc/trpc/pull/3324#issuecomment-1422658244

export function prettyError(err: io.Errors) {
  return fp.function.pipe(
    err,
    PathReporter.failure,
    fp.array.takeLeft(3),
    (a) => a.map((s) => `- ${s}`),
    (a) => a.join('\n')
  )
}

export function ioParser<T>(schema: io.Decoder<unknown, T>) {
  return function parseInput(value: unknown) {
    return fp.function.pipe(
      schema.decode(value),
      fp.either.fold((err) => {
        throw new Error(prettyError(err))
      }, fp.function.identity)
    )
  }
}
