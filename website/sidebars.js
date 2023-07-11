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
      link: { type: 'doc', id: 'getting-started' },
      items: [
        {
          type: 'category',
          collapsed: true,
          label: 'Set up your environment',
          link: {
            type: 'doc',
            id: 'set-up-your-environment',
          },
          items: [
            {
              type: 'doc',
              id: 'wheel-reference',
              label: 'Wheel Reference',
            },
          ],
        },
        { type: 'doc', id: 'create-your-composite', label: 'Create your composite' },
        { type: 'doc', id: 'interact-with-data', label: 'Interact with data' },
        { type: 'doc', id: 'next-steps', label: 'Next Steps' },
      ],
    },
    {
      type: 'category',
      collapsed: true,
      label: 'Core Concepts',
      link: { type: 'doc', id: 'core-concepts' },
      items: [
        { type: 'doc', id: 'graph-structure', label: 'Graph' },
        { type: 'doc', id: 'data-modeling-concepts', label: 'Models' },
        { type: 'doc', id: 'database', label: 'Database' },
      ],
    },
    { type: 'doc', id: 'community', label: 'Community' },
  ],
  guides: [
    {
      type: 'doc',
      id: 'guides/index',
      label: 'Guides Index',
    },
    {
      type: 'category',
      collapsed: false,
      label: 'Data Modeling',
      link: {
        type: 'doc',
        id: 'guides/data-modeling/data-modeling',
      },
      items: [
        { type: 'doc', id: 'guides/data-modeling/model-catalog', label: 'Model Catalog' },
        {
          type: 'category',
          collapsed: true,
          label: 'Writing Models',
          link: { type: 'doc', id: 'guides/data-modeling/writing-models' },
          items: [
            {
              type: 'doc',
              id: 'guides/data-modeling/introduction-to-modeling',
              label: 'Introduction to Modeling',
            },
            { type: 'doc', id: 'guides/data-modeling/schemas', label: 'Schemas' },
            { type: 'doc', id: 'guides/data-modeling/relations', label: 'Relations' },
          ],
        },
        { type: 'doc', id: 'guides/data-modeling/composites', label: 'Composites' },
      ],
    },
    {
      type: 'category',
      collapsed: false,
      label: 'ComposeDB Client',
      link: { type: 'doc', id: 'guides/composedb-client/composedb-client' },
      items: [
        {
          type: 'category',
          collapsed: true,
          label: 'JavaScript Client',
          link: { type: 'doc', id: 'guides/composedb-client/javascript-client' },
          items: [
            {
              type: 'doc',
              id: 'guides/composedb-client/using-apollo',
              label: 'Using Apollo',
            },
            {
              type: 'doc',
              id: 'guides/composedb-client/using-relay',
              label: 'Using Relay',
            },
          ],
        },
        {
          type: 'category',
          collapsed: true,
          label: 'Authenticate Users',
          link: { type: 'doc', id: 'guides/composedb-client/authenticate-users' },
          items: [
            {
              type: 'doc',
              id: 'guides/composedb-client/user-sessions',
              label: 'User Sessions',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      collapsed: false,
      label: 'ComposeDB Server',
      link: {
        type: 'doc',
        id: 'guides/composedb-server/composedb-server',
      },
      items: [
        {
          type: 'doc',
          id: 'guides/composedb-server/running-locally',
          label: 'Running Locally',
        },
        {
          type: 'doc',
          id: 'guides/composedb-server/running-in-the-cloud',
          label: 'Running in the Cloud',
        },
        {
          type: 'doc',
          id: 'guides/composedb-server/server-configurations',
          label: 'Server Configurations',
        },
        {
          type: 'doc',
          id: 'guides/composedb-server/access-mainnet',
          label: 'Access Mainnet',
        },
        {
          type: 'doc',
          id: 'guides/composedb-server/data-storage',
          label: 'Data Storage',
        },
      ],
    },
    {
      type: 'category',
      collapsed: false,
      label: 'Data Interactions',
      link: { type: 'doc', id: 'guides/data-interactions/data-interactions' },
      items: [
        { type: 'doc', id: 'guides/data-interactions/queries', label: 'Queries' },
        { type: 'doc', id: 'guides/data-interactions/mutations', label: 'Mutations' },
      ],
    },
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
