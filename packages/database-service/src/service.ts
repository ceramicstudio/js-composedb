import type { Logger, ServiceLifecycle } from '@composedb/services-rpc'
import { DataSource, type DataSourceOptions } from 'typeorm'

import { Composite } from './entities/composite.js'
import { Model } from './entities/model.js'

export async function initializeDataSource(options: DataSourceOptions): Promise<DataSource> {
  const dataSource = new DataSource({
    synchronize: true,
    logging: true,
    ...options,
    entities: [Composite, Model],
    subscribers: [],
    migrations: [],
  })
  return await dataSource.initialize()
}

export type ServiceParams = {
  dataSource: DataSourceOptions
  logger: Logger
}

export class Service implements ServiceLifecycle {
  #dataSourcePromise: Promise<DataSource>

  constructor(params: ServiceParams) {
    this.#dataSourcePromise = initializeDataSource(params.dataSource)
  }

  async stop() {
    const ds = await this.#dataSourcePromise
    await ds.destroy()
  }

  async findComposite(id: string): Promise<Composite | null> {
    const ds = await this.#dataSourcePromise
    return await ds.manager.findOneBy(Composite, { id })
  }

  async saveComposite(entity: Composite): Promise<Composite> {
    const ds = await this.#dataSourcePromise
    return await ds.manager.save(Composite, entity)
  }

  async findModel(id: string): Promise<Model | null> {
    const ds = await this.#dataSourcePromise
    return await ds.manager.findOneBy(Model, { id })
  }

  async saveModel(entity: Model): Promise<Model> {
    const ds = await this.#dataSourcePromise
    return await ds.manager.save(Model, entity)
  }
}
