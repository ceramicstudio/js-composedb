/**
 * Account reference schema
 */

export const socialSchema = `
type PersonMet
  @createModel(accountRelation: LIST, description: "Another person met")
  @createIndex(fields: [{path:["date"]}]) {
  self: DID! @documentAccount
  other: DID! @accountReference
  date: Date
}
`
