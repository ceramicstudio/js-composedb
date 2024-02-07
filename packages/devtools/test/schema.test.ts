/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { ModelDefinition } from '@ceramicnetwork/stream-model'
import { ImageMetadataType, profilesSchema } from '@composedb/test-schemas'
import Ajv from 'ajv/dist/2020'

import { createAbstractCompositeDefinition } from '../src'
import type { AbstractCreateModelDefinition, AbstractModelDefinition } from '../src/schema/types'
import { assertValidModelInterfaceType } from '../src/schema/validation'

function getSchema(modelDefinition: AbstractModelDefinition) {
  return (modelDefinition as AbstractCreateModelDefinition).model.schema
}

describe('validation', () => {
  describe('assertValidModelInterfaceType()', () => {
    test('expect interface with v1.0 model', () => {
      expect(() => {
        assertValidModelInterfaceType(
          { version: '1.0', name: 'Test' } as unknown as ModelDefinition,
          true,
        )
      }).toThrow('Model Test is not an interface model')
    })

    test('expect non-interface with v1.0 model', () => {
      expect(() => {
        assertValidModelInterfaceType(
          { version: '1.0', name: 'Test' } as unknown as ModelDefinition,
          false,
        )
      }).not.toThrow()
    })

    test('expect interface with non-interface v2.0 model', () => {
      expect(() => {
        assertValidModelInterfaceType(
          { version: '2.0', name: 'Test', interface: false } as unknown as ModelDefinition,
          true,
        )
      }).toThrow('Model Test is not an interface model')
    })

    test('expect interface with interface v2.0 model', () => {
      expect(() => {
        assertValidModelInterfaceType(
          { version: '2.0', name: 'Test', interface: true } as unknown as ModelDefinition,
          true,
        )
      }).not.toThrow()
    })

    test('expect non-interface with non-interface v2.0 model', () => {
      expect(() => {
        assertValidModelInterfaceType(
          { version: '2.0', name: 'Test', interface: false } as unknown as ModelDefinition,
          false,
        )
      }).not.toThrow()
    })

    test('expect non-interface with interface v2.0 model', () => {
      expect(() => {
        assertValidModelInterfaceType(
          { version: '2.0', name: 'Test', interface: true } as unknown as ModelDefinition,
          false,
        )
      }).toThrow('Model Test is expected to be an non-interface model but is an interface model')
    })
  })
})

describe('schema parsing and compilation', () => {
  it("createAbstractCompositeDefinition throws when there's no top-level model object", () => {
    expect(() => {
      createAbstractCompositeDefinition(ImageMetadataType)
    }).toThrow('No models found in Composite Definition Schema')
  })

  it("createAbstractCompositeDefinition doesn't parse unions", () => {
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

  it('createAbstractCompositeDefinition creates an InternalCompositeDefinition for profiles from schema', () => {
    expect(createAbstractCompositeDefinition(profilesSchema)).toMatchSnapshot()
  })

  it('createAbstractCompositeDefinition creates models whose schemas conform to JSON Schema standard', () => {
    const { models } = createAbstractCompositeDefinition(profilesSchema)
    const validator = new Ajv()
    expect(validator.validateSchema(getSchema(models.GenericProfile), true)).toBe(true)
    expect(validator.validateSchema(getSchema(models.SocialProfile), true)).toBe(true)
    expect(validator.validateSchema(getSchema(models.PersonProfile), true)).toBe(true)
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
      `),
    ).toMatchObject({
      models: {
        ModelWithDIDProp: {
          action: 'create',
          model: {
            name: 'ModelWithDIDProp',
            accountRelation: { type: 'single' },
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
                  pattern:
                    "^did:[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+:[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]*:?[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]*:?[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]*$",
                  maxLength: 100,
                },
              },
              additionalProperties: false,
              required: ['requiredDidValue'],
            },
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
    }).toThrow(
      'Unsupported @documentAccount directive on field nonDIDValue of object ModelWithInvalidDocumentAccountProp, @documentAccount can only be set on a DID scalar',
    )
  })

  it('fields annotated with @documentAccount are not added to the resulting schema', () => {
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
    const properties = getSchema(models.ModelWithDocumentVersionProp).properties ?? {}
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
      `),
    ).toMatchObject({
      models: {
        ModelWithCommitIDProp: {
          action: 'create',
          model: {
            name: 'ModelWithCommitIDProp',
            accountRelation: { type: 'single' },
            schema: {
              $schema: 'https://json-schema.org/draft/2020-12/schema',
              type: 'object',
              $defs: {
                CeramicCommitID: {
                  type: 'string',
                  title: 'CeramicCommitID',
                  maxLength: 200,
                },
              },
              properties: {
                commitIDValue: { $ref: '#/$defs/CeramicCommitID' },
                requiredCommitIDValue: { $ref: '#/$defs/CeramicCommitID' },
              },
              additionalProperties: false,
              required: ['requiredCommitIDValue'],
            },
          },
        },
      },
    })
  })

  it('@documentVersion is only valid for CommitIDs', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type ModelWithInvalidDocumentVersionProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with an invalid @documentVersion directive"
      ) {
        nonCommitIDValue: Int @documentVersion
      }
      `)
    }).toThrow(
      'Unsupported @documentVersion directive on field nonCommitIDValue of object ModelWithInvalidDocumentVersionProp, @documentVersion can only be set on a CommitID scalar',
    )
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
    const properties = getSchema(models.ModelWithDocumentVersionProp).properties ?? {}
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
      `),
    ).toMatchObject({
      models: {
        ModelWithBooleanProp: {
          action: 'create',
          model: {
            name: 'ModelWithBooleanProp',
            accountRelation: { type: 'single' },
            description: 'Test model with boolean properties',
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
        },
      },
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
      `),
    ).toMatchObject({
      models: {
        ModelWithIntProp: {
          action: 'create',
          model: {
            name: 'ModelWithIntProp',
            accountRelation: { type: 'single' },
            description: 'Test model with int properties',
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
        },
      },
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
      `),
    ).toMatchObject({
      models: {
        ModelWithFloatProp: {
          action: 'create',
          model: {
            name: 'ModelWithFloatProp',
            accountRelation: { type: 'single' },
            description: 'Test model with float properties',
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
        },
      },
    })
  })

  it('String scalar is supported and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithStringProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with string properties"
      ) {
        stringValue: String @string(maxLength: 3)
        requiredStringValue: String! @string(maxLength: 3)
      }
      `),
    ).toMatchObject({
      models: {
        ModelWithStringProp: {
          action: 'create',
          model: {
            name: 'ModelWithStringProp',
            accountRelation: { type: 'single' },
            description: 'Test model with string properties',
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
        },
      },
    })
  })

  it('@string is required for Strings', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type ModelWithStringPropWithoutLengthDirective @createModel(
        accountRelation: SINGLE,
        description: "Test model with string property without @string directive"
      ) {
        stringValue: String
      }
      `)
    }).toThrow(
      'Missing @string directive on string field stringValue of object ModelWithStringPropWithoutLengthDirective',
    )
  })

  it('@string is required for arrays Strings', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type ModelWithStringArrayPropWithoutLengthDirective @createModel(
        accountRelation: SINGLE,
        description: "Test model with string array property without @length directive"
      ) {
        stringArrayValue: [String] @list(maxLength: 1)
      }
      `)
    }).toThrow(
      'Missing @string directive on string field stringArrayValue of object ModelWithStringArrayPropWithoutLengthDirective',
    )
  })

  it('ID scalar is supported and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithIDProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with GraphQL ID property"
      ) {
        idValue: ID @string(maxLength: 30)
        requiredIdValue: ID! @string(maxLength: 50)
      }
      `),
    ).toMatchObject({
      models: {
        ModelWithIDProp: {
          action: 'create',
          model: {
            name: 'ModelWithIDProp',
            accountRelation: { type: 'single' },
            description: 'Test model with GraphQL ID property',
            schema: {
              $schema: 'https://json-schema.org/draft/2020-12/schema',
              type: 'object',
              properties: {
                idValue: {
                  type: 'string',
                  title: 'GraphQLID',
                  maxLength: 30,
                },
                requiredIdValue: {
                  type: 'string',
                  title: 'GraphQLID',
                  maxLength: 50,
                },
              },
              additionalProperties: false,
              required: ['requiredIdValue'],
            },
          },
        },
      },
    })
  })

  it('Arrays are supported and properly converted to ICD', () => {
    expect(
      createAbstractCompositeDefinition(`
      type ModelWithArrayProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with list property"
      ) {
        arrayValue: [Int] @list(maxLength: 3)
        requiredArrayValue: [Int]! @list(maxLength: 5)
      }
      `),
    ).toMatchObject({
      models: {
        ModelWithArrayProp: {
          action: 'create',
          model: {
            name: 'ModelWithArrayProp',
            accountRelation: { type: 'single' },
            description: 'Test model with list property',
            schema: {
              $schema: 'https://json-schema.org/draft/2020-12/schema',
              type: 'object',
              properties: {
                arrayValue: {
                  type: 'array',
                  items: {
                    type: 'integer',
                  },
                  maxItems: 3,
                },
                requiredArrayValue: {
                  type: 'array',
                  items: {
                    type: 'integer',
                  },
                  maxItems: 5,
                },
              },
              additionalProperties: false,
              required: ['requiredArrayValue'],
            },
          },
        },
      },
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
      `),
    ).toMatchObject({
      models: {
        ModelWithStringProp: {
          action: 'create',
          model: {
            name: 'ModelWithStringProp',
            accountRelation: { type: 'single' },
            description: 'Test model with a constrained string property',
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
        },
      },
    })
  })

  it('@int(min: Int, max: Int) can be applied to Int, Int! or [Int] properties', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type ModelWithStringProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with incorrectly constrained string property"
      ) {
        intValue: String @int(min: 1) @string(maxLength: 3)
      }
      `)
    }).toThrow(
      'Unexpected @int directive with type String on field intValue of object ModelWithStringProp',
    )
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
    }).toThrow(
      'Unexpected @float directive with type Int on field intValue of object ModelWithIntProp',
    )
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
    }).toThrow('Missing @list directive on list field intValue of object ModelWithArrayProp')
  })

  it('@list(minLength: Int, maxLength: Int!) can be applied to lists', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type ModelWithStringProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with incorrectly constrained strings property"
      ) {
        intValue: String @list(maxLength: 140) @string(maxLength: 10)
      }
      `)
    }).toThrow('Unexpected @list directive on field intValue of object ModelWithStringProp')
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
      `),
    ).toMatchObject({
      models: {
        ModelWithArrayProp: {
          action: 'create',
          model: {
            name: 'ModelWithArrayProp',
            accountRelation: { type: 'single' },
            description: 'Test model with a constrained array property',
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
                    maxLength: 5,
                  },
                },
              },
              additionalProperties: false,
            },
          },
        },
      },
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
      `),
    ).toMatchObject({
      models: {
        ModelWithArrayProp: {
          action: 'create',
          model: {
            name: 'ModelWithArrayProp',
            accountRelation: { type: 'single' },
            description: 'Test model with an array property with constrained items',
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
        },
      },
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
    }).toThrow(
      'Missing @list directive on list field arrayValue of object ModelWithArrayPropWithoutArrayLengthDirective',
    )
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
      `),
    ).toMatchObject({
      models: {
        ModelWithIntProp: {
          action: 'create',
          model: {
            name: 'ModelWithIntProp',
            accountRelation: { type: 'single' },
            description: 'Test model with a constreained int property',
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
        },
      },
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
      `),
    ).toMatchObject({
      models: {
        ModelWithFloatProp: {
          action: 'create',
          model: {
            name: 'ModelWithFloatProp',
            accountRelation: { type: 'single' },
            description: 'Test model with a constrained float property',
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
        },
      },
    })
  })

  it('Index directive is properly supported and added to ICD', () => {
    const def = createAbstractCompositeDefinition(`
      type ModelWithIDProp @createModel(
        accountRelation: SINGLE,
        description: "Test model with GraphQL ID property",
      )
      @createIndex(
        fields: [{
          path: ["idValue"]
        }],
      )
      @createIndex(
        fields: [{
          path: ["idValue"]
        },{
          path: ["requiredValue"]
        }]
      ) {
        idValue: ID @string(maxLength: 30)
        requiredIdValue: ID! @string(maxLength: 50)
      }
      `)
    expect(def).toMatchObject({
      models: {
        ModelWithIDProp: {
          action: 'create',
          indices: [
            {
              fields: [{ path: ['idValue'] }],
            },
            {
              fields: [{ path: ['idValue'] }, { path: ['requiredValue'] }],
            },
          ],
          model: {
            name: 'ModelWithIDProp',
            accountRelation: { type: 'single' },
            description: 'Test model with GraphQL ID property',
            schema: {
              $schema: 'https://json-schema.org/draft/2020-12/schema',
              type: 'object',
              properties: {
                idValue: {
                  type: 'string',
                  title: 'GraphQLID',
                  maxLength: 30,
                },
                requiredIdValue: {
                  type: 'string',
                  title: 'GraphQLID',
                  maxLength: 50,
                },
              },
              additionalProperties: false,
              required: ['requiredIdValue'],
            },
          },
        },
      },
    })
  })

  test('interfaces require @createModel or @loadModel directive', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
        interface TestInterface {
          test: String! @string(maxLength: 50)
        }
      `)
    }).toThrow('Missing @createModel or @loadModel directive for interface TestInterface')

    expect(() => {
      createAbstractCompositeDefinition(`
        interface TestInterface @createModel(description: "Test interface") {
          test: String! @string(maxLength: 50)
        }
      `)
    }).not.toThrow()

    expect(() => {
      createAbstractCompositeDefinition(`
        interface TestInterface @loadModel(id: "interface ID") {
          id: ID!
        }
      `)
    }).not.toThrow()
  })

  test('@createIndex directive is not supported on interfaces', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
        interface TestInterface
          @createModel(description: "Test interface")
          @createIndex(fields: [{ path: ["test"] }]) {
          test: String! @string(maxLength: 50)
        }
      `)
    }).toThrow('Directive "@createIndex" may not be used on INTERFACE.')
  })

  test('enums support', () => {
    const def = createAbstractCompositeDefinition(`
      enum TestEnum {
        ONE
        TWO
        THREE
      }

      type TestModel @createModel(description: "Test model") {
        enum: TestEnum
      }
    `)

    expect(def).toMatchObject({
      models: {
        TestModel: {
          action: 'create',
          indices: [],
          model: {
            name: 'TestModel',
            accountRelation: { type: 'list' },
            description: 'Test model',
            schema: {
              $schema: 'https://json-schema.org/draft/2020-12/schema',
              type: 'object',
              properties: {
                enum: {
                  $ref: '#/$defs/TestEnum',
                },
              },
              additionalProperties: false,
              $defs: {
                TestEnum: {
                  type: 'string',
                  title: 'TestEnum',
                  enum: ['ONE', 'TWO', 'THREE'],
                },
              },
            },
          },
        },
      },
      commonEmbeds: ['TestEnum'],
    })
  })

  test('Models must contain at least one content field', () => {
    expect(() => {
      createAbstractCompositeDefinition(`
      type MyModel @createModel(description: "Test model without content"
      ) {
        account: DID! @documentAccount
      }
    `)
    }).toThrow('Invalid model MyModel: at least one content property must be defined')
  })

  describe('SET account relation support', () => {
    test('throws if the relationAccountFields argument is not defined', () => {
      expect(() => {
        createAbstractCompositeDefinition(`
        type MyModel @createModel(description: "Test model", accountRelation: SET) {
          test: DID!
        }
      `)
      }).toThrow(
        'Missing accountRelationFields argument for @createModel directive on object MyModel',
      )
    })

    test('throws if the relationAccountFields argument is an empty array', () => {
      expect(() => {
        createAbstractCompositeDefinition(`
        type MyModel @createModel(description: "Test model", accountRelation: SET, accountRelationFields: []) {
          test: DID!
        }
      `)
      }).toThrow(
        'The accountRelationFields argument must specify at least one field for @createModel directive on object MyModel',
      )
    })

    test('throws if a field defined in the relationAccountFields argument is not present in the schema', () => {
      expect(() => {
        createAbstractCompositeDefinition(`
        type MyModel @createModel(description: "Test model", accountRelation: SET, accountRelationFields: ["foo"]) {
          test: DID!
        }
      `)
      }).toThrow(
        'Missing property foo defined in accountRelationFields argument for @createModel directive on object MyModel',
      )
    })

    test('throws if a field defined in the relationAccountFields argument is not required', () => {
      expect(() => {
        createAbstractCompositeDefinition(`
        type MyModel @createModel(description: "Test model", accountRelation: SET, accountRelationFields: ["foo", "bar"]) {
          foo: DID!
          bar: DID
        }
      `)
      }).toThrow(
        'Property bar defined in accountRelationFields argument for @createModel directive on object MyModel must have a required value',
      )
    })

    test('throws if a field defined in the relationAccountFields argument is not a scalar', () => {
      expect(() => {
        createAbstractCompositeDefinition(`
        type MyModel @createModel(description: "Test model", accountRelation: SET, accountRelationFields: ["foo", "bar"]) {
          foo: DID!
          bar: [DID!]! @list(maxLength: 5)
        }
      `)
      }).toThrow(
        'Property bar defined in accountRelationFields argument for @createModel directive on object MyModel must use an enum or scalar type',
      )
    })

    test('validates with supported scalar types', () => {
      const def = createAbstractCompositeDefinition(`
        enum TestEnum {
          ONE
          TWO
          THREE
        }

        type TestModel @createModel(description: "Test model", accountRelation: SET, accountRelationFields: ["boolean", "float", "int", "string", "enum", "date", "did", "streamid", "commitid"]) {
          boolean: Boolean!
          float: Float!
          int: Int!
          string: String! @string(maxLength: 10)
          enum: TestEnum!
          date: Date!
          did: DID!
          streamid: StreamID!
          commitid: CommitID!
        }
      `)
      expect(def).toMatchObject({
        models: {
          TestModel: {
            action: 'create',
            indices: [],
            model: {
              name: 'TestModel',
              description: 'Test model',
              accountRelation: {
                type: 'set',
                fields: [
                  'boolean',
                  'float',
                  'int',
                  'string',
                  'enum',
                  'date',
                  'did',
                  'streamid',
                  'commitid',
                ],
              },
            },
          },
        },
      })
    })
  })
})
