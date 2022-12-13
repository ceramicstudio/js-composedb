/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    { type: 'doc', id: 'introduction', label: 'Introduction' },
    {
      type: 'category',
      collapsed: false,
      label: 'Getting Started',
      link: { type: 'doc',id: 'getting-started'},
      items: [
        { type: 'doc', id: 'set-up-your-environment', label: 'Set up your environment' },
        { type: 'doc', id: 'create-your-composite', label: 'Create your composite' },
        { type: 'doc', id: 'interact-with-data', label: 'Interact with data' },
        { type: 'doc', id: 'next-steps', label: 'Next Steps' },
      ],
    },
    { 
      type: 'category',
      collapsed: true,
      label: 'Core Concepts',
      link: { type: 'doc',id: 'core-concepts'},
      items: [
        { type: 'doc', id: 'graph-structure', label: 'Graph' },
        { type: 'doc', id: 'data-modeling-concepts', label: 'Models' },
        { type: 'doc', id: 'database', label: 'Database' },
      ]
    },
    { type: 'doc', id: 'community', label: 'Community' },
    {
      type: 'category',
      collapsed: false,
      label: 'Guides',
      link: { type: 'generated-index' },
      items: [
        "guides/data-composition",
        {
          type: 'category',
          label: 'Using composites',
          link: {
            type: 'generated-index',
            description:
              'Composites are the primary representation for data models used by ComposeDB. They allow developers to create, share, reuse and combine models together in a consistent way.',
          },
          items: [
            { type: 'doc', id: 'guides/using-composites/discovery', label: 'Discovery' },
            { type: 'doc', id: 'guides/using-composites/deployment', label: 'Deployment' },
            { type: 'doc', id: 'guides/using-composites/customization', label: 'Customization' },
          ],
        },
        {
          type: 'category',
          label: 'Creating composites',
          link: { type: 'doc', id: 'guides/creating-composites/overview' },
          items: [
            { type: 'doc', id: 'guides/creating-composites/schema', label: 'Schema' },
            { type: 'doc', id: 'guides/creating-composites/scalars', label: 'Scalars' },
            { type: 'doc', id: 'guides/creating-composites/directives', label: 'Directives' },
          ],
        },
        {
          "type": "category",
          "label": "Interacting with data",
          "link": {
            "type": "generated-index"
          },
          "items": [
            {
              "type": "doc",
              "id": "guides/interacting/queries"
            },
            {
              "type": "doc",
              "id": "guides/interacting/mutations"
            },
            {
              "type": "doc",
              "id": "guides/interacting/using-apollo"
            },
            {
              "type": "doc",
              "id": "guides/interacting/using-relay"
            }
          ]
        }
      ]
    },
  ],
  api: [
    {
      type: 'category',
      collapsed: false,
      label: 'Client module',
      link: { type: 'generated-index' },
      items: [
        { type: 'doc', id: 'api/modules/client', label: 'Overview' },
        { type: 'doc', id: 'api/classes/client.ComposeClient', label: 'ComposeClient class' },
        { type: 'doc', id: 'api/classes/client.Context', label: 'Context class' },
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
  ],
}

module.exports = sidebars
