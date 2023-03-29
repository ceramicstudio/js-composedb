import type { CompositeDefinition, ModelActionDefinition } from '@composedb/composite-codecs'
import type { GraphDefinition } from '@composedb/graph-codecs'
import type { Model, ViewsDefinition } from '@composedb/model-codecs'
import type { Logger, ServiceLifecycle, ServicesBus } from '@composedb/services-rpc'
import * as io from 'io-ts'
import { nanoid } from 'nanoid'

import { DocumentsManager } from './documents.js'
import { createGraphDefinition } from './graph/builder.js'
import { ModelsManager } from './models.js'
import type { IntermediaryCompositeDefinition, ServiceClients } from './types.js'
import { assertSupportedModelController } from './utils.js'

export type ServiceParams = {
  bus: ServicesBus
  clients: ServiceClients
  logger: Logger
}

export const SaveCompositeOptionsCodec = io.partial({
  id: io.string,
  enable: io.boolean,
  enableMutations: io.boolean,
  enableSubscriptions: io.boolean,
  indexDocuments: io.boolean,
})
export type SaveCompositeOptions = io.TypeOf<typeof SaveCompositeOptionsCodec>

export class Service implements ServiceLifecycle {
  #clients: ServiceClients
  #documents: DocumentsManager
  #models: ModelsManager

  constructor(params: ServiceParams) {
    const models = new ModelsManager({ clients: params.clients })
    this.#clients = params.clients
    this.#documents = new DocumentsManager({ clients: params.clients, models })
    this.#models = models
  }

  get documents(): DocumentsManager {
    return this.#documents
  }

  get models(): ModelsManager {
    return this.#models
  }

  async stop() {
    // TODO: stop all active subscriptions
  }

  async executeGraphQL() {
    // TODO:
    // - load composite graph
    // - compile GraphQL schema
    // - execute GraphQL query
    // - (future) keep track of subscriptions
  }

  async saveComposite(
    composite: CompositeDefinition,
    options: SaveCompositeOptions = {}
  ): Promise<GraphDefinition> {
    const modelOptions = { indexDocuments: options.indexDocuments }
    const definition: IntermediaryCompositeDefinition = {
      version: '1.0',
      models: {},
      commonEmbeds: composite.commonEmbeds,
    }
    const modelsViews: Record<string, ViewsDefinition> = {}

    // Create or load the models
    await Promise.all(
      Object.values(composite.models).map(async (modelAction: ModelActionDefinition) => {
        let model: Model
        if (modelAction.action === 'create') {
          model = await this.#models.create(modelAction.commit, modelOptions)
        } else {
          model = await this.#models.load(modelAction.id, modelOptions)
          modelsViews[modelAction.id] = modelAction.views
        }
        assertSupportedModelController(model.metadata.controller)
        const id = model.id.toString()
        definition.models[id] = model.content
      })
    )
    definition.views = { models: modelsViews }

    const graph = createGraphDefinition(definition)
    await this.#clients.database.saveComposite.mutate({
      id: options.id ?? nanoid(),
      graph,
      enable: options.enable ?? true,
      enableMutations: options.enableMutations ?? false,
      enableSubscriptions: options.enableSubscriptions ?? false,
    })

    return graph
  }
}
