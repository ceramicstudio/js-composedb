import type { Logger } from '@composedb/services-rpc'
import type { Message, SignedMessage } from '@libp2p/interface-pubsub'
import type { IPFS } from 'ipfs-core-types'
import {
  Subject,
  type OperatorFunction,
  Observable,
  concatMap,
  filter,
  map,
  pipe,
  share,
  tap,
} from 'rxjs'

import { type PubsubMessage, deserialize, serialize } from './pubsub-protocol.js'

export function createObservableTopic(
  ipfs: IPFS,
  topic: string,
  logger: Logger
): Observable<Message> {
  return new Observable((subscriber) => {
    function onError(error: unknown) {
      logger.warn('IPFS pubsub subscription error', { topic, error })
      subscriber.error(error)
    }
    function onMessage(message: Message) {
      subscriber.next(message)
    }

    ipfs.pubsub.subscribe(topic, onMessage, { onError }).catch(onError)

    return () => {
      ipfs.pubsub.unsubscribe(topic, onMessage)
    }
  })
}

export function filterMessages(
  idPromise: Promise<string>
): OperatorFunction<Message, SignedMessage> {
  return pipe(
    filter((msg): msg is SignedMessage => msg.type === 'signed'),
    concatMap(async (msg) => (msg.from.toString() === (await idPromise) ? null : msg)),
    filter((msg): msg is SignedMessage => msg != null)
  )
}

export function parseMessages(logger: Logger): OperatorFunction<SignedMessage, PubsubMessage> {
  return pipe(
    map((message): PubsubMessage | void => {
      try {
        return deserialize(message)
      } catch (error) {
        logger.warn('Failed to deserialize pubsub message', { message, error })
      }
    }),
    filter((msg): msg is PubsubMessage => msg != null)
  )
}

export type PubsubChannelParams = {
  ipfs: IPFS
  logger: Logger
  topic: string
}

export class PubsubChannel extends Observable<PubsubMessage> {
  _publishMessage: (message: PubsubMessage) => void

  constructor(params: PubsubChannelParams) {
    const { ipfs, logger, topic } = params
    const idPromise = ipfs.id().then((res) => res.id.toString())
    const subject = new Subject<PubsubMessage>()
    const channel = createObservableTopic(ipfs, topic, logger).pipe(
      filterMessages(idPromise),
      parseMessages(logger),
      tap((message) => logger.trace('Incoming pubsub message', { topic, message })),
      share({ connector: () => subject })
    )
    super((subscriber) => {
      logger.info('Adding subscriber to pubsub channel', { topic })
      return channel.subscribe(subscriber)
    })

    this._publishMessage = (message: PubsubMessage) => {
      logger.trace('Publish message to pubsub channel', { topic, message })
      ipfs.pubsub.publish(topic, serialize(message)).catch((error) => {
        logger.warn('Failed to publish message to pubsub channel', { topic, message, error })
      })
    }
  }

  next(message: PubsubMessage): void {
    this._publishMessage(message)
  }
}
