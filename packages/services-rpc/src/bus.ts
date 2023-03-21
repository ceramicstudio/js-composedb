import type { TRPCRequestMessage, TRPCResponseMessage } from '@trpc/server/rpc'
import { Observable, Subject, filter, map } from 'rxjs'

export type Envelope<Message = unknown, Context = unknown> = {
  from: string
  to?: string
  message: Message
  context?: Context
}

export type RPCEnvelope<
  Message extends TRPCRequestMessage | TRPCResponseMessage =
    | TRPCRequestMessage
    | TRPCResponseMessage,
  Context = unknown
> = Envelope<Message, Context> & { to: string }

export type RequestEnvelope<
  Message extends TRPCRequestMessage = TRPCRequestMessage,
  Context = unknown
> = RPCEnvelope<Message, Context>

export type ResponseEnvelope<
  Message extends TRPCResponseMessage = TRPCResponseMessage,
  Context = unknown
> = RPCEnvelope<Message, Context>

export type ServiceRequest<Context = unknown> = {
  from: string
  to: string
  message: TRPCRequestMessage
  context?: Context
}

export class ServicesBus<Context = unknown> extends Subject<Envelope> {
  request(req: ServiceRequest<Context>): Observable<TRPCResponseMessage> {
    const { from, to, message, context } = req
    const responses$ = this.pipe(
      filter((e): e is ResponseEnvelope => {
        return (
          e.to === from &&
          (e.message as TRPCResponseMessage).id === message.id &&
          (e.message as any).method == null
        )
      }),
      map((e) => e.message)
    )
    this.next({ from, to, message, context })
    return responses$
  }
}
