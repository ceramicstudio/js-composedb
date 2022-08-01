export const ImageMetadataType = `
type ImageMetadata {
  src: String! @length(max: 150)
  mimeType: String! @length(max: 50)
  width: Int! @intRange(min: 1)
  height: Int! @intRange(min: 1)
  size: Int @intRange(min: 1)
}
`

export const ImageSourcesType = `
${ImageMetadataType}

type ImageSources {
  original: ImageMetadata!
  alternatives: [ImageMetadata] @arrayLength(max: 20)
}
`

export const noteSchema = `
type Note @createModel(accountRelation: LIST, description: "Simple text note") {
  author: DID! @documentAccount
  version: CommitID! @documentVersion 
  title: String! @length(min: 10, max: 100)
  text: String! @length(max: 2000)
}
`

export const profilesSchema = `
${ImageSourcesType}

type GenericProfile @createModel(
  accountRelation: SINGLE,
  description: "A model to store common profile-related properties"
) {
  name: String @length(max: 150)
  image: ImageSources
}
 
type SocialProfile @createModel(
  accountRelation: SINGLE,
  description: "A model to store properties that accounts would like to share on social media"
) {
  description: String @length(max: 420)
  emoji: String @length(max: 2)
  background: ImageSources
  url: String @length(max: 240)
}

type PersonProfile @createModel(
  accountRelation: SINGLE,
  description: "A model to store accounts' personal data"
) {
  birthDate: Date
  gender: String @length(max: 42)
  homeLocation: String @length(max: 140)
  residenceCountry: CountryCode
  nationalities: [CountryCode] @arrayLength(max: 5)
  affiliations: [String] @length(max: 140) @arrayLength(max: 20)
}
`

export const mediaSchema = `
interface MediaMetadata @createModel(accountRelation: LIST, description: "An interface for media metadata") {
  src: String! @length(max: 500)
  size: Int
}

interface VisualMedia @createModel(accountRelation: LIST, description: "An interface for visual media objects") {
  width: Int! @intRange(min: 1)
  height: Int! @intRange(min: 1)
}

interface TimeMedia @createModel(accountRelation: LIST, description: "An interface for time media objects") {
  duration: Int! @intRange(min: 0)
}

type ImageMedia implements MediaMetadata & VisualMedia @createModel(accountRelation: LIST, description: "A model for image objects") {
  src: String! @length(max: 500)
  size: Int
  width: Int! @intRange(min: 1)
  height: Int! @intRange(min: 1)
}

type AudioMedia implements MediaMetadata & TimeMedia @createModel(accountRelation: LIST, description: "A model for audio objects") {
  src: String! @length(max: 500)
  size: Int
  duration: Int! @intRange(min: 0)
}

type VideoMedia implements MediaMetadata & VisualMedia & TimeMedia @createModel(accountRelation: LIST, description: "A model for image objects") {
  src: String! @length(max: 500)
  size: Int
  duration: Int! @intRange(min: 0)
  width: Int! @intRange(min: 1)
  height: Int! @intRange(min: 1)
}

union MediaObject = ImageMedia | AudioMedia | VideoMedia
`
