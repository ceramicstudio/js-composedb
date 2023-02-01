//@TODO Remove this file when https://github.com/Urigo/graphql-scalars/pull/1641 is merged

import { GraphQLScalarType, Kind } from 'graphql'

function validateTime(time: string): boolean {
  time = time?.toUpperCase()
  const TIME_REGEX =
    /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])(\.\d{1,})?(([Z])|([+|-]([01][0-9]|2[0-3]):[0-5][0-9]))$/
  return TIME_REGEX.test(time)
}

function validateDate(date: string): boolean {
  const RFC_3339_REGEX = /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]))$/
  if (!RFC_3339_REGEX.test(date)) {
    return false
  }
  // Verify the correct number of days for
  // the month contained in the date-string.
  const year = Number(date.substring(0, 4))
  const month = Number(date.substring(5, 2))
  const day = Number(date.substring(8, 2))
  switch (month) {
    case 2: // February
      if (((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) && day > 29) {
        return false
      } else if (((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) && day > 28) {
        return false
      }
      return true
    case 4: // April
    case 6: // June
    case 9: // September
    case 11: // November
      if (day > 30) {
        return false
      }
      break
  }
  return true
}

function validateDateTime(input: string): boolean {
  input = input?.toUpperCase()
  const RFC_3339_REGEX =
    /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60))(\.\d{1,})?(([Z])|([+|-]([01][0-9]|2[0-3]):[0-5][0-9]))$/

  // Validate the structure of the date-string
  if (!RFC_3339_REGEX.test(input)) {
    return false
  }

  // Check if it is a correct date using the javascript Date parse() method.
  const time = Date.parse(input)
  if (Number.isNaN(time)) {
    return false
  }
  // Split the date-time-string up into the string-date and time-string part.
  // and check whether these parts are RFC 3339 compliant.
  const index = input.indexOf('T')
  const dateString = input.substring(0, index)
  const timeString = input.substring(index + 1)
  return validateDate(dateString) && validateTime(timeString)
}

export const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  description:
    'A date string, such as 2007-12-03, compliant with the `full-date` ' +
    'format outlined in section 5.6 of the RFC 3339 profile of the ' +
    'ISO 8601 standard for representation of dates and times using ' +
    'the Gregorian calendar.',
  serialize: (dateString) => {
    if (typeof dateString === 'string' && validateDate(dateString)) {
      return dateString
    } else
      throw new TypeError(`Date cannot represent an invalid date-string ${String(dateString)}.`)
  },
  parseValue: (value) => {
    if (typeof value === 'string' && validateDate(value)) {
      return value
    }
    throw new TypeError(`Date cannot represent an invalid date-string ${String(value)}.`)
  },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError('Date cannot represent non string or Date type')
    }
    const { value } = ast
    if (validateDate(value)) {
      return value
    }
    throw new TypeError(`Date cannot represent an invalid date-string ${String(value)}.`)
  },
  extensions: {
    codegenScalarType: 'string',
    jsonSchema: {
      type: 'string',
      format: 'date',
    },
  },
})

export const GraphQLDateTime = new GraphQLScalarType({
  name: 'DateTime',
  description:
    'A date-time string at UTC, such as 2007-12-03T10:15:30Z, ' +
    'compliant with the `date-time` format outlined in section 5.6 of ' +
    'the RFC 3339 profile of the ISO 8601 standard for representation ' +
    'of dates and times using the Gregorian calendar.',
  serialize: (dateString) => {
    if (typeof dateString === 'string' && validateDateTime(dateString)) {
      if (dateString.indexOf('Z') !== -1) {
        return dateString
      } else
        throw new TypeError(`DateTime string must be formatted to UTC time ${String(dateString)}.`)
    } else
      throw new TypeError(
        `DateTime cannot represent an invalid date-time-string ${String(dateString)}.`
      )
  },
  parseValue: (value) => {
    if (typeof value === 'string' && validateDateTime(value)) {
      return value
    } else
      throw new TypeError(`DateTime cannot represent an invalid date-time-string ${String(value)}.`)
  },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError('DateTime cannot represent non string or Date type')
    }
    const { value } = ast
    if (validateDateTime(value)) {
      return value
    }
    throw new TypeError(`DateTime cannot represent an invalid date-time-string ${String(value)}.`)
  },
  extensions: {
    codegenScalarType: 'string',
    jsonSchema: {
      type: 'string',
      format: 'date-time',
    },
  },
})

export const GraphQLTime = new GraphQLScalarType({
  name: 'Time',
  description:
    'A time string at UTC, such as 10:15:30Z, compliant with ' +
    'the `full-time` format outlined in section 5.6 of the RFC 3339' +
    'profile of the ISO 8601 standard for representation of dates and ' +
    'times using the Gregorian calendar.',
  serialize(value: any): string {
    if (value instanceof Date) {
      const dateTimeString = value.toISOString()
      return dateTimeString.substring(dateTimeString.indexOf('T') + 1)
    } else if (typeof value === 'string') {
      if (validateTime(value)) {
        return value
      }
      throw new TypeError(`Time cannot represent an invalid time-string ${value}.`)
    } else {
      throw new TypeError(
        'Time cannot be serialized from a non string, ' +
          'or non Date type ' +
          JSON.stringify(value)
      )
    }
  },
  parseValue(value: any) {
    if (!(typeof value === 'string')) {
      throw new TypeError(`Time cannot represent non string type ${JSON.stringify(value)}`)
    }
    if (validateTime(value)) {
      return value
    }
    throw new TypeError(`Time cannot represent an invalid time-string ${value}.`)
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(`Time cannot represent non string type: ${ast.kind}`)
    }
    const value = ast.value
    if (validateTime(value)) {
      return value
    }
    throw new TypeError(`Time cannot represent an invalid time-string ${String(value)}.`)
  },
  extensions: {
    codegenScalarType: 'string',
    jsonSchema: {
      type: 'string',
      format: 'time',
    },
  },
})
