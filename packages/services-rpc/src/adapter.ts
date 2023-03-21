import { type AnyRouter, TRPCError, callProcedure, getTRPCErrorFromUnknown } from '@trpc/server'
import { type Unsubscribable, isObservable } from '@trpc/server/observable'
import type { JSONRPC2, TRPCClientOutgoingMessage, TRPCResponseMessage } from '@trpc/server/rpc'
import type { Subscription } from 'rxjs'

import type { ServicesBus } from './bus.js'

type Respond = (message: TRPCResponseMessage) => void

export type ServiceHandlerParams<Router extends AnyRouter> = {
  bus: ServicesBus
  context: Router['_def']['_config']['$types']['ctx']
  router: Router
  service: string
}

export function createServiceHandler<Router extends AnyRouter>(
  params: ServiceHandlerParams<Router>
): Subscription {
  const { bus, context, router, service } = params
  const clientSubscriptions = new Map<number | string, Unsubscribable>()

  function stopSubscription(
    subscription: Unsubscribable,
    respond: Respond,
    { id, jsonrpc }: { id: JSONRPC2.RequestId } & JSONRPC2.BaseEnvelope
  ) {
    subscription.unsubscribe()

    respond({
      id,
      jsonrpc,
      result: {
        type: 'stopped',
      },
    })
  }

  async function handleRequest(msg: TRPCClientOutgoingMessage, respond: Respond) {
    const { id, jsonrpc } = msg
    if (id === null) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: '`id` is required',
      })
    }
    if (msg.method === 'subscription.stop') {
      const sub = clientSubscriptions.get(id)
      if (sub) {
        stopSubscription(sub, respond, { id, jsonrpc })
      }
      clientSubscriptions.delete(id)
      return
    }
    const { path, input } = msg.params
    const type = msg.method
    try {
      const result = await callProcedure({
        procedures: router._def.procedures,
        path,
        rawInput: input,
        ctx: context,
        type,
      })

      if (type === 'subscription') {
        if (!isObservable(result)) {
          throw new TRPCError({
            message: `Subscription ${path} did not return an observable`,
            code: 'INTERNAL_SERVER_ERROR',
          })
        }
      } else {
        // send the value as data if the method is not a subscription
        respond({
          id,
          jsonrpc,
          result: {
            type: 'data',
            data: result,
          },
        })
        return
      }

      const sub = result.subscribe({
        next(data) {
          respond({
            id,
            jsonrpc,
            result: {
              type: 'data',
              data,
            },
          })
        },
        error(err) {
          const error = getTRPCErrorFromUnknown(err)
          respond({
            id,
            jsonrpc,
            error: router.getErrorShape({
              error,
              type,
              path,
              input,
              ctx: context,
            }),
          })
        },
        complete() {
          respond({
            id,
            jsonrpc,
            result: {
              type: 'stopped',
            },
          })
        },
      })

      if (clientSubscriptions.has(id)) {
        // duplicate request ids for client
        stopSubscription(sub, respond, { id, jsonrpc })
        throw new TRPCError({
          message: `Duplicate id ${id}`,
          code: 'BAD_REQUEST',
        })
      }
      clientSubscriptions.set(id, sub)

      respond({
        id,
        jsonrpc,
        result: {
          type: 'started',
        },
      })
    } catch (cause) {
      respond({
        id,
        jsonrpc,
        error: router.getErrorShape({
          error: getTRPCErrorFromUnknown(cause),
          type,
          path,
          input,
          ctx: context,
        }),
      })
    }
  }

  return bus.subscribe((e) => {
    if (e.to === service && (e.message as TRPCClientOutgoingMessage).method != null) {
      void handleRequest(e.message as TRPCClientOutgoingMessage, (message: TRPCResponseMessage) => {
        bus.next({ from: service, to: e.from, message, context: e.context })
      })
    }
  })
}
