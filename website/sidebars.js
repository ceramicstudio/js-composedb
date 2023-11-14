// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    { type: 'doc', id: 'introduction', label: 'Introduction' },
    { type: 'doc', id: 'installation', label: 'Installation' }
  ],
  api: [
    {
      type: 'category',
      collapsed: false,
      label: 'Public APIs',
      link: { type: 'generated-index' },
      items: [
        { type: 'doc', id: 'api/modules/client', label: 'ComposeDB Client' },
        { type: 'doc', id: 'api/modules/runtime', label: 'ComposeDB Runtime' },
        { type: 'doc', id: 'api/modules/server', label: 'ComposeDB Server' },
        { type: 'doc', id: 'api/classes/client.ComposeClient', label: 'ComposeClient class' },
        { type: 'doc', id: 'api/classes/runtime.ComposeRuntime', label: 'ComposeRuntime class' },
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
        { type: 'doc', id: 'api/commands/cli.document', label: 'document commands' },
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

module.exports = sidebars
