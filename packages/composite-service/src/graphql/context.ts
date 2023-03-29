import type { Document } from '@composedb/document-codecs'
import DataLoader from 'dataloader'

import { DocumentsManager } from '../documents.js'

export type Loader = DataLoader<string, Document>

export function createLoader(documents: DocumentsManager): DataLoader<string, Document> {
  return new DataLoader(async (ids: ReadonlyArray<string>) => {
    const docs = await documents.load(ids)
    const byID: Record<string, Document> = {}
    for (const doc of docs) {
      byID[doc.id] = doc
    }
    return ids.map((id) => byID[id] ?? new Error(`Could not load document ${id}`))
  })
}

export type Context = { documents: DocumentsManager; loader: Loader; viewerID?: string }

export type ContextParams = {
  documents: DocumentsManager
  viewerID?: string
}

export function createContext(params: ContextParams): Context {
  const { documents, viewerID } = params
  return { documents, loader: createLoader(documents), viewerID }
}
