export const ImageMetadataType = `
type ImageMetadata {
  src: String! @string(maxLength: 150)
  mimeType: String! @string(maxLength: 50)
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
  size: Int @int(min: 1)
}
`

export const ImageSourcesType = `
${ImageMetadataType}

type ImageSources {
  original: ImageMetadata!
  alternatives: [ImageMetadata] @list(maxLength: 20)
}
`
