// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '二中的折腾日志',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.verystation.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
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

  scripts: [{src: "https://plausible.verystation.com/js/script.js", defer: true, 'data-domain': 'docs.verystation.com'}],

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
          changefreq: 'weekly',
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
        title: '二中的折腾日志',
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
            to: '/linux/linux-intro',  // ./docs-system/Intro.md
            label: 'Linux',
            position: 'left',
            activeBaseRegex: `/linux/`,
          },
          {
            to: '/docker/docker-intro',  // ./docs-system/Intro.md
            label: 'Docker',
            position: 'left',
            activeBaseRegex: `/docker/`,
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
          id: 'docker',
          path: 'docker',
          routeBasePath: 'docker',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/erzhongwang/note/blob/main/',
        }, 
      ],
  ],

};

module.exports = config;