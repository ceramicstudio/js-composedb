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
  duration: Duration!
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
  duration: Duration!
}

interface VideoMedia implements MediaMetadata & VisualMedia & TimeMedia @createModel(description: "An interface for video objects") {
  src: String! @string(maxLength: 500)
  size: Int
  duration: Duration!
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
}

type MyImage implements ImageMedia
  @createModel(description: "A model for image objects")
  @createIndex(fields: [{ path: ["src"] }])
  @createIndex(fields: [{ path: ["width"] }])
  @createIndex(fields: [{ path: ["height"] }]) {
  src: String! @string(maxLength: 500)
  size: Int
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
}

type MyAudio implements AudioMedia
  @createModel(description: "A model for audio objects")
  @createIndex(fields: [{ path: ["duration"] }]) {
  src: String! @string(maxLength: 500)
  size: Int
  duration: Duration!
}

type MyVideo implements VideoMedia
  @createModel(description: "A model for video objects")
  @createIndex(fields: [{ path: ["src"] }])
  @createIndex(fields: [{ path: ["duration"] }])
  @createIndex(fields: [{ path: ["width"] }])
  @createIndex(fields: [{ path: ["height"] }]) {
  src: String! @string(maxLength: 500)
  size: Int
  duration: Duration!
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
}
`
