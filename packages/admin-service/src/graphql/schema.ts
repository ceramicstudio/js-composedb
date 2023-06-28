/* eslint-disable */

import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  type GraphQLType,
} from 'graphql'
import {
  fromGlobalId,
  globalIdField,
  // mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay'
import { GraphQLJSONObject } from 'graphql-scalars'

import type { DatabaseClient } from '../types.js'

export type Context = {
  db: DatabaseClient
}

function toList<Type extends GraphQLType>(type: Type) {
  return new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(type)))
}

const { nodeField, nodeInterface } = nodeDefinitions(
  async (globalId: string, ctx: Context) => {
    const { type, id } = fromGlobalId(globalId)
    switch (type) {
      case 'Composite':
        return await ctx.db.loadComposite.query({ id })
      case 'Model':
        return await ctx.db.loadModel.query({ id })
      default:
        throw new Error(`Unsupported node type: ${type}`)
    }
  },
  (doc: Record<string, unknown>) => {
    if (doc.graph != null) {
      return 'Composite'
    }
    if (doc.controller != null) {
      return 'Model'
    }
    return undefined
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
    label: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    isEnabled: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    mutationsEnabled: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    subscriptionsEnabled: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    models: {
      type: toList(ModelObject),
      resolve: async (src, _args, ctx) => {
        return await ctx.db.findModels.query({ composite: src.id })
      },
    },
    modelsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async (src, _args, ctx) => {
        return await ctx.db.countModels.query({ composite: src.id })
      },
    },
    commonEmbeds: {
      type: toList(GraphQLString),
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
    content: {
      type: new GraphQLNonNull(GraphQLJSONObject),
    },
    composites: {
      type: toList(CompositeObject),
      resolve: async (src, _args, ctx) => {
        return await ctx.db.findComposites.query({ model: src.id })
      },
    },
    compositesCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async (src, _args, ctx) => {
        return await ctx.db.countComposites.query({ model: src.id })
      },
    },
    indexingEnabled: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    documentsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async (src, _args, ctx) => {
        return await ctx.db.countDocuments.query({ models: [src.id] })
      },
    },
  }),
})

const QueryObject = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    composites: {
      type: toList(CompositeObject),
      resolve: async (_src, _args, ctx) => {
        return await ctx.db.findComposites.query({})
      },
    },
    models: {
      type: toList(ModelObject),
      resolve: async (_src, _args, ctx) => {
        return await ctx.db.findModels.query({})
      },
    },
  }),
})

export const schema = new GraphQLSchema({
  query: QueryObject,
})
