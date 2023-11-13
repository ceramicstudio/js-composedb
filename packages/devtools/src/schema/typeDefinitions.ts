import { DOC_ID_FIELD, NODE_INTERFACE_NAME } from '../constants.js'

import { extraScalars } from './scalars.js'

const scarlarDefinitions = Object.keys(extraScalars)
  .map((name) => `scalar ${name}`)
  .join('\n')

export const typeDefinitions = `
# Added scalars

${scarlarDefinitions}

# Field validation and configuration

directive @boolean(default: Boolean) on FIELD_DEFINITION
directive @float(min: Float, max: Float, default: Float) on FIELD_DEFINITION
directive @int(min: Int, max: Int, default: Int) on FIELD_DEFINITION
directive @string(minLength: Int, maxLength: Int!, default: String) on FIELD_DEFINITION

# List validation

directive @list(minLength: Int, maxLength: Int!) on FIELD_DEFINITION

# Stream metadata views

directive @documentAccount on FIELD_DEFINITION
directive @documentVersion on FIELD_DEFINITION

# Relation definitions

directive @accountReference on FIELD_DEFINITION
directive @documentReference(model: String!) on FIELD_DEFINITION

# Relation views

directive @relationDocument(property: String!) on FIELD_DEFINITION
directive @relationFrom(model: String!, property: String!) on FIELD_DEFINITION
directive @relationCountFrom(model: String!, property: String!) on FIELD_DEFINITION

# Model definition

enum ModelAccountRelation {
  LIST # Account to multiple streams - default
  SINGLE # Account to single stream (IDX)
}

directive @createModel(description: String!, accountRelation: ModelAccountRelation) on OBJECT
directive @createModel(description: String!, accountRelation: ModelAccountRelation) on INTERFACE

directive @loadModel(id: StreamID!) on OBJECT
directive @loadModel(id: StreamID!) on INTERFACE

# Indices definition

input IndexField {
  path: [String!]!
}

directive @createIndex(
  fields: [IndexField!]!
) repeatable on OBJECT

# Interface reference

interface ${NODE_INTERFACE_NAME} {
  ${DOC_ID_FIELD}: ID!
}
`
