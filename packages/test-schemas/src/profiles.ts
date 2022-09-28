import { ImageSourcesType } from './embeds.js'

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
