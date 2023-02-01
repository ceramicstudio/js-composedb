import { GraphQLError, GraphQLScalarType, Kind } from 'graphql'
import { CID } from 'multiformats/cid'

function validateCID(input: unknown): string {
  const cid = typeof input === 'string' ? CID.parse(input) : CID.asCID(input)
  if (cid == null) {
    throw new GraphQLError(`Could not parse input as CID: ${input as string}`)
  }
  return cid.toV1().toString()
}

export const InterPlanetaryCID = new GraphQLScalarType({
  name: 'InterPlanetaryCID',
  description: 'A IPLD CID',
  specifiedByURL: 'https://github.com/multiformats/cid',
  serialize: validateCID,
  parseValue: validateCID,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as CID but got a: ${ast.kind}`)
    }
    return validateCID(ast.value)
  },
})
