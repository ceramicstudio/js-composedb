import * as dagCBOR from '@ipld/dag-cbor'
import type { Message } from '@libp2p/interface-pubsub'
import * as sha256 from '@stablelib/sha256'
import { create as createDigest } from 'multiformats/hashes/digest'
import { toString } from 'uint8arrays'

export enum MessageType {
  UPDATE,
  QUERY,
  RESPONSE,
  KEEPALIVE,
}

export type UpdateMessage = {
  typ: MessageType.UPDATE
  stream: string // StreamID
  tip: string // CID
  model?: string // StreamID
}

export type QueryMessage = {
  typ: MessageType.QUERY
  id: string
  stream: string // StreamID
}

export type ResponseMessage = {
  typ: MessageType.RESPONSE
  id: string
  tips: Record<string, string> // StreamID key, CID value
}

// All nodes will always ignore this message
export type KeepaliveMessage = {
  typ: MessageType.KEEPALIVE
  ts: number // current time
  ver: string // current ceramic version
}

export type PubsubMessage = UpdateMessage | QueryMessage | ResponseMessage | KeepaliveMessage

const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder('utf-8')

function createMessageHash(message: unknown): string {
  // DAG-CBOR encoding
  const encoded = dagCBOR.encode(message)
  // SHA-256 hash
  const id = sha256.hash(encoded)
  // Multihash encoding
  return toString(createDigest(0x12, id).bytes, 'base64url')
}

export function buildQueryMessage(stream: string): QueryMessage {
  const payload = { typ: MessageType.QUERY as MessageType.QUERY, stream }
  const id = createMessageHash(payload)
  return { ...payload, id }
}

export function serialize(message: PubsubMessage): Uint8Array {
  return textEncoder.encode(JSON.stringify(message))
}

export function deserialize(message: Message): PubsubMessage {
  return JSON.parse(textDecoder.decode(message.data))
}
