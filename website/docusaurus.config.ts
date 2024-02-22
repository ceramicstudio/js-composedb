import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import { themes } from 'prism-react-renderer'

const config: Config = {
  title: 'ComposeDB on Ceramic',
  tagline:
    'A decentralized, composable graph database to build interoperable applications on Ceramic',
  url: 'https://composedb.js.org',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  // GitHub pages deployment config.
  organizationName: 'ceramicstudio',
  projectName: 'js-composedb',
  trailingSlash: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          includeCurrentVersion: false,
          lastVersion: '0.7.x',
          versions: {
            // current: {
            //   banner: 'unreleased',
            //   label: 'Preview',
            //   path: 'preview',
            // },
            '0.7.x': {
              label: '0.7.x',
              path: '0.7.x',
            },
            '0.6.x': {
              banner: 'unmaintained',
              label: '0.6.x',
              path: '0.6.x',
            },
            '0.5.x': {
              banner: 'unmaintained',
              label: '0.5.x',
              path: '0.5.x',
            },
            '0.4.x': {
              banner: 'unmaintained',
              label: '0.4.x',
              path: '0.4.x',
            },
            '0.3.x': {
              banner: 'unmaintained',
              label: '0.3.x',
              path: '0.3.x',
            },
            '0.2.x': {
              banner: 'unmaintained',
              label: '0.2.x',
              path: '0.2.x',
            },
          },
        },
        gtag: {
          trackingID: 'G-V2Y8T342EX',
          anonymizeIP: true,
        },
        googleTagManager: {
          containerId: 'GTM-TFSMT4ZD',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        tsconfig: '../tsconfig.docs.json',
        sidebar: {
          autoConfiguration: false,
        },
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        fromExtensions: ['html', 'htm'],
        redirects: [
          {
            to: 'https://developers.ceramic.network/docs/composedb/set-up-your-environment',
            from: ['/docs/0.5.x/set-up-your-environment', '/docs/0.4.x/set-up-your-environment'],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/getting-started',
            from: ['/docs/0.5.x/getting-started', '/docs/0.4.x/getting-started'],
          },
          {
            to: 'https://developers.ceramic.network/docs/wheel/wheel-reference',
            from: ['/docs/0.5.x/wheel-reference', '/docs/0.4.x/wheel-reference'],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/create-your-composite',
            from: [
              '/docs/0.5.x/create-your-composite',
              '/docs/0.4.x/create-your-composite',
              '/docs/0.3.x/first-composite',
              '/docs/0.2.x/first-composite',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/interact-with-data',
            from: [
              '/docs/0.5.x/interact-with-data',
              '/docs/0.4.x/interact-with-data',
              '/docs/0.3.x/client-setup',
              '/docs/0.2.x/client-setup',
              '/docs/0.3.x/configuration',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/next-steps',
            from: ['/docs/0.5.x/next-steps', '/docs/0.4.x/next-steps'],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/core-concepts',
            from: [
              '/docs/0.5.x/core-concepts',
              '/docs/0.4.x/core-concepts',
              '/docs/0.3.x/guides/concepts-overview',
              '/docs/0.2.x/guides/concepts-overview',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/introduction/ceramic-roadmap',
            from: '/docs/0.4.x/ceramic-roadmap',
          },
          {
            to: 'https://developers.ceramic.network/docs/ecosystem/community',
            from: ['/docs/0.5.x/community', '/docs/0.4.x/community'],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/examples',
            from: '/docs/0.5.x/examples',
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/examples/verifiable-credentials',
            from: '/docs/0.5.x/verifiable-credentials',
          },
          {
            to: 'https://developers.ceramic.network/sandbox',
            from: '/sandbox',
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides',
            from: [
              '/docs/0.5.x/guides',
              '/docs/0.4.x/guides',
              '/docs/0.3.x/guides',
              '/docs/0.2.x/guides',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/data-modeling',
            from: [
              '/docs/0.5.x/guides/data-modeling/data-modeling',
              '/docs/0.4.x/guides/data-modeling/data-modeling',
              '/docs/0.3.x/guides/data-composition',
              '/docs/0.2.x/guides/data-composition',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/data-modeling/model-catalog',
            from: [
              '/docs/0.5.x/guides/data-modeling/model-catalog',
              '/docs/0.4.x/guides/data-modeling/model-catalog',
              '/docs/0.3.x/guides/using-composites/discovery',
              '/docs/0.2.x/guides/using-composites/discovery',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/data-modeling/writing-models',
            from: [
              '/docs/0.5.x/guides/data-modeling/writing-models',
              '/docs/0.4.x/guides/data-modeling/writing-models',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/data-modeling/introduction-to-modeling',
            from: [
              '/docs/0.5.x/guides/data-modeling/introduction-to-modeling',
              '/docs/0.4.x/guides/data-modeling/introduction-to-modeling',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/data-modeling/schemas',
            from: [
              '/docs/0.5.x/guides/data-modeling/schemas',
              '/docs/0.4.x/guides/data-modeling/schemas',
              '/docs/0.3.x/guides/creating-composites/schema',
              '/docs/0.2.x/guides/creating-composites/schema',
              '/docs/0.3.x/guides/creating-composites/scalars',
              '/docs/0.3.x/guides/creating-composites/directives',
              '/docs/0.2.x/guides/creating-composites/scalars',
              '/docs/0.2.x/guides/creating-composites/directives',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/data-modeling/relations',
            from: [
              '/docs/0.5.x/guides/data-modeling/relations',
              '/docs/0.4.x/guides/data-modeling/relations',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/data-modeling/relations',
            from: [
              '/docs/0.5.x/guides/data-modeling/composites',
              '/docs/0.4.x/guides/data-modeling/composites',
              '/docs/0.3.x/guides/using-composites/deployment',
              '/docs/0.3.x/guides/using-composites/customization',
              '/docs/0.3.x/guides/creating-composites/overview',
              '/docs/0.2.x/guides/using-composites/deployment',
              '/docs/0.2.x/guides/using-composites/customization',
              '/docs/0.2.x/guides/creating-composites/overview',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/data-interactions/queries',
            from: [
              '/docs/0.5.x/guides/data-interactions/queries',
              '/docs/0.4.x/guides/data-interactions/queries',
              '/docs/0.3.x/guides/interacting/queries',
              '/docs/0.2.x/guides/interacting/queries',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/data-interactions/mutations',
            from: [
              '/docs/0.5.x/guides/data-interactions/mutations',
              '/docs/0.4.x/guides/data-interactions/mutations',
              '/docs/0.3.x/guides/interacting/mutations',
              '/docs/0.2.x/guides/interacting/mutations',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/composedb-client/using-apollo',
            from: [
              '/docs/0.5.x/guides/composedb-client/using-apollo',
              '/docs/0.3.x/guides/interacting/using-apollo',
              '/docs/0.2.x/guides/interacting/using-apollo',
              '/docs/0.4.x/guides/composedb-client/using-apollo',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/composedb-client/using-relay',
            from: [
              '/docs/0.5.x/guides/composedb-client/using-relay',
              '/docs/0.4.x/guides/composedb-client/using-relay',
              '/docs/0.3.x/guides/interacting/using-relay',
              '/docs/0.2.x/guides/interacting/using-relay',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/composedb-client',
            from: [
              '/docs/0.5.x/guides/composedb-client/composedb-client',
              '/docs/0.4.x/guides/composedb-client/composedb-client',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/composedb-client/javascript-client',
            from: [
              '/docs/0.5.x/guides/composedb-client/javascript-client',
              '/docs/0.4.x/guides/composedb-client/javascript-client',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/composedb-client/authenticate-users',
            from: [
              '/docs/0.5.x/guides/composedb-client/authenticate-users',
              '/docs/0.4.x/guides/composedb-client/authenticate-users',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/composedb-client/user-sessions',
            from: [
              '/docs/0.5.x/guides/composedb-client/user-sessions',
              '/docs/0.4.x/guides/composedb-client/user-sessions',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/composedb-server',
            from: [
              '/docs/0.5.x/guides/composedb-server/composedb-server',
              '/docs/0.4.x/guides/composedb-server/composedb-server',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/composedb-server/running-locally',
            from: [
              '/docs/0.5.x/guides/composedb-server/running-locally',
              '/docs/0.4.x/guides/composedb-server/running-locally',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/composedb-server/running-in-the-cloud',
            from: [
              '/docs/0.5.x/guides/composedb-server/running-in-the-cloud',
              '/docs/0.4.x/guides/composedb-server/running-in-the-cloud',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/composedb-server/server-configurations',
            from: [
              '/docs/0.5.x/guides/composedb-server/server-configurations',
              '/docs/0.4.x/guides/composedb-server/server-configurations',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/composedb-server/access-mainnet',
            from: [
              '/docs/0.5.x/guides/composedb-server/access-mainnet',
              '/docs/0.4.x/guides/composedb-server/access-mainnet',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/composedb-server/data-storage',
            from: [
              '/docs/0.5.x/guides/composedb-server/data-storage',
              '/docs/0.4.x/guides/composedb-server/data-storage',
            ],
          },
          {
            to: 'https://developers.ceramic.network/docs/composedb/guides/data-interactions',
            from: [
              '/docs/0.5.x/guides/data-interactions/data-interactions',
              '/docs/0.4.x/guides/data-interactions/data-interactions',
            ],
          },
        ],
      },
    ],
  ],
  themeConfig: {
    algolia: {
      appId: '6U6J14O661',
      apiKey: '4aa9e2a353cdada07c5022b78c21aa45',
      indexName: 'composedb-js',
    },
    navbar: {
      title: 'ComposeDB',
      logo: {
        alt: 'Ceramic logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'introduction',
          position: 'left',
          label: 'Introduction',
        },
        {
          type: 'doc',
          docId: 'api/modules/client',
          activeBasePath: 'docs/api',
          position: 'left',
          label: 'Reference',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/ceramicstudio/js-composedb',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/0.6.x/introduction',
            },
            {
              label: 'API',
              to: '/docs/0.6.x/api/modules/client',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Forum',
              href: 'https://forum.ceramic.network/',
            },
            {
              label: 'Discord',
              href: 'http://chat.ceramic.network/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/ceramicnetwork',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Ceramic documentation',
              href: 'https://developers.ceramic.network',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ceramicstudio/js-composedb',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 3Box Labs.`,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
