import { execa } from 'execa'

const MY_MODEL_JSON =
  '{"name":"MyModel","accountRelation":"list","schema":{"$schema":"https://json-schema.org/draft/2020-12/schema","type":"object","properties":{"stringPropName":{"type":"string","maxLength":80}},"additionalProperties":false,"required":["stringPropName"]}}'

const MODEL_INSTANCE_JSON = '{"stringPropName":"stringPropValue"}'

const REPLACED_MODEL_INSTANCE_JSON = '{"stringPropName":"updatedStringPropValue"}'

describe('documents', () => {
  const modelAccountSeed = '476e1fd8124d0c09f0b764b396bfcbf43e8817b2e81a131f88f4bdd35fbdb8b8'
  const midAccountSeed = '5c51566adf1d050e3048dd79be47c256925f0ea4232084cf064836e68f8316e5'
  let modelStreamID: string

  beforeAll(async () => {
    const create = await execa('bin/run.js', [
      'model:create',
      MY_MODEL_JSON,
      `--did-private-key=${modelAccountSeed}`,
    ])
    modelStreamID = create.stdout.toString().trim()
  }, 60000)

  describe('document:create', () => {
    test('model instance document creation fails without the content param', async () => {
      await expect(execa('bin/run.js', ['document:create'])).rejects.toThrow(
        /Content of the created model instance document/
      )
    }, 60000)

    test('model instance document creation fails without the model param', async () => {
      await expect(execa('bin/run.js', ['document:create'])).rejects.toThrow(
        /StreamID of the model whose instance is being created/
      )
    }, 60000)

    test('model instance document creation fails without the did-key param', async () => {
      const create = await execa('bin/run.js', [
        'document:create',
        modelStreamID,
        MODEL_INSTANCE_JSON,
      ])
      const lines = create.stderr.toString().split('\n')
      expect(
        lines[1].includes(
          'DID is not authenticated, make sure to provide a private key using the "did-private-key" flag'
        )
      ).toBe(true)
    }, 60000)

    test('model instance document creation succeeds', async () => {
      const create = await execa('bin/run.js', [
        'document:create',
        modelStreamID,
        MODEL_INSTANCE_JSON,
        `--did-private-key=${modelAccountSeed}`,
      ])
      expect(
        create.stderr.toString().includes('Creating the model instance document... Done!')
      ).toBe(true)
    }, 60000)
  })

  describe('document:replace', () => {
    let midStreamID: string

    beforeAll(async () => {
      const create = await execa('bin/run.js', [
        'document:create',
        modelStreamID,
        MODEL_INSTANCE_JSON,
        `--did-private-key=${midAccountSeed}`,
      ])
      midStreamID = create.stdout.toString().trim()
    }, 60000)

    test('model instance document replace fails without the streamID', async () => {
      await expect(execa('bin/run.js', ['document:replace'])).rejects.toThrow(
        /streamId {2}ID of the stream/
      )
    }, 60000)

    test('model instance document replace fails without the content param', async () => {
      await expect(execa('bin/run.js', ['document:replace'])).rejects.toThrow(
        /New content of the model instance document/
      )
    }, 60000)

    test('model instance document replace fails without the did-key param', async () => {
      const replace = await execa('bin/run.js', [
        'document:replace',
        midStreamID,
        REPLACED_MODEL_INSTANCE_JSON,
      ])
      expect(replace.stderr.toString().includes('No DID provided')).toBe(true)
    }, 60000)

    test('model instance document replace succeeds', async () => {
      const replace = await execa('bin/run.js', [
        'document:replace',
        midStreamID,
        REPLACED_MODEL_INSTANCE_JSON,
        `--did-private-key=${midAccountSeed}`,
      ])
      expect(
        replace.stderr
          .toString()
          .includes('Replacing content in the model instance document... Done!')
      ).toBe(true)
    }, 60000)
  })

  describe('document:content', () => {
    test('model instance document content display fails without the streamID', async () => {
      await expect(execa('bin/run.js', ['document:content'])).rejects.toThrow(
        /streamId {2}ID of the stream/
      )
    }, 60000)

    test('model instance document content display succeeds', async () => {
      const create = await execa('bin/run.js', [
        'document:create',
        modelStreamID,
        MODEL_INSTANCE_JSON,
        `--did-private-key=${midAccountSeed}`,
      ])

      const content = await execa('bin/run.js', [
        `document:content`,
        create.stdout.toString().trim(),
        `--sync=sync-always`,
      ])
      expect(content.stdout.toString().includes('"stringPropName":"stringPropValue"')).toBe(true)
    }, 60000)
  })
})
