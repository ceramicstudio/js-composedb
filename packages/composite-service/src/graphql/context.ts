import type { SignedCommitContainer } from '@composedb/ceramic-codecs'
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

export type PartialContext = {
  documents: DocumentsManager
  viewerID?: string
  commit?: SignedCommitContainer
}

export type Context = PartialContext & {
  loader: Loader
}

export function createContext(partial: PartialContext): Context {
  return { ...partial, loader: createLoader(partial.documents) }
}
