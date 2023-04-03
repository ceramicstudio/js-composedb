import { createDecoder } from '@composedb/ceramic-codecs'
import type {
  CompositeDefinition,
  GraphQLQuery,
  ModelActionDefinition,
} from '@composedb/composite-codecs'
import { type GraphDefinition, GraphDefinitionCodec } from '@composedb/graph-codecs'
import type { Model, ViewsDefinition } from '@composedb/model-codecs'
import type { Logger, ServiceLifecycle, ServicesBus } from '@composedb/services-rpc'
import {
  type DocumentNode,
  type ExecutionResult,
  GraphQLError,
  type GraphQLSchema,
  execute,
  parse,
  validate,
} from 'graphql'
import * as io from 'io-ts'
import { nanoid } from 'nanoid'

import { DocumentsManager } from './documents.js'
import { createGraphDefinition } from './graph/builder.js'
import { createContext } from './graphql/context.js'
import { createGraphQLSchema } from './graphql/schema.js'
import { ModelsManager } from './models.js'
import type { IntermediaryCompositeDefinition, ServiceClients } from './types.js'
import { assertSupportedModelController } from './utils.js'

const decodeGraphDefinition = createDecoder(GraphDefinitionCodec)

export type ServiceParams = {
  bus: ServicesBus
  clients: ServiceClients
  logger: Logger
}

export const SaveCompositeOptionsCodec = io.partial(
  {
    id: io.string,
    enable: io.boolean,
    enableMutations: io.boolean,
    enableSubscriptions: io.boolean,
    indexDocuments: io.boolean,
  },
  'SaveCompositeOptions'
)
export type SaveCompositeOptions = io.TypeOf<typeof SaveCompositeOptionsCodec>

export const SavedCompositeCodec = io.strict(
  {
    id: io.string,
    graph: GraphDefinitionCodec,
  },
  'SavedComposite'
)
export type SavedComposite = io.TypeOf<typeof SavedCompositeCodec>

export class Service implements ServiceLifecycle {
  #clients: ServiceClients
  #documents: DocumentsManager
  #models: ModelsManager

  constructor(params: ServiceParams) {
    const { clients } = params
    const models = new ModelsManager({ clients })
    this.#clients = clients
    this.#documents = new DocumentsManager({ clients, models })
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

  async getGraphQLSchema(compositeID: string): Promise<GraphQLSchema> {
    const composite = await this.#clients.database.getComposite.query({ id: compositeID })
    if (composite == null) {
      throw new GraphQLError(`Composite not found: ${compositeID}`)
    }

    let definition: GraphDefinition
    try {
      definition = decodeGraphDefinition(composite.graph)
    } catch (decodeError) {
      const message =
        (decodeError as Error).message ?? `Invalid graph definition for composite: ${compositeID}`
      throw new GraphQLError(message)
    }

    return createGraphQLSchema({ definition, readonly: false }) // !composite.enableMutations
  }

  async executeGraphQL(query: GraphQLQuery): Promise<ExecutionResult<Record<string, unknown>>> {
    let document: DocumentNode
    try {
      document = parse(query.source)
    } catch (syntaxError) {
      return { errors: [syntaxError as GraphQLError] }
    }

    let schema: GraphQLSchema
    try {
      schema = await this.getGraphQLSchema(query.composite)
    } catch (schemaError) {
      return { errors: [schemaError as GraphQLError] }
    }

    const errors = validate(schema, document)
    if (errors.length > 0) {
      return { errors }
    }

    return execute({
      document,
      variableValues: query.variables,
      contextValue: createContext({
        documents: this.#documents,
        viewerID: query.viewerID,
        commit: query.commit,
      }),
      schema,
    })
  }

  async saveComposite(
    composite: CompositeDefinition,
    options: SaveCompositeOptions = {}
  ): Promise<SavedComposite> {
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

    const id = options.id ?? nanoid()
    const graph = createGraphDefinition(definition)
    await this.#clients.database.saveComposite.mutate({
      id,
      graph,
      enable: options.enable ?? true,
      enableMutations: options.enableMutations ?? false,
      enableSubscriptions: options.enableSubscriptions ?? false,
    })

    return { id, graph }
  }
}
