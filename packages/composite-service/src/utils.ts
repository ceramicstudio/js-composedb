export function isSupportedVersion(supported: string, check: string): boolean {
  const [supportedMajor] = supported.split('.')
  const [checkMajor] = check.split('.')
  return supportedMajor === checkMajor
}

export function assertSupportedVersion(supported: string, check: string): void {
  if (!isSupportedVersion(supported, check)) {
    throw new Error(`Unsupported Composite version ${check}, expected version ${supported}`)
  }
}

export function assertSupportedModelController(controller: string): void {
  if (!controller.startsWith('did:key:')) {
    throw new Error(`Unsupported model controller ${controller}, only did:key is supported`)
  }
}
