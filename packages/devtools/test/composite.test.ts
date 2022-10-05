/**
 * @jest-environment composedb
 */

import type { CeramicApi } from '@ceramicnetwork/common'
import { StreamID } from '@ceramicnetwork/streamid'
import {
  ImageMetadataType,
  createCommentSchemaWithPost,
  loadPostSchemaWithComments,
  postSchema,
  profilesSchema,
} from '@composedb/test-schemas'
import type { ModelDefinition } from '@composedb/types'
import { jest } from '@jest/globals'

import { Composite, type CompositeParams } from '../src'

declare global {
  const ceramic: CeramicApi
}

describe('composite', () => {
  describe('Composite instance', () => {
    describe('constructor()', () => {
      test('throws if the version is not compatible', () => {
        expect(
          () => new Composite({ commits: {}, definition: { version: '2.0', models: {} } })
        ).toThrow('Unsupported Composite version 2.0, expected version 1.0')
      })

      test('throws if commits do not match the definition models', () => {
        expect(() => {
          new Composite({
            commits: { fooID: [] },
            definition: {
              version: '1.1',
              models: {
                fooID: {} as unknown as ModelDefinition,
                barID: {} as unknown as ModelDefinition,
              },
            },
          })
        }).toThrow('Missing commits for model barID')
      })
    })

    test('hash() getter returns a stable hash', () => {
      const source = new Composite({
        commits: { fooID: [], barID: [] },
        definition: {
          version: '1.0',
          models: {
            fooID: { name: 'Foo', accountRelation: { type: 'single' }, schema: {} },
            barID: { name: 'Bar', accountRelation: { type: 'single' }, schema: {} },
          },
          aliases: { fooID: 'Test', barID: 'Other' },
        },
      })
      const hash = source.hash
      const clone = new Composite(source.toParams())
      expect(clone.hash).toBe(hash)
      expect(source.hash).toBe(hash)
    })

    test('modelIDs() getter returns the list of model IDs', () => {
      const composite = new Composite({
        commits: { fooID: [], barID: [] },
        definition: {
          version: '1.0',
          models: {
            fooID: { name: 'Foo', accountRelation: { type: 'single' }, schema: {} },
            barID: { name: 'Bar', accountRelation: { type: 'single' }, schema: {} },
          },
        },
      })
      expect(composite.modelIDs).toEqual(['fooID', 'barID'])
    })

    describe('equals()', () => {
      const params: CompositeParams = {
        commits: { fooID: [], barID: [] },
        definition: {
          version: '1.0',
          models: {
            fooID: { name: 'Foo', accountRelation: { type: 'single' }, schema: {} },
            barID: { name: 'Bar', accountRelation: { type: 'single' }, schema: {} },
          },
          aliases: { fooID: 'Test', barID: 'Other' },
        },
      }
      const source = new Composite(params)

      test('with CompositeParams', () => {
        expect(source.equals(params)).toBe(true)
        expect(source.equals({ commits: {}, definition: { version: '1.0', models: {} } })).toBe(
          false
        )
      })

      test('with Composite instance', () => {
        const clone = new Composite(source.toParams())
        expect(source.equals(clone)).toBe(true)
        expect(source.equals(source.setAliases({ fooID: 'Test' }))).toBe(true)
        expect(source.equals(source.setAliases({ bazID: 'Baz' }))).toBe(false)
      })
    })

    test('toJSON() returns a JSON-encoded composite', () => {
      const composite = new Composite({ commits: {}, definition: { version: '1.0', models: {} } })
      const encoded = composite.toJSON()
      expect(encoded).toMatchSnapshot()
    })

    test('toParams() returns copies of the Composite commits and definition', () => {
      const inputParams = { commits: {}, definition: { version: '1.0', models: {} } }
      const composite = new Composite(inputParams)
      expect(composite.toParams()).toMatchObject(inputParams)
    })

    test('toRuntime() returns the runtime definition for the Composite', () => {
      const composite = new Composite({ commits: {}, definition: { version: '1.0', models: {} } })
      const runtime = composite.toRuntime()
      expect(runtime).toMatchSnapshot()
    })

    describe('copy() creates a copy of the composite with only selected models', () => {
      const source = new Composite({
        commits: { fooID: [], barID: [] },
        definition: {
          version: '1.0',
          models: {
            fooID: { name: 'Foo', accountRelation: { type: 'single' }, schema: {} },
            barID: { name: 'Bar', accountRelation: { type: 'single' }, schema: {} },
          },
          aliases: { fooID: 'Test', barID: 'Other' },
        },
      })

      test('throws an error if no model is set', () => {
        expect(() => {
          source.copy([])
        }).toThrow('Missing models to copy')
      })

      test('throws an error if a model is not found', () => {
        expect(() => {
          source.copy(['unknown'])
        }).toThrow('Model not found: unknown')
      })

      test('identifies models by ID', () => {
        const copy = source.copy(['fooID'])
        expect(copy.toParams()).toEqual({
          commits: { fooID: [] },
          definition: {
            version: '1.0',
            models: {
              fooID: { name: 'Foo', accountRelation: { type: 'single' }, schema: {} },
            },
            aliases: { fooID: 'Test' },
            commonEmbeds: [],
            views: { account: {}, models: {}, root: {} },
          },
        })
      })

      test('identifies models by name', () => {
        const copy = source.copy(['Foo'])
        expect(copy.toParams()).toEqual({
          commits: { fooID: [] },
          definition: {
            version: '1.0',
            models: {
              fooID: { name: 'Foo', accountRelation: { type: 'single' }, schema: {} },
            },
            aliases: { fooID: 'Test' },
            commonEmbeds: [],
            views: { account: {}, models: {}, root: {} },
          },
        })
      })

      test('identifies models by alias', () => {
        const copy = source.copy(['Test'])
        expect(copy.toParams()).toEqual({
          commits: { fooID: [] },
          definition: {
            version: '1.0',
            models: {
              fooID: { name: 'Foo', accountRelation: { type: 'single' }, schema: {} },
            },
            aliases: { fooID: 'Test' },
            commonEmbeds: [],
            views: { account: {}, models: {}, root: {} },
          },
        })
      })
    })

    describe('setAliases()', () => {
      test('merging with existing', () => {
        const source = new Composite({
          commits: {},
          definition: { version: '1.0', models: {}, aliases: { fooID: 'foo', barID: 'bar' } },
        })
        const copy = source.setAliases({ barID: 'test', bazID: 'baz' })
        expect(source.toParams().definition.aliases).toEqual({ fooID: 'foo', barID: 'bar' })
        expect(copy.toParams().definition.aliases).toEqual({
          fooID: 'foo',
          barID: 'test',
          bazID: 'baz',
        })
      })

      test('replacing existing', () => {
        const source = new Composite({
          commits: {},
          definition: { version: '1.0', models: {}, aliases: { fooID: 'foo', barID: 'bar' } },
        })
        const copy = source.setAliases({ barID: 'test', bazID: 'baz' }, true)
        expect(source.toParams().definition.aliases).toEqual({ fooID: 'foo', barID: 'bar' })
        expect(copy.toParams().definition.aliases).toEqual({ barID: 'test', bazID: 'baz' })
      })
    })

    describe('setCommonEmbeds()', () => {
      test('merging with existing', () => {
        const source = new Composite({
          commits: {},
          definition: { version: '1.0', models: {}, commonEmbeds: ['Foo', 'Bar'] },
        })
        const copy = source.setCommonEmbeds(['Bar', 'Baz'])
        expect(source.toParams().definition.commonEmbeds).toEqual(['Foo', 'Bar'])
        expect(copy.toParams().definition.commonEmbeds).toEqual(['Foo', 'Bar', 'Baz'])
      })

      test('replacing existing', () => {
        const source = new Composite({
          commits: {},
          definition: { version: '1.0', models: {}, commonEmbeds: ['Foo', 'Bar'] },
        })
        const copy = source.setCommonEmbeds(['Bar', 'Baz'], true)
        expect(source.toParams().definition.commonEmbeds).toEqual(['Foo', 'Bar'])
        expect(copy.toParams().definition.commonEmbeds).toEqual(['Bar', 'Baz'])
      })
    })

    describe('setViews()', () => {
      test('merging with existing', () => {
        const source = new Composite({
          commits: {},
          definition: {
            version: '1.0',
            models: {},
            views: {
              account: { foo: {} },
              models: {
                model: {
                  foo: {
                    type: 'relationFrom',
                    model: 'foo',
                    property: 'foo',
                  },
                  bar: {
                    type: 'relationFrom',
                    model: 'bar',
                    property: 'bar',
                  },
                },
              },
              root: { foo: {} },
            },
          },
        })
        const copy = source.setViews({
          account: {},
          models: {
            model: {
              bar: {
                type: 'relationFrom',
                model: 'test',
                property: 'test',
              },
            },
          },
          root: { foo: 'test', bar: 'test' },
        })
        expect(source.toParams().definition.views).toEqual({
          account: { foo: {} },
          models: {
            model: {
              foo: {
                type: 'relationFrom',
                model: 'foo',
                property: 'foo',
              },
              bar: {
                type: 'relationFrom',
                model: 'bar',
                property: 'bar',
              },
            },
          },
          root: { foo: {} },
        })
        expect(copy.toParams().definition.views).toEqual({
          account: { foo: {} },
          models: {
            model: {
              foo: {
                type: 'relationFrom',
                model: 'foo',
                property: 'foo',
              },
              bar: {
                type: 'relationFrom',
                model: 'test',
                property: 'test',
              },
            },
          },
          root: { foo: 'test', bar: 'test' },
        })
      })
    })

    describe('merge() merges composites into the instance', () => {
      test('supports Composite instances and params inputs', () => {
        const source = new Composite({
          commits: { fooID: [] },
          definition: {
            version: '1.0',
            models: {
              fooID: { name: 'Foo', accountRelation: { type: 'single' }, schema: {} },
            },
          },
        })
        const otherInstance = new Composite({
          commits: { barID: [] },
          definition: {
            version: '1.0',
            models: {
              barID: { name: 'Bar', accountRelation: { type: 'single' }, schema: {} },
            },
          },
        })
        const otherParams: CompositeParams = {
          commits: { bazID: [] },
          definition: {
            version: '1.0',
            models: {
              bazID: { name: 'Baz', accountRelation: { type: 'single' }, schema: {} },
            },
            aliases: { bazID: 'Test' },
          },
        }
        const composite = source.merge([otherInstance, otherParams])
        expect(composite.toParams()).toEqual({
          commits: { fooID: [], barID: [], bazID: [] },
          definition: {
            version: '1.0',
            models: {
              fooID: { name: 'Foo', accountRelation: { type: 'single' }, schema: {} },
              barID: { name: 'Bar', accountRelation: { type: 'single' }, schema: {} },
              bazID: { name: 'Baz', accountRelation: { type: 'single' }, schema: {} },
            },
            aliases: { bazID: 'Test' },
            commonEmbeds: [],
            views: {
              account: {},
              models: {},
              root: {},
            },
          },
        })
      })

      test('throws if any input uses an unsupported version', () => {
        const composite = new Composite({ commits: {}, definition: { version: '1.0', models: {} } })
        const other = { commits: {}, definition: { version: '2.0', models: {} } }
        expect(() => composite.merge(other)).toThrow(
          'Unsupported Composite version 2.0, expected version 1.0'
        )
      })

      test('throws if any input does not have matching commits', () => {
        const composite = new Composite({ commits: {}, definition: { version: '1.0', models: {} } })
        const other: CompositeParams = {
          commits: {},
          definition: {
            version: '1.5',
            models: {
              fooID: { name: 'Foo', accountRelation: { type: 'single' }, schema: {} },
            },
          },
        }
        expect(() => composite.merge(other)).toThrow('Missing commits for model fooID')
      })

      test('with aliases', () => {
        const source = new Composite({ commits: {}, definition: { version: '1.0', models: {} } })
        const composite = source.merge(
          [
            {
              commits: {},
              definition: { version: '1.0', models: {}, aliases: { fooID: 'Foo', barID: 'Bar' } },
            },
            {
              commits: {},
              definition: { version: '1.0', models: {}, aliases: { barID: 'Test', bazID: 'Baz' } },
            },
          ],
          { aliases: { bazID: 'Test' } }
        )
        expect(composite.toParams().definition.aliases).toEqual({
          fooID: 'Foo',
          barID: 'Test',
          bazID: 'Test',
        })
      })

      test('with no common embeds (default)', () => {
        const source = new Composite({ commits: {}, definition: { version: '1.0', models: {} } })
        const composite = source.merge([
          {
            commits: {},
            definition: { version: '1.0', models: {}, commonEmbeds: ['Foo', 'Bar'] },
          },
          { commits: {}, definition: { version: '1.0', models: {} } },
        ])
        expect(composite.toParams().definition.commonEmbeds).toHaveLength(0)
      })

      test('with all common embeds', () => {
        const source = new Composite({ commits: {}, definition: { version: '1.0', models: {} } })
        const composite = source.merge(
          [
            {
              commits: {},
              definition: { version: '1.0', models: {}, commonEmbeds: ['Foo', 'Bar'] },
            },
            {
              commits: {},
              definition: { version: '1.0', models: {}, commonEmbeds: ['Bar', 'Baz'] },
            },
          ],
          { commonEmbeds: 'all' }
        )
        expect(composite.toParams().definition.commonEmbeds).toEqual(['Foo', 'Bar', 'Baz'])
      })

      test('with specific common embeds', () => {
        const source = new Composite({ commits: {}, definition: { version: '1.0', models: {} } })
        const composite = source.merge(
          [
            {
              commits: {},
              definition: { version: '1.0', models: {}, commonEmbeds: ['Foo', 'Bar'] },
            },
            {
              commits: {},
              definition: { version: '1.0', models: {}, commonEmbeds: ['Bar', 'Baz'] },
            },
          ],
          { commonEmbeds: ['Some', 'Other'] }
        )
        expect(composite.toParams().definition.commonEmbeds).toEqual(['Some', 'Other'])
      })

      test('with views', () => {
        const source = new Composite({ commits: {}, definition: { version: '1.0', models: {} } })
        const composite = source.merge(
          [
            {
              commits: {},
              definition: {
                version: '1.0',
                models: {},
                views: { account: { foo: {} }, models: {}, root: {} },
              },
            },
            {
              commits: {},
              definition: {
                version: '1.0',
                models: {},
                views: { account: { bar: {} }, models: {}, root: { foo: {} } },
              },
            },
          ],
          { views: { account: {}, models: {}, root: { foo: 'test' } } }
        )
        expect(composite.toParams().definition.views).toEqual({
          account: { foo: {}, bar: {} },
          models: {},
          root: { foo: 'test' },
        })
      })
    })
  })

  test('startIndexingOn() calls the admin API to index the models', async () => {
    const startIndexingModels = jest.fn()
    const mockCeramic = { admin: { startIndexingModels } } as unknown as CeramicApi

    const modelID = 'kjzl6hvfrbw6ca7nidsnrv78x7r4xt0xki71nvwe4j5a3s9wgou8yu3aj8cz38e'
    const composite = new Composite({
      commits: { [modelID]: [] },
      definition: {
        version: '1.0',
        models: {
          [modelID]: {
            name: 'Foo',
            accountRelation: { type: 'single' },
            schema: {},
          },
        },
      },
    })

    await composite.startIndexingOn(mockCeramic)
    expect(startIndexingModels).toHaveBeenCalledWith([expect.any(StreamID)])
  })

  test('Composite.from() merges composites into a new instance', () => {
    const first: CompositeParams = {
      commits: { fooID: [] },
      definition: {
        version: '1.0',
        commonEmbeds: ['First'],
        models: {
          fooID: { name: 'Foo', accountRelation: { type: 'single' }, schema: {} },
        },
      },
    }
    const second: CompositeParams = {
      commits: { barID: [] },
      definition: {
        version: '1.0',
        commonEmbeds: ['First', 'Second'],
        models: {
          barID: { name: 'Bar', accountRelation: { type: 'single' }, schema: {} },
        },
      },
    }
    const third: CompositeParams = {
      commits: { bazID: [] },
      definition: {
        version: '1.0',
        models: {
          bazID: { name: 'Baz', accountRelation: { type: 'single' }, schema: {} },
        },
        aliases: { bazID: 'Test' },
      },
    }
    const composite = Composite.from([new Composite(first), second, third], {
      commonEmbeds: 'all',
    })
    const params = composite.toParams()
    expect(params).toEqual({
      commits: { fooID: [], barID: [], bazID: [] },
      definition: {
        version: '1.0',
        models: {
          fooID: { name: 'Foo', accountRelation: { type: 'single' }, schema: {} },
          barID: { name: 'Bar', accountRelation: { type: 'single' }, schema: {} },
          bazID: { name: 'Baz', accountRelation: { type: 'single' }, schema: {} },
        },
        aliases: { bazID: 'Test' },
        commonEmbeds: ['First', 'Second'],
        views: {
          account: {},
          models: {},
          root: {},
        },
      },
    })
    // Source composites should not be altered
    expect(params).not.toEqual(first)
    expect(params).not.toEqual(second)
    expect(params).not.toEqual(third)
  })

  describe('Composite.create()', () => {
    test('creates a new composite from valid schema', async () => {
      const composite = await Composite.create({ ceramic, schema: profilesSchema })
      expect(composite.hash).toBeDefined()
      const compositeParams = composite.toParams()
      expect(Object.keys(compositeParams.commits).length).toEqual(3)
      const modelNames = ['GenericProfile', 'SocialProfile', 'PersonProfile']
      Object.values(compositeParams.definition.models).map((modelDefinition: ModelDefinition) => {
        const index = modelNames.indexOf(modelDefinition.name)
        expect(index).toBeGreaterThan(-1)
        modelNames.splice(index, 1)
      })
      expect(modelNames.length).toEqual(0)
    }, 60000)

    test('fails to create a new composite from invalid schema', async () => {
      await expect(async () => {
        await Composite.create({ ceramic, schema: ImageMetadataType })
      }).rejects.toThrow('No models found in Composite Definition Schema')
    })
  })

  test.todo('Composite.fromJSON()')

  test.todo('Composite.fromModels()')

  test('Relations support', async () => {
    const postComposite = await Composite.create({ ceramic, schema: postSchema })
    const postID = postComposite.modelIDs[0]
    expect(postID).toBeDefined()

    const postAndCommentComposite = await Composite.create({
      ceramic,
      schema: createCommentSchemaWithPost(postID),
    })
    const commentID = postAndCommentComposite.modelIDs.find((id) => id !== postID)
    expect(commentID).toBeDefined()

    const postWithCommentComposite = await Composite.create({
      ceramic,
      schema: loadPostSchemaWithComments(postID, commentID as string),
    })
    expect(postWithCommentComposite.modelIDs).toHaveLength(2)
  }, 60000)
})
