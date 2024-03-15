import { execa, ExecaChildProcess } from 'execa'

describe('graphql', () => {
  describe('graphql:schema', () => {
    test('printing graphql schema fails without runtime definition path pram', async () => {
      const schema = await execa('bin/run.js', ['graphql:schema'])
      expect(
        schema.stderr
          .toString()
          .includes(
            'You need to pass a composite runtime definition path either as an argument or via stdin',
          ),
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
    test('graphql server fails without runtime definition path param', async () => {
      const schema = await execa('bin/run.js', ['graphql:server'])
      expect(
        schema.stderr
          .toString()
          .includes(
            'You need to pass a composite runtime definition path either as an argument or via stdin',
          ),
      ).toBe(true)
    }, 60000)

    test('graphql server starts', async () => {
      const serverProcess = execa('bin/run.js', [
        'graphql:server',
        'test/mocks/runtime.composite.picture.post.json',
        '--port=62433',
      ])

      try {
        await new Promise<void>((resolve) => {
          serverProcess.stderr?.on('data', (data: Buffer) => {
            if (
              data
                .toString()
                .includes('GraphQL server is listening on http://localhost:62433/graphql')
            ) {
              resolve()
            }
          })
        })
      } finally {
        serverProcess.kill()
      }
    }, 60000)

    test('graphql server starts with --readonly flag', async () => {
      const serverProcess = execa('bin/run.js', [
        'graphql:server',
        'test/mocks/runtime.composite.picture.post.json',
        '--port=62610',
        '--readonly',
      ])

      try {
        await new Promise<void>((resolve) => {
          serverProcess.stderr?.on('data', (data: Buffer) => {
            if (
              data
                .toString()
                .includes('GraphQL server is listening on http://localhost:62610/graphql')
            ) {
              resolve()
            }
          })
        })
      } finally {
        serverProcess.kill()
      }
    }, 60000)
  })
  describe('graphql:execute', () => {
    const seed = 'bd019adffe40658f2261bfe72589fdf6b57727fa3878574d4202c5776bb8b357'
    test('graphql execute fails without query param', async () => {
      try {
        await execa('bin/run.js', ['graphql:execute'])
        // The command should have failed and not gotten to this line
        expect(false).toBe(true)
      } catch (e) {
        const proc = e as ExecaChildProcess
        // In the case of execa the thrown error is actually the process.
        // Allow conditional expect as we need to further expect properties of the thrown error.

        // eslint-disable-next-line jest/no-conditional-expect
        expect(proc.exitCode).not.toBe(0)
        // eslint-disable-next-line jest/no-conditional-expect
        expect(proc.stderr?.toString().includes('GraphQL query or mutation')).toBe(true)
      }
    }, 60000)

    test('graphql execute runs', async () => {
      // First deploy the composite
      await execa('bin/run.js', [
        'composite:deploy',
        'test/mocks/encoded.composite.picture.post.json',
        `--did-private-key=${seed}`,
      ])

      // Create a post
      const mutation = await execa('bin/run.js', [
        'graphql:execute',
        '--runtimeDefinitionPath',
        'test/mocks/runtime.composite.picture.post.json',
        `--did-private-key=${seed}`,
        `
        mutation CreatePost($i: CreatePostInput!) {
          createPost(input: $i) {
            document {
              text
            }
          }
        }
        `,
        JSON.stringify({ i: { content: { text: 'test post' } } }),
      ])
      expect(mutation.stdout.toString()).toBe(`{
  "data": {
    "createPost": {
      "document": {
        "text": "test post"
      }
    }
  }
}`)

      // Query the first post
      const query = await execa('bin/run.js', [
        'graphql:execute',
        '--runtimeDefinitionPath',
        'test/mocks/runtime.composite.picture.post.json',
        `--did-private-key=${seed}`,
        `
        query GetPosts {
          postIndex(first: 1) {
            edges {
              node {
                text
              }
            }
          }
        }
        `,
      ])
      expect(query.stdout.toString()).toBe(`{
  "data": {
    "postIndex": {
      "edges": [
        {
          "node": {
            "text": "test post"
          }
        }
      ]
    }
  }
}`)
    }, 60000)
  })
})
