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
