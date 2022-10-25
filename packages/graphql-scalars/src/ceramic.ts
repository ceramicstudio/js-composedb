import { CommitID, StreamID } from '@ceramicnetwork/streamid'
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql'

function validateCommitID(input: unknown): string {
  return CommitID.fromString(input as string).toString()
}

function validateStreamID(input: unknown): string {
  return StreamID.fromString(input as string).toString()
}

export const CeramicCommitID = new GraphQLScalarType({
  name: 'CeramicCommitID',
  description: 'A Ceramic Commit ID',
  specifiedByURL: 'https://github.com/ceramicnetwork/CIP/blob/main/CIPs/CIP-59/CIP-59.md#commitid',
  serialize: validateCommitID,
  parseValue: validateCommitID,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as CommitID but got a: ${ast.kind}`)
    }
    return validateCommitID(ast.value)
  },
})

export const CeramicStreamID = new GraphQLScalarType({
  name: 'CeramicStreamID',
  description: 'A Ceramic Stream ID',
  specifiedByURL: 'https://github.com/ceramicnetwork/CIP/blob/main/CIPs/CIP-59/CIP-59.md#streamid',
  serialize: validateStreamID,
  parseValue: validateStreamID,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as StreamID but got a: ${ast.kind}`)
    }
    return validateStreamID(ast.value)
  },
})
