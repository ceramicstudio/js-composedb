/**
 * Scalars schema
 */

export const extraScalarsSchema = `
type ExtraScalars 
  @createModel(accountRelation: LIST, description: "Kitchen sink of added scalar types") 
  @createIndex(fields: [{path: ["dateTime"]},{path: ["streamID"]}])
{
  accountID: AccountID
  chainID: ChainID
  cid: CID
  commitID: CommitID
  countryCode: CountryCode
  date: Date
  dateTime: DateTime
  did: DID
  duration: Duration
  latitude: Latitude
  localDate: LocalDate
  locale: Locale
  localTime: LocalTime
  longitude: Longitude
  streamID: StreamID
  time: Time
  timeZone: TimeZone
  uri: URI
  utcOffset: UTCOffset
}
`
