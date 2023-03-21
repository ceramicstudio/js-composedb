import type { Logger, ServiceLifecycle } from '@composedb/services-rpc'
import { DataSource, type DataSourceOptions } from 'typeorm'

import { Model as ModelEntity } from './entities/model.js'

export async function initializeDataSource(options: DataSourceOptions): Promise<DataSource> {
  const dataSource = new DataSource({
    synchronize: true,
    logging: true,
    ...options,
    entities: [ModelEntity],
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

  start() {}

  stop() {}

  async createModel(entity: ModelEntity): Promise<ModelEntity> {
    const ds = await this.#dataSourcePromise
    return await ds.manager.save(ModelEntity, entity)
  }

  async getModel(id: string): Promise<ModelEntity | null> {
    const ds = await this.#dataSourcePromise
    return await ds.manager.findOneBy(ModelEntity, { id })
  }
}
