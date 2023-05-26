import * as io from 'io-ts'

export const isoDate = new io.Type<Date, string, unknown>(
  'isoDate',
  (input): input is Date => input instanceof Date,
  (input, context) => {
    if (input instanceof Date) {
      return io.success(input)
    }
    if (typeof input === 'string') {
      const date = new Date(input)
      if (!isNaN(date.getTime())) {
        return io.success(date)
      }
    }
    return io.failure(input, context)
  },
  (date) => date.toISOString()
)
