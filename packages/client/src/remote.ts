import { fetchJson } from '@ceramicnetwork/common'
import { createGraphQLSchema } from '@composedb/runtime'
import type { RuntimeCompositeDefinition } from '@composedb/types'
import type { SubschemaConfig } from '@graphql-tools/delegate'
import { stitchSchemas } from '@graphql-tools/stitch'
import type { AsyncExecutor } from '@graphql-tools/utils'
import { introspectSchema } from '@graphql-tools/wrap'
import { type GraphQLSchema, print } from 'graphql'

export function createRemoteExecutor(url: string): AsyncExecutor {
  return async function remoteExecutor({ document, variables }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await fetchJson(url, { method: 'POST', body: { query: print(document), variables } })
  }
}

export async function createRemoteSchema(url: string): Promise<SubschemaConfig> {
  const remoteExecutor = createRemoteExecutor(url)
  return {
    schema: await introspectSchema(remoteExecutor),
    executor: remoteExecutor,
  }
}

export type HybridSchemaParams = {
  definition: RuntimeCompositeDefinition
  serverURL: string
}

export async function createHybridSchema(params: HybridSchemaParams): Promise<GraphQLSchema> {
  const localSchema = createGraphQLSchema({ definition: params.definition })
  const remoteSchema = await createRemoteSchema(params.serverURL)
  return stitchSchemas({
    subschemas: [localSchema, remoteSchema],
    mergeTypes: false,
    onTypeConflict: (left, right, info) => {
      return info?.left.subschema === remoteSchema ? left : right
    },
  })
}
