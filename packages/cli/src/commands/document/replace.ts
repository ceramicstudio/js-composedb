import { Command, type CommandFlags, STREAM_ID_ARG } from '../../command.js'
import { Args } from '@oclif/core'
import { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'

export default class DocumentReplace extends Command<
  CommandFlags,
  { streamId: string; content: any }
> {
  static description = 'replace content in a model instance document stream'

  static args = {
    streamId: STREAM_ID_ARG,
    content: Args.custom({
      required: true,
      description: 'New content of the model instance document (JSON encoded as string)',
      parse: (input) => Promise.resolve(JSON.parse(input)),
    })(),
  }

  async run(): Promise<void> {
    this.spinner.start('Replacing content in the model instance document...')
    try {
      const mid = await ModelInstanceDocument.load(this.ceramic, this.args.streamId)
      await mid.replace(this.args.content)
      this.spinner.succeed(`Replacing content in the model instance document... Done!`)
    } catch (e) {
      this.spinner.fail((e as Error).message)
    }
  }
}
