export const mediaSchema = `
interface MediaMetadata @createModel(accountRelation: LIST, description: "An interface for media metadata") {
  src: String! @string(maxLength: 500)
  size: Int
}

interface VisualMedia @createModel(accountRelation: LIST, description: "An interface for visual media objects") {
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
}

interface TimeMedia @createModel(accountRelation: LIST, description: "An interface for time media objects") {
  duration: Int! @int(min: 0)
}

type ImageMedia implements MediaMetadata & VisualMedia @createModel(accountRelation: LIST, description: "A model for image objects") {
  src: String! @string(maxLength: 500)
  size: Int
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
}

type AudioMedia implements MediaMetadata & TimeMedia @createModel(accountRelation: LIST, description: "A model for audio objects") {
  src: String! @string(maxLength: 500)
  size: Int
  duration: Int! @int(min: 0)
}

type VideoMedia implements MediaMetadata & VisualMedia & TimeMedia @createModel(accountRelation: LIST, description: "A model for image objects") {
  src: String! @string(maxLength: 500)
  size: Int
  duration: Int! @int(min: 0)
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
}
`
