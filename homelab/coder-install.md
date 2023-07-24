---
sidebar_label: 'Coder'
title: Docker部署Coder
tags:
  - docker
  - coder
---

import LinkCard from '@site/src/components/LinkCard';

:::note
Coder.com是一款开源的远程开发平台。
:::

<LinkCard title="Coder官方安装文档" description="Coder.com Docker install" to="https://coder.com/docs/v2/latest/install/docker"></LinkCard>

## 安装Coder

1. 克隆远程仓库

    ```bash
    git clone https://github.com/coder/coder.git
    ```

2. 启动服务

   :::tip
   请将`coder.example.com`替换为你的域名。
   :::

    ```bash
    cd coder
    CODER_ACCESS_URL=https://coder.example.com docker-compose up
    ```