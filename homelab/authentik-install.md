---
sidebar_label: 'Authentik'
title: Docker部署Authentik
tags:
  - docker
  - authentik
---

import LinkCard from '@site/src/components/LinkCard';

:::note
Authentik是一个开源的身份认证和授权服务，支持多种认证方式，包括LDAP，SAML，OIDC，OAuth2等。相较老牌的Keycloak，Authentik更易于部署和维护。
:::

<LinkCard title="Authentik官方安装文档" description="Docker Compose installation" to="https://goauthentik.io/docs/installation/docker-compose"></LinkCard>

## 准备工作

#### 下载最新 docker-compose.yml 文件

```bash
wget https://goauthentik.io/docker-compose.yml
```

1. 为避免后续升级迁移，更改 postgresql 版本为 15，原版为 12。

2. 若对安全性有进一步要求，在相应位置更改默认的数据库密码。

#### 安装 `pwgen`

:::caution
`pwgen` 需要EPEL源，如果没有安装，可参考以下链接安装。
<LinkCard title="替换EPEL软件源" to="/homelab/linux/linux-mirrors#替换-epel-软件源" />
:::

```bash
dnf install -y pwgen
```

#### 创建密码及秘钥并存入 `.env` 文件

```bash
echo "PG_PASS=$(pwgen -s 40 1)" >> .env
echo "AUTHENTIK_SECRET_KEY=$(pwgen -s 50 1)" >> .env
```

#### 开启错误日志

```bash
echo "AUTHENTIK_ERROR_REPORTING__ENABLED=true" >> .env
```

## 邮件配置

```yaml
# SMTP Host Emails are sent to
AUTHENTIK_EMAIL__HOST=
AUTHENTIK_EMAIL__PORT=
# Optionally authenticate (don't add quotation marks to your password)
AUTHENTIK_EMAIL__USERNAME=
AUTHENTIK_EMAIL__PASSWORD=
# Use StartTLS
AUTHENTIK_EMAIL__USE_TLS=false
# Use SSL
AUTHENTIK_EMAIL__USE_SSL=false
AUTHENTIK_EMAIL__TIMEOUT=10
# Email address authentik will send from, should have a correct @domain
AUTHENTIK_EMAIL__FROM=authentik@localhost
```

## 配置端口

:::tip
Authentik默认使用 `9000` 端口(HTTP)以及 `9443` 端口(HTTPS)，如果需要修改，可在 `.env` 文件中添加以下配置。
:::

```yaml
COMPOSE_PORT_HTTP=80
COMPOSE_PORT_HTTPS=443
```

## 启动Authentik

```bash
docker-compose pull
docker-compose up -d
```

## 更新Authentik

#### 获取最新的 `docker-compose.yml` 文件

进入官网首页，或最新版本的发布地址：[Authentik Releases](https://goauthentik.io/docs/releases)

#### 下载最新的 `docker-compose.yml` 文件并覆盖

```bash
wget -O docker-compose.yml https://goauthentik.io/version/2023.5/docker-compose.yml
```

其中 `-O` 参数指定了下载的文件名，覆盖原有的同名文件。

#### 重新执行启动命令

```bash
docker-compose up -d
```