import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import { themes } from 'prism-react-renderer'

const config: Config = {
  title: 'ComposeDB on Ceramic',
  tagline:
    'A decentralized, composable graph database to build interoperable applications on Ceramic',
  url: 'https://composedb.js.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
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
          includeCurrentVersion: true,
          lastVersion: '0.5.x',
          versions: {
            current: {
              banner: 'unreleased',
              label: 'Preview',
              path: 'preview',
            },
            '0.5.x': {
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
              to: '/docs/0.5.x/introduction',
            },
            {
              label: 'API',
              to: '/docs/0.5.x/api/modules/client',
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
