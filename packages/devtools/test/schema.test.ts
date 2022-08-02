/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { ModelDefinition } from '@ceramicnetwork/stream-model'
import { ImageMetadataType, profilesSchema } from '@composedb/test-schemas'
import Ajv from 'ajv/dist/2020'

import { createAbstractCompositeDefinition } from '../src'

describe('schema', () => {
  it("createAbstractCompositeDefinition throws when there's no top-level model object", () => {
    expect(() => {
      createAbstractCompositeDefinition(ImageMetadataType)
    }).toThrow('No models found in Composite Definition Schema')
  })

  it.skip("createAbstractCompositeDefinition doesn't parse unions", () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      union IntOrString = Int | String

      type ModelWithUnionProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with a property that is a union of string and int"
      ) {
        intOrStringValue: IntOrString
      }
      `)
    }).toThrow('GraphQL unions are not supported')
  })

  it.skip("createAbstractCompositeDefinition doesn't parse interfaces", () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      interface GenericProfile {
        name: String @string(maxLength: 150)
      }
       
      type SocialProfile implements GenericProfile @createModel(
        accountRelation: SINGLE,
        description: "A model to store properties that accounts would like to share on social media"
      ) {
        description: String @string(maxLength: 420)
        emoji: String @string(maxLength: 2)
        url: String @string(maxLength: 240)
      }
      `)
    }).toThrow('GraphQL interfaces are not supported')
  })

  it('createAbstractCompositeDefinition creates an InternalCompositeDefinition for profiles from schema', () => {
    expect(createAbstractCompositeDefinition(profilesSchema)).toMatchSnapshot()
  })

  it('createAbstractCompositeDefinition creates models whose schemas conform to JSON Schema standard', () => {
    const { models } = createAbstractCompositeDefinition(profilesSchema)
    const genericSchema = (models.GenericProfile as ModelDefinition).schema
    const socialSchema = (models.SocialProfile as ModelDefinition).schema
    const personSchema = (models.PersonProfile as ModelDefinition).schema

    const validator = new Ajv()
    expect(validator.validateSchema(genericSchema, true)).toBe(true)
    expect(validator.validateSchema(socialSchema, true)).toBe(true)
    expect(validator.validateSchema(personSchema, true)).toBe(true)
  })

  it('DID scalar is supported and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithDIDProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with DID properties"
      ) {
        didValue: DID
        requiredDidValue: DID!
      }
      `)
    ).toMatchObject({
      models: {
        ModelWithDIDProp: {
          name: 'ModelWithDIDProp',
          accountRelation: 'single',
          schema: {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            type: 'object',
            properties: {
              didValue: { $ref: '#/$defs/GraphQLDID' },
              requiredDidValue: { $ref: '#/$defs/GraphQLDID' },
            },
            $defs: {
              GraphQLDID: {
                type: 'string',
                title: 'GraphQLDID',
                pattern: "^did:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$",
                maxLength: 100,
              },
            },
            additionalProperties: false,
            required: ['requiredDidValue'],
          },
        },
      },
    })
  })

  it('@documentAccount is only valid for DIDs', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type ModelWithInvalidDocumentAccountProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with an invalid @documentAccount directive"
      ) {
        nonDIDValue: String @documentAccount
      }
      `)
    }).toThrow('@documentAccount directive can only be set on a DID scalar')
  })

  it.only('fields annotated with @documentAccount are not added to the resulting schema', () => {
    const { models } = createAbstractCompositeDefinition(`
      type ModelWithDocumentVersionProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with a @documentAccount directive"
      ) {
        floatProp: Float!
        didProp: DID @documentAccount
      }
      `)

    expect(Object.keys(models)).toHaveLength(1)
    const properties =
      (models.ModelWithDocumentVersionProp as ModelDefinition).schema.properties ?? {}
    expect(properties).not.toBeFalsy()
    expect(Object.keys(properties)).toHaveLength(1)
    expect(Object.keys(properties)[0]).toEqual('floatProp')
  })

  it('CommitID scalar is supported and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithCommitIDProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with stream reference properties"
      ) {
        commitIDValue: CommitID
        requiredCommitIDValue: CommitID!
      }
      `)
    ).toMatchObject({
      models: [
        {
          name: 'ModelWithCommitIDProp',
          accountRelation: 'single',
          schema: {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            type: 'object',
            properties: {
              commitIDValue: {
                type: 'string',
                title: 'CeramicCommitID',
                maxLength: 200,
              },
              requiredCommitIDValue: {
                type: 'string',
                title: 'CeramicCommitID',
                maxLength: 200,
              },
            },
            additionalProperties: false,
            required: ['requiredCommitIDValue'],
          },
        },
      ],
    })
  })

  it('@documentVersion is only valid for CommitIDs', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type ModelWithInvalidDocumentVersionProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with an invalid @documentVersion directive"
      ) {
        nonDIDValue: Int @documentVersion
      }
      `)
    }).toThrow('@documentVersion can only be applied to CommitIDs')
  })

  it('fields annotated with @documentVersion are not added to the resulting schema', () => {
    const { models } = createAbstractCompositeDefinition(`
      type ModelWithDocumentVersionProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with a @documentVersion directive"
      ) {
        numberProp: Int!
        version: CommitID @documentVersion
      }
      `)
    expect(Object.keys(models)).toHaveLength(1)
    const properties =
      (models.ModelWithDocumentVersionProp as ModelDefinition).schema.properties ?? {}
    expect(Object.keys(properties)).toHaveLength(1)
    expect(Object.keys(properties)[0]).toEqual('numberProp')
  })

  it('Boolean scalar is supported and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithBooleanProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with boolean properties"
      ) {
        booleanValue: Boolean
        requiredBooleanValue: Boolean!
      }
      `)
    ).toMatchObject({
      models: [
        {
          name: 'ModelWithBooleanProp',
          accountRelation: 'single',
          schema: {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            type: 'object',
            properties: {
              booleanValue: {
                type: 'boolean',
              },
              requiredBooleanValue: {
                type: 'boolean',
              },
            },
            additionalProperties: false,
            required: ['requiredBooleanValue'],
          },
        },
      ],
    })
  })

  it('Int scalar is supported and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithIntProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with int properties"
      ) {
        intValue: Int
        requiredIntValue: Int!
      }
      `)
    ).toMatchObject({
      models: [
        {
          name: 'ModelWithIntProp',
          accountRelation: 'single',
          schema: {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            type: 'object',
            properties: {
              intValue: {
                type: 'integer',
              },
              requiredIntValue: {
                type: 'integer',
              },
            },
            additionalProperties: false,
            required: ['requiredIntValue'],
          },
        },
      ],
    })
  })

  it('Float scalar is supported and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithFloatProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with float properties"
      ) {
        floatValue: Float
        requiredFloatValue: Float!
      }
      `)
    ).toMatchObject({
      models: [
        {
          name: 'ModelWithFloatProp',
          accountRelation: 'single',
          schema: {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            type: 'object',
            properties: {
              floatValue: {
                type: 'number',
              },
              requiredFloatValue: {
                type: 'number',
              },
            },
            additionalProperties: false,
            required: ['requiredFloatValue'],
          },
        },
      ],
    })
  })

  it('String scalar is supported and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithStringProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with string properties"
      ) {
        stringValue: String @length(max: 3)
        requiredStringValue: String! @length(max: 3)
      }
      `)
    ).toMatchObject({
      models: [
        {
          name: 'ModelWithStringProp',
          accountRelation: 'single',
          schema: {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            type: 'object',
            properties: {
              stringValue: {
                type: 'string',
              },
              requiredStringValue: {
                type: 'string',
              },
            },
            additionalProperties: false,
            required: ['requiredStringValue'],
          },
        },
      ],
    })
  })

  it('@length is required for Strings', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type ModelWithStringPropWithoutLengthDirective @createModel(
        accountRelation: SINGLE,
        description: "Test model with string property without @length directive"
      ) {
        stringValue: String
      }
      `)
    }).toThrow('Missing @length directive')
  })

  it('@length is required for arrays Strings', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type ModelWithStringArrayPropWithoutLengthDirective @createModel(
        accountRelation: SINGLE,
        description: "Test model with string array property without @length directive"
      ) {
        stringArrayValue: [String] @list(maxLength: 1)
      }
      `)
    }).toThrow('Missing @length directive')
  })

  it('ID scalar is supported and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithIDProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with GraphQL ID property"
      ) {
        idValue: ID
        requiredIdValue: ID!
      }
      `)
    ).toMatchObject({
      models: [
        {
          name: 'ModelWithIDProp',
          accountRelation: 'single',
          schema: {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            type: 'object',
            properties: {
              idValue: {
                type: 'string',
                title: 'GraphQLID',
              },
              requiredIdValue: {
                type: 'string',
                title: 'GraphQLID',
              },
            },
            additionalProperties: false,
            required: ['requiredIdValue'],
          },
        },
      ],
    })
  })

  it('Arrays are supported and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithArrayProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with GraphQL ID property"
      ) {
        arrayValue: [Int] @list(maxLength: 3)
        requiredArrayValue: [Int]! @list(maxLength: 3)
      }
      `)
    ).toMatchObject({
      models: [
        {
          name: 'ModelWithArrayProp',
          accountRelation: 'single',
          schema: {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            type: 'object',
            properties: {
              arrayValue: {
                type: 'array',
                items: {
                  type: 'integer',
                },
              },
              requiredArrayValue: {
                type: 'array',
                items: {
                  type: 'integer',
                },
              },
            },
            additionalProperties: false,
            required: ['requiredArrayValue'],
          },
        },
      ],
    })
  })

  it('@string(minLength: Int, maxLength: Int!) directive is supported for strings and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithStringProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with a constrained string property"
      ) {
        stringValue: String @string(minLength: 1, maxLength: 140)
      }
      `)
    ).toMatchObject({
      models: [
        {
          name: 'ModelWithStringProp',
          accountRelation: 'single',
          schema: {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            type: 'object',
            properties: {
              stringValue: {
                type: 'string',
                minLength: 1,
                maxLength: 140,
              },
            },
            additionalProperties: false,
          },
        },
      ],
    })
  })

  it('@int(min: Int, max: Int) can be applied to Int, Int! or [Int] properties', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type ModelWithStringProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with incorrectly constrained string property"
      ) {
        intValue: String @int(min: 1)
      }
      `)
    }).toThrow('@intRange can only be applied to integers or arrays of integers')
  })

  it('@float(min: Float, max: Float) can be applied to Float, Float! or [Float] properties', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type ModelWithIntProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with incorrectly constrained int property"
      ) {
        intValue: Int @float(max: 1)
      }
      `)
    }).toThrow('@floatRange can only be applied to floats or arrays of floats')
  })

  it('@string(minLength: Int, maxLength: Int!) can be applied to strings or arrays of strings', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type ModelWithArrayProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with incorrectly constrained array property"
      ) {
        intValue: [Int] @string(minLength: 10, maxLength: 140)
      }
      `)
    }).toThrow('@length can only be applied to strings or arrays of strings')
  })

  it('@list(minLength: Int, maxLength: Int!) can be applied to lists', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type ModelWithStringProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with incorrectly constrained strings property"
      ) {
        intValue: String @list(maxLength: 140)
      }
      `)
    }).toThrow('@list can only be applied to arrays')
  })

  it('@list(minLength: Int, maxLength: Int!) directive is supported for arrays and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithArrayProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with a constrained array property"
      ) {
        arrayValue: [String] @string(maxLength: 5) @list(minLength: 10, maxLength: 15)
      }
      `)
    ).toMatchObject({
      models: [
        {
          name: 'ModelWithArrayProp',
          accountRelation: 'single',
          schema: {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            type: 'object',
            properties: {
              arrayValue: {
                type: 'array',
                minItems: 10,
                maxItems: 15,
                items: {
                  type: 'string',
                },
              },
            },
            additionalProperties: false,
          },
        },
      ],
    })
  })

  it('@string(minLength: Int, maxLength: Int!) directive is supported for arrays of strings and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithArrayProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with an array property with constrained items"
      ) {
        arrayValue: [String] @string(minLength: 4, maxLength: 440) @list(maxLength: 5)
      }
      `)
    ).toMatchObject({
      models: [
        {
          name: 'ModelWithArrayProp',
          accountRelation: 'single',
          schema: {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            type: 'object',
            properties: {
              arrayValue: {
                type: 'array',
                items: {
                  type: 'string',
                  minLength: 4,
                  maxLength: 440,
                },
              },
            },
            additionalProperties: false,
          },
        },
      ],
    })
  })

  it('@list is required for arrays', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type ModelWithArrayPropWithoutArrayLengthDirective @createModel(
        accountRelation: SINGLE,
        description: "Test model with an array property without @arrayLength directive"
      ) {
        arrayValue: [Int]
      }
      `)
    }).toThrow('Missing @list directive')
  })

  it('@int(min: Int, max: Int) directive is supported and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithIntProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with a constreained int property"
      ) {
        intValue: Int @int(min: 5, max: 10)
      }
      `)
    ).toMatchObject({
      models: [
        {
          name: 'ModelWithIntProp',
          accountRelation: 'single',
          schema: {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            type: 'object',
            properties: {
              intValue: {
                type: 'integer',
                minimum: 5,
                maximum: 10,
              },
            },
            additionalProperties: false,
          },
        },
      ],
    })
  })

  it('@float(min: Float, max: Float) directive is supported and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithFloatProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with a constrained float property"
      ) {
        floatValue: Float @float(min: 5.0, max: 10.0)
      }
      `)
    ).toMatchObject({
      models: [
        {
          name: 'ModelWithFloatProp',
          accountRelation: 'single',
          schema: {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            type: 'object',
            properties: {
              floatValue: {
                type: 'number',
                minimum: 5.0,
                maximum: 10.0,
              },
            },
            additionalProperties: false,
          },
        },
      ],
    })
  })
})
