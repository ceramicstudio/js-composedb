import { Command, type CommandFlags } from '../../command.js'
import { Args, Flags, ux } from '@oclif/core'
import Table, { Cell } from 'cli-table3'
import { Edge, Page, PageInfo, StreamState } from '@ceramicnetwork/common'
import terminalSize from 'terminal-size'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { StreamID } from '@ceramicnetwork/streamid'

type PartialDocumentDefinition = {
  id: string
  controller: string,
  content: any
}

type DocumentListFlags = CommandFlags & {
  table?: boolean
}

export default class DocumentList extends Command<DocumentListFlags, { model: StreamID }> {
  fetchedFields: Array<PartialDocumentDefinition> = []
  lastLoadedPageInfo: PageInfo | null = null

  static description = 'load a list of documents for a model with pagination'

  static args = {
    model: Args.custom({
      required: true,
      description: 'StreamID of the model containing documents',
      parse: (input) => Promise.resolve(StreamID.fromString(input)),
    })(),
  }

  static flags = {
    ...Command.flags,
    table: Flags.boolean({
      description: 'display the results as a table',
    }),
  }

  getPageSize(): number {
    const rows = terminalSize()['rows']
    // When we display a table, each row is takes two terminal rows. We subtract additional 3 lines per page, to leave
    // space for the table header and next page prompt
    return Math.round(Math.max(20, this.flags.table ? rows / 2 - 3 : rows))
  }

  async run(): Promise<void> {
    try {
      console.clear()
      this.spinner.start('Loading documents...')
      const page = await this.ceramic.index.query({
        first: this.getPageSize(),
        model: this.args.model,
      })
      this.lastLoadedPageInfo = page.pageInfo
      this.fetchedFields = this.fetchedFields.concat(
        this.getFieldsFromEdges(this.ceramic, page.edges),
      )
      this.displayPartialDefinitions(this.fetchedFields)

      while (this.lastLoadedPageInfo?.hasNextPage) {
        this.spinner.stop()
        await this.anykeyWithFriendlyExit(
          'Press ctrl+c or q to quit. Press any other key to continue loading documents.',
          'Stopped loading documents due to user input',
        )
        this.spinner.start('Loading documents...')
        const nextPage: Page<StreamState | null> = await this.ceramic.index.query({
          first: this.getPageSize(),
          model: this.args.model,
          after: this.lastLoadedPageInfo?.endCursor,
        })
        this.lastLoadedPageInfo = nextPage.pageInfo
        this.fetchedFields = this.fetchedFields.concat(
          this.getFieldsFromEdges(this.ceramic, nextPage.edges),
        )
        this.displayPartialDefinitions(this.fetchedFields)
      }
      this.spinner.succeed('Loading documents... Done')
    } catch (e) {
      this.spinner.fail((e as Error).message)
      return
    }
  }

  async anykeyWithFriendlyExit(message: string, exitMessage?: string): Promise<void> {
    const tty = process.stdin.setRawMode !== undefined
    const char = await ux.prompt(message, { type: 'single', required: false })
    if (tty) process.stderr.write('\n')
    if (char === 'q' || char === '\u0003') {
      this.spinner.succeed(exitMessage)
      process.exit()
    }
  }

  getFieldsFromEdges(
    ceramicIndexer: CeramicClient,
    edges: Array<Edge<StreamState | null>>,
  ): Array<PartialDocumentDefinition> {
    return edges
      .map((edge) => {
        if (edge?.node == null) {
          return null
        }
        const stream = ceramicIndexer.buildStreamFromState(edge.node)
        return {
          id: stream.id.toString(),
          controller: stream.metadata.controller,
          content: stream.state.content,
        }
      })
      .filter(Boolean) as Array<PartialDocumentDefinition>
  }

  displayPartialDefinitions(definitions: Array<PartialDocumentDefinition>): void {
    console.clear()
    if (this.flags.table === true) {
      const table = new Table({
        head: ['Id', 'Controller', 'Content'],
        colWidths: [32, 32, 52],
      })
      definitions.forEach((definition) => {
        table.push([
          { content: definition.id.toString() } as Cell,
          { content: definition.controller.toString() } as Cell,
          { content: JSON.stringify(definition.content) } as Cell,
        ])
      })
      // Not using the spinner here, so that the table is laid out properly
      this.log(`${table.toString()}\n`)
    } else {
      let output = ''
      definitions.forEach((definition) => {
        output += `${JSON.stringify(definition)}\n`
      })
      this.log(output)
    }
  }
}
