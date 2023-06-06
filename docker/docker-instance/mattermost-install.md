---
sidebar_label: 'Mattermost'
title: Docker部署Mattermost
---

import LinkCard from '@site/src/components/LinkCard';

<LinkCard title="Mattermost官方安装文档" description="Install Mattermost on Docker — Mattermost 6.0 documentation" to="https://docs.mattermost.com/install/install-docker.html"></LinkCard>

## Docker-Compose准备

#### 克隆官方Docker仓库
```bash
git clone https://github.com/mattermost/docker
cd docker
```

#### 复制`.env`配置文件
```bash
cp env.example .env
```

#### 修改`.env`配置文件

:::caution
至少需要修改`Domain`参数，指向之后将要访问Mattermost的域名。
:::

## 数据持久化

```bash
mkdir -p ./volumes/app/mattermost/{config,data,logs,plugins,client/plugins,bleve-indexes}
chown -R 2000:2000 ./volumes/app/mattermost
```

## 启动/关闭服务

:::caution
此处用到的命令为`docker-compose`，而非`docker compose`。若未安装过`docker-compose`，请参考[安装Docker-Compose](/docker/docker-install#安装docker-compose)。
:::

#### 启动服务
```bash
docker-compose -f docker-compose.yml -f docker-compose.without-nginx.yml up -d
```

#### 关闭服务
```bash
docker-compose -f docker-compose.yml -f docker-compose.without-nginx.yml down
```

:::info
Mattermost的默认端口为`8065`，使用<IP/URL>:8065启动服务或配置Nginx反代。若需要变更，请修改`docker-compose.yml`文件中的`ports`参数。
:::