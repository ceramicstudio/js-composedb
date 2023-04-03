import { Subject, filter, map } from 'rxjs'

import type { Document } from './entities/document.js'

export type DocumentInsertedEvent = {
  type: 'document-inserted'
  document: Document
}

export type DatabaseEvent = DocumentInsertedEvent

export const events = new Subject<DatabaseEvent>()

export const documentInserted$ = events.pipe(
  filter((e) => e.type === 'document-inserted'),
  map((e) => e.document)
)
