import { execa } from 'execa'

describe('graphql', () => {
  describe('graphql:schema', () => {
    test('printing graphql schema fails without runtime definition path pram', async () => {
      const schema = await execa('bin/run.js', ['graphql:schema'])
      expect(
        schema.stderr
          .toString()
          .includes(
            'You need to pass a composite runtime definition path either as an argument or via stdin'
          )
      ).toBe(true)
    }, 60000)

    test('printing graphql schema succeeds', async () => {
      const schema = await execa('bin/run.js', [
        'graphql:schema',
        'test/mocks/runtime.composite.picture.post.json',
      ])
      expect(schema.stdout.toString()).toMatchSnapshot()
    }, 60000)

    test('printing graphql schema succeeds with --readonly flag', async () => {
      const schema = await execa('bin/run.js', [
        'graphql:schema',
        'test/mocks/runtime.composite.picture.post.json',
        '--readonly',
      ])
      expect(schema.stdout.toString()).toMatchSnapshot()
    }, 60000)
  })

  describe('graphql:server', () => {
    test('graphql server fails without runtime definition path pram', async () => {
      const schema = await execa('bin/run.js', ['graphql:server'])
      expect(
        schema.stderr
          .toString()
          .includes(
            'You need to pass a composite runtime definition path either as an argument or via stdin'
          )
      ).toBe(true)
    }, 60000)
  })
})
