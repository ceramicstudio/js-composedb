/**
 * Custom index schema
 */

export const ratingSchema = `
enum RatingSource {
  INTERNAL
  EXTERNAL
}

type Rating 
  @createModel(accountRelation: LIST, description: "Rating model")
  @createIndex(fields: [{ path: "source" }]) 
  @createIndex(fields: [{ path: "title" }]) 
  @createIndex(fields: [{ path: "value" }]) 
{
  source: RatingSource
  title: String! @string(maxLength: 100)
  value: Float!
}
`
