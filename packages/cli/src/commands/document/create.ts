import { Command, type CommandFlags } from '../../command.js'
import { Args } from '@oclif/core'
import { ModelInstanceDocument } from '@ceramicnetwork/stream-model-instance'
import { StreamID } from '@ceramicnetwork/streamid'

export default class CreateDocument extends Command<
  CommandFlags,
  { model: StreamID; content: any }
> {
  static description = 'create a model instance document stream from content encoded as JSON'

  static args = {
    model: Args.custom({
      required: true,
      description: 'StreamID of the model whose instance is being created',
      parse: (input) => Promise.resolve(StreamID.fromString(input)),
    })(),
    content: Args.custom({
      required: true,
      description: 'Content of the created model instance document (JSON encoded as string)',
      parse: (input) => Promise.resolve(JSON.parse(input)),
    })(),
  }

  async run(): Promise<void> {
    this.spinner.start('Creating the model instance document...')
    try {
      const mid = await ModelInstanceDocument.create(this.ceramic, this.args.content, {
        controller: this.authenticatedDID.id,
        model: this.args.model,
      })
      this.spinner.succeed(`Creating the model instance document... Done!`)
      // Logging the stream id to stdout, so that it can be piped using standard I/O or redirected to a file
      this.log(mid.id.toString())
    } catch (e) {
      this.spinner.fail((e as Error).message)
    }
  }
}
