import { CeramicStreamID } from '@composedb/graphql-scalars'
import {
  type DocumentNode,
  type ExecutionResult,
  GraphQLBoolean,
  type GraphQLError,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  type Source,
  execute,
  parse,
  validate,
} from 'graphql'
import {
  type ConnectionArguments,
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay'
import { nanoid } from 'nanoid'

import { createModelFromGenesis } from '../ceramic.js'
import { type CompositeRow, compositeModelTable, compositeTable } from '../db/tables.js'

import type { AdminContext } from './context.js'

const { nodeField, nodeInterface } = nodeDefinitions(
  async (globalId: string, context: AdminContext) => {
    const { type, id } = fromGlobalId(globalId)
    if (type === 'Composite') {
      return await compositeTable(context.db).where('id', id).first()
    }
    return null
  },
)

const CompositeObject = new GraphQLObjectType<CompositeRow, AdminContext>({
  name: 'Composite',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    label: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    commonEmbeds: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
      resolve: (source) => source.commonEmbeds.split(','),
    },
    enableQueries: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    enableMutations: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    enableSubscriptions: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }),
})

const { connectionType: CompositeConnection, edgeType: CompositeEdge } = connectionDefinitions({
  nodeType: CompositeObject,
})

type ModelReferenceType = {
  alias: string
  streamID: string
}

const ModelReferenceObject = new GraphQLObjectType<ModelReferenceType, AdminContext>({
  name: 'ModelReference',
  fields: () => ({
    alias: {
      type: new GraphQLNonNull(GraphQLString),
    },
    streamID: {
      type: new GraphQLNonNull(CeramicStreamID),
    },
  }),
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    composites: {
      type: new GraphQLNonNull(CompositeConnection),
      args: connectionArgs,
      resolve: (_, args: ConnectionArguments, context: AdminContext) => {
        const dataPromise = compositeTable(context.db).select()
        return connectionFromPromisedArray(dataPromise, args)
      },
    },
  }),
})

const createModelsMutation = mutationWithClientMutationId({
  name: 'CreateModels',
  inputFields: {
    models: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
    },
  },
  outputFields: () => ({
    models: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ModelReferenceObject))),
    },
  }),
  mutateAndGetPayload: async (input: { models: Array<string> }, context: AdminContext) => {
    const toCreate: Array<Promise<ModelReferenceType>> = input.models.map(async (alias) => {
      const commit = context.commits[alias]
      if (commit == null) {
        throw new Error(`Missing commit for model ${alias}`)
      }
      const model = await createModelFromGenesis(context.ceramic, commit)
      return { alias, streamID: model.id.toString() }
    })

    return { models: await Promise.all(toCreate) }
  },
})

export type CreateCompositeInputType = {
  label: string
  description?: string
  modelIDs: Array<string>
  commonEmbeds: Array<string>
  enableQueries: boolean
  enableMutations: boolean
  enableSubscriptions: boolean
}

const createCompositeMutation = mutationWithClientMutationId({
  name: 'CreateComposite',
  inputFields: {
    label: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    modelIDs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
    },
    commonEmbeds: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
    },
    enableQueries: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    enableMutations: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    enableSubscriptions: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  },
  outputFields: () => ({
    node: nodeField,
    compositeEdge: {
      type: new GraphQLNonNull(CompositeEdge),
    },
  }),
  mutateAndGetPayload: async (input: CreateCompositeInputType, context: AdminContext) => {
    // Ensure all models can be loaded
    await Promise.all(input.modelIDs.map((id) => context.ceramic.loadStream(id)))

    const compositeID = nanoid()
    const composite: Omit<CompositeRow, 'createdAt' | 'updatedAt'> = {
      id: compositeID,
      label: input.label,
      description: input.description,
      commonEmbeds: input.commonEmbeds.join(','),
      definition: '{}',
      enableQueries: input.enableQueries,
      enableMutations: input.enableMutations,
      enableSubscriptions: input.enableSubscriptions,
    }
    const compositeModels = input.modelIDs.map((modelID) => ({ compositeID, modelID }))

    // Insert the new composite and composite-model relations in a transaction
    await context.db.transaction(async (trx) => {
      await compositeTable(context.db).insert(composite).transacting(trx)
      await compositeModelTable(context.db).insert(compositeModels).transacting(trx)
    })

    const connection = await connectionFromPromisedArray<CompositeRow>(
      compositeTable(context.db).select(),
      { last: 1 },
    )
    return { compositeEdge: connection.edges[0] }
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createComposite: createCompositeMutation,
    createModels: createModelsMutation,
  },
})

export const schema = new GraphQLSchema({ query: Query, mutation: Mutation })

/**
 * Execute a GraphQL query from a DocumentNode and optional variables.
 */
export async function executeAdmin<Data = Record<string, unknown>>(
  document: DocumentNode,
  contextValue: AdminContext,
  variableValues?: Record<string, unknown>,
): Promise<ExecutionResult<Data>> {
  const errors = validate(schema, document)
  return errors.length > 0
    ? { errors }
    : ((await execute({
        document,
        variableValues,
        contextValue,
        schema,
      })) as unknown as ExecutionResult<Data>)
}

/**
 * Execute a GraphQL query from its source and optional variables.
 */
export async function executeAdminQuery<Data = Record<string, unknown>>(
  source: string | Source,
  context: AdminContext,
  variableValues?: Record<string, unknown>,
): Promise<ExecutionResult<Data>> {
  let document: DocumentNode
  try {
    document = parse(source)
  } catch (syntaxError) {
    return { errors: [syntaxError as GraphQLError] }
  }
  return await executeAdmin<Data>(document, context, variableValues)
}
