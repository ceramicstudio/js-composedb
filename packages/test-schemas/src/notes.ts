/**
 * Enum schema
 */

export const noteSchema = `
type NoteBook
  @createModel(accountRelation: LIST, description: "Simple notebook")
  @createIndex(fields: [{ path:"title" }]) {
  author: DID! @documentAccount
  version: CommitID! @documentVersion 
  title: String! @string(minLength: 10, maxLength: 100)
  notes: [Note] @relationFrom(model: "Note", property: "noteBookID")
  notesCount: Int! @relationCountFrom(model: "Note", property: "noteBookID")
}

enum NoteStatus {
  DEFAULT
  IMPORTANT
  ARCHIVE
}

type Note 
  @createModel(accountRelation: LIST, description: "Simple text note")
  @createIndex(fields: [{ path:"title" }]) 
{
  author: DID! @documentAccount
  version: CommitID! @documentVersion
  noteBookID: StreamID @documentReference(model: "NoteBook")
  noteBook: NoteBook @relationDocument(property: "noteBookID")
  status: NoteStatus
  title: String! @string(minLength: 10, maxLength: 100)
  text: String! @string(maxLength: 2000)
}
`
