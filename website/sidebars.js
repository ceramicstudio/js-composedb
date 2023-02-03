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
      type: 'category',
      collapsed: false,
      label: 'Data Modeling',
      link: { type: 'doc', id: 'guides/data-modeling/data-modeling' },
      items: [
        { type: 'doc', id: 'guides/data-modeling/model-catalog', label: 'Model Catalog' },
        {
          type: 'category',
          collapsed: true,
          label: 'Writing Models',
          link: { type: 'doc', id: 'guides/data-modeling/writing-models' },
          items: [
            { type: 'doc', id: 'guides/data-modeling/introduction-to-modeling', label: 'Introduction to Modeling' },
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
      label: 'Application Setup',
      link: { type: 'doc', id: 'guides/data-modeling/data-modeling' },
      items: [
        {
          type: 'category',
          collapsed: false,
          label: 'ComposeDB Server',
          link: { type: 'doc', id: 'guides/data-modeling/writing-models' },
          items: [
            { type: 'doc', id: 'guides/data-modeling/introduction-to-modeling', label: 'Running Locally' },
            {
              type: 'category',
              collapsed: true,
              label: 'Running in the Cloud',
              link: { type: 'doc', id: 'guides/data-modeling/writing-models' },
              items: [
                { type: 'doc', id: 'guides/data-modeling/introduction-to-modeling', label: 'Cloud Templates' },
                { type: 'doc', id: 'guides/data-modeling/introduction-to-modeling', label: 'Using DockerHub' },
                { type: 'doc', id: 'guides/data-modeling/schemas', label: 'Using npm' },
                { type: 'doc', id: 'guides/data-modeling/relations', label: 'Cloud Best Practices' },
              ],
            },
            {
              type: 'category',
              collapsed: true,
              label: 'Server Configurations',
              link: { type: 'doc', id: 'guides/data-modeling/writing-models' },
              items: [
                { type: 'doc', id: 'guides/data-modeling/introduction-to-modeling', label: 'Configuration File' },
                { type: 'doc', id: 'guides/data-modeling/schemas', label: 'Command Line Config' },
              ],
            },
            { type: 'doc', id: 'guides/data-modeling/relations', label: 'Data Storage' },
          ],
        },
        {
          type: 'category',
          collapsed: false,
          label: 'ComposeDB Client',
          link: { type: 'doc', id: 'guides/data-modeling/writing-models' },
          items: [
            {
              type: 'category',
              collapsed: true,
              label: 'Javascript Client',
              link: { type: 'doc', id: 'guides/data-modeling/writing-models' },
              items: [
                { type: 'doc', id: 'guides/data-modeling/introduction-to-modeling', label: 'Using Apollo' },
                { type: 'doc', id: 'guides/data-modeling/schemas', label: 'Using Relay' },
              ],
            },
            {
              type: 'category',
              collapsed: true,
              label: 'Authenticate Users',
              link: { type: 'doc', id: 'guides/data-modeling/writing-models' },
              items: [
                { type: 'doc', id: 'guides/data-modeling/schemas', label: 'User Sessions' },
              ],
            },          ],
        },
      ],
    },
    {
      type: 'category',
      collapsed: false,
      label: 'Data Interactions',
      link: { type: 'doc', id: 'guides/data-modeling/data-modeling' },
      items: [
        { type: 'doc', id: 'guides/data-modeling/model-catalog', label: 'Queries' },
        { type: 'doc', id: 'guides/data-modeling/composites', label: 'Mutations' },
      ],
    },
    {
      type: 'category',
      collapsed: true,
      label: 'Interacting with data',
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: 'doc',
          id: 'guides/interacting/queries',
        },
        {
          type: 'doc',
          id: 'guides/interacting/mutations',
        },
        {
          type: 'doc',
          id: 'guides/interacting/using-apollo',
        },
        {
          type: 'doc',
          id: 'guides/interacting/using-relay',
        },
      ],
    },
  ],
  api: [
    {
      type: 'category',
      collapsed: false,
      label: 'Schema Definition Language',
      link: { type: 'doc', id: 'api/sdl/scalars' },
      items: [
        { type: 'doc', id: 'api/sdl/scalars', label: 'Scalars' },
        { type: 'doc', id: 'api/sdl/directives', label: 'Directives' },
      ],
    },
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
