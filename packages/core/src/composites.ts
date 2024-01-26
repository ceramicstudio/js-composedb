import { ComposeRuntime } from '@composedb/runtime'

import { type CompositeQueryBuilder, compositeTable } from './db/tables.js'
import type { CoreContext } from './types.js'

export type RuntimeParams = {
  readonly?: boolean
}

export type ManagerParams = {
  context: CoreContext
}

// TODO: admin GraphQL API to CRUD composites
// Models should be provided as JWS signed by client in GraphQL middleware

// Manages DB interactions and ComposeRuntime instances
export class CompositesManager {
  #context: CoreContext
  #runtimePromises: Record<string, Promise<ComposeRuntime | null>> = {}

  constructor(params: ManagerParams) {
    this.#context = params.context
  }

  async getCompositeQueryBuilder(): Promise<CompositeQueryBuilder> {
    const db = await this.#context.dbPromise
    return compositeTable(db)
  }

  async loadRuntime(id: string): Promise<ComposeRuntime | null> {
    const existing = this.#runtimePromises[id]
    if (existing != null) {
      return await existing
    }

    const loadComposite = this.getCompositeQueryBuilder().then((qb) => {
      return qb.where('id', id).first()
    })

    this.#runtimePromises[id] = Promise.all([this.#context.getCeramic(), loadComposite]).then(
      ([ceramic, composite]) => {
        // TODO: runtime params from composite data
        return composite ? new ComposeRuntime({ ceramic }) : null
      },
    )
    return this.#runtimePromises[id]
  }
}
