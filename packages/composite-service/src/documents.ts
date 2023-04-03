import { StreamID } from '@ceramicnetwork/streamid'
import {
  type GenesisCommit,
  type GenesisCommitData,
  GenesisCommitDataCodec,
  type SignedCommitContainer,
  SignedCommitContainerCodec,
  type StreamLog,
  createDecoder,
} from '@composedb/ceramic-codecs'
import {
  DocumentCodec,
  type Document,
  type DocumentQuery,
  type PaginationQuery,
  type PaginationResult,
  type UniqueDocument,
} from '@composedb/document-codecs'
import type { JSONSchema } from '@composedb/json-schema-codecs'
import type { Model } from '@composedb/model-codecs'
import { encode as encodeCommit } from '@ipld/dag-cbor'
import Ajv from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import jsonpatch, { type Operation } from 'fast-json-patch'
import { Subject } from 'rxjs'
import { latestValueFrom } from 'rxjs-for-await'

const ajv = new Ajv({
  strict: true,
  allErrors: true,
  allowMatchingProperties: false,
  ownProperties: false,
  unevaluated: false,
})
addFormats(ajv)

import type { ModelsManager } from './models.js'
import {
  decodeGenesisCommitData,
  decodeStream,
  verifyCommitSignature,
  verifySignedCommit,
} from './stream.js'
import type { ServiceClients } from './types.js'

const decodeDocument = createDecoder(DocumentCodec)

export function validateDocumentSchema<T extends Record<string, unknown> = Record<string, unknown>>(
  content: unknown,
  schema: JSONSchema.Object
): asserts content is T {
  const validate = ajv.compile(schema)
  validate(content)
  ajv.removeSchema(schema)
  if (validate.errors?.length) {
    throw new Error('Document failed model schema validation')
  }
}

export function createSingleGenesis(model: StreamID, controller: string): GenesisCommit {
  const commit = {
    header: {
      controllers: [controller],
      model: model.bytes,
      sep: 'model', // See CIP-120 for more details on this field
    },
  }
  // Ensure commit can be encoded to DAG-CBOR
  encodeCommit(commit)
  return commit
}

export async function documentFromGenesis(commitData: GenesisCommitData): Promise<Document> {
  if (!GenesisCommitDataCodec.is(commitData)) {
    throw Error('Invalid document genesis commit data')
  }

  const { controllers, model: modelBytes } = commitData.commit.header
  if (controllers == null || controllers.length !== 1) {
    throw new Error('Exactly one controller must be specified')
  }
  if (modelBytes == null) {
    throw new Error('Model must be specified')
  }

  const controller = controllers[0]
  const streamID = await StreamID.fromGenesis('MID', commitData.commit)
  const id = streamID.toString()

  await verifyCommitSignature({
    commitData,
    controller,
    model: StreamID.fromBytes(modelBytes).toString(),
    streamID: id,
  })

  return decodeDocument({
    id,
    tip: commitData.cid.toString(),
    model: StreamID.fromBytes(modelBytes).toString(),
    controller,
    content: commitData.commit.data,
  })
}

export async function documentFromStream(stream: StreamLog): Promise<Document> {
  const [genesis, ...commits] = stream.log
  const doc = await documentFromGenesis(decodeGenesisCommitData(genesis))

  for (const commit of commits) {
    // TODO: handle anchor commits
    if (SignedCommitContainerCodec.is(commit)) {
      const verified = await verifySignedCommit(commit, doc.controller)
      // applyPatch() mutates doc.content
      jsonpatch.applyPatch(doc.content, verified.content as Array<Operation>)
    }
  }

  return doc
}

export type SingleFromMedadata = {
  model: StreamID | string
  controller: string
}

export type DocumentsManagerParams = {
  clients: ServiceClients
  models: ModelsManager
}

export type ApplyUpdateParams = {
  commit: SignedCommitContainer
  content: unknown
  doc: Document
  model: Model
  patch?: Array<Operation>
  unique?: string
}

export class DocumentsManager {
  #clients: ServiceClients
  #models: ModelsManager

  constructor(params: DocumentsManagerParams) {
    this.#clients = params.clients
    this.#models = params.models
  }

  async _applyUpdate(params: ApplyUpdateParams): Promise<Document> {
    const { commit, content, doc, model, patch, unique } = params

    if (patch != null) {
      // applyPatch() mutates content
      jsonpatch.applyPatch(content, patch)
    }

    validateDocumentSchema(content, model.content.schema)
    const tip = await this.#clients.ceramic.storeCommit.mutate({ commit })

    const document = { ...doc, content, tip } as UniqueDocument
    if (unique != null) {
      document.unique = unique
    }
    // TODO: also provide indexed fields information
    await this.#clients.database.saveDocument.mutate({ document })

    return document
  }

  async _getModel(id: string): Promise<Model> {
    const model = await this.#models.loadFromDatabase(id)
    if (model == null) {
      throw new Error(`Model ${id} is not stored on the node`)
    }
    return model
  }

  async create(commit: SignedCommitContainer): Promise<Document> {
    const stream = await this.#clients.ceramic.createStream.mutate({ commit })
    const doc = await documentFromStream(decodeStream(stream))
    const model = await this._getModel(doc.model)

    validateDocumentSchema(doc.content, model.content.schema)

    let unique: string
    switch (model.content.accountRelation.type) {
      case 'list':
        unique = doc.id
        break
      case 'single':
        unique = ''
        break
      // TODO: set relation, concatenate set fields values
      default:
        throw new Error(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore unexpected type
          `Unsupported account relation type: ${model.content.accountRelation.type as string}`
        )
    }

    // TODO: also provide indexed fields information
    await this.#clients.database.saveDocument.mutate({ document: { ...doc, unique } })
    return doc
  }

  async singleFromCommit(commit: SignedCommitContainer): Promise<Document> {
    const verified = await verifySignedCommit(commit)
    const genesisCommit = createSingleGenesis(
      StreamID.fromBytes(verified.model),
      verified.controller
    )
    const stream = await this.#clients.ceramic.createStream.mutate({ commit: genesisCommit })
    const doc = await documentFromStream(decodeStream(stream))

    // TODO: load doc with model
    const existing = await this.loadFromDatabase(doc.id)
    const model = await this._getModel(doc.model)

    if (existing != null && existing.controller !== verified.controller) {
      throw new Error('Invalid controller')
    }

    return await this._applyUpdate({
      commit,
      content: existing ? existing.content : {},
      doc,
      model,
      patch: verified.content as Array<Operation>,
      unique: '',
    })
  }

  async singleFromMetadata(metadata: SingleFromMedadata): Promise<Document> {
    const modelID =
      typeof metadata.model === 'string' ? StreamID.fromString(metadata.model) : metadata.model
    const genesisCommit = createSingleGenesis(modelID, metadata.controller)
    const stream = await this.#clients.ceramic.createStream.mutate({ commit: genesisCommit })
    const doc = await documentFromStream(decodeStream(stream))

    const existing = await this.loadFromDatabase(doc.id)
    if (existing != null) {
      return existing
    }

    await this.#clients.database.saveDocument.mutate({ document: { ...doc, unique: '' } })
    return doc
  }

  async update(id: string, commit: SignedCommitContainer): Promise<Document> {
    // TODO: load doc with model in one call
    const doc = await this.loadFromDatabase(id)
    if (doc == null) {
      throw new Error(`Document ${id} not found`)
    }

    const model = await this._getModel(doc.model)

    const verified = await verifySignedCommit(commit, doc.controller)
    return await this._applyUpdate({
      commit,
      content: doc.content,
      doc,
      model,
      patch: verified.content as Array<Operation>,
    })
  }

  async loadFromDatabase(id: string): Promise<Document | null> {
    return await this.#clients.database.getDocument.query({ id })
  }

  async load(ids: ReadonlyArray<string>): Promise<Array<Document>> {
    return await this.#clients.database.getDocuments.query({ ids: ids as Array<string> })
  }

  async queryPage(query: PaginationQuery): Promise<PaginationResult> {
    return await this.#clients.database.pageDocuments.query(query)
  }

  async querySingle(query: DocumentQuery): Promise<Document | null> {
    const { edges } = await this.#clients.database.pageDocuments.query({ ...query, last: 1 })
    return edges[0]?.node ?? null
  }

  async count(query: DocumentQuery): Promise<number> {
    return await this.#clients.database.countDocuments.query(query)
  }

  insertedIterable(): AsyncIterable<Document> {
    const subject = new Subject<Document>()
    // TODO: handle stopping subscription
    this.#clients.database.documentInserted.subscribe(undefined, {
      onComplete() {
        subject.complete()
      },
      onData(document) {
        subject.next(document)
      },
      onError(err) {
        subject.error(err)
      },
    })
    return latestValueFrom(subject)
  }
}
