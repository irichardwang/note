// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '王小冲的折腾笔记',
  tagline: '爱折腾的小朋友',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.wangchong.wang',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wangchong', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  scripts: [{src: "https://plausible.homelab.wang/js/script.js", defer: true, 'data-domain': 'www.wangchong.wang'}],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'docs',
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/erzhongwang/note/blob/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '王小冲的折腾笔记',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/docs/intro',    // ./docs/Intro.md
            label: '简介',
            position: 'left',
            activeBaseRegex: `/docs/`,
          },
          {
            to: '/server/hardware',  // ./docs-system/Intro.md
            label: '服务器',
            position: 'left',
            activeBaseRegex: `/server/`,
          },
          {
            to: '/linux/linux-intro',  // ./docs-system/Intro.md
            label: 'Linux',
            position: 'left',
            activeBaseRegex: `/linux/`,
          },
          {
            to: '/services/services-intro',  // ./docs-system/Intro.md
            label: 'Services',
            position: 'left',
            activeBaseRegex: `/services/`,
          },
          {to: '/blog', label: '博客', position: 'left'},
          {
            href: 'https://github.com/erzhongwang/note',
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
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/erzhongwang/note',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 二中的折腾日志. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

    plugins: [
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'server',
          path: 'server',
          routeBasePath: 'server',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
              'https://github.com/erzhongwang/note/blob/main/',
        },
      ],
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'linux',
          path: 'linux',
          routeBasePath: 'linux',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/erzhongwang/note/blob/main/',
        }, 
      ],
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'services',
          path: 'services',
          routeBasePath: 'services',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/erzhongwang/note/blob/main/',
        }, 
      ],
  ],

};

module.exports = config;