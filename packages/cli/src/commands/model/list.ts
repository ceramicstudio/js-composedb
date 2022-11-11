import { BaseCommand, type QueryCommandFlags } from '../../command.js'
import { Flags, CliUx } from '@oclif/core'
import { Model } from '@ceramicnetwork/stream-model'
import Table from 'cli-table3'
import { Edge, Page, PageInfo, StreamState } from '@ceramicnetwork/common'
import terminalSize from 'term-size'
import { CeramicClient } from '@ceramicnetwork/http-client'

type PartialModelDefinition = {
  id: string
  name: string
  description: string
}

type ModelListFlags = QueryCommandFlags & {
  'indexer-url': string
  table?: boolean
}

export default class ModelList extends BaseCommand<ModelListFlags> {
  fetchedFields: Array<PartialModelDefinition> = []
  lastLoadedPageInfo: PageInfo | null = null

  static description = 'load a list of models with pagination'

  static flags = {
    ...BaseCommand.flags,
    'indexer-url': Flags.string({
      default: 'https://ceramic-private-clay.3boxlabs.com',
      char: 'i',
      description: 'URL of a Ceramic API that indexes all models',
    }),
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
      this.spinner.start('Loading models...')
      const ceramicIndexer = new CeramicClient(this.flags['indexer-url'])
      const page = await ceramicIndexer.index.query({
        first: this.getPageSize(),
        model: Model.MODEL,
      })
      this.lastLoadedPageInfo = page.pageInfo
      this.fetchedFields = this.fetchedFields.concat(
        this.getFieldsFromEdges(ceramicIndexer, page.edges)
      )
      this.displayPartialDefinitions(this.fetchedFields)

      while (this.lastLoadedPageInfo?.hasNextPage) {
        this.spinner.stop()
        await this.anykeyWithFriendlyExit(
          'Press ctrl+c or q to quit. Press any other key to continue loading models.',
          'Stopped loading models due to user input'
        )
        this.spinner.start('Loading models...')
        const nextPage: Page<StreamState | null> = await ceramicIndexer.index.query({
          first: this.getPageSize(),
          model: Model.MODEL,
          after: this.lastLoadedPageInfo?.endCursor,
        })
        this.lastLoadedPageInfo = nextPage.pageInfo
        this.fetchedFields = this.fetchedFields.concat(
          this.getFieldsFromEdges(ceramicIndexer, nextPage.edges)
        )
        this.displayPartialDefinitions(this.fetchedFields)
      }
      this.spinner.succeed('Loading models... Done')
    } catch (e) {
      this.spinner.fail((e as Error).message)
      return
    }
  }

  async anykeyWithFriendlyExit(message: string, exitMessage?: string): Promise<void> {
    const tty = process.stdin.setRawMode !== undefined
    const char = await CliUx.ux.prompt(message, { type: 'single', required: false })
    if (tty) process.stderr.write('\n')
    if (char === 'q' || char === '\u0003') {
      this.spinner.succeed(exitMessage)
      process.exit()
    }
  }

  getFieldsFromEdges(
    ceramicIndexer: CeramicClient,
    edges: Array<Edge<StreamState | null>>
  ): Array<PartialModelDefinition> {
    return edges
      .map((edge) => {
        if (edge?.node == null) {
          return null
        }
        const stream = ceramicIndexer.buildStreamFromState(edge.node)
        return {
          id: stream.id.toString(),
          name: (stream.content as Record<string, any>).name as string,
          description: (stream.content as Record<string, any>).description as string,
        }
      })
      .filter(Boolean) as Array<PartialModelDefinition>
  }

  displayPartialDefinitions(definitions: Array<PartialModelDefinition>): void {
    console.clear()
    if (this.flags.table === true) {
      const table = new Table({
        head: ['#', 'Name', 'ID', 'Description'],
        colWidths: [4, 32, 65, 100],
      })
      definitions.forEach((definition, index) => {
        table.push([index + 1, definition.name, definition.id.toString(), definition.description])
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
