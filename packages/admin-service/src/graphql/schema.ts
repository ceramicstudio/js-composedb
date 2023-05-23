/* eslint-disable */

import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  type GraphQLType,
} from 'graphql'
import {
  // fromGlobalId,
  globalIdField,
  // mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay'

import type { DatabaseClient } from '../types.js'

export type Context = {
  db: DatabaseClient
}

function toList<Type extends GraphQLType>(type: Type) {
  return new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(type)))
}

const { nodeField, nodeInterface } = nodeDefinitions(
  async (_id: string, _ctx: Context) => {
    // return id.startsWith('did:') ? id : await ctx.loader.load(id)
  },
  (_doc: unknown) => {
    return undefined
    // return typeof didOrDoc === 'string' ? 'CeramicAccount' : this.#modelAliases[didOrDoc.model]
  }
)

const CompositeObject: GraphQLObjectType<{}, Context> = new GraphQLObjectType({
  name: 'Composite',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    compositeID: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (src) => src.id,
    },
    description: {
      type: GraphQLString,
    },
    enable: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    enableMutations: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    enableSubscriptions: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    models: {
      type: toList(ModelObject),
    },
  }),
})

const ModelObject: GraphQLObjectType<{}, Context> = new GraphQLObjectType({
  name: 'Model',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    streamID: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (src) => src.id,
    },
    controller: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    composites: {
      type: toList(CompositeObject),
    },
    indexDocuments: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }),
})

const QueryObject = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    composites: {
      type: toList(CompositeObject),
      resolve: async (_src, _args, context) => {
        return await context.db.listComposites.query()
      },
    },
    models: {
      type: toList(ModelObject),
      resolve: async (_src, _args, context) => {
        return await context.db.listModels.query()
      },
    },
  }),
})

export const schema = new GraphQLSchema({
  query: QueryObject,
})
