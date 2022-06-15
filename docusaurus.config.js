// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Hueng's Site",
  tagline: "生活沉淀站",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "jamond-x", // Usually your GitHub org/user name.
  projectName: "jamond-x.github.io", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Hueng's Site",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Tutorial",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/jamond-x",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "相关链接",
            items: [
              {
                label: "Github",
                href: "https://github.com/jamond-x",
              },
              {
                label: "邮箱",
                href: "mailto:huengemail@163.com",
              },
            ],
          },
          {
            title: "社区",
            items: [
              {
                label: "FWF工作室",
                href: "http://404fwf.cn/",
              },
              {
                label: "0xFFFF社区",
                href: "http://0xffff.one/",
              },
            ],
          },
          {
            title: "更多",
            items: [
              {
                label: "力扣1",
                href: "https://leetcode.cn/u/hueng_/",
              },
              {
                label: "力扣2",
                href: "https://leetcode.cn/u/jin-xi-jamond/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 向兴强, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  noIndex: true, // 这个选项会在每个页面上添加 <meta name="robots" content="noindex, nofollow"> 标签，告诉搜索引擎不要爬取你的站点
};

module.exports = config;
