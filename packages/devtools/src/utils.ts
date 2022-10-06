import type { ModelRelationViewDefinition, ModelViewDefinition } from '@ceramicnetwork/stream-model'
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
  R = unknown
>(inputs: M, callFunc: (input: V) => R): Record<keyof M, R> {
  return Object.entries(inputs).reduce((acc, [key, value]) => {
    acc[key as keyof M] = callFunc(value as V)
    return acc
  }, {} as Record<keyof M, R>)
}

/** @internal */
export async function promiseMap<
  M extends Record<string, unknown>,
  V extends M[keyof M] = M[keyof M],
  R = unknown
>(inputs: M, callFunc: (input: V) => Promise<R>): Promise<Record<keyof M, R>> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const results = await Promise.all(Object.values(inputs).map((value) => callFunc(value as any)))
  return Object.keys(inputs).reduce((acc, key, i) => {
    acc[key as keyof M] = results[i]
    return acc
  }, {} as Record<keyof M, R>)
}

type RelationViewType = ModelRelationViewDefinition['type']

const RELATION_VIEW_SOURCES: Record<RelationViewType, RuntimeRelationSource> = {
  relationDocument: 'document',
  relationFrom: 'queryConnection',
  relationCountFrom: 'queryCount',
}

const RELATION_VIEW_TYPES = Object.keys(RELATION_VIEW_SOURCES)

/** @internal */
export function assertRelationViewDefinition(
  view: ModelViewDefinition
): ModelRelationViewDefinition {
  if (!RELATION_VIEW_TYPES.includes(view.type)) {
    throw new Error(`Invalid relation view: ${view.type}`)
  }
  return view as ModelRelationViewDefinition
}

/** @internal */
export function viewDefinitionToRuntimeRelation(view: ModelViewDefinition): RuntimeRelation {
  const relation = assertRelationViewDefinition(view)
  return {
    source: RELATION_VIEW_SOURCES[relation.type],
    model: relation.model,
    property: relation.property,
  }
}

/** @internal */
export function viewDefinitionToRuntime(view: ModelViewDefinition): RuntimeViewField {
  switch (view.type) {
    case 'documentAccount':
    case 'documentVersion':
      return { type: 'view', viewType: view.type }
    case 'relationCountFrom':
    case 'relationDocument':
    case 'relationFrom':
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
export function viewRuntimeToModel(field: RuntimeViewField): ModelViewDefinition {
  if (field.viewType === 'relation') {
    const { model, property, source } = field.relation
    switch (source) {
      case 'document':
        return { type: 'relationDocument', model, property }
      case 'queryConnection':
        return { type: 'relationFrom', model, property }
      case 'queryCount':
        return { type: 'relationCountFrom', model, property }
    }
  }
  return { type: field.viewType }
}
