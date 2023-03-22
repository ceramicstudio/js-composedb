import Ajv from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import * as io from 'io-ts'
import type { JSONSchema } from 'json-schema-typed/draft-2020-12'
import { equals } from 'uint8arrays'

const ajv = new Ajv({
  strict: true,
  allErrors: true,
  allowMatchingProperties: false,
  ownProperties: false,
  unevaluated: false,
})
addFormats(ajv)

function identity<T>(input: T): T {
  return input
}

/**
 * Meta model (constant model ID used in models metadata) codec
 */
export const META_MODEL_ID = 'kh4q0ozorrgaq2mezktnrmdwleo1d' as const
export const META_MODEL_BYTES = new Uint8Array([
  206, 1, 4, 1, 113, 113, 11, 0, 9, 104, 109, 111, 100, 101, 108, 45, 118, 49,
])

export function isMetaModelBytes(input: unknown): input is Uint8Array {
  return input instanceof Uint8Array && equals(input, META_MODEL_BYTES)
}

export const MetaModelCodec = new io.Type<Uint8Array, string>(
  'MetaModel',
  isMetaModelBytes,
  (input, context) => {
    if (input === META_MODEL_ID) {
      return io.success(META_MODEL_BYTES)
    }
    if (isMetaModelBytes(input)) {
      return io.success(input)
    }
    return io.failure(input, context, 'Invalid meta model ID')
  },
  () => META_MODEL_ID
)

/**
 * Represents the relationship between an instance of this model and the controller account.
 * 'list' means there can be many instances of this model for a single account. 'single' means
 * there can be only one instance of this model per account (if a new instance is created it
 * overrides the old one).
 */
export const AccountRelationCodec = io.union(
  [io.strict({ type: io.literal('list') }), io.strict({ type: io.literal('single') })],
  'ModelAccountRelation'
)
export type AccountRelation = io.TypeOf<typeof AccountRelationCodec>

/**
 * Identifies types of properties that are supported as relations by the indexing service.
 *
 * Currently supported types of relation properties:
 * - 'account': references a DID property
 * - 'document': references a StreamID property with associated 'model' the related document must use
 *
 */
export const RelationDefinitionCodec = io.union(
  [
    io.strict({ type: io.literal('account') }),
    io.strict({ type: io.literal('document'), model: io.string }),
  ],
  'ModelRelationDefinition'
)
export type RelationDefinition = io.TypeOf<typeof RelationDefinitionCodec>

/**
 * A mapping between model's property names and types of relation properties
 *
 * It indicates which properties of a model are relation properties and of what type
 */
export const RelationsDefinitionCodec = io.record(
  io.string,
  RelationDefinitionCodec,
  'ModelRelationsDefinition'
)
export type RelationsDefinition = io.TypeOf<typeof RelationsDefinitionCodec>

/**
 * Identifies types of properties that are supported as view properties at DApps' runtime
 *
 * A view-property is one that is not stored in related MIDs' content, but is derived from their other properties
 *
 * Currently supported types of view properties:
 * - 'documentAccount': view properties of this type have the MID's controller DID as values
 * - 'documentVersion': view properties of this type have the MID's commit ID as values
 * - 'relationDocument': view properties of this type represent document relations identified by the given 'property' field
 * - 'relationFrom': view properties of this type represent inverse relations identified by the given 'model' and 'property' fields
 * - 'relationCountFrom': view properties of this type represent the number of inverse relations identified by the given 'model' and 'property' fields
 *
 */
export const DocumentMetadataViewDefinitionCodec = io.union(
  [
    io.strict({ type: io.literal('documentAccount') }),
    io.strict({ type: io.literal('documentVersion') }),
  ],
  'ModelDocumentMetadataViewDefinition'
)
export type DocumentMetadataViewDefinition = io.TypeOf<typeof DocumentMetadataViewDefinitionCodec>

export const RelationViewDefinitionCodec = io.union(
  [
    io.strict({ type: io.literal('relationDocument'), model: io.string, property: io.string }),
    io.strict({ type: io.literal('relationFrom'), model: io.string, property: io.string }),
    io.strict({ type: io.literal('relationCountFrom'), model: io.string, property: io.string }),
  ],
  'ModelRelationViewDefinition'
)
export type RelationViewDefinition = io.TypeOf<typeof RelationViewDefinitionCodec>

export const ViewDefinitionCodec = io.union(
  [DocumentMetadataViewDefinitionCodec, RelationViewDefinitionCodec],
  'ModelViewDefinition'
)
export type ViewDefinition = io.TypeOf<typeof ViewDefinitionCodec>

/**
 * A mapping between model's property names and types of view properties
 *
 * It indicates which properties of a model are view properties and of what type
 */
export const ViewsDefinitionCodec = io.record(
  io.string,
  ViewDefinitionCodec,
  'ModelViewsDefinition'
)
export type ViewsDefinition = io.TypeOf<typeof ViewsDefinitionCodec>

function isSchemaObject(input: unknown): input is JSONSchema.Object {
  return (
    typeof input === 'object' && input != null && (input as JSONSchema.Object).type === 'object'
  )
}

/**
 * Model version validation
 */
const MODEL_VERSION_REGEXP = /^[0-9]+\.[0-9]+$/

export function isValidVersion(input: unknown): input is string {
  return typeof input === 'string' && MODEL_VERSION_REGEXP.test(input)
}

export function parseVersion(input: string): [number, number] {
  if (!isValidVersion(input)) {
    throw new Error(`Unsupported version format: ${input as string}`)
  }
  const [major, minor] = input.split('.').map((part) => parseInt(part, 10))
  return [major, minor]
}

export const VersionCodec = new io.Type<string>(
  'ModelVersion',
  isValidVersion,
  (input, context) => {
    return isValidVersion(input)
      ? io.success(input)
      : io.failure(input, context, `Invalid model version format: ${input as string}`)
  },
  identity
)

/**
 * Model schema validation
 */
export const SchemaDefinitionCodec = new io.Type<JSONSchema.Object>(
  'ModelSchemaDefinition',
  isSchemaObject,
  (input, context) => {
    if (!isSchemaObject(input)) {
      return io.failure(input, context, 'Input is not a JSON schema object')
    }

    const isValid = ajv.validateSchema(input)
    // Remove schema from the Ajv instance's cache, otherwise the ajv cache grows unbounded
    ajv.removeSchema(input)

    return isValid
      ? io.success(input)
      : io.failure(input, context, `Schema validation failed: ${ajv.errorsText()}`)
  },
  identity
)

/**
 * Contents of a Model Stream.
 */
export const ContentDefinitionCodec = io.intersection(
  [
    io.strict({
      version: VersionCodec,
      name: io.string,
      accountRelation: AccountRelationCodec,
      schema: SchemaDefinitionCodec,
    }),
    io.partial({
      description: io.string,
      relations: RelationsDefinitionCodec,
      views: ViewsDefinitionCodec,
    }),
  ],
  'ModelContentDefinition'
)
export type ContentDefinition = io.TypeOf<typeof ContentDefinitionCodec>

/**
 * Model metadata
 */
export const MetadataDefinitionCodec = io.strict(
  {
    controller: io.string,
    model: MetaModelCodec,
  },
  'ModelMetadataDefinition'
)
export type MetadataDefinition = io.TypeOf<typeof MetadataDefinitionCodec>

/**
 * Model definition
 */
export const ModelDefinitionCodec = io.strict(
  {
    content: ContentDefinitionCodec,
    metadata: MetadataDefinitionCodec,
  },
  'ModelDefinition'
)
export type ModelDefinition = io.TypeOf<typeof ModelDefinitionCodec>

/**
 * Model with stream ID
 */
export const ModelCodec = io.intersection(
  [ModelDefinitionCodec, io.strict({ id: io.string })],
  'ModelStream'
)
export type Model = io.TypeOf<typeof ModelCodec>
