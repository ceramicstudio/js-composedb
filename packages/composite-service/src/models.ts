import { StreamID } from '@ceramicnetwork/streamid'
import {
  GenesisCommitDataCodec,
  type GenesisCommitData,
  createDecoder,
} from '@composedb/ceramic-codecs'
import { ModelCodec, type Model } from '@composedb/model-codecs'

import type { CeramicClient, DatabaseClient } from './clients.js'
import { verifyCommitSignature } from './stream.js'

const decodeGenesisCommitData = createDecoder(GenesisCommitDataCodec)

export async function modelFromGenesis(commitData: GenesisCommitData): Promise<ModelStream> {
  if (!GenesisCommitDataCodec.is(commitData)) {
    throw Error('Invalid model genesis commit data')
  }

  const { controllers, model: modelBytes } = commitData.commit.header
  if (controllers == null || controllers.length !== 1) {
    throw new Error('Exactly one controller must be specified')
  }
  if (modelBytes == null) {
    throw new Error('Model must be specified')
  }

  const controller = controllers[0]
  const model = StreamID.fromBytes(modelBytes).toString()
  const streamID = await StreamID.fromGenesis('model', commitData.commit)
  const id = streamID.toString()
  await verifyCommitSignature({ commitData, controller, model, streamID: id })

  const stream = { content: commitData.commit.data, id, metadata: { controller, model } }
  if (!ModelCodec.is(stream)) {
    throw new Error('Invalid model stream')
  }
  return stream
}

export type ModelsManagerParams = {
  ceramic: CeramicClient
  db: DatabaseClient
}

export class ModelsManager {
  #ceramic: CeramicClient
  #db: DatabaseClient

  constructor(params: ModelsManagerParams) {
    this.#ceramic = params.ceramic
    this.#db = params.db
  }

  async loadFromNetwork(id: string): Promise<Model> {
    const stream = await this.#ceramic.loadStream.query({ id })
    const commitData = decodeGenesisCommitData(stream.log[0])
    return await modelFromGenesis(commitData)
  }

  async load(id: string): Promise<Model> {
    const existing = await this.#db.getModel.query({ id })
    if (existing.model != null && ModelCodec.is(existing.model)) {
      return existing.model
    }

    const model = await this.loadFromNetwork(id)
    await this.#db.createModel.mutate({ model, indexDocuments: false })

    return model
  }

  // async create(commitData: GenesisCommitData) {
  //   const stream = await modelFromGenesis(commitData)
  //   // TODO: upsert in DB + publish to network
  // }
}
