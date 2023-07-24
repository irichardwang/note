---
sidebar_label: 'Wiki.js'
title: Docker部署Wiki.js
tags:
  - docker
  - wikijs
---

import LinkCard from '@site/src/components/LinkCard';

:::caution
Wikijs官方说明了在下一个大版本只兼容postgresql数据库，因此无论采用何种安装均不建议使用MySQL，将造成后续无法升级至3.0大版本。
:::

<LinkCard title="Wiki.js官方安装文档" description="Install Wiki.js | Wiki.js" to="https://docs.requarks.io/install/docker"></LinkCard>

## docker-compose文件

:::info
该部署除了包含postgresql数据库，wikijs本体外，额外增加了elasticsearch搜索工具，以提供更好的中文搜索能力。
:::

:::caution
以下yaml文件适用于当前最新的Wikijs2.5版本。
- 注意替换其中的数据库密码。
- elasticsearch的Java内存上限请根据主机配置调节。
:::

```yaml
version: "3"
services:

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: wiki
      POSTGRES_PASSWORD: password
      POSTGRES_USER: wikijs
    logging:
      driver: "none"
    restart: unless-stopped
    volumes:
      - db-data:/var/lib/postgresql/data

  elasticsearch:
    image: elasticsearch:7.17.10
    container_name: elasticsearch
    ports:
      - 9200:9200
    environment:
      - discovery.type=single-node
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms2g -Xmx2g"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    mem_limit: 4g
    restart: unless-stopped
    volumes:
      - elasticsearch:/usr/share/elasticsearch/data

  wiki:
    image: ghcr.io/requarks/wiki:2
    depends_on:
      - db
      - elasticsearch
    environment:
      DB_TYPE: postgres
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: wikijs
      DB_PASS: password
      DB_NAME: wiki
    restart: unless-stopped
    ports:
      - "3000:3000"

volumes:
  db-data:
  elasticsearch:
```