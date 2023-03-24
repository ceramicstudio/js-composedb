import type { Router as CeramicRouter } from '@composedb/ceramic-service'
import type { Router as DatabaseRouter } from '@composedb/database-service'
import type { ContentDefinition, ViewsDefinition } from '@composedb/model-codecs'
import type { ServiceClient } from '@composedb/services-rpc'

export type ServiceClients = {
  ceramic: ServiceClient<CeramicRouter>
  database: ServiceClient<DatabaseRouter>
}

export type CompositeViewsDefinition = {
  account?: Record<string, unknown>
  root?: Record<string, unknown>
  models?: Record<string, ViewsDefinition>
}

export type IntermediaryCompositeDefinition = {
  /**
   * Version of the composite format.
   */
  version: string
  /**
   * Models defined in the composite, keyed by stream ID.
   */
  models: Record<string, ContentDefinition>
  /**
   * Optional mapping of model stream ID to alias name.
   */
  aliases?: Record<string, string>
  /**
   * Optional composite-level views.
   */
  views?: CompositeViewsDefinition
  /**
   * Optional common embeds (enums and objects) shared by models in the composite.
   */
  commonEmbeds?: Array<string>
}
