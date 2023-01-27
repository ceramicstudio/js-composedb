// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          includeCurrentVersion: true,
          lastVersion: '0.3.x',
          versions: {
            current: {
              banner: 'unreleased',
              label: 'Preview',
              path: 'preview',
            },
            '0.3.x': {
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
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
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
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
            label: 'Docs',
          },
          {
            type: 'doc',
            docId: 'api/modules/client',
            activeBasePath: 'docs/api',
            position: 'left',
            label: 'API',
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
                label: 'Getting Started',
                to: '/docs/0.3.x/installation',
              },
              {
                label: 'Guides',
                to: '/docs/0.3.x/category/guides',
              },
              {
                label: 'API',
                to: '/docs/0.3.x/api/modules/client',
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
