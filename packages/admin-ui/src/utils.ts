export function shortID(id: string, maxLength = 20): string {
  if (id.length <= maxLength) {
    return id
  }

  const slice = Math.floor((maxLength - 3) / 2)
  const first = id.substring(0, slice)
  const last = id.substring(id.length - slice)
  return `${first}...${last}`
}
