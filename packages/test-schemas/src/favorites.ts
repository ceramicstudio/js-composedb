/**
 * SET account relation schema
 */

export const favoriteSchema = `
type Favorite @createModel(description: "A set of favorite documents", accountRelation: SET, accountRelationFields: ["docID", "tag"]) {
  docID: StreamID! @documentReference(model: "Node")
  doc: Node @relationDocument(property: "docID")
  tag: String! @string(minLength: 2, maxLength: 20)
  note: String @string(maxLength: 500)
}
`
