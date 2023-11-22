import type { CeramicApi, Context, SignedCommitContainer } from '@ceramicnetwork/common'
import { Model, type ModelDefinition } from '@ceramicnetwork/stream-model'
import { Cacao } from '@didtools/cacao'

// The hardcoded "model" StreamID that all Model streams have in their metadata. This provides
// a "model" StreamID that can be indexed to query the set of all published Models.
// The StreamID uses the "UNLOADABLE" StreamType, and has string representation: "kh4q0ozorrgaq2mezktnrmdwleo1d"
const MODEL_STREAM_ID = Model.MODEL.toString()

export function isSignedCommitContainer(
  input: Record<string, any>,
): input is SignedCommitContainer {
  return Object.keys(input).includes('jws') && Object.keys(input).includes('linkedBlock')
}

export function assertAuthenticatedDID(ceramic: CeramicApi): void {
  if (!ceramic.did?.authenticated) {
    throw new Error(`An authenticated DID must be attached to the Ceramic instance`)
  }
}

export function assertValidModelInterfaceType(
  definition: ModelDefinition,
  expectInterface: boolean,
) {
  if (expectInterface && (definition.version === '1.0' || !definition.interface)) {
    throw new Error(`Model ${definition.name} is not an interface model`)
  }
  if (!expectInterface && definition.version !== '1.0' && definition.interface) {
    throw new Error(
      `Model ${definition.name} is expected to be an non-interface model but is an interface model`,
    )
  }
}

export function assertValidCacao(cacao: Cacao, controller: string): void {
  if (cacao.p.iss !== controller) {
    throw new Error(`Cacao issuer ${cacao.p.iss} does not match controller ${controller}`)
  }
  if (cacao.p.exp != null) {
    throw new Error(`only did:pkh CACAO without expiry is supported`)
  }
  const hasModelResource = cacao.p.resources?.includes(`ceramic://*?model=${MODEL_STREAM_ID}`)
  if (!hasModelResource) {
    throw new Error(`only cacao with resource "ceramic://*?model=${MODEL_STREAM_ID}" is supported`)
  }
}

export async function assertSupportedReadModelController(
  model: Model,
  signedCommitContainer: SignedCommitContainer,
): Promise<void> {
  const controller = model.metadata.controller as string
  const unsupported = `Unsupported model controller ${controller}`
  if (controller.startsWith('did:pkh:') && signedCommitContainer.cacaoBlock != null) {
    const cacao = await Cacao.fromBlockBytes(signedCommitContainer.cacaoBlock)
    if (cacao == null) {
      throw new Error(`${unsupported}, only did:pkh with CACAO is supported`)
    }
    assertValidCacao(cacao, controller)
  } else if (!controller.startsWith('did:key:')) {
    throw new Error(`${unsupported}, only did:key is supported`)
  }
}

export function assertSupportedWriteModelController(model: Model, ceramic: CeramicApi): void {
  const controller = model.metadata.controller as string
  const unsupported = `Unsupported model controller ${controller}`
  if (controller.startsWith('did:pkh:')) {
    if (ceramic.context == null) {
      throw new Error(`${unsupported}, missing ceramic context`)
    }
    const context = ceramic.context as Context
    if (context.did == null) {
      throw new Error(`${unsupported}, did missing from ceramic context`)
    }
    if (!context.did.hasCapability) {
      throw new Error(`${unsupported}, only did:pkh with CACAO is supported`)
    }
    const cacao: Cacao = context.did.capability
    if (cacao.p.exp != null) {
      throw new Error(`${unsupported}, only did:pkh CACAO without expiry is supported`)
    }
    const hasModelResource = cacao.p.resources?.includes(`ceramic://*?model=${MODEL_STREAM_ID}`)
    if (!hasModelResource) {
      throw new Error(`${unsupported}, only cacao with resource ${MODEL_STREAM_ID} is supported`)
    }
  } else if (!controller.startsWith('did:key:')) {
    throw new Error(`${unsupported}, only did:key and did:pkh are supported`)
  }
}
