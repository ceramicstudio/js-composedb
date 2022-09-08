import type { ModelDefinition, ModelViewsDefinition } from '@ceramicnetwork/stream-model'
import type { InternalCompositeDefinition } from '@composedb/types'

import { createAbstractCompositeDefinition } from './schema/compiler.js'
import type { AbstractCompositeDefinition } from './schema/types.js'

/** @internal */
export function mockDefinition(
  definition: AbstractCompositeDefinition,
  providedModels: Record<string, ModelDefinition> = {}
): InternalCompositeDefinition {
  const models: Record<string, ModelDefinition> = {}
  const modelsViews: Record<string, ModelViewsDefinition> = {}

  for (const abstractModel of Object.values(definition.models)) {
    if (abstractModel.action === 'create') {
      const definition = abstractModel.model
      models[`${definition.name}ID`] = definition
    } else {
      const definition = providedModels[abstractModel.id]
      if (definition == null) {
        throw new Error(`Missing provided model ${abstractModel.id}`)
      }
      models[abstractModel.id] = definition
      modelsViews[abstractModel.id] = abstractModel.views
    }
  }

  return {
    version: '1.0',
    commonEmbeds: definition.commonEmbeds,
    models,
    views: { models: modelsViews },
  }
}

/** @internal */
export function mockDefinitionFromSchema(
  schema: string,
  providedModels?: Record<string, ModelDefinition>
): InternalCompositeDefinition {
  return mockDefinition(createAbstractCompositeDefinition(schema), providedModels)
}
