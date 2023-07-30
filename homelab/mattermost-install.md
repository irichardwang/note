---
sidebar_label: 'Mattermost'
title: 部署 Mattermost 团队沟通工具
tags: 
  - mattermost
  - docker
---

import LinkCard from '@site/src/components/LinkCard';

<LinkCard title="Mattermost官方安装文档" description="Install Mattermost on Docker — Mattermost 6.0 documentation" to="https://docs.mattermost.com/install/install-docker.html"></LinkCard>

## Ubuntu omnibus 安装

1. 安装依赖

  ```bash
  curl -o- https://deb.packages.mattermost.com/repo-setup.sh | sudo bash
  ```

2. 安装Mattermost

  ```bash
  sudo MMO_HTTPS=false apt install mattermost-omnibus
  ```

## Docker-Compose 安装

#### 克隆官方Docker仓库
```bash
sudo git clone https://github.com/mattermost/docker
cd docker
```

#### 复制`.env`配置文件
```bash
sudo cp env.example .env
```

#### 修改`.env`配置文件

:::caution
至少需要修改`Domain`参数，指向之后将要访问Mattermost的域名。
:::

```bash title="我修改的内容如下"
# 修改为个人域名
DOMAIN=mattermost.homelab.wang

# 时区设置为国内时区
TZ=Asia/Shanghai

# 为了后续升级方便，数据库版本设置为最新
POSTGRES_IMAGE_TAG=15-alpine

# 修改默认的数据库密码
POSTGRES_PASSWORD=your_password

# 修改安装的版本为最新
MATTERMOST_IMAGE_TAG=latest
```

## 数据持久化

```bash
sudo mkdir -p ./volumes/app/mattermost/{config,data,logs,plugins,client/plugins,bleve-indexes}
sudo chown -R 2000:2000 ./volumes/app/mattermost
```

## 启动/关闭服务


#### 启动服务
```bash
sudo docker compose -f docker-compose.yml -f docker-compose.without-nginx.yml up -d
```

#### 关闭服务
```bash
docker compose -f docker-compose.yml -f docker-compose.nginx.yml down
```

:::info
Mattermost的默认端口为`8065`，使用<IP/URL>:8065启动服务或配置Nginx反代。若需要变更，请修改`docker-compose.yml`文件中的`ports`参数。
:::