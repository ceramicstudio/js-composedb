import type { DocumentQuery, PageInfo, PaginationQuery } from '@composedb/document-codecs'
import type { Logger, ServiceLifecycle } from '@composedb/services-rpc'
import { DataSource, type DataSourceOptions, In, type SelectQueryBuilder } from 'typeorm'

import { Composite } from './entities/composite.js'
import { Document, IndexedStringField } from './entities/document.js'
import { Model } from './entities/model.js'
import { DocumentSubscriber } from './subscribers/documents.js'
import { createQueryHash, decodeCursor, encodeCursor } from './pagination.js'

const PAGE_DEFAULT_SIZE = 20
const PAGE_MAX_SIZE = 200

export type PaginationResult = {
  edges: Array<{ cursor: string; node: Document }>
  pageInfo: PageInfo
}

export async function initializeDataSource(
  options: DataSourceOptions,
  logger: Logger
): Promise<DataSource> {
  const dataSource = new DataSource({
    synchronize: true,
    logging: false,
    ...options,
    entities: [Composite, Document, IndexedStringField, Model],
    subscribers: [DocumentSubscriber],
    migrations: [],
  })
  await dataSource.initialize()
  logger.debug('Data source initialized', options)
  return dataSource
}

export type ServiceParams = {
  dataSource: DataSourceOptions
  logger: Logger
}

export class Service implements ServiceLifecycle {
  #dataSourcePromise: Promise<DataSource>
  #logger: Logger

  constructor(params: ServiceParams) {
    this.#dataSourcePromise = initializeDataSource(params.dataSource, params.logger)
    this.#logger = params.logger
  }

  async stop() {
    const ds = await this.#dataSourcePromise
    await ds.destroy()
  }

  async findComposite(id: string): Promise<Composite | null> {
    const ds = await this.#dataSourcePromise
    return await ds.manager.findOneBy(Composite, { id })
  }

  async findComposites(): Promise<Array<Composite>> {
    const ds = await this.#dataSourcePromise
    return await ds.manager.find(Composite, { relations: { models: true } })
  }

  async saveComposite(entity: Composite): Promise<Composite> {
    const ds = await this.#dataSourcePromise
    const saved = await ds.manager.save(Composite, entity)
    this.#logger.trace('Composite saved', { id: saved.id })
    return saved
  }

  async findDocument(id: string): Promise<Document | null> {
    const ds = await this.#dataSourcePromise
    return await ds.manager.findOneBy(Document, { id })
  }

  async findDocuments(ids: Array<string>): Promise<Array<Document>> {
    const ds = await this.#dataSourcePromise
    return await ds.manager.findBy(Document, { id: In(ids) })
  }

  async #createDocumentQuery(query: DocumentQuery): Promise<SelectQueryBuilder<Document>> {
    const ds = await this.#dataSourcePromise
    let builder = ds.createQueryBuilder(Document, 'doc').select('doc')
    // Model filter
    if (query.models.length > 1) {
      builder = builder.where('doc.modelId IN(:...models)', { models: query.models })
    } else {
      builder = builder.where('doc.modelId = :model', { model: query.models[0] })
    }
    // Account filter
    if (query.account != null) {
      builder = builder.andWhere({ controller: query.account })
    }
    // Fields filters
    for (const [key, valueFilter] of Object.entries(query.filter ?? {})) {
      builder = builder.innerJoin('doc.stringFields', key, `${key}.key = :key`, { key })
      if (valueFilter.is != null) {
        builder = builder.andWhere(`${key}.value = :value`, { value: valueFilter.is })
      } else if (valueFilter.not != null) {
        builder = builder.andWhere(`${key}.value != :value`, { value: valueFilter.not })
      } else if (valueFilter.in != null) {
        builder = builder.andWhere(`${key}.value IN(:...value)`, { value: valueFilter.in })
      }
    }
    return builder
  }

  async countDocuments(query: DocumentQuery): Promise<number> {
    const builder = await this.#createDocumentQuery(query)
    return await builder.getCount()
  }

  async queryDocuments(query: PaginationQuery): Promise<PaginationResult> {
    const { after, before, first, last, ...rest } = query
    let builder = await this.#createDocumentQuery(query)

    // Handle pagination
    const queryHash = createQueryHash(rest)
    let take = PAGE_DEFAULT_SIZE
    if (first != null) {
      // Forward pagination
      take = Math.min(first, PAGE_MAX_SIZE)
      if (after != null) {
        const [hash, docCursor] = decodeCursor(after)
        if (hash !== queryHash) {
          throw new Error(`Invalid cursor ${after} for query`)
        }
        builder = builder.andWhere('doc.cursor > :cursor', { cursor: docCursor })
      }
    } else if (last != null) {
      // Backward pagination
      take = Math.min(last, PAGE_MAX_SIZE)
      if (before != null) {
        const [hash, docCursor] = decodeCursor(before)
        if (hash !== queryHash) {
          throw new Error(`Invalid cursor ${before} for query`)
        }
        builder = builder.andWhere('doc.cursor < :cursor', { cursor: docCursor })
      }
    }

    // Handle sorting
    for (const sortBy of query.sort ?? []) {
      builder = builder.addOrderBy(
        sortBy.field,
        sortBy.order,
        sortBy.nullsFirst ? 'NULLS FIRST' : 'NULLS LAST'
      )
    }

    // Load N+1 results to check if there is a next page
    const [results, totalCount] = await builder.take(take + 1).getManyAndCount()
    const hasMore = results.length > take

    // Only return the requested number of edges
    const edges = results.slice(0, take - 1).map((node) => {
      return { cursor: encodeCursor(queryHash, node.cursor), node }
    })
    return {
      edges,
      pageInfo: {
        totalCount,
        startCursor: edges.length === 0 ? null : edges[0].cursor,
        endCursor: edges.length === 0 ? null : edges[edges.length - 1].cursor,
        hasNextPage: before ? true : hasMore,
        hasPreviousPage: after ? true : false,
      },
    }
  }

  async saveDocument(doc: Omit<Document, 'cursor'>): Promise<Document> {
    const ds = await this.#dataSourcePromise
    const existing = await this.findDocument(doc.id)
    // Ensure cursor is always set but never updated
    const cursor = existing?.cursor ?? `${Date.now()}${doc.id.slice(-3)}`
    const saved = await ds.manager.save(Document, { ...doc, cursor })
    this.#logger.trace('Document saved', { id: saved.id })
    return saved
  }

  async findModel(id: string): Promise<Model | null> {
    const ds = await this.#dataSourcePromise
    return await ds.manager.findOneBy(Model, { id })
  }

  async findModels(): Promise<Array<Model>> {
    const ds = await this.#dataSourcePromise
    return await ds.manager.find(Model, { relations: { composites: true } })
  }

  async saveModel(entity: Model): Promise<Model> {
    const ds = await this.#dataSourcePromise
    const saved = await ds.manager.save(Model, entity)
    this.#logger.trace('Model saved', { id: saved.id })
    return saved
  }
}
