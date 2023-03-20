import type { TRPCRequestMessage, TRPCResponseMessage } from '@trpc/server/rpc'
import { Observable, Subject, filter, map } from 'rxjs'

export type Envelope<Message = unknown, Context = unknown> = {
  service?: string
  message: Message
  context?: Context
}

export type RPCEnvelope<
  Message extends TRPCRequestMessage | TRPCResponseMessage =
    | TRPCRequestMessage
    | TRPCResponseMessage,
  Context = unknown
> = Envelope<Message, Context> & { service: string }

export type RequestEnvelope<
  Message extends TRPCRequestMessage = TRPCRequestMessage,
  Context = unknown
> = RPCEnvelope<Message, Context>

export type ResponseEnvelope<
  Message extends TRPCResponseMessage = TRPCResponseMessage,
  Context = unknown
> = RPCEnvelope<Message, Context>

export class ServicesBus<Context = unknown> extends Subject<Envelope> {
  request(
    service: string,
    message: TRPCRequestMessage,
    context?: Context
  ): Observable<TRPCResponseMessage> {
    const responses$ = this.pipe(
      filter((e): e is ResponseEnvelope => {
        return (
          (e.message as TRPCResponseMessage).id === message.id && (e.message as any).method == null
        )
      }),
      map((e) => e.message)
    )
    this.next({ service, message, context })
    return responses$
  }
}
