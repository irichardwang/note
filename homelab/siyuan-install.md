---
sidebar_label: 'SiYuan'
title: Docker部署思源笔记服务器
tags:
  - docker
  - siyuan
---

import LinkCard from '@site/src/components/LinkCard';

:::note
思源笔记是一款开源的笔记软件，支持Markdown语法，支持插件扩展，是一款非常优秀的笔记软件。
:::

## 安装思源笔记

```bash
docker run \
  --name siyuan \
  -v /opt/siyuan/workspace:/siyuan/workspace \
  -p 6806:6806 \
  -u 1000:1000 \
  b3log/siyuan --workspace=/siyuan/workspace/
```

## 版本更新

#### 停止并删除旧容器
```bash
docker stop siyuan
docker rm siyuan
```

#### 重新执行上述安装命令