---
sidebar_label: 'Nginx'
title: Nginx可视化管理
tags:
  - docker
  - nginx
---

import LinkCard from '@site/src/components/LinkCard';

:::note
nginx-proxy-manager是一个基于Docker的Nginx可视化管理工具，可以通过Web界面管理Nginx的反向代理，SSL证书，以及基于域名的访问控制。
:::

<LinkCard title="Nginx Proxy Manager" description="Docker Compose installation" to="https://nginxproxymanager.com/setup/"></LinkCard>

## 准备 Docker-Compose 配置文件

```bash
version: '3.8'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      # These ports are in format <host-port>:<container-port>
      - '80:80' # Public HTTP Port
      - '443:443' # Public HTTPS Port
      - '81:81' # Admin Web Port
      # Add any other Stream port you want to expose
      # - '21:21' # FTP
    environment:
      # Mysql/Maria connection parameters:
      DB_MYSQL_HOST: "db"
      DB_MYSQL_PORT: 3306
      DB_MYSQL_USER: "npm"
      DB_MYSQL_PASSWORD: "npm"
      DB_MYSQL_NAME: "npm"
      # Uncomment this if IPv6 is not enabled on your host
      # DISABLE_IPV6: 'true'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    depends_on:
      - db

  db:
    image: 'jc21/mariadb-aria:latest'
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: 'npm'
      MYSQL_DATABASE: 'npm'
      MYSQL_USER: 'npm'
      MYSQL_PASSWORD: 'npm'
    volumes:
      - ./mysql:/var/lib/mysql
```


#### DNSPOD API Token

[API 密钥 - DNSPod-免费智能DNS解析服务商-电信_网通_教育网,智能DNS](https://console.dnspod.cn/account/token/apikey)


#### 问题解决

:::warning
在提交后出现了以下错误：`ModuleNotFoundError: No module named 'zope'`
:::

```Bash
docker exec -it nginx-app-1 /bin/bash
```

```bash
pip install zope
```