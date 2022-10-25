export const extraScalarsSchema = `
type ExtraScalars @createModel(accountRelation: LIST, description: "Kitchen sink of added scalar types") {
  accountID: AccountID
  chainID: ChainID
  cid: CID
  commitID: CommitID
  countryCode: CountryCode
  date: Date
  dateTime: DateTime
  did: DID
  latitude: Latitude
  localDate: LocalDate
  locale: Locale
  localTime: LocalTime
  longitude: Longitude
  streamID: StreamID
  time: Time
  timeZone: TimeZone
  url: URL
  utcOffset: UTCOffset
}
`
