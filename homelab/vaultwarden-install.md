
---
sidebar_label: 'Vaultwarden'
title: Docker部署Vaultwarden
tags:
  - docker
  - vaultwarden
---

import LinkCard from '@site/src/components/LinkCard';

:::note
Vaultwarden 是 Bitwarden 第三方开源版本，可以自建密码管理服务。
:::

## 准备工作

#### 配置文件

```yaml
version: '3.8'
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: always
    environment:
      WEBSOCKET_ENABLED: "true" 
      SMTP_HOST: in-v3.mailjet.com 
      SMTP_FROM: password@email.homelab.wang 
      SMTP_PORT: 587 
      SMTP_SECURITY: starttls 
      SMTP_USERNAME: "username" 
      SMTP_PASSWORD: "password" 
      ADMIN_TOKEN: "radomtoken1234567890" 
      SIGNUPS_VERIFY: "false" 
      PASSWORD_HINTS_ALLOWED: "true" 
      DOMAIN: "https://vaultwarden.yourdomain.com" 
    volumes:
      - ./vw-data:/data
    ports:
      - "80:80"
```

:::info
以上 environment 配置项，除了 ADMIN_TOKEN 建议一定要配置，其他参数在 compose 文件中均可省略，后续在 admin 界面中可以做可视化配置。我这里为了方便，直接在 compose 文件中配置了。

`SMTP_xxxx`   为邮件服务配置，如果不需要邮件服务，可以不配置。
`ADMIN_TOKEN` 为管理员密码，可以自定义。
`DOMAIN`      为域名，如果没有域名，可以使用IP地址。
`SIGNUPS_VERIFY` 为是否开启注册验证，如果不需要注册验证，可以设置为 false。
`PASSWORD_HINTS_ALLOWED` 为是否允许密码提示，如果不允许，可以设置为 false。
:::

#### 创建数据持久化目录

该目录创建在 docker-compose.yml 文件同级目录下，我这里是 /opt/vault。
如非 root 用户，还需要修改目录权限。

```bash
sudo mkdir /opt/vault/vw-data
```

#### 启动服务

```bash
sudo docker compose up -d
```

#### 更新服务

```bash
sudo docker compose down
sudo docker compose pull
sudo docker compose up -d
```