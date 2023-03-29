import type { DocumentQuery } from '@composedb/document-codecs'
import createObjectHash from 'object-hash'
import { fromString, toString } from 'uint8arrays'

const ENCODING = 'base64url'

export function createQueryHash(query: DocumentQuery): string {
  return createObjectHash(query)
}

export function decodeCursor(cursor: string): [string, string] {
  const decoded = toString(fromString(cursor, ENCODING), 'utf8')
  const parts = decoded.split(':')
  if (parts.length !== 2) {
    throw new Error(`Invalid cursor: ${cursor}`)
  }
  return parts as [string, string]
}

export function encodeCursor(queryHash: string, docCursor: string): string {
  return toString(fromString(`${queryHash}:${docCursor}`, 'utf8'), ENCODING)
}
