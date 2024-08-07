import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  docs: [{ type: 'doc', id: 'introduction', label: 'Introduction' }],
  api: [
    {
      type: 'category',
      collapsed: false,
      label: 'Public APIs',
      link: { type: 'generated-index' },
      items: [
        { type: 'doc', id: 'api/modules/client', label: 'ComposeDB Client' },
        { type: 'doc', id: 'api/modules/runtime', label: 'ComposeDB Runtime' },
        { type: 'doc', id: 'api/modules/loader', label: 'ComposeDB Loader' },
        { type: 'doc', id: 'api/modules/server', label: 'ComposeDB Server' },
        { type: 'doc', id: 'api/classes/client.ComposeClient', label: 'ComposeClient class' },
        { type: 'doc', id: 'api/classes/runtime.ComposeRuntime', label: 'ComposeRuntime class' },
        { type: 'doc', id: 'api/classes/loader.DocumentLoader', label: 'DocumentLoader class' },
      ],
    },
    {
      type: 'category',
      collapsed: false,
      label: 'Developer tools',
      link: { type: 'generated-index' },
      items: [
        { type: 'doc', id: 'api/modules/devtools', label: 'Generic developer tools' },
        { type: 'doc', id: 'api/modules/devtools_node', label: 'Node.js developer tools' },
        { type: 'doc', id: 'api/classes/devtools.Composite', label: 'Composite class' },
      ],
    },
    {
      type: 'category',
      collapsed: false,
      label: 'CLI',
      link: { type: 'generated-index' },
      items: [
        { type: 'doc', id: 'api/modules/cli', label: 'Overview' },
        { type: 'doc', id: 'api/commands/cli.did', label: 'did commands' },
        { type: 'doc', id: 'api/commands/cli.composite', label: 'composite commands' },
        { type: 'doc', id: 'api/commands/cli.model', label: 'model commands' },
        { type: 'doc', id: 'api/commands/cli.graphql', label: 'graphql commands' },
      ],
    },
    {
      type: 'category',
      collapsed: false,
      label: 'Schema Definition',
      items: [
        { type: 'doc', id: 'api/sdl/scalars', label: 'Scalars' },
        { type: 'doc', id: 'api/sdl/directives', label: 'Directives' },
      ],
    },
    { type: 'doc', id: 'api/runtime/schema', label: 'Runtime Schema' },
  ],
}

export default sidebars
