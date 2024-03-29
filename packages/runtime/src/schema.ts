import type { BaseQuery, QueryFilters, Sorting } from '@ceramicnetwork/common'
import type { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import { CeramicCommitID, getScalar } from '@composedb/graphql-scalars'
import type { UpdateDocOptions } from '@composedb/loader'
import type {
  RuntimeCompositeDefinition,
  RuntimeList,
  RuntimeModel,
  RuntimeObjectField,
  RuntimeObjectFields,
  RuntimeReference,
  RuntimeReferenceType,
  RuntimeRelation,
  RuntimeScalar,
  RuntimeScalarCommon,
  RuntimeViewField,
  RuntimeViewReference,
} from '@composedb/types'
import {
  type GraphQLArgumentConfig,
  GraphQLBoolean,
  GraphQLEnumType,
  type GraphQLEnumValueConfigMap,
  type GraphQLFieldConfig,
  type GraphQLFieldConfigMap,
  GraphQLFloat,
  GraphQLID,
  type GraphQLInputFieldConfig,
  type GraphQLInputFieldConfigMap,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  type GraphQLOutputType,
  type GraphQLScalarType,
  GraphQLSchema,
  GraphQLString,
  assertValidSchema,
  isInterfaceType,
} from 'graphql'
import type { ObjMap } from 'graphql/jsutils/ObjMap'
import {
  type Connection,
  type ConnectionArguments,
  connectionArgs,
  connectionDefinitions,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay'

import type { Context } from './context.js'
import { assertValidQueryFilters, createRelationQueryFilters } from './query.js'

const NON_SCALAR_FIELD_TYPES: Array<RuntimeObjectField['type']> = [
  'meta',
  'reference',
  'list',
  'view',
]
function isScalarField(field: RuntimeObjectField): field is RuntimeScalar {
  return !NON_SCALAR_FIELD_TYPES.includes(field.type)
}

const STRING_REFERENCE_TYPES: Array<RuntimeReferenceType> = ['enum', 'node']
function isStringReferenceField(field: RuntimeObjectField): field is RuntimeReference {
  return field.type === 'reference' && STRING_REFERENCE_TYPES.includes(field.refType)
}

type EmbeddedObject = { __type: string; [key: string]: unknown }

type GraphQLNodeDefinitions = {
  nodeInterface: GraphQLInterfaceType
  nodeField: GraphQLFieldConfig<unknown, Context>
  nodesField: GraphQLFieldConfig<unknown, Context>
}
type SharedDefinitions = GraphQLNodeDefinitions & {
  accountObject: GraphQLObjectType<string, Context>
  queryFields: GraphQLFieldConfigMap<unknown, Context>
}

type BuildObjectParams = {
  name: string
  fields: RuntimeObjectFields
  definitions: SharedDefinitions
}
type BuildModelObjectParams = BuildObjectParams & { model: RuntimeModel }

type FilterWithArgument = { with: Record<string, string | number> }
type AccountFilterWithArgument = FilterWithArgument & { account: string }

type ConnectionAccountArgument = { account?: string }
type ConnectionFiltersArgument = { filters?: QueryFilters }
type ConnectionSortingArgument = { sorting?: Sorting }

type ConnectionQueryArguments = ConnectionArguments &
  ConnectionFiltersArgument &
  ConnectionSortingArgument
type ConnectionRelationArguments = ConnectionAccountArgument & ConnectionFiltersArgument
type ConnectionRelationSortingArguments = ConnectionAccountArgument & ConnectionQueryArguments

function createAccountReferenceQuery(
  models: Array<string>,
  account: string,
  reference: RuntimeViewReference,
  filters?: QueryFilters,
): BaseQuery {
  const query: BaseQuery = { models }
  if (reference.type === 'account') {
    // Current account is referenced in a document field
    query.queryFilters = createRelationQueryFilters(reference.property, account, filters)
  } else {
    // Current account is the controller of the document
    query.account = account
    if (filters != null) {
      assertValidQueryFilters(filters)
      query.queryFilters = filters
    }
  }
  return query
}

function getReferencedAccount(
  account: string,
  doc: ModelInstanceDocument,
  context: Context,
): string | null {
  switch (account) {
    case 'documentAccount':
      return doc.metadata.controller
    case 'viewer':
      return context.getViewerID()
    default:
      return account
  }
}

const accountRelationArg = {
  type: new GraphQLNonNull(GraphQLID),
  description: 'Account defining the relation',
}

const connectionArgsWithAccount = {
  ...connectionArgs,
  account: {
    type: GraphQLID,
    description: 'Returns only documents created by the provided account',
  },
}

const shouldIndexField: GraphQLInputFieldConfig = {
  type: GraphQLBoolean,
  description: 'Inform indexers if they should index this document or not',
}

const syncTimeoutField: GraphQLInputFieldConfig = {
  type: GraphQLInt,
  description:
    'Maximum amount of time to lookup the stream over the network, in seconds - see https://developers.ceramic.network/reference/typescript/interfaces/_ceramicnetwork_common.CreateOpts.html#syncTimeoutSeconds',
}

const CreateOptionsInput = new GraphQLInputObjectType({
  name: 'CreateOptionsInput',
  fields: {
    shouldIndex: shouldIndexField,
  },
})

const SetOptionsInput = new GraphQLInputObjectType({
  name: 'SetOptionsInput',
  fields: {
    shouldIndex: shouldIndexField,
    syncTimeout: syncTimeoutField,
  },
})

type SetOptions = {
  shouldIndex?: boolean
  syncTimeout?: number
}

const UpdateOptionsInput = new GraphQLInputObjectType({
  name: 'UpdateOptionsInput',
  fields: {
    replace: {
      type: GraphQLBoolean,
      defaultValue: false,
      description: 'Fully replace the document contents instead of performing a shallow merge',
    },
    shouldIndex: {
      type: GraphQLBoolean,
      description: 'Inform indexers if they should index this document or not',
    },
    version: {
      type: CeramicCommitID,
      description: 'Only perform mutation if the document matches the provided version',
    },
  },
})

const SortOrder = new GraphQLEnumType({
  name: 'SortOrder',
  values: {
    ASC: { value: 'ASC' },
    DESC: { value: 'DESC' },
  },
})

function createEnumValueFilterInput(type: GraphQLEnumType): GraphQLInputObjectType {
  return new GraphQLInputObjectType({
    name: `${type.name}ValueFilterInput`,
    fields: {
      isNull: { type: GraphQLBoolean },
      equalTo: { type },
      notEqualTo: { type },
      in: { type: new GraphQLList(new GraphQLNonNull(type)) },
      notIn: { type: new GraphQLList(new GraphQLNonNull(type)) },
    },
  })
}

function createScalarValueFilterInput(type: GraphQLScalarType): GraphQLInputObjectType {
  return new GraphQLInputObjectType({
    name: `${type.name}ValueFilterInput`,
    fields: {
      isNull: { type: GraphQLBoolean },
      equalTo: { type },
      notEqualTo: { type },
      in: { type: new GraphQLList(new GraphQLNonNull(type)) },
      notIn: { type: new GraphQLList(new GraphQLNonNull(type)) },
      lessThan: { type },
      lessThanOrEqualTo: { type },
      greaterThan: { type },
      greaterThanOrEqualTo: { type },
    },
  })
}

const valueFilterInputs = {
  BooleanValueFilter: new GraphQLInputObjectType({
    name: 'BooleanValueFilterInput',
    fields: {
      isNull: { type: GraphQLBoolean },
      equalTo: { type: GraphQLBoolean },
    },
  }),
  FloatValueFilter: createScalarValueFilterInput(GraphQLFloat),
  IntValueFilter: createScalarValueFilterInput(GraphQLInt),
  StringValueFilter: createScalarValueFilterInput(GraphQLString),
} as const
const valueFilterInputsTypes: Record<string, string> = {
  boolean: 'BooleanValueFilter',
  float: 'FloatValueFilter',
  integer: 'IntValueFilter',
  string: 'StringValueFilter',
}

/**
 * GraphQL schema creation parameters.
 */
export type CreateSchemaParams = {
  /**
   * Runtime composite definition, created using the {@linkcode devtools.Composite Composite}
   * development tools.
   */
  definition: RuntimeCompositeDefinition
  /**
   * Set the schema to read-only, disabling mutations support.
   */
  readonly?: boolean
}

class SchemaBuilder {
  // Source composite
  #def: RuntimeCompositeDefinition
  // Schema options
  #isReadonly: boolean
  // Internal records
  #types: Record<string, GraphQLEnumType | GraphQLInterfaceType | GraphQLObjectType> = { SortOrder }
  #inputObjects: Record<string, GraphQLInputObjectType> = { ...valueFilterInputs }
  #mutations: Record<string, GraphQLFieldConfig<unknown, Context>> = {}
  // Internal mapping of model IDs to object names
  #modelAliases: Record<string, string>

  constructor(params: CreateSchemaParams) {
    this.#def = params.definition
    this.#isReadonly = !!params.readonly
    this.#modelAliases = Object.entries(this.#def.models).reduce(
      (aliases, [alias, model]) => {
        aliases[model.id] = alias
        return aliases
      },
      {} as Record<string, string>,
    )
  }

  build(): GraphQLSchema {
    this._buildEnums()
    const definitions = this._createSharedDefinitions()
    this._buildObjects(definitions)
    this._buildConnections()
    const schema = this._createSchema(definitions)
    assertValidSchema(schema)
    return schema
  }

  _createSharedDefinitions(): SharedDefinitions {
    const nodeDefs = nodeDefinitions(
      async (id: string, ctx: Context) => {
        return id.startsWith('did:') ? id : await ctx.loadDoc(id)
      },
      (didOrDoc: string | ModelInstanceDocument) => {
        return typeof didOrDoc === 'string'
          ? 'CeramicAccount'
          : this.#modelAliases[didOrDoc.metadata.model?.toString()]
      },
    )

    const accountObject = new GraphQLObjectType<string, Context>({
      name: 'CeramicAccount',
      interfaces: [nodeDefs.nodeInterface],
      fields: () => {
        const config: GraphQLFieldConfigMap<string, Context> = {
          id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'Globally unique identifier of the account (DID string)',
            resolve: (did) => did,
          },
          isViewer: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description:
              'Whether the Ceramic instance is currently authenticated with this account or not',
            resolve: (did, _, ctx) => ctx.isAuthenticated() && ctx.getViewerID() === did,
          },
        }
        for (const [alias, reference] of Object.entries(this.#def.accountData ?? {})) {
          const model = this.#def.models[reference.name]
          if (model == null) {
            throw new Error(`Missing model for reference name: ${reference.name}`)
          }

          switch (reference.type) {
            case 'account':
            case 'connection': {
              const filtersObj = this.#inputObjects[`${reference.name}Filters`]
              const sortingObj = this.#inputObjects[`${reference.name}Sorting`]
              const args: ObjMap<GraphQLArgumentConfig> = {
                ...connectionArgs,
              }
              if (filtersObj && sortingObj) {
                args.filters = { type: filtersObj }
                args.sorting = { type: sortingObj }
              }
              config[alias] = {
                type: this.#types[`${reference.name}Connection`],
                args,
                resolve: async (
                  account,
                  { filters, ...args }: ConnectionQueryArguments,
                  ctx,
                ): Promise<Connection<ModelInstanceDocument | null>> => {
                  const query = createAccountReferenceQuery([model.id], account, reference, filters)
                  return await ctx.loader.queryConnection({ ...query, ...args })
                },
              }
              config[`${alias}Count`] = {
                type: new GraphQLNonNull(GraphQLInt),
                args: filtersObj ? { filters: { type: filtersObj } } : {},
                resolve: async (
                  account,
                  { filters }: ConnectionFiltersArgument,
                  ctx,
                ): Promise<number> => {
                  const query = createAccountReferenceQuery([model.id], account, reference, filters)
                  return await ctx.queryCount(query)
                },
              }
              break
            }

            case 'node':
              config[alias] = {
                type: this.#types[reference.name],
                resolve: async (account, _, ctx): Promise<ModelInstanceDocument | null> => {
                  return await ctx.loader.loadSingle(account, model.id, {
                    ignoreEmpty: true,
                    onlyIndexed: true,
                  })
                },
              }
              break

            case 'set': {
              if (model.accountRelation.type !== 'set') {
                throw new Error(
                  `Invalid reference ${alias} on account: referenced model ${reference.name} must use the SET account relation`,
                )
              }

              const relationFields = model.accountRelation.fields

              // The SET reference requires a dedicated input object to specify the set fields values
              const withInput = this._buildSetInputObjectType(reference.name, relationFields)
              config[alias] = {
                type: this.#types[reference.name],
                args: {
                  with: { type: new GraphQLNonNull(withInput) },
                },
                resolve: async (
                  account,
                  args: FilterWithArgument,
                  ctx,
                ): Promise<ModelInstanceDocument | null> => {
                  const unique = relationFields.map((field) => {
                    const value = args.with[field]
                    return value ? String(value) : ''
                  })
                  return await ctx.loader.loadSet(account, model.id, unique, {
                    ignoreEmpty: true,
                    onlyIndexed: true,
                  })
                },
              }
              break
            }

            case 'account-set': {
              if (model.accountRelation.type !== 'set') {
                throw new Error(
                  `Invalid reference ${alias} on account: referenced model ${reference.name} must use the SET account relation`,
                )
              }

              const relationFields = model.accountRelation.fields
              const args: ObjMap<GraphQLArgumentConfig> = { account: accountRelationArg }
              // Check if other fields than the reference property need to be provided and create an input as needed
              const withFields = relationFields.filter((field) => field !== reference.property)
              if (withFields.length !== 0) {
                // The SET reference requires a dedicated input object to specify the set fields values
                const withInput = this._buildSetInputObjectType(
                  reference.name,
                  withFields,
                  reference.property,
                )
                args.with = { type: new GraphQLNonNull(withInput) }
              }
              config[alias] = {
                type: this.#types[reference.name],
                args,
                resolve: async (
                  account,
                  args: AccountFilterWithArgument,
                  ctx,
                ): Promise<ModelInstanceDocument | null> => {
                  const refAccount = args.account === 'viewer' ? ctx.getViewerID() : args.account
                  // If the referenced account is not set (viewer not authenticated), return null
                  if (refAccount == null) {
                    return null
                  }
                  const unique = relationFields.map((field) => {
                    if (field === reference.property) {
                      return account
                    }
                    const value = args.with[field]
                    return value ? String(value) : ''
                  })
                  return await ctx.loader.loadSet(refAccount, model.id, unique, {
                    ignoreEmpty: true,
                    onlyIndexed: true,
                  })
                },
              }

              break
            }

            default:
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore reference type
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              throw new Error(`Unsupported reference type: ${reference.type}`)
          }
        }
        return config
      },
    })

    const queryFields: GraphQLFieldConfigMap<unknown, Context> = {
      node: nodeDefs.nodeField,
      viewer: {
        type: accountObject,
        description: 'Account currently authenticated on the Ceramic instance, if set',
        resolve: (_self, _args, ctx): string | null => ctx.getViewerID(),
      },
    }

    return { ...nodeDefs, accountObject, queryFields }
  }

  _resolveInterfaces(
    node: GraphQLInterfaceType,
    modelName: string,
    ids: Array<string> = [],
  ): Array<GraphQLInterfaceType> {
    const allInterfaces = ids.flatMap((id) => {
      const name = this.#modelAliases[id]
      if (name == null) {
        // Interface is not part of the definition
        return []
      }
      const type = this.#types[name]
      if (type == null) {
        throw new Error(`Missing interface ${name} for ${modelName}`)
      }
      if (!isInterfaceType(type)) {
        throw new Error(`Invalid type for ${name} for ${modelName}, expected interface`)
      }
      return [type].concat(type.getInterfaces())
    })
    return Array.from(new Set([node, ...allInterfaces]))
  }

  _buildEnums() {
    for (const [name, values] of Object.entries(this.#def.enums)) {
      this.#types[name] = new GraphQLEnumType({
        name,
        values: values.reduce((acc, value) => {
          acc[value] = { value }
          return acc
        }, {} as GraphQLEnumValueConfigMap),
      })
    }
  }

  _buildObjects(definitions: SharedDefinitions) {
    for (const [name, fields] of Object.entries(this.#def.objects)) {
      this._buildObjectType({ definitions, name, fields })
    }
  }

  _buildObjectType(params: BuildObjectParams) {
    const model = this.#def.models[params.name]
    if (model == null) {
      this._buildEmbeddedObjectType(params)
    } else {
      const modelParams = { model, ...params }
      if (model.interface) {
        this._buildInterfaceObjectType(modelParams)
      } else {
        this._buildDocumentObjectType(modelParams)
      }
    }
  }

  _buildInterfaceObjectType({ model, definitions, name, fields }: BuildModelObjectParams) {
    this.#types[name] = new GraphQLInterfaceType({
      name,
      interfaces: () => this._resolveInterfaces(definitions.nodeInterface, name, model.implements),
      fields: () => {
        const config: GraphQLFieldConfigMap<ModelInstanceDocument, Context> = {
          id: {
            // Use GraphQLID here for Relay compliance
            type: new GraphQLNonNull(GraphQLID),
            resolve: (doc) => doc.id.toString(),
          },
        }
        for (const [key, field] of Object.entries(fields)) {
          switch (field.type) {
            case 'meta':
              // Don't show meta fields in schema
              continue
            case 'reference':
              config[key] = this._buildDocumentObjectReferenceField(key, field)
              break
            case 'list':
              config[key] = {
                type: this._buildObjectListFieldType(definitions, field),
                resolve: (doc) => doc.content?.[key] as unknown,
              }
              break
            case 'view': {
              const view = this._buildDocumentObjectViewField(key, definitions, field, fields)
              if (view) {
                config[key] = view
              }
              break
            }
            default:
              config[key] = {
                type: this._buildScalarFieldType(definitions, field),
                resolve: (doc) => doc.content?.[key] as unknown,
              }
          }
        }
        return config
      },
    })

    this._buildFiltersType(name, fields, true)
    this._buildSortingType(name, fields, true)
  }

  _buildDocumentObjectType({ model, definitions, name, fields }: BuildModelObjectParams) {
    this.#types[name] = new GraphQLObjectType<ModelInstanceDocument>({
      name,
      interfaces: () => this._resolveInterfaces(definitions.nodeInterface, name, model.implements),
      isTypeOf: (value: ModelInstanceDocument) => {
        return value.metadata.model.toString() === model.id
      },
      fields: () => {
        const config: GraphQLFieldConfigMap<ModelInstanceDocument, Context> = {
          id: {
            // Use GraphQLID here for Relay compliance
            type: new GraphQLNonNull(GraphQLID),
            resolve: (doc) => doc.id.toString(),
          },
        }
        for (const [key, field] of Object.entries(fields)) {
          switch (field.type) {
            case 'meta':
              break
            case 'reference':
              config[key] = this._buildDocumentObjectReferenceField(key, field)
              break
            case 'list':
              config[key] = {
                type: this._buildObjectListFieldType(definitions, field),
                resolve: (doc) => doc.content?.[key] as unknown,
              }
              break
            case 'view': {
              const view = this._buildDocumentObjectViewField(key, definitions, field, fields)
              if (view) {
                config[key] = view
              }
              break
            }
            default:
              config[key] = {
                type: this._buildScalarFieldType(definitions, field),
                resolve: (doc) => doc.content?.[key] as unknown,
              }
          }
        }
        return config
      },
    })

    this._buildFiltersType(name, fields)
    this._buildSortingType(name, fields)

    if (!this.#isReadonly) {
      this._buildInputObjectType(name, fields)
      this._buildNodeMutations(definitions.queryFields, name, model)
    }
  }

  _buildEmbeddedObjectType({ definitions, name, fields }: BuildObjectParams) {
    this.#types[name] = new GraphQLObjectType<EmbeddedObject>({
      name,
      fields: () => {
        const config: GraphQLFieldConfigMap<EmbeddedObject, Context> = {}
        for (const [key, field] of Object.entries(fields)) {
          switch (field.type) {
            case 'meta':
              // Don't show meta fields in schema
              continue
            case 'reference':
              config[key] = this._buildEmbeddedObjectReferenceField(key, field)
              break
            case 'list':
              config[key] = {
                type: this._buildObjectListFieldType(definitions, field),
                resolve: (obj) => obj[key],
              }
              break
            case 'view':
              throw new Error(`Unsupported view field ${key} on embedded object ${name}`)
            default:
              config[key] = {
                type: this._buildScalarFieldType(definitions, field),
                resolve: (obj) => obj[key],
              }
          }
        }
        return config
      },
    })

    if (!this.#isReadonly) {
      this._buildInputObjectType(name, fields)
    }
  }

  _buildConnections() {
    for (const objectName of Object.keys(this.#def.models)) {
      const nodeType = this.#types[objectName]
      if (nodeType == null) {
        throw new Error(`Missing object type for connection: ${objectName}`)
      }
      const { connectionType, edgeType } = connectionDefinitions({ nodeType })
      this.#types[`${objectName}Connection`] = connectionType
      this.#types[`${objectName}Edge`] = edgeType
    }
  }

  _buildDocumentObjectReferenceField(
    key: string,
    field: RuntimeReference,
  ): GraphQLFieldConfig<ModelInstanceDocument, Context> {
    const name = field.refType === 'connection' ? field.refName + 'Connection' : field.refName
    const ref = this.#types[name]
    if (ref == null) {
      throw new Error(`Missing type: ${name}`)
    }
    const type = field.required ? new GraphQLNonNull(ref) : ref

    switch (field.refType) {
      case 'connection':
        return {
          type,
          args: connectionArgs,
          resolve: (
            _doc,
            _args: ConnectionArguments,
            _ctx,
          ): Promise<Connection<unknown> | null> => {
            throw new Error('Not implemented')
          },
        }
      case 'node':
        return {
          type,
          args: connectionArgs,
          resolve: async (doc, _, ctx): Promise<ModelInstanceDocument | null> => {
            const id = doc.content?.[key] as string | undefined
            return id ? await ctx.loadDoc(id) : null
          },
        }
      case 'enum':
      case 'object':
        return { type, resolve: (doc) => doc.content?.[key] as unknown }
      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Unsupported reference type on document object: ${field.refType}`)
    }
  }

  _buildEmbeddedObjectReferenceField(
    key: string,
    field: RuntimeReference,
  ): GraphQLFieldConfig<EmbeddedObject, Context> {
    const ref = this.#types[field.refName]
    if (ref == null) {
      throw new Error(`Missing type: ${field.refName}`)
    }
    const type = field.required ? new GraphQLNonNull(ref) : ref

    switch (field.refType) {
      case 'enum':
      case 'object':
        return { type, resolve: (obj) => obj[key] }
      default:
        throw new Error(`Unsupported reference type on embedded object: ${field.refType}`)
    }
  }

  _buildObjectListFieldType(
    definitions: SharedDefinitions,
    field: RuntimeList,
  ): GraphQLList<GraphQLOutputType> | GraphQLNonNull<GraphQLList<GraphQLOutputType>> {
    let itemType
    if (field.item.type === 'reference') {
      itemType = this.#types[field.item.refName]
      if (itemType == null) {
        throw new Error(`Missing referenced object type: ${field.item.refName}`)
      }
    } else if (field.item.type === 'did') {
      itemType = definitions.accountObject
    } else {
      itemType = getScalar(field.item.type)
    }

    if (field.item.required) {
      itemType = new GraphQLNonNull(itemType)
    }

    const type = new GraphQLList(itemType)
    return field.required ? new GraphQLNonNull(type) : type
  }

  _buildDocumentObjectRelation(
    key: string,
    definitions: SharedDefinitions,
    relation: RuntimeRelation,
    objectFields: RuntimeObjectFields,
  ): GraphQLFieldConfig<ModelInstanceDocument, Context> {
    if (relation.source === 'document') {
      const ref = objectFields[relation.property]
      if (ref == null) {
        throw new Error(
          `Missing reference field ${relation.property} for relation defined on field ${key}`,
        )
      }

      const type = relation.model
        ? this.#types[this.#modelAliases[relation.model]]
        : definitions.nodeInterface
      if (type == null) {
        throw new Error(`Model not found for relation with ID ${relation.model} on field ${key}`)
      }

      return {
        type,
        resolve: async (doc, _args, ctx): Promise<ModelInstanceDocument | null> => {
          const id = doc.content?.[relation.property] as string | void
          if (id == null) {
            return null
          }
          const loaded = await ctx.loadDoc(id)
          if (loaded == null) {
            return null
          }
          if (relation.model != null) {
            const loadedModel = loaded.metadata.model.toString()
            if (isInterfaceType(type)) {
              const model = this.#def.models[this.#modelAliases[loadedModel]]
              if (model == null || !model.implements.includes(relation.model)) {
                console.warn(
                  `Ignoring unsupported model ${loadedModel} for document ${id}, expected model implementing the ${relation.model} interface`,
                )
                return null
              }
            } else if (loadedModel !== relation.model) {
              console.warn(
                `Ignoring unexpected model ${loadedModel} for document ${id}, expected model ${relation.model}`,
              )
              return null
            }
          }
          return loaded
        },
      }
    }

    const relationModel = relation.model
    if (relationModel == null) {
      throw new Error(`Missing model for relation on field ${key}`)
    }

    const modelAlias = this.#modelAliases[relationModel]
    if (modelAlias == null) {
      throw new Error(`Model alias not found for relation with ID ${relationModel} on field ${key}`)
    }

    switch (relation.source) {
      case 'queryConnection': {
        const qcFiltersObj = this.#inputObjects[`${modelAlias}Filters`]
        const qcSortingObj = this.#inputObjects[`${modelAlias}Sorting`]
        const args: ObjMap<GraphQLArgumentConfig> = {
          ...connectionArgsWithAccount,
        }
        if (qcFiltersObj && qcSortingObj) {
          args.filters = { type: qcFiltersObj }
          args.sorting = { type: qcSortingObj }
        }
        return {
          type: new GraphQLNonNull(this.#types[`${modelAlias}Connection`]),
          args,
          resolve: async (
            doc,
            args: ConnectionRelationSortingArguments,
            ctx,
          ): Promise<Connection<unknown> | null> => {
            let account: string | undefined
            if (args.account != null) {
              const refAccount = getReferencedAccount(args.account, doc, ctx)
              // If the referenced account is not set (viewer not authenticated), return null
              if (refAccount == null) {
                return null
              }
              account = refAccount
            }
            const queryFilters = createRelationQueryFilters(
              relation.property,
              doc.id.toString(),
              args.filters,
            )
            return await ctx.loader.queryConnection({
              ...args,
              account,
              models: [relationModel],
              queryFilters,
            })
          },
        }
      }
      case 'queryCount': {
        const filtersObj = this.#inputObjects[`${modelAlias}Filters`]
        const args: ObjMap<GraphQLArgumentConfig> = {
          account: {
            type: GraphQLID,
            description: 'Counts only documents created by the provided account',
          },
        }
        if (filtersObj) {
          args.filters = { type: filtersObj }
        }
        return {
          type: new GraphQLNonNull(GraphQLInt),
          args,
          resolve: async (doc, args: ConnectionRelationArguments, ctx): Promise<number> => {
            let account: string | undefined
            if (args.account != null) {
              const refAccount = getReferencedAccount(args.account, doc, ctx)
              // If the referenced account is not set (viewer not authenticated), return 0
              if (refAccount == null) {
                return 0
              }
              account = refAccount
            }
            const queryFilters = createRelationQueryFilters(
              relation.property,
              doc.id.toString(),
              args.filters,
            )
            return await ctx.queryCount({ account, models: [relationModel], queryFilters })
          },
        }
      }
      case 'set': {
        const model = this.#def.models[modelAlias]
        if (model.accountRelation.type !== 'set') {
          throw new Error(
            `Invalid relation on field ${key}: referenced model ${modelAlias} must use the "set" account relation`,
          )
        }

        const relationFields = model.accountRelation.fields
        const args: ObjMap<GraphQLArgumentConfig> = { account: accountRelationArg }
        // Check if other fields than the relation property need to be provided and create an input as needed
        const withFields = relationFields.filter((field) => field !== relation.property)
        if (withFields.length !== 0) {
          const withInput = this._buildSetInputObjectType(modelAlias, withFields, relation.property)
          args.with = { type: new GraphQLNonNull(withInput) }
        }
        return {
          type: this.#types[modelAlias],
          args,
          resolve: async (
            doc,
            args: AccountFilterWithArgument,
            ctx,
          ): Promise<ModelInstanceDocument | null> => {
            const account = getReferencedAccount(args.account, doc, ctx)
            // If the referenced account is not set (viewer not authenticated), return null
            if (account == null) {
              return null
            }
            const unique = relationFields.map((field) => {
              if (field === relation.property) {
                return doc.id.toString()
              }
              const value = args.with[field]
              return value ? String(value) : ''
            })
            return await ctx.loader.loadSet(account, model.id, unique, {
              ignoreEmpty: true,
              onlyIndexed: true,
            })
          },
        }
      }
      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Unsupported relation source: ${relation.source}`)
    }
  }

  _buildDocumentObjectViewField(
    key: string,
    definitions: SharedDefinitions,
    field: RuntimeViewField,
    objectFields: RuntimeObjectFields,
  ): GraphQLFieldConfig<ModelInstanceDocument, Context> {
    switch (field.viewType) {
      case 'documentAccount':
        return {
          type: new GraphQLNonNull(definitions.accountObject),
          description: 'Account controlling the document',
          resolve: (doc): string => doc.metadata.controller,
        }
      case 'documentVersion':
        return {
          type: new GraphQLNonNull(CeramicCommitID),
          description: 'Current version of the document',
          resolve: (doc): string => doc.commitId.toString(),
        }
      case 'relation':
        return this._buildDocumentObjectRelation(key, definitions, field.relation, objectFields)
      default:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Unsupported view type: ${field.viewType}`)
    }
  }

  _buildScalarFieldType(definitions: SharedDefinitions, field: RuntimeScalar): GraphQLOutputType {
    const type = field.type === 'did' ? definitions.accountObject : getScalar(field.type)
    return field.required ? new GraphQLNonNull(type) : type
  }

  _buildFiltersType(objectName: string, fields: RuntimeObjectFields, isInterface = false) {
    const objectInputName = `${objectName}ObjectFilter`
    const inputName = `${objectName}Filters`

    const config: GraphQLInputFieldConfigMap = {}
    for (const [key, field] of Object.entries(fields)) {
      let type: GraphQLInputObjectType | undefined
      if (field.type === 'reference' && ((field as RuntimeReference).indexed || isInterface)) {
        if (field.refType === 'enum') {
          const enumType = this.#types[field.refName] as GraphQLEnumType
          type = createEnumValueFilterInput(enumType)
          this.#inputObjects[type.name] = type
        } else if (field.refType === 'node') {
          type = this.#inputObjects.StringValueFilter
        }
      } else if (isScalarField(field) && ((field as RuntimeScalarCommon).indexed || isInterface)) {
        type = this.#inputObjects[valueFilterInputsTypes[field.type] ?? 'StringValueFilter']
      }
      if (type != null) {
        config[key] = { type }
      }
    }

    if (Object.keys(config).length > 0) {
      this.#inputObjects[objectInputName] = new GraphQLInputObjectType({
        name: `${objectInputName}Input`,
        fields: () => config,
      })

      this.#inputObjects[inputName] = new GraphQLInputObjectType({
        name: `${inputName}Input`,
        fields: () => ({
          where: { type: this.#inputObjects[objectInputName] },
          and: { type: new GraphQLList(new GraphQLNonNull(this.#inputObjects[inputName])) },
          or: { type: new GraphQLList(new GraphQLNonNull(this.#inputObjects[inputName])) },
          not: { type: this.#inputObjects[inputName] },
        }),
      })
    }
  }

  _buildSortingType(objectName: string, fields: RuntimeObjectFields, isInterface = false) {
    const name = `${objectName}Sorting`
    const config: GraphQLInputFieldConfigMap = {}
    for (const [key, field] of Object.entries(fields)) {
      if (
        (isStringReferenceField(field) || isScalarField(field)) &&
        ((field as RuntimeScalarCommon).indexed || isInterface)
      ) {
        config[key] = { type: SortOrder }
      }
    }
    if (Object.keys(config).length > 0) {
      this.#inputObjects[name] = new GraphQLInputObjectType({
        name: `${name}Input`,
        fields: () => config,
      })
    }
  }

  _buildInputObjectType(name: string, fields: RuntimeObjectFields) {
    const isDocument = this.#def.models[name] != null

    const buildFields = (required: boolean): GraphQLInputFieldConfigMap => {
      const config: GraphQLInputFieldConfigMap = {}
      const inputPrefix = isDocument || required ? '' : 'Partial'

      for (const [key, field] of Object.entries(fields)) {
        if (!required && (field as RuntimeScalarCommon).immutable) {
          // Skip immutable fields from partial inputs
          continue
        }

        let type
        switch (field.type) {
          case 'meta':
          case 'view':
            // Meta and views can't be set in inputs
            continue
          case 'reference':
            switch (field.refType) {
              case 'connection':
                // Ignore connections from inputs, should be derived
                continue
              case 'enum':
                type = this.#types[field.refName] as GraphQLEnumType
                break
              case 'node':
                type = GraphQLID
                break
              case 'object': {
                type = this.#inputObjects[inputPrefix + field.refName]
                if (type == null) {
                  throw new Error(`Missing referenced input type: ${inputPrefix + field.refName}`)
                }
                break
              }
            }
            break
          case 'list': {
            let itemType
            if (field.item.type === 'reference') {
              itemType = this.#inputObjects[inputPrefix + field.item.refName]
              if (itemType == null) {
                throw new Error(
                  `Missing referenced input type: ${inputPrefix + field.item.refName}`,
                )
              }
            } else {
              itemType = getScalar(field.item.type)
            }
            type = new GraphQLList(itemType)
            break
          }
          default:
            type = getScalar(field.type)
        }
        if (type != null) {
          config[key] = { type: required && field.required ? new GraphQLNonNull(type) : type }
        }
      }

      return config
    }

    this.#inputObjects[name] = new GraphQLInputObjectType({
      name: `${name}Input`,
      fields: () => buildFields(true),
    })
    if (isDocument) {
      // GraphQL doesn't allow empty input objects so we need to check if there is any mutable field
      let hasMutableField = false
      for (const field of Object.values(fields)) {
        if (
          !(field as RuntimeScalarCommon).immutable &&
          field.type !== 'meta' &&
          field.type !== 'view' &&
          !(field.type === 'reference' && field.refType === 'connection')
        ) {
          hasMutableField = true
          break
        }
      }
      if (hasMutableField) {
        this.#inputObjects[`Partial${name}`] = new GraphQLInputObjectType({
          name: `Partial${name}Input`,
          fields: () => buildFields(false),
        })
      }
    }
  }

  _buildSetInputObjectType(
    name: string,
    withFields: Array<string>,
    relationField?: string,
  ): GraphQLInputObjectType {
    const objectFields = this.#def.objects[name]
    if (objectFields == null) {
      throw new Error(`Object fields not found for model ${name}`)
    }

    const relationFieldName = relationField
      ? relationField[0].toUpperCase() + relationField.slice(1)
      : ''
    const inputName = `With${relationFieldName}${name}Input`

    if (this.#inputObjects[inputName] == null) {
      this.#inputObjects[inputName] = new GraphQLInputObjectType({
        name: inputName,
        fields: () => {
          const fields: GraphQLInputFieldConfigMap = {}
          for (const fieldName of withFields) {
            const field = objectFields[fieldName]
            if (field == null) {
              throw new Error(`Field ${fieldName} not found on model ${name}`)
            }

            let type
            switch (field.type) {
              case 'list':
              case 'meta':
              case 'view':
                throw new Error(
                  `Invalid account relation field ${fieldName} on model ${name}: unsupported type ${field.type}`,
                )
              case 'reference':
                switch (field.refType) {
                  case 'connection':
                    throw new Error(
                      `Invalid account relation field ${fieldName} on model ${name}: unsupported connection reference`,
                    )
                  case 'enum':
                    type = this.#types[field.refName] as GraphQLEnumType
                    break
                  case 'node':
                    type = GraphQLID
                    break
                  case 'object': {
                    throw new Error(
                      `Invalid account relation field ${fieldName} on model ${name}: unsupported object reference`,
                    )
                  }
                }
                break
              default:
                type = getScalar(field.type)
            }

            if (type == null) {
              throw new Error(
                `Invalid account relation field ${fieldName} on model ${name}: type not found`,
              )
            }
            fields[fieldName] = { type: new GraphQLNonNull(type) }
          }

          return fields
        },
      })
    }

    return this.#inputObjects[inputName]
  }

  _buildNodeMutations(
    queryFields: GraphQLFieldConfigMap<unknown, Context>,
    name: string,
    model: RuntimeModel,
  ) {
    switch (model.accountRelation.type) {
      case 'list':
        this.#mutations[`create${name}`] = mutationWithClientMutationId({
          name: `Create${name}`,
          inputFields: () => ({
            content: { type: new GraphQLNonNull(this.#inputObjects[name]) },
            options: { type: CreateOptionsInput },
          }),
          outputFields: () => ({
            ...queryFields,
            document: { type: new GraphQLNonNull(this.#types[name]) },
          }),
          mutateAndGetPayload: async (
            input: { content: Record<string, unknown>; options?: { shouldIndex: boolean } },
            ctx: Context,
          ) => {
            if (ctx.ceramic.did == null || !ctx.ceramic.did.authenticated) {
              throw new Error('Ceramic instance is not authenticated')
            }
            const document = await ctx.loader.create(model.id, input.content, {
              shouldIndex: input.options?.shouldIndex,
            })
            return { document }
          },
        })
        break

      case 'set': {
        const relationFields = model.accountRelation.fields

        this.#mutations[`set${name}`] = mutationWithClientMutationId({
          name: `Set${name}`,
          inputFields: () => ({
            content: { type: new GraphQLNonNull(this.#inputObjects[name]) },
            options: { type: SetOptionsInput },
          }),
          outputFields: () => ({
            ...queryFields,
            document: { type: new GraphQLNonNull(this.#types[name]) },
          }),
          mutateAndGetPayload: async (
            input: { content: Record<string, unknown>; options?: SetOptions },
            ctx: Context,
          ) => {
            if (ctx.ceramic.did == null || !ctx.ceramic.did.authenticated) {
              throw new Error('Ceramic instance is not authenticated')
            }
            const unique = relationFields.map((field) => String(input.content[field]))
            const document = await ctx.upsertSet(model.id, unique, input.content, {
              shouldIndex: input.options?.shouldIndex,
              syncTimeoutSeconds: input.options?.syncTimeout,
            })
            return { document }
          },
        })
        break
      }

      case 'single':
        this.#mutations[`set${name}`] = mutationWithClientMutationId({
          name: `Set${name}`,
          inputFields: () => ({
            content: { type: new GraphQLNonNull(this.#inputObjects[name]) },
            options: { type: SetOptionsInput },
          }),
          outputFields: () => ({
            ...queryFields,
            document: { type: new GraphQLNonNull(this.#types[name]) },
          }),
          mutateAndGetPayload: async (
            input: { content: Record<string, unknown>; options?: SetOptions },
            ctx: Context,
          ) => {
            if (ctx.ceramic.did == null || !ctx.ceramic.did.authenticated) {
              throw new Error('Ceramic instance is not authenticated')
            }
            const document = await ctx.upsertSingle(model.id, input.content, {
              shouldIndex: input.options?.shouldIndex,
              syncTimeoutSeconds: input.options?.syncTimeout,
            })
            return { document }
          },
        })
        // Legacy "create" mutation for SINGLE account relation, to be removed in a future version
        this.#mutations[`create${name}`] = mutationWithClientMutationId({
          name: `Create${name}`,
          deprecationReason: `Replaced by the set${name} mutation, create${name} will be removed in a future version of ComposeDB.`,
          inputFields: () => ({
            content: { type: new GraphQLNonNull(this.#inputObjects[name]) },
            options: { type: SetOptionsInput },
          }),
          outputFields: () => ({
            ...queryFields,
            document: { type: new GraphQLNonNull(this.#types[name]) },
          }),
          mutateAndGetPayload: async (
            input: { content: Record<string, unknown>; options?: SetOptions },
            ctx: Context,
          ) => {
            if (ctx.ceramic.did == null || !ctx.ceramic.did.authenticated) {
              throw new Error('Ceramic instance is not authenticated')
            }
            const document = await ctx.upsertSingle(model.id, input.content, {
              shouldIndex: input.options?.shouldIndex,
              syncTimeoutSeconds: input.options?.syncTimeout,
            })
            return { document }
          },
        })
        break

      default:
        throw new Error(
          `Unsupported account relation type to create mutations: ${model.accountRelation.type}`,
        )
    }

    this.#mutations[`update${name}`] = mutationWithClientMutationId({
      name: `Update${name}`,
      inputFields: () => {
        const inputFields: GraphQLInputFieldConfigMap = {
          id: { type: new GraphQLNonNull(GraphQLID) },
          options: { type: UpdateOptionsInput },
        }
        // It's possible content can't be updated if all fields are immutable
        const partialContentInput = this.#inputObjects[`Partial${name}`]
        if (partialContentInput != null) {
          inputFields.content = { type: new GraphQLNonNull(partialContentInput) }
        }
        return inputFields
      },
      outputFields: () => ({
        ...queryFields,
        document: { type: new GraphQLNonNull(this.#types[name]) },
      }),
      mutateAndGetPayload: async (
        input: { id: string; content: Record<string, unknown>; options?: UpdateDocOptions },
        ctx: Context,
      ) => {
        if (ctx.ceramic.did == null || !ctx.ceramic.did.authenticated) {
          throw new Error('Ceramic instance is not authenticated')
        }
        return { document: await ctx.loader.update(input.id, input.content, input.options) }
      },
    })

    this.#mutations[`enableIndexing${name}`] = mutationWithClientMutationId({
      name: `EnableIndexing${name}`,
      inputFields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        shouldIndex: { type: new GraphQLNonNull(GraphQLBoolean) },
      }),
      outputFields: () => ({
        ...queryFields,
        document: { type: this.#types[name] },
      }),
      mutateAndGetPayload: async (input: { id: string; shouldIndex: boolean }, ctx: Context) => {
        if (ctx.ceramic.did == null || !ctx.ceramic.did.authenticated) {
          throw new Error('Ceramic instance is not authenticated')
        }
        return { document: await ctx.enableDocIndexing(input.id, input.shouldIndex) }
      },
    })
  }

  _createSchema(definitions: SharedDefinitions) {
    const queryFields: GraphQLFieldConfigMap<unknown, Context> = {
      nodes: definitions.nodesField,
      ...definitions.queryFields,
    }

    for (const [alias, model] of Object.entries(this.#def.models)) {
      const first = alias[0].toLowerCase()
      const rest = alias.slice(1)

      const filtersObj = this.#inputObjects[`${alias}Filters`]
      const sortingObj = this.#inputObjects[`${alias}Sorting`]
      const args: ObjMap<GraphQLArgumentConfig> = {
        ...connectionArgs,
      }
      if (filtersObj && sortingObj) {
        args.filters = { type: filtersObj }
        args.sorting = { type: sortingObj }
      }
      queryFields[`${first}${rest}Index`] = {
        type: this.#types[`${alias}Connection`],
        args: args,
        resolve: async (
          _,
          { filters, ...args }: ConnectionQueryArguments,
          ctx,
        ): Promise<Connection<unknown> | null> => {
          if (filters != null) {
            assertValidQueryFilters(filters)
          }
          return await ctx.loader.queryConnection({
            ...args,
            queryFilters: filters,
            models: [model.id],
          })
        },
      }
      queryFields[`${first}${rest}Count`] = {
        type: new GraphQLNonNull(GraphQLInt),
        args: filtersObj ? { filters: { type: filtersObj } } : {},
        resolve: async (_, { filters }: ConnectionFiltersArgument, ctx): Promise<number> => {
          if (filters != null) {
            assertValidQueryFilters(filters)
          }
          return await ctx.queryCount({ queryFilters: filters, models: [model.id] })
        },
      }
    }

    const schemaFields: Record<string, GraphQLObjectType> = {
      query: new GraphQLObjectType({ name: 'Query', fields: queryFields }),
    }
    if (!this.#isReadonly && Object.keys(this.#mutations).length !== 0) {
      schemaFields.mutation = new GraphQLObjectType({ name: 'Mutation', fields: this.#mutations })
    }

    return new GraphQLSchema(schemaFields)
  }
}

/**
 * Create a GraphQL schema from a runtime composite definition
 */
export function createGraphQLSchema(params: CreateSchemaParams): GraphQLSchema {
  return new SchemaBuilder(params).build()
}
