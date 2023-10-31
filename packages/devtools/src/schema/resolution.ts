import type { CeramicApi, SignedCommitContainer } from '@ceramicnetwork/common'
import {
  Model,
  ModelViewDefinitionV2,
  type ModelDefinition,
  type ModelDefinitionV2,
  type ModelViewsDefinitionV2,
} from '@ceramicnetwork/stream-model'
import type { StreamID } from '@ceramicnetwork/streamid'
import type { FieldsIndex } from '@composedb/types'

import { promiseMap } from '../utils.js'

import type {
  AbstractCreateModelDefinition,
  AbstractLoadModelDefinition,
  AbstractModelDefinition,
} from './types.js'
import {
  assertAuthenticatedDID,
  assertSupportedWriteModelController,
  assertValidModelInterfaceType,
  isSignedCommitContainer,
} from './validation.js'

type ModelDependencies = {
  requiredDependencies: Array<string>
  viewDependencies: Array<string>
}

type ResolvedModel = {
  id: string
  name: string
  model: Model
  commitsPromise: Promise<Array<SignedCommitContainer>>
  indices: Array<FieldsIndex>
  views: ModelViewsDefinitionV2
}

type ExecutingRecord = Record<string, Promise<ResolvedModel>>

type ResolveModel = ModelDependencies & {
  name: string
  execute: (executing: ExecutingRecord) => Promise<ResolvedModel>
}

export type IntermediaryCompositeDefinition = {
  commits: Record<string, Array<SignedCommitContainer>>
  models: Record<string, ModelDefinition>
  aliases: Record<string, string>
  indices: Record<string, Array<FieldsIndex>>
  views: Record<string, ModelViewsDefinitionV2>
}

async function loadCommits(
  ceramic: CeramicApi,
  id: string | StreamID,
): Promise<Array<SignedCommitContainer>> {
  const commits = await ceramic.loadStreamCommits(id)
  return commits.map((c) => c.value as Record<string, any>).filter(isSignedCommitContainer)
}

function executeCreateFactory(
  ceramic: CeramicApi,
  modelName: string,
  definition: AbstractCreateModelDefinition,
) {
  return async function executeCreate(executing: ExecutingRecord): Promise<ResolvedModel> {
    assertAuthenticatedDID(ceramic)

    async function getDependencyID(name: string): Promise<string> {
      const existing = executing[name]
      if (existing == null) {
        throw new Error(`Missing ${name} dependency to create model ${modelName}`)
      }
      const resolved = await existing
      return resolved.id
    }

    const sourceDefinition = definition.model
    const isV1 = sourceDefinition.version === '1.0'

    const implementsPromise = isV1
      ? []
      : Promise.all(sourceDefinition.implements.map(getDependencyID))

    const relationsPromise = promiseMap(sourceDefinition.relations ?? {}, async (relation) => {
      return relation.type === 'document' && relation.model !== null
        ? { ...relation, model: await getDependencyID(relation.model) }
        : relation
    })

    const compositeViews: ModelViewsDefinitionV2 = {}
    const viewsPromises: Record<string, Promise<ModelViewDefinitionV2>> = {}
    for (const [name, view] of Object.entries(sourceDefinition.views ?? {})) {
      if (
        (view.type === 'relationCountFrom' ||
          view.type === 'relationFrom' ||
          view.type === 'relationDocument') &&
        view.model !== null
      ) {
        const existing = executing[view.model]
        if (existing == null) {
          compositeViews[name] = view
        } else {
          viewsPromises[name] = getDependencyID(view.model).then((model) => ({
            ...view,
            model,
          }))
        }
      }
    }

    const [implementIDs, relations, views] = await Promise.all([
      implementsPromise,
      relationsPromise,
      promiseMap(viewsPromises, (viewPromise) => viewPromise),
    ])
    const newDefinition: ModelDefinitionV2 = {
      version: '2.0',
      name: sourceDefinition.name,
      description: sourceDefinition.description,
      accountRelation: sourceDefinition.accountRelation,
      interface: isV1 ? false : sourceDefinition.interface,
      implements: implementIDs,
      schema: sourceDefinition.schema,
      relations,
      views,
    }

    const model = await Model.create(ceramic, newDefinition)
    assertSupportedWriteModelController(model, ceramic)
    const id = model.id.toString()

    return {
      id,
      name: modelName,
      model,
      commitsPromise: loadCommits(ceramic, id),
      indices: definition.indices ?? [],
      views: compositeViews,
    }
  }
}

function executeLoadFactory(
  ceramic: CeramicApi,
  modelName: string,
  definition: AbstractLoadModelDefinition,
) {
  return async function executeLoad(): Promise<ResolvedModel> {
    const id = definition.id
    const model = await Model.load(ceramic, id)
    assertSupportedWriteModelController(model, ceramic)
    assertValidModelInterfaceType(model.content, definition.interface)

    return {
      id,
      name: modelName,
      model,
      commitsPromise: loadCommits(ceramic, id),
      indices: definition.indices ?? [],
      views: definition.views,
    }
  }
}

function assertNoCircularDependency(
  models: Record<string, ResolveModel>,
  targetModel: string,
  currentModel = targetModel,
): void {
  const dependencies = models[currentModel]?.requiredDependencies ?? []
  if (dependencies.includes(targetModel)) {
    if (targetModel === currentModel) {
      throw new Error(`Unsupported self-referenced dependency on model ${targetModel}`)
    } else {
      throw new Error(`Circular dependency of model ${targetModel} in model ${currentModel}`)
    }
  }
  for (const model of dependencies) {
    assertNoCircularDependency(models, targetModel, model)
  }
}

export async function createIntermediaryCompositeDefinition(
  ceramic: CeramicApi,
  models: Record<string, AbstractModelDefinition>,
): Promise<IntermediaryCompositeDefinition> {
  const toResolve: Record<string, ResolveModel> = {}
  for (const [modelName, definition] of Object.entries(models)) {
    if (definition.action === 'load') {
      toResolve[modelName] = {
        requiredDependencies: [],
        viewDependencies: [],
        name: modelName,
        execute: executeLoadFactory(ceramic, modelName, definition),
      }
    } else if (definition.action === 'create') {
      let requiredDependencies: Array<string> = []
      const viewDependencies: Array<string> = []

      if (definition.model.version !== '1.0') {
        requiredDependencies = [...definition.model.implements]
      }

      for (const relation of Object.values(definition.model.relations ?? {})) {
        if (relation.type === 'document' && relation.model !== null) {
          if (relation.model === modelName) {
            throw new Error(`Unsupported self-reference relation on model ${modelName}`)
          }
          requiredDependencies.push(relation.model)
        }
      }

      for (const view of Object.values(definition.model.views ?? {})) {
        if (
          (view.type === 'relationCountFrom' ||
            view.type === 'relationFrom' ||
            view.type === 'relationDocument') &&
          view.model !== null
        ) {
          viewDependencies.push(view.model)
        }
      }

      toResolve[modelName] = {
        requiredDependencies,
        viewDependencies,
        name: modelName,
        execute: executeCreateFactory(ceramic, modelName, definition),
      }
    } else {
      // @ts-ignore unknown action
      throw new Error(`Unsupported action: ${definition.action}`)
    }
  }

  const steps: Array<Array<ResolveModel>> = [[]]
  const remainingModels = new Set<string>()

  // First pass, check for circular dependencies and add models with no dependencies to the first execution step
  for (const [name, resolve] of Object.entries(toResolve)) {
    assertNoCircularDependency(toResolve, name)
    if (resolve.requiredDependencies.length === 0) {
      steps[0].push(resolve)
    } else {
      remainingModels.add(name)
    }
  }

  // Add steps while there are remaining models to resolve
  while (remainingModels.size !== 0) {
    steps.push([])
    for (const [name, resolve] of Object.entries(toResolve)) {
      if (!remainingModels.has(name)) {
        continue
      }

      // Models that have dependencies executed in a previous step can now be executed
      const remainingDependencies = resolve.requiredDependencies.filter((model) => {
        return remainingModels.has(model)
      })
      if (remainingDependencies.length === 0) {
        steps[steps.length - 1].push(resolve)
        remainingModels.delete(name)
      }
    }
  }

  const executing: ExecutingRecord = {}
  for (const step of steps) {
    for (const model of step) {
      executing[model.name] = model.execute(executing)
    }
  }

  const definition: IntermediaryCompositeDefinition = {
    commits: {},
    models: {},
    aliases: {},
    indices: {},
    views: {},
  }
  await Promise.all(
    Object.values(executing).map(async (executedPromise) => {
      const res = await executedPromise
      definition.models[res.id] = res.model.content
      definition.aliases[res.id] = res.name
      definition.commits[res.id] = await res.commitsPromise
      definition.indices[res.id] = res.indices
      definition.views[res.id] = res.views
    }),
  )
  return definition
}
