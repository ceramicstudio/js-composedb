import { StreamID } from '@ceramicnetwork/streamid'
import {
  type CeramicStream,
  CeramicStreamCodec,
  type GenesisCommitData,
  GenesisCommitDataCodec,
  type SignedCommitContainer,
  createDecoder,
} from '@composedb/ceramic-codecs'
import { ModelCodec, type Model } from '@composedb/model-codecs'

import { verifyCommitSignature } from './stream.js'
import type { ServiceClients } from './types.js'

const decodeStream = createDecoder(CeramicStreamCodec)
const decodeGenesisCommitData = createDecoder(GenesisCommitDataCodec)
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

export async function modelFromStream(stream: CeramicStream): Promise<Model> {
  const commitData = decodeGenesisCommitData(stream.log[0])
  return await modelFromGenesis(commitData)
}

export type ModelsManagerParams = {
  clients: ServiceClients
}

export class ModelsManager {
  #clients: ServiceClients

  constructor(params: ModelsManagerParams) {
    this.#clients = params.clients
  }

  async create(commit: SignedCommitContainer): Promise<Model> {
    const stream = await this.#clients.ceramic.createStream.mutate({ commit })
    return await modelFromStream(decodeStream(stream))
  }

  async loadFromNetwork(id: string): Promise<Model> {
    const stream = await this.#clients.ceramic.loadStream.query({ id })
    return await modelFromStream(decodeStream(stream))
  }

  async load(id: string): Promise<Model> {
    const existing = await this.#clients.database.getModel.query({ id })
    if (existing.model != null && ModelCodec.is(existing.model)) {
      return existing.model
    }

    const model = await this.loadFromNetwork(id)
    await this.#clients.database.createModel.mutate({ model, indexDocuments: false })

    return model
  }
}
