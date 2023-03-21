import { TRPCClientError } from '@trpc/client'
import type { OperationResultEnvelope, TRPCClientRuntime, TRPCLink } from '@trpc/client'
import type { AnyRouter } from '@trpc/server'
import type { TRPCRequestMessage, TRPCResponseMessage, TRPCResult } from '@trpc/server/rpc'
import { Observable } from 'rxjs'

import type { ServicesBus } from './bus.js'

function transformResult(response: TRPCResponseMessage, runtime: TRPCClientRuntime) {
  if ('error' in response) {
    const error = runtime.transformer.deserialize(response.error)
    return {
      ok: false,
      error: {
        ...response,
        error,
      },
    } as const
  }

  const result = {
    ...response.result,
    ...((!response.result.type || response.result.type === 'data') && {
      type: 'data',
      data: runtime.transformer.deserialize(response.result.data),
    }),
  }
  return { ok: true, result } as const
}

export type ServiceLinkParams = {
  bus: ServicesBus
  from: string
  to: string
}

export function createServiceLink<Router extends AnyRouter>(
  params: ServiceLinkParams
): TRPCLink<Router> {
  const { bus, from, to } = params

  return (runtime) => {
    return ({ op }) => {
      return new Observable<OperationResultEnvelope<unknown>>((observer) => {
        const { type, path, id, context } = op
        const request: TRPCRequestMessage = {
          id,
          method: type,
          params: {
            input: runtime.transformer.serialize(op.input),
            path,
          },
        }

        let isDone = false
        const subscription = bus.request({ from, to, context, message: request }).subscribe({
          complete() {
            if (isDone) {
              observer.complete()
            } else {
              isDone = true
              observer.error(TRPCClientError.from(new Error('Operation ended prematurely')))
            }
          },
          error(err) {
            isDone = true
            observer.error(err as TRPCClientError<any>)
            subscription.unsubscribe()
          },
          next(message) {
            const transformed = transformResult(message, runtime)

            if (!transformed.ok) {
              observer.error(TRPCClientError.from(transformed.error))
              return
            }
            observer.next({
              result: transformed.result as TRPCResult,
            })

            if (op.type !== 'subscription') {
              isDone = true
              subscription.unsubscribe()
              observer.complete()
            }
          },
        })
      })
    }
  }
}
