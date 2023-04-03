import { type EntitySubscriberInterface, EventSubscriber, type InsertEvent } from 'typeorm'

import { Document } from '../entities/document.js'
import { events } from '../events.js'

@EventSubscriber()
export class DocumentSubscriber implements EntitySubscriberInterface<Document> {
  listenTo() {
    return Document
  }

  afterInsert(event: InsertEvent<any>) {
    events.next({ type: 'document-inserted', document: event.entity })
  }
}
