import { StreamID } from '@ceramicnetwork/streamid'
import {
  type GenesisCommitData,
  GenesisCommitDataCodec,
  type SignedCommitContainer,
  type StreamLog,
  createDecoder,
} from '@composedb/ceramic-codecs'
import { fromModelEntity, toModelEntity } from '@composedb/database-codecs'
import { ModelCodec, type Model } from '@composedb/model-codecs'

import { decodeGenesisCommitData, decodeStream, verifyCommitSignature } from './stream.js'
import type { ServiceClients } from './types.js'

const decodeModel = createDecoder(ModelCodec)

export async function modelFromGenesis(commitData: GenesisCommitData): Promise<Model> {
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
  const streamID = await StreamID.fromGenesis('model', commitData.commit)
  const id = streamID.toString()

  await verifyCommitSignature({
    commitData,
    controller,
    model: StreamID.fromBytes(modelBytes).toString(),
    streamID: id,
  })

  return decodeModel({
    content: commitData.commit.data,
    id,
    metadata: { controller, model: modelBytes },
  })
}

export async function modelFromStream(stream: StreamLog): Promise<Model> {
  const commitData = decodeGenesisCommitData(stream.log[0])
  return await modelFromGenesis(commitData)
}

export type SaveModelOptions = {
  indexDocuments?: boolean
}

export type ModelsManagerParams = {
  clients: ServiceClients
}

export class ModelsManager {
  #clients: ServiceClients

  constructor(params: ModelsManagerParams) {
    this.#clients = params.clients
  }

  async create(commit: SignedCommitContainer, options: SaveModelOptions = {}): Promise<Model> {
    const stream = await this.#clients.ceramic.createStream.mutate({ commit })
    const model = await modelFromStream(decodeStream(stream))
    await this.#clients.database.saveModel.mutate(
      toModelEntity(model, { indexingEnabled: options.indexDocuments })
    )
    return model
  }

  async loadFromDatabase(id: string): Promise<Model | null> {
    const model = await this.#clients.database.loadModel.query({ id })
    // @ts-ignore type mismatch with decoding
    return model ? decodeModel(fromModelEntity(model)) : null
  }

  async loadFromNetwork(id: string): Promise<Model> {
    const stream = await this.#clients.ceramic.loadStream.query({ id })
    return await modelFromStream(decodeStream(stream))
  }

  async load(id: string, options: SaveModelOptions = {}): Promise<Model> {
    const fromDB = await this.loadFromDatabase(id)
    if (fromDB != null) {
      return fromDB
    }

    const model = await this.loadFromNetwork(id)
    await this.#clients.database.saveModel.mutate(
      toModelEntity(model, { indexingEnabled: options.indexDocuments })
    )
    return model
  }
}
