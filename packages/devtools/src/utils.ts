import type {
  ModelRelationViewDefinitionV2,
  ModelViewDefinitionV2,
} from '@ceramicnetwork/stream-model'
import type { StreamRef } from '@ceramicnetwork/streamid'
import type { RuntimeRelation, RuntimeRelationSource, RuntimeViewField } from '@composedb/types'

/** @internal */
export function streamIDToString(id: StreamRef | string): string {
  return typeof id === 'string' ? id : id.toString()
}

/** @internal */
export function applyMap<
  M extends Record<string, unknown>,
  V extends M[keyof M] = M[keyof M],
  R = unknown,
>(inputs: M, callFunc: (input: V) => R): Record<keyof M, R> {
  return Object.entries(inputs).reduce(
    (acc, [key, value]) => {
      acc[key as keyof M] = callFunc(value as V)
      return acc
    },
    {} as Record<keyof M, R>,
  )
}

/** @internal */
export async function promiseMap<
  M extends Record<string, unknown>,
  V extends M[keyof M] = M[keyof M],
  R = unknown,
>(inputs: M, callFunc: (input: V) => Promise<R>): Promise<Record<keyof M, R>> {
  const results = await Promise.all(Object.values(inputs).map((value) => callFunc(value as V)))
  return Object.keys(inputs).reduce(
    (acc, key, i) => {
      acc[key as keyof M] = results[i]
      return acc
    },
    {} as Record<keyof M, R>,
  )
}

/** @internal */
export function sortKeys<T extends Record<string, unknown>>(object: T): T {
  return Object.keys(object)
    .sort()
    .reduce((acc, key) => {
      // @ts-ignore
      acc[key] = object[key]
      return acc
    }, {} as T)
}

type RelationViewType = ModelRelationViewDefinitionV2['type']

const RELATION_VIEW_SOURCES: Record<RelationViewType, RuntimeRelationSource> = {
  relationDocument: 'document',
  relationFrom: 'queryConnection',
  relationCountFrom: 'queryCount',
  relationSetFrom: 'set',
}

const RELATION_VIEW_TYPES = Object.keys(RELATION_VIEW_SOURCES)

/** @internal */
export function isRelationViewDefinition(
  view: ModelViewDefinitionV2,
): view is ModelRelationViewDefinitionV2 {
  return RELATION_VIEW_TYPES.includes(view.type)
}

/** @internal */
export function assertRelationViewDefinition(
  view: ModelViewDefinitionV2,
): asserts view is ModelRelationViewDefinitionV2 {
  if (!isRelationViewDefinition(view)) {
    throw new Error(`Invalid relation view: ${view.type}`)
  }
}

/** @internal */
export function viewDefinitionToRuntimeRelation(view: ModelViewDefinitionV2): RuntimeRelation {
  assertRelationViewDefinition(view)
  return {
    source: RELATION_VIEW_SOURCES[view.type],
    model: view.model,
    property: view.property,
  }
}

/** @internal */
export function viewDefinitionToRuntime(view: ModelViewDefinitionV2): RuntimeViewField {
  switch (view.type) {
    case 'documentAccount':
    case 'documentVersion':
      return { type: 'view', viewType: view.type }
    case 'relationCountFrom':
    case 'relationDocument':
    case 'relationFrom':
    case 'relationSetFrom':
      return {
        type: 'view',
        viewType: 'relation',
        relation: viewDefinitionToRuntimeRelation(view),
      }
    default:
      // @ts-ignore unexpected view type
      throw new Error(`Unsupported view type: ${view.type as string}`)
  }
}

/** @internal */
export function viewRuntimeToModel(field: RuntimeViewField): ModelViewDefinitionV2 {
  if (field.viewType === 'relation') {
    const { model, property, source } = field.relation
    if (source === 'document') {
      return { type: 'relationDocument', model, property }
    }
    if (model == null) {
      throw new Error(`Missing model for ${source} relation view`)
    }
    switch (source) {
      case 'queryConnection':
        return { type: 'relationFrom', model, property }
      case 'queryCount':
        return { type: 'relationCountFrom', model, property }
      case 'set':
        return { type: 'relationSetFrom', model, property }
    }
  }
  return { type: field.viewType }
}
