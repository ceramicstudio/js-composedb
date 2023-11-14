/**
 * Interfaces and implementations schema
 */

export const mediaSchema = `
interface MediaMetadata @createModel(description: "An interface for media metadata") {
  src: String! @string(maxLength: 500)
  size: Int
  collectionItems: [CollectionItem] @relationFrom(model: "CollectionItem", property: "itemID")
  collectionItemsCount: Int! @relationCountFrom(model: "CollectionItem", property: "itemID")
}

interface CollectionItem @createModel(description: "An interface for an item in a collection") {
  collectionID: StreamID! @documentReference(model: "Node")
  collection: Node! @relationDocument(property: "collectionID")
  itemID: StreamID! @documentReference(model: "Node")
  item: Node! @relationDocument(property: "itemID")
}

interface Collection @createModel(description: "An interface for a collection of documents") {
  name: String! @string(maxLength: 50)
  description: String @string(maxLength: 2000)
  items: [CollectionItem] @relationFrom(model: "CollectionItem", property: "collectionID")
  itemsCount: Int! @relationCountFrom(model: "CollectionItem", property: "collectionID")
}

interface VisualMedia @createModel(description: "An interface for visual media objects") {
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
}

interface TimeMedia @createModel(description: "An interface for time media objects") {
  duration: Duration!
}

interface ImageMedia implements MediaMetadata & VisualMedia @createModel(description: "An interface for image objects") {
  src: String! @string(maxLength: 500)
  size: Int
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
  collectionItems: [CollectionItem] @relationFrom(model: "CollectionItem", property: "itemID")
  collectionItemsCount: Int! @relationCountFrom(model: "CollectionItem", property: "itemID")
}

interface AudioMedia implements MediaMetadata & TimeMedia @createModel(description: "An interface for audio objects") {
  src: String! @string(maxLength: 500)
  size: Int
  duration: Duration!
  collectionItems: [CollectionItem] @relationFrom(model: "CollectionItem", property: "itemID")
  collectionItemsCount: Int! @relationCountFrom(model: "CollectionItem", property: "itemID")
}

interface VideoMedia implements MediaMetadata & VisualMedia & TimeMedia @createModel(description: "An interface for video objects") {
  src: String! @string(maxLength: 500)
  size: Int
  duration: Duration!
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
  collectionItems: [CollectionItem] @relationFrom(model: "CollectionItem", property: "itemID")
  collectionItemsCount: Int! @relationCountFrom(model: "CollectionItem", property: "itemID")
}

type MyImage implements ImageMedia
  @createModel(description: "A model for image objects")
  @createIndex(fields: [{ path: ["src"] }])
  @createIndex(fields: [{ path: ["width"] }])
  @createIndex(fields: [{ path: ["height"] }]) {
  src: String! @string(maxLength: 500)
  size: Int
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
  collectionItems: [CollectionItem] @relationFrom(model: "CollectionItem", property: "itemID")
  collectionItemsCount: Int! @relationCountFrom(model: "CollectionItem", property: "itemID")
}

type MyAudio implements AudioMedia
  @createModel(description: "A model for audio objects")
  @createIndex(fields: [{ path: ["duration"] }]) {
  src: String! @string(maxLength: 500)
  size: Int
  duration: Duration!
  collectionItems: [CollectionItem] @relationFrom(model: "CollectionItem", property: "itemID")
  collectionItemsCount: Int! @relationCountFrom(model: "CollectionItem", property: "itemID")
}

type MyVideo implements VideoMedia
  @createModel(description: "A model for video objects")
  @createIndex(fields: [{ path: ["src"] }])
  @createIndex(fields: [{ path: ["duration"] }])
  @createIndex(fields: [{ path: ["width"] }])
  @createIndex(fields: [{ path: ["height"] }]) {
  src: String! @string(maxLength: 500)
  size: Int
  duration: Duration!
  width: Int! @int(min: 1)
  height: Int! @int(min: 1)
  collectionItems: [CollectionItem] @relationFrom(model: "CollectionItem", property: "itemID")
  collectionItemsCount: Int! @relationCountFrom(model: "CollectionItem", property: "itemID")
}

type MyMediaCollectionItem implements CollectionItem
  @createModel(description: "A model for a media item in a Collection")
  @createIndex(fields: [{ path: ["createdAt"] }]) {
  collectionID: StreamID! @documentReference(model: "Node")
  collection: Node! @relationDocument(property: "collectionID")
  itemID: StreamID! @documentReference(model: "Node")
  item: Node! @relationDocument(property: "itemID")
  createdAt: DateTime!
}

type MyMediaCollection implements Collection
  @createModel(description: "An model for a collection of media items")
  @createIndex(fields: [{ path: ["createdAt"] }])  {
  name: String! @string(maxLength: 50)
  description: String @string(maxLength: 2000)
  items: [CollectionItem] @relationFrom(model: "CollectionItem", property: "collectionID")
  itemsCount: Int! @relationCountFrom(model: "CollectionItem", property: "collectionID")
  createdAt: DateTime!
}
`
