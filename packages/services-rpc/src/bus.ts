import type { TRPCRequestMessage, TRPCResponseMessage } from '@trpc/server/rpc'
import { Observable, Subject, filter, map } from 'rxjs'

export type Envelope<
  Message extends TRPCRequestMessage | TRPCResponseMessage =
    | TRPCRequestMessage
    | TRPCResponseMessage,
  Context = unknown
> = {
  service: string
  message: Message
  context?: Context
}

export class ServicesBus<Context = unknown> extends Subject<Envelope> {
  request(
    service: string,
    message: TRPCRequestMessage,
    context?: Context
  ): Observable<TRPCResponseMessage> {
    const responses$ = this.pipe(
      filter((e): e is Envelope<TRPCResponseMessage> => {
        return e.message.id === message.id && (e.message as any).method == null
      }),
      map((e) => e.message)
    )
    this.next({ service, message, context })
    return responses$
  }
}
