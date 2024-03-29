import { Model } from '@ceramicnetwork/stream-model'
import {
  Command,
  parseSyncFlag,
  type QueryCommandFlags,
  STREAM_ID_ARG,
  SYNC_OPTION_FLAG,
} from '../../command.js'
import { Flags } from '@oclif/core'
import { write } from '../../fs.js'

type ModelContentFlags = QueryCommandFlags & {
  output?: string
}

export default class ModelContent extends Command<ModelContentFlags, { streamId: string }> {
  static description = 'load a model stream with a given stream id and display its contents'

  static args = { streamId: STREAM_ID_ARG }

  static flags = {
    ...Command.flags,
    output: Flags.string({
      char: 'o',
      description: 'path to the file where the composite representation should be saved',
    }),

    sync: SYNC_OPTION_FLAG,
  }

  async run(): Promise<void> {
    try {
      this.spinner.start('Loading model...')
      const model = await Model.load(this.ceramic, this.args.streamId, {
        sync: parseSyncFlag(this.flags.sync),
      })
      if (this.flags.output != null) {
        const output = this.flags.output
        await write(output, model.content)
        this.spinner.succeed(`Loading model... Done! The content was saved in ${output}`)
      } else {
        this.spinner.succeed(`Loading model... Done!`)
        // Logging the content to stdout, so that it can be piped using standard I/O or redirected to a file
        this.log(JSON.stringify(model.content))
      }
    } catch (e) {
      this.spinner.fail((e as Error).message)
      return
    }
  }
}
