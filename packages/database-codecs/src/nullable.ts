import * as io from 'io-ts'

import { isoDate } from './date.js'

export const nullableDate = io.union([isoDate, io.null])

export const nullableString = io.union([io.string, io.null])
