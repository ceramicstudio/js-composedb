import { fetchJson } from '@ceramicnetwork/common'
import { VIEWER_ID_HEADER } from '@composedb/constants'
import { createGraphQLSchema } from '@composedb/runtime'
import type { RuntimeCompositeDefinition } from '@composedb/types'
import { stitchSchemas } from '@graphql-tools/stitch'
import type { AsyncExecutor } from '@graphql-tools/utils'
import { type GraphQLSchema, print } from 'graphql'

export type GetViewerID = () => string | null | undefined

export function createRemoteExecutor(url: string, getViewerID: GetViewerID): AsyncExecutor {
  return async function remoteExecutor({ document, variables }) {
    const viewerID = getViewerID()
    const headers = viewerID ? { [VIEWER_ID_HEADER]: viewerID } : {}

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await fetchJson(url, {
      method: 'POST',
      headers,
      body: { query: print(document), variables },
    })
  }
}

export type HybridSchemaParams = {
  definition: RuntimeCompositeDefinition
  getViewerID: GetViewerID
  serverURL: string
}

export function createHybridSchema(params: HybridSchemaParams): GraphQLSchema {
  const { definition, getViewerID, serverURL } = params
  const localSchema = createGraphQLSchema({ definition })
  const remoteSchemaConfig = {
    executor: createRemoteExecutor(serverURL, getViewerID),
    schema: createGraphQLSchema({ definition, readonly: true }),
  }

  return stitchSchemas({
    subschemas: [localSchema, remoteSchemaConfig],
    mergeTypes: false,
    onTypeConflict: (left, right, info) => {
      return info?.left.subschema === remoteSchemaConfig ? left : right
    },
  })
}
