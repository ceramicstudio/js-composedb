import { Command, type CommandFlags } from '../../command.js'
import { Args } from '@oclif/core'
import { ComposeClient } from '@composedb/client'
import { RuntimeCompositeDefinition } from '@composedb/types'
import fs from 'fs-extra'

export default class Execute extends Command<
  CommandFlags,
  { query: string; vars: Record<string, any> }
> {
  static description = 'execute a GraphQL query or mutation'

  static args = {
    query: Args.string({
      required: true,
      description: 'GraphQL query or mutation',
    }),
    vars: Args.custom({
      required: false,
      description:
        'variables as JSON to provide to a mutation. A "did" variable is always added that is the DID from the environment.',
      parse: (input) => Promise.resolve(JSON.parse(input)),
    })(),
  }

  static flags = {
    ...Command.flags,
    runtimeDefinitionPath: Args.string({
      required: false,
      description: 'path to runtime-composite definition json file',
    }),
  }

  async run(): Promise<void> {
    this.spinner.start('Executing GraphQL...')
    try {
      const runtimeDefinitionPath =
        (this.flags.runtimeDefinitionPath as string) || 'runtime-composite.json'
      const runtimeDefinitionFile = await fs.readFile(runtimeDefinitionPath)
      const definition = JSON.parse(runtimeDefinitionFile.toString()) as RuntimeCompositeDefinition
      const compose = new ComposeClient({ ceramic: this.ceramic, definition })
      compose.setDID(this.authenticatedDID)
      const vars = {
        ...this.args.vars,
        did: compose.id,
      }
      this.log(JSON.stringify(await compose.executeQuery(this.args.query, vars), undefined, '  '))
      this.spinner.succeed(`Executing GraphQL... Done!`)
    } catch (e) {
      console.log((e as Error).stack)
      this.spinner.fail((e as Error).message)
    }
  }
}
