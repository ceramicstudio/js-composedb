/**
 * Common types used by ComposeDB packages.
 *
 * @module types
 */

import type {
  ModelAccountRelation,
  ModelDefinition,
  ModelViewsDefinition,
} from '@ceramicnetwork/stream-model'
import type { DagJWSResult, JWSSignature } from 'dids'

export type { Model, ModelDefinition } from '@ceramicnetwork/stream-model'
export type { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
export type { JSONSchema } from 'json-schema-typed/draft-2020-12'

/** JSON-encoded DAG-JWS. */
export type EncodedDagJWS = {
  payload: string
  signatures: Array<JWSSignature>
  link?: string
}

/** JSON-encoded DAG-JWS result representing a Ceramic stream commit. */
export type EncodedDagJWSResult = {
  jws: EncodedDagJWS
  linkedBlock: string // base64
}

/** Ceramic stream commits for a given stream. */
export type StreamCommits = Array<DagJWSResult>

/** JSON-encoded Ceramic stream commits for a given stream. */
export type EncodedStreamCommits = Array<EncodedDagJWSResult>

/** Composite-level views definition. */
export type CompositeViewsDefinition = {
  // TODO: Account-based views
  account?: Record<string, unknown>
  // TODO: Query-level views
  root?: Record<string, unknown>
  models?: Record<string, ModelViewsDefinition>
}

/**
 * Composite definition type factory, used both for encoded and internal composites definitions.
 */
export type CompositeDefinitionType<T> = {
  /**
   * Version of the composite format.
   */
  version: string
  /**
   * Models defined in the composite, keyed by stream ID.
   */
  models: Record<string, T>
  /**
   * Optional mapping of model stream ID to alias name.
   */
  aliases?: Record<string, string>
  /**
   * Optional composite-level views.
   */
  views?: CompositeViewsDefinition
  /**
   * Optional common embeds (enums and objects) shared by models in the composite.
   */
  commonEmbeds?: Array<string>
}

/**
 * Composite definition used internally by the {@linkcode devtools.Composite Composite}
 * development tools.
 */
export type InternalCompositeDefinition = CompositeDefinitionType<ModelDefinition>

/** JSON-encoded composite definition. */
export type EncodedCompositeDefinition = CompositeDefinitionType<EncodedStreamCommits>

/** Common runtime scalar properties. */
export type RuntimeScalarCommon = {
  required: boolean
}
/** Runtime scalar representation for a boolean. */
export type RuntimeBooleanScalar = RuntimeScalarCommon & {
  type: 'boolean'
}
/** Runtime scalar representation for an integer. */
export type RuntimeIntegerScalar = RuntimeScalarCommon & {
  type: 'integer'
}
/** Runtime scalar representation for a float. */
export type RuntimeFloatScalar = RuntimeScalarCommon & {
  type: 'float'
}
/** Runtime scalar representation for a string. */
export type RuntimeStringScalar = RuntimeScalarCommon & {
  type: 'string'
  maxLength?: number
}

/** Ceramic-specific runtime scalar types. */
export type CustomRuntimeScalarType =
  | 'commitid'
  | 'countrycode'
  | 'date'
  | 'datetime'
  | 'did'
  | 'id'
  | 'streamid'
  | 'time'

type RuntimeStringScalarType<Type extends CustomRuntimeScalarType> = RuntimeScalarCommon & {
  type: Type
  maxLength?: number
}

/** Runtime scalar representations. */
export type RuntimeScalar =
  | RuntimeBooleanScalar
  | RuntimeIntegerScalar
  | RuntimeFloatScalar
  | RuntimeStringScalar
  | RuntimeStringScalarType<CustomRuntimeScalarType>

/** Runtime scalar types. */
export type RuntimeScalarType = RuntimeScalar['type']

/** Runtime references types. */
export type RuntimeReferenceType =
  | 'connection' // to many documents relation
  | 'enum' // string enum
  | 'node' // to single document relation
  | 'object' // embedded object in document
// | 'union' // embedded object union -- not supported yet

/** Runtime reference representation. */
export type RuntimeReference<T extends RuntimeReferenceType = RuntimeReferenceType> =
  RuntimeScalarCommon & {
    type: 'reference'
    refType: T
    refName: string
  }

/** Runtime list representation. */
export type RuntimeList = RuntimeScalarCommon & {
  type: 'list'
  item: RuntimeScalar | RuntimeReference<'enum' | 'object'>
}

/** Runtime meta types. */
export type RuntimeMetaType = 'objectType'
/** Runtime meta field representation. */
export type RuntimeMetaField = { type: 'meta'; metaType: RuntimeMetaType }

/** Runtime relation source. */
export type RuntimeRelationSource = 'document' | 'queryConnection' | 'queryCount'
/** Runtime relation field representation. */
export type RuntimeRelation = {
  source: RuntimeRelationSource
  model: string
  property: string
}
/** Runtime view types. */
export type RuntimeViewType = 'documentAccount' | 'documentVersion'
/** Runtime view field representation. */
export type RuntimeViewField =
  | { type: 'view'; viewType: 'relation'; relation: RuntimeRelation }
  | { type: 'view'; viewType: RuntimeViewType }

/**Runtime object fields representations. */
export type RuntimeObjectField =
  | RuntimeScalar
  | RuntimeList
  | RuntimeReference
  | RuntimeMetaField
  | RuntimeViewField
/** Runtime object property name to field representation mapping. */
export type RuntimeObjectFields = Record<string, RuntimeObjectField>

/** Runtime views types. */
export type RuntimeViewReferenceType = 'connection' | 'node'
/** Runtime view reference representation. */
export type RuntimeViewReference = { type: RuntimeViewReferenceType; name: string }

/** Runtime model information. */
export type RuntimeModel = { id: string; accountRelation: ModelAccountRelation }

/**
 * Runtime composite definition, used by the {@linkcode client.ComposeClient ComposeClient class} to
 * create a GraphQL schema to interact with.
 */
export type RuntimeCompositeDefinition = {
  /**
   * Models names to stream IDs mapping.
   */
  models: Record<string, RuntimeModel>
  /**
   * Objects structures, keyed by name.
   */
  objects: Record<string, RuntimeObjectFields>
  /**
   * String enums, keyed by name.
   */
  enums: Record<string, Array<string>>
  /**
   * Account-based relations.
   */
  accountData: Record<string, RuntimeViewReference>
  /**
   * Optional query-level entry-points.
   */
  query?: Record<string, RuntimeViewReference>
}
