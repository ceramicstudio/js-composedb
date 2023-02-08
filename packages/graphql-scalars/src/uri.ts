import { GraphQLError, GraphQLScalarType, Kind } from 'graphql'

export const GraphQLURI: GraphQLScalarType = new GraphQLScalarType({
  name: 'URI',
  description:
    'A field whose value conforms to the standard Uniform Resource Identifier (URI) format as specified in RFC3986.',
  specifiedByURL: 'https://www.ietf.org/rfc/rfc3986.txt',
  parseValue: (value) => value,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as URIs but got a: ${ast.kind}`)
    }
    return ast.value
  },
  extensions: {
    jsonSchema: {
      type: 'string',
      format: 'uri',
    },
  },
})
