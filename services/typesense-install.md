---
sidebar_label: 'Typesense'
title: Docker部署Typesense
tags:
  - docker
  - typesense
---

import LinkCard from '@site/src/components/LinkCard';

:::note
Typesense是一款开源的搜索引擎，支持中文分词，是Algolia的开源替代品。
:::

## 安装Typesense

```yaml
version: '3.4'
services:
  typesense:
    image: typesense/typesense:0.24.0
    restart: on-failure
    ports:
      - "8108:8108"
    volumes:
      - ./typesense-data:/data
    command: '--data-dir /data --api-key=xyz --enable-cors'
```

#### 启动服务

```bash
docker-compose up
```