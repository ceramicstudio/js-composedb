import { Command, type CommandFlags } from '../../command.js'
import {StreamID} from "@ceramicnetwork/streamid";

export default class StopIndexingModel extends Command<CommandFlags, { modelID: string }> {
  static description =
    'stop indexing a model on the node'

  static args = [
    {
      name: 'modelID',
      required: true,
      description: 'An id of the model to stop indexing on the node',
    },
  ]

  static flags = {
    ...Command.flags,
  }

  async run(): Promise<void> {
    try {
      this.spinner.start(`Stopping indexing for model ${this.args.modelID}...`)
      await this.ceramic.admin.stopIndexingModels(this.ceramic.did!, [StreamID.fromString(this.args.modelID)])
      const indexedModels = await  this.ceramic.admin.getIndexedModels(this.ceramic.did!)
      this.spinner.succeed(`Models indexed on the node: ${indexedModels.map(String)}`)
    } catch (e) {
      console.error(e)
      this.spinner.fail((e as Error).message)
      return
    }
  }
}
