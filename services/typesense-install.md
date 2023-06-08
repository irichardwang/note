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

#### 创建`.env`文件

```yaml
TYPESENSE_API_KEY=xyz
TYPESENSE_HOST=typesence.verystation.com
TYPESENSE_PORT=8108
TYPESENSE_PROTOCOL=https
```

```bash
$ docker run -it --env-file=/opt/scraper/.env -e "CONFIG=$(cat /opt/scraper/config.json | jq -r tostring)" typesense/docsearch-scraper:0.6.0
```
