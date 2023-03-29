import { StreamID } from '@ceramicnetwork/streamid'
import {
  type GenesisCommitData,
  GenesisCommitDataCodec,
  type SignedCommitContainer,
  type StreamLog,
  createDecoder,
} from '@composedb/ceramic-codecs'
import {
  DocumentCodec,
  type Document,
  type DocumentQuery,
  type PaginationQuery,
  type PaginationResult,
} from '@composedb/document-codecs'

import type { ModelsManager } from './models.js'
import { decodeGenesisCommitData, decodeStream, verifyCommitSignature } from './stream.js'
import type { ServiceClients } from './types.js'

const decodeDocument = createDecoder(DocumentCodec)

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
    content: commitData.commit.data,
    id,
    metadata: { controller, model: modelBytes },
  })
}

export async function documentFromStream(stream: StreamLog): Promise<Document> {
  const commitData = decodeGenesisCommitData(stream.log[0])
  // TODO: also apply updates
  return await documentFromGenesis(commitData)
}

export type DocumentsManagerParams = {
  clients: ServiceClients
  models: ModelsManager
}

export class DocumentsManager {
  #clients: ServiceClients
  #models: ModelsManager

  constructor(params: DocumentsManagerParams) {
    this.#clients = params.clients
    this.#models = params.models
  }

  async create(commit: SignedCommitContainer): Promise<Document> {
    const stream = await this.#clients.ceramic.createStream.mutate({ commit })
    const doc = await documentFromStream(decodeStream(stream))

    const model = await this.#models.loadFromDatabase(doc.model)
    if (model == null) {
      throw new Error(`Model ${doc.model} is not stored on the node`)
    }

    // TODO: validate JSON schema

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

    await this.#clients.database.saveDocument.mutate({ document: { ...doc, unique } })
    return doc
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
}
