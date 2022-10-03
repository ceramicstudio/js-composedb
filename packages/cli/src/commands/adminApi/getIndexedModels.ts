import { Command, type CommandFlags } from '../../command.js'
import { Flags } from '@oclif/core'

type Flags = CommandFlags & {
  output?: string
}

export default class GetIndexedModels extends Command<Flags> {
  static description =
    'get the list of ids of models indexed on the node'


  static flags = {
    ...Command.flags,
  }

  async run(): Promise<void> {
    try {
      this.spinner.start("Fetching indexed models...")
      const indexedModels = await  this.ceramic.admin.getIndexedModels(this.ceramic.did!)
      this.spinner.succeed(`Models indexed on the node: ${indexedModels.map(String)}`)
    } catch (e) {
      console.error(e)
      this.spinner.fail((e as Error).message)
      return
    }
  }
}
