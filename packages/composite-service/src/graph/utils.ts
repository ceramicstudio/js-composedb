import type { GraphRelation, GraphRelationSource, GraphViewField } from '@composedb/graph-codecs'
import type { RelationViewDefinition, ViewDefinition } from '@composedb/model-codecs'

type RelationViewType = RelationViewDefinition['type']

const RELATION_VIEW_SOURCES: Record<RelationViewType, GraphRelationSource> = {
  relationDocument: 'document',
  relationFrom: 'queryConnection',
  relationCountFrom: 'queryCount',
}

const RELATION_VIEW_TYPES = Object.keys(RELATION_VIEW_SOURCES)

export function assertRelationViewDefinition(view: ViewDefinition): RelationViewDefinition {
  if (!RELATION_VIEW_TYPES.includes(view.type)) {
    throw new Error(`Invalid relation view: ${view.type}`)
  }
  return view as RelationViewDefinition
}

export function viewDefinitionToGraphRelation(view: ViewDefinition): GraphRelation {
  const relation = assertRelationViewDefinition(view)
  return {
    source: RELATION_VIEW_SOURCES[relation.type],
    model: relation.model,
    property: relation.property,
  }
}

export function viewDefinitionToGraph(view: ViewDefinition): GraphViewField {
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
        relation: viewDefinitionToGraphRelation(view),
      }
    default:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore unexpected view type
      throw new Error(`Unsupported view type: ${view.type as string}`)
  }
}

export function viewGraphToModel(field: GraphViewField): ViewDefinition {
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
