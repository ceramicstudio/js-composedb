import { getDefaultStore } from 'jotai'
import { type PreloadedQuery, loadQuery as relayQuery, usePreloadedQuery } from 'react-relay'
import type { GraphQLTaggedNode, OperationType, VariablesOf } from 'relay-runtime'
import { useLoaderData } from 'react-router-dom'

import { relayEnvironmentAtom } from './state.js'

export function loadQuery<Query extends OperationType>(
  query: GraphQLTaggedNode,
  variables: VariablesOf<Query>
) {
  const store = getDefaultStore()
  const environment = store.get(relayEnvironmentAtom)
  if (environment == null) {
    throw new Error('Missing Relay environment')
  }
  return relayQuery(environment, query, variables)
}

export function useRouteQuery<Query extends OperationType>(
  query: GraphQLTaggedNode
): Query['response'] {
  const queryReference = useLoaderData() as PreloadedQuery<Query>
  return usePreloadedQuery<Query>(query, queryReference)
}
