---
title: Docusaurus LinkCard 样式
authors: richard
tags: [docusaurus]
---

import LinkCard from '@site/src/components/LinkCard';

:::note Note
在浏览Docusaurus官方推荐的案例中，发现了一个很好看的卡片连接的样式，Copy一下实现过程。

样式的参考的链接如下
<LinkCard title="Clutch说明文档" description="Clutch is a modular, extensible platform for infrastructure management." to="https://clutch.sh/docs/getting-started/build-guides"></LinkCard>
:::

## 创建`LinkCard`组件

#### 创建`LinkCard`样式文件夹

在项目目录`src/components`文件夹下创建`LinkCard`文件夹。

#### 创建`index.tsx`文件

```tsx title="src/components/LinkCard/index.tsx"
// @ts-ignore
import React from "react";
// @ts-ignore
import Link from "@docusaurus/Link";
// @ts-ignore
import type { Props as LinkProps } from "@docusaurus/Link";

import "./styles.css";

interface LinkCardProps extends Pick<LinkProps, "to"> {
    title: string;
    description: string;
}

const LinkCard = ({ to, title, description }: LinkCardProps): JSX.Element => (
    <Link className="lc-container" to={to}>
        <div className="lc-title">{title}</div>
        <div className="lc-description">{description}</div>
    </Link>
);

export default LinkCard;
```

#### 创建`styles.css`文件

```css title="src/components/LinkCard/styles.css"
.lc-container {
    border: 1px solid var(--ifm-color-emphasis-300);
    border-radius: var(--ifm-global-radius);
    padding: 0.75rem;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    max-width: 45em;
    display: block;
}

.lc-container:hover {
    border-color: var(--ifm-color-primary);
    text-decoration: none;
}

.lc-title {
    font-weight: 600;
    margin-right: 0.5em;
}

.lc-description {
    font-size: 0.875rem;
    color: var(--ifm-font-color-secondary);
}
```

## 使用`LinkCard`组件

#### 在md文件中引入`LinkCard`组件

```md
import LinkCard from '@site/src/components/LinkCard';

<LinkCard title="<title>" description="<description" to="<URL or filepath>"></LinkCard>
```