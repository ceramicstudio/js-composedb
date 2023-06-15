import {
  Environment,
  type FetchFunction,
  type GraphQLResponse,
  Network,
  Observable,
  RecordSource,
  Store,
  type SubscribeFunction,
} from 'relay-runtime'

import type { Client } from './client.js'

export function createEnvironment(client: Client): Environment {
  const fetchFn: FetchFunction = async (request, variables) => {
    return (await client.adminGraphql.query({ source: request.text, variables })) as GraphQLResponse
  }

  const subscribeFn: SubscribeFunction = (request, variables) => {
    return Observable.create<GraphQLResponse>((sink) => {
      client.adminGraphqlSubscription.subscribe(
        {
          operationName: request.name,
          source: request.text,
          variables,
        },
        {
          onComplete() {
            sink.complete()
          },
          onData(value) {
            sink.next(value)
          },
          onError(err) {
            sink.error(err)
          },
        }
      )
    })
  }

  return new Environment({
    network: Network.create(fetchFn, subscribeFn),
    store: new Store(new RecordSource()),
  })
}
