import { getDefaultStore } from 'jotai'
import { type PreloadedQuery, loadQuery as relayQuery, usePreloadedQuery } from 'react-relay'
import type { GraphQLTaggedNode, OperationType, VariablesOf } from 'relay-runtime'
import { redirect, useLoaderData } from 'react-router-dom'

import { relayEnvironmentAtom } from './state.js'

export function loadQuery<Query extends OperationType>(
  query: GraphQLTaggedNode,
  variables: VariablesOf<Query>
) {
  const store = getDefaultStore()
  const environment = store.get(relayEnvironmentAtom)
  return environment ? relayQuery(environment, query, variables) : redirect('/connect')
}

export function useRouteQuery<Query extends OperationType>(
  query: GraphQLTaggedNode
): Query['response'] {
  const queryReference = useLoaderData() as PreloadedQuery<Query>
  return usePreloadedQuery<Query>(query, queryReference)
}
