---
title: Docusaurus集成本地搜索的插件
authors: richard
tags: [docusaurus]
---

import LinkCard from '@site/src/components/LinkCard';

:::note
Docusaurus没有自带搜索功能，需要使用第三方插件，一种是通过Algolia实现，另一种是通过本地搜索实现。本文介绍如何使用本地搜索插件。
:::


:::tip
插件选择`easyops-cn/docusaurus-search-local`，为中文搜索做过优化，且最近维护日期也比较新。

项目地址：[@easyops-cn/docusaurus-search-local](https://github.com/easyops-cn/docusaurus-search-local)
:::

## 安装插件

```bash
yarn add @easyops-cn/docusaurus-search-local
```

## 配置插件

```js title="docusaurus.config.js"
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,   // 是否对搜索结果进行hash
        language: ["en", "zh"], // 搜索语言
        indexDocs: true, // 是否对docs进行索引
        indexBlog: true, // 是否对blog进行索引
        indexPages: false, // 是否对pages进行索引
        docsRouteBasePath: ["/docs","/linux","/services"], // 配置需要搜索的文档路径
      }),
    ],
  ],
```

## 本地预览效果

```bash
npm run build
```

```bash
npm run serve
```
