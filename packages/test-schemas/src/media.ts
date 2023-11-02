/**
 * Interfaces and implementations schema
 */

export const mediaSchema = `
interface MediaMetadata @createModel(description: "An interface for media metadata") {
  src: String! @string(maxLength: 500)
  size: Int
}

interface VisualMedia @createModel(description: "An interface for visual media objects") {
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
}

interface TimeMedia @createModel(description: "An interface for time media objects") {
  duration: Int! @int(min: 0)
}

interface ImageMedia implements MediaMetadata & VisualMedia @createModel(description: "An interface for image objects") {
  src: String! @string(maxLength: 500)
  size: Int
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
}

interface AudioMedia implements MediaMetadata & TimeMedia @createModel(description: "An interface for audio objects") {
  src: String! @string(maxLength: 500)
  size: Int
  duration: Int! @int(min: 0)
}

interface VideoMedia implements MediaMetadata & VisualMedia & TimeMedia @createModel(description: "An interface for video objects") {
  src: String! @string(maxLength: 500)
  size: Int
  duration: Int! @int(min: 0)
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
}

type MyImage implements ImageMedia @createModel(description: "A model for image objects") {
  src: String! @string(maxLength: 500)
  size: Int
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
}

type MyAudio implements AudioMedia @createModel(description: "A model for audio objects") {
  src: String! @string(maxLength: 500)
  size: Int
  duration: Int! @int(min: 0)
}

type MyVideo implements VideoMedia @createModel(description: "A model for video objects") {
  src: String! @string(maxLength: 500)
  size: Int
  duration: Int! @int(min: 0)
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
}
`
