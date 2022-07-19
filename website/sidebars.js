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
      items: ['installation', 'first-composite', 'client-setup'],
    },
    {
      type: 'category',
      collapsed: false,
      label: 'Guides',
      items: [
        'guides/concepts-overview',
        'guides/data-composition',
        {
          type: 'category',
          label: 'Using Composites',
          items: [
            { type: 'doc', id: 'guides/using-composites/introduction', label: 'Introduction' },
            { type: 'doc', id: 'guides/using-composites/discovery', label: 'Discovery' },
            { type: 'doc', id: 'guides/using-composites/deployment', label: 'Deployment' },
            { type: 'doc', id: 'guides/using-composites/customization', label: 'Customization' },
          ],
        },
        { type: 'doc', id: 'guides/creating-composites' },
        {
          type: 'category',
          label: 'Interacting with data',
          items: [
            { type: 'doc', id: 'guides/interacting/queries' },
            { type: 'doc', id: 'guides/interacting/mutations' },
            { type: 'doc', id: 'guides/interacting/using-graphiql' },
            { type: 'doc', id: 'guides/interacting/using-apollo' },
            { type: 'doc', id: 'guides/interacting/using-relay' },
          ],
        },
      ],
    },
  ],
  api: [
    {
      type: 'category',
      collapsed: false,
      label: 'Client module',
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
      items: [
        { type: 'doc', id: 'api/modules/devtools', label: 'Generic developer tools' },
        { type: 'doc', id: 'api/modules/devtools_node', label: 'Node.js developer tools' },
        { type: 'doc', id: 'api/classes/devtools.Composite', label: 'Composite class' },
      ],
    },
  ],
}

module.exports = sidebars
