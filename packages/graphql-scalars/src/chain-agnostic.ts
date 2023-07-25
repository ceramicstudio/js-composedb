import { AccountId, ChainId } from 'caip'
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql'

function validateAccountID(input: unknown): string {
  return new AccountId(input as string).toString()
}

function validateChainID(input: unknown): string {
  return new ChainId(input as string).toString()
}

export const ChainAgnosticAccountID = new GraphQLScalarType({
  name: 'ChainAgnosticAccountID',
  description: 'A Chain Agnostic AccountId',
  specifiedByURL: 'https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md',
  serialize: validateAccountID,
  parseValue: validateAccountID,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as ChainAgnosticAccountID but got a: ${ast.kind}`,
      )
    }
    return validateAccountID(ast.value)
  },
})

export const ChainAgnosticChainID = new GraphQLScalarType({
  name: 'ChainAgnosticChainID',
  description: 'A Chain Agnostic ChainId',
  specifiedByURL: 'https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md',
  serialize: validateChainID,
  parseValue: validateChainID,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as ChainAgnosticAccountID but got a: ${ast.kind}`,
      )
    }
    return validateChainID(ast.value)
  },
})
