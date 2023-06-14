---
sidebar_label: 'Code-server'
title: Docker部署Code-server
tags:
  - docker
  - codeserver
---

import LinkCard from '@site/src/components/LinkCard';

:::note
Coder-server是一款开源的在线IDE。
:::

<LinkCard title="Code-server官方安装文档" description="Code-server Docker install" to="https://hub.docker.com/r/linuxserver/code-server"></LinkCard>

## 安装Code-server

1. 创建目录并授权

   ```bash
   mkdir -p -m 750 /opt/codeserver/config/
   chown -R 1000:1000 /opt/codeserver/config/
   ```

2. 编辑`docker-compose.yml`文件

   ```bash
   version: "2.1"
   services:
   code-server:
   image: lscr.io/linuxserver/code-server:latest
   container_name: code-server
   environment:
   - PUID=1000
   - PGID=1000
   - TZ=Asia/Shanghai
   - PASSWORD=password #optional
   - HASHED_PASSWORD= #optional
   - SUDO_PASSWORD=password #optional
   - SUDO_PASSWORD_HASH= #optional
   - PROXY_DOMAIN=codeserver.my.domain #optional
   - DEFAULT_WORKSPACE=/config/workspace #optional
   volumes:
   - /opt/codeserver/config:/config
   ports:
   - 8443:8443
   restart: unless-stopped
   ```

