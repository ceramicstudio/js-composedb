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

export const noteSchema = `
enum NoteStatus {
  DEFAULT
  IMPORTANT
  ARCHIVE
}

type Note @createModel(accountRelation: LIST, description: "Simple text note") {
  author: DID! @documentAccount
  version: CommitID! @documentVersion 
  status: NoteStatus
  title: String! @string(minLength: 10, maxLength: 100)
  text: String! @string(maxLength: 2000)
}
`

export const profilesSchema = `
${ImageSourcesType}

type GenericProfile @createModel(
  accountRelation: SINGLE,
  description: "A model to store common profile-related properties"
) {
  name: String @string(maxLength: 150)
  image: ImageSources
}
 
type SocialProfile @createModel(
  accountRelation: SINGLE,
  description: "A model to store properties that accounts would like to share on social media"
) {
  description: String @string(maxLength: 420)
  emoji: String @string(maxLength: 2)
  background: ImageSources
  url: String @string(maxLength: 240)
}

type PersonProfile @createModel(
  accountRelation: SINGLE,
  description: "A model to store accounts' personal data"
) {
  birthDate: Date
  gender: String @string(maxLength: 42)
  homeLocation: String @string(maxLength: 140)
  residenceCountry: CountryCode
  nationalities: [CountryCode] @list(maxLength: 5)
  affiliations: [String] @string(maxLength: 140) @list(maxLength: 20)
}
`

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
