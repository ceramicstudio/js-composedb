import { fetchJson } from '@ceramicnetwork/common'
import { VIEWER_ID_HEADER } from '@composedb/constants'
import { createGraphQLSchema } from '@composedb/runtime'
import type { RuntimeCompositeDefinition } from '@composedb/types'
import { createBatchingExecutor } from '@graphql-tools/batch-execute'
import { stitchSchemas } from '@graphql-tools/stitch'
import type { Executor } from '@graphql-tools/utils'
import { type GraphQLSchema, print } from 'graphql'

export type GetViewerID = () => string | null | undefined

export function createRemoteExecutor(url: string, getViewerID: GetViewerID): Executor {
  const remoteExecutor: Executor = async ({ document, variables }) => {
    const viewerID = getViewerID()
    const headers = viewerID ? { [VIEWER_ID_HEADER]: viewerID } : {}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await fetchJson(url, {
      method: 'POST',
      headers,
      body: { query: print(document), variables },
    })
  }
  return createBatchingExecutor(remoteExecutor)
}

export type HybridSchemaParams = {
  definition: RuntimeCompositeDefinition
  getViewerID?: GetViewerID
  remoteExecutor?: Executor
  serverURL?: string
}

export function createHybridSchema(params: HybridSchemaParams): GraphQLSchema {
  const { definition, getViewerID, remoteExecutor, serverURL } = params

  let executor: Executor
  if (typeof remoteExecutor === 'function') {
    executor = remoteExecutor
  } else if (typeof getViewerID === 'function' && typeof serverURL === 'string') {
    executor = createRemoteExecutor(serverURL, getViewerID)
  } else {
    throw new Error(
      'Invalid parameters to create hybrid schema: missing `remoteExecutor` or `getViewerID` and `serverURL` parameters',
    )
  }
  const remoteSchemaConfig = {
    executor,
    schema: createGraphQLSchema({ definition, readonly: true }),
  }

  return stitchSchemas({
    subschemas: [createGraphQLSchema({ definition }), remoteSchemaConfig],
    mergeTypes: false,
    onTypeConflict: (left, right, info) => {
      return info?.left.subschema === remoteSchemaConfig ? left : right
    },
  })
}
