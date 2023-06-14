---
sidebar_label: 'Gitlab'
title: Docker部署Gitlab Enterprise
tags:
  - docker
  - gitlab
---

import LinkCard from '@site/src/components/LinkCard';

:::note
Gitlab是一个开源的一体化DevOps平台，包含了git仓库管理、issue跟踪、CI/CD等功能。
:::

:::tip
对比了 bitbucket 和 Gitlab，虽然 Bitbucket 与 Atlassian 集成度更好，但破解工具对最新版本无效，网上 Gitlab 的教程也更多一些，界面风格与 Github 也更为接近，最终选用 Gitlab 作为版本管理平台。
:::

## 参数配置

#### 常规`docker-compose.yml`文件

```yaml
version: '3.6'
services:
  web:
    image: 'gitlab/gitlab-ee:latest'
    restart: always
    hostname: 'gitlab.verystation.com'
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'https://gitlab.verystation.com'
        # Add any other gitlab.rb configuration here, each on its own line
    ports:
      - '80:80'
      - '443:443'
      - '22:22'
    volumes:
      - '/srv/gitlab/config:/etc/gitlab'
      - '/srv/gitlab/logs:/var/log/gitlab'
      - '/srv/gitlab/data:/var/opt/gitlab'
    shm_size: '256m'
```

#### 常用配置

:::tip
在`docker-compose.yml`文件中，`GITLAB_OMNIBUS_CONFIG`参数用于配置`gitlab.rb`文件，`gitlab.rb`文件中的配置项可以参考[官方文档](https://docs.gitlab.com/omnibus/settings/configuration.html)。
:::


## 启动服务

#### 初次启动服务

```bash
docker-compose up -d
```

#### 获取初始密码

:::caution
默认 root 密码文件将在 24 小时后删除，需要保存好或及时更换密码。
:::

```bash
sudo docker exec -it gitlab-web-1 grep 'Password:' /etc/gitlab/initial_root_password
```
