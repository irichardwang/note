---
sidebar_label: 'Atlassian'
title: Docker部署Atalssian全套软件
tags:
  - docker
  - atlassian
  - jira
  - confluence
  - crowd
---

import LinkCard from '@site/src/components/LinkCard';

:::note
翻了全网对 Atlassian 软件(crowd, jira, confluence)的安装教程都是上古版本。其实官方提供了非常方便的 Docker 镜像，但说明文档中仅提供了单独的 docker run 命令，在此提供一份整合了数据库 docker-compose 文件，实现快速部署。同时补充了优化参数。
:::

## 编写 `docker-compose.yml` 文件

### 优化参数说明

1. 挂载破解文件路径

  创建 `/opt/agent` 文件夹，在 yml 文件中的 volumes 部分添加 `- /opt/agent:/opt/agent`。

2. 使用nginx反代时需添加的参数

  若使用反向代理工具如 nginx，需要在 yml 文件中的 environment 部分添加以下参数：`ATL_PROXY_NAME`、`ATL_PROXY_PORT`、`ATL_TOMCAT_SCHEME`、`ATL_TOMCAT_SECURE`。若不使用，可以删掉或注释掉。

3. 设置容器和软件默认的时区

  在 yml 文件中的 environment 部分添加 `- TZ=Asia/Shanghai`，以及 `- JVM_SUPPORT_RECOMMENDED_ARGS=-Duser.timezone=Asia/Shanghai`。

4. 扩大JVM内存资源上限

  当用户和内容增多之后，JVM内存资源不足会导致软件运行缓慢。此时可以通过扩大JVM内存资源上限来解决，当然也要看服务器的硬件资源是否足够。具体调整参数详见样例文件的中的 `JVM_MINIMUM_MEMORY`、`JVM_MAXIMUM_MEMORY`、`JVM_RESERVED_CODE_CACHE_SIZE`。
  如果是初次使用，可以先删掉或注释掉，等到需要时再调整。

5. 设置Confluence字体文件路径

  在准备放置 `docker-compose.yml` 文件的目录下创建 `fonts` 文件夹，将字体文件放入其中。
  在 yml 文件中的 volumes 部分添加 `- ./fonts:/usr/local/share/fonts`。

6. 集成 PostgreSQL 数据库

  :::tip
  Atlassian 因授权限制默认不集成 mysql 驱动，因此使用 PostgreSQL 数据库，截止目前(2023.06)，支持到 PostgreSQL 14。
  :::

### `docker-compose.yml` 样例

:::caution
注意修改以下带有注释的参数。
:::

```bash title='docker-compose.yml'
version: '3.8'
services:
  jira:
    image: atlassian/jira-software
    container_name: jira
    depends_on: 
      - dbjira
    ports:
      - 8080:8080
    volumes:
      - jiraVolume:/var/atlassian/application-data/jira
      - /opt/agent:/opt/agent
    environment:
      - ATL_PROXY_NAME=jira.homelab.wang # 更改为自己的域名
      - ATL_PROXY_PORT=443
      - ATL_TOMCAT_SCHEME=https
      - ATL_TOMCAT_SECURE=true
      - ATL_JDBC_URL=jdbc:postgresql://dbjira:5432/jira
      - ATL_JDBC_USER=jira
      - ATL_JDBC_PASSWORD="password" # 这里的密码要和数据库的密码一致
      - ATL_DB_TYPE=postgres72
      - ATL_DB_DRIVER=org.postgresql.Driver
      - TZ=Asia/Shanghai
      - JVM_MINIMUM_MEMORY=1024m # 默认为384m，视实际情况调整
      - JVM_MAXIMUM_MEMORY=2048m # 默认为768m，视实际情况调整
      - JVM_RESERVED_CODE_CACHE_SIZE=1024m # 默认为512m，视实际情况调整
      - JVM_SUPPORT_RECOMMENDED_ARGS=-Duser.timezone=Asia/Shanghai
    restart: always

  confluence:
    image: atlassian/confluence
    container_name: confluence
    depends_on: 
      - dbconf
    ports:
      - 8090:8090
      - 8091:8091
    environment:
      - ATL_PROXY_NAME=conf.homelab.wang # 更改为自己的域名
      - ATL_PROXY_PORT=443
      - ATL_TOMCAT_SCHEME=https
      - ATL_TOMCAT_SECURE=true
      - ATL_JDBC_URL=jdbc:postgresql://dbconf:5432/conf
      - ATL_JDBC_USER=conf
      - ATL_JDBC_PASSWORD="password" # 这里的密码要和数据库的密码一致
      - ATL_DB_TYPE=postgresql
      - TZ=Asia/Shanghai
      - JVM_MINIMUM_MEMORY=2048m # 默认为1024m，视实际情况调整
      - JVM_MAXIMUM_MEMORY=4096m # 默认为1024m，视实际情况调整
      - JVM_RESERVED_CODE_CACHE_SIZE=512m # 默认为256m，视实际情况调整
      - JVM_SUPPORT_RECOMMENDED_ARGS=-Duser.timezone=Asia/Shanghai
      - CATALINA_OPTS=-Dconfluence.document.conversion.fontpath=/usr/local/share/fonts/
    volumes:
      - confluenceVolume:/var/atlassian/application-data/confluence
      - /opt/agent:/opt/agent
      - ./fonts:/usr/local/share/fonts
    restart: always

  dbjira:
    image: docker.io/bitnami/postgresql:14
    ports:
      - '5432:5432' # 如果不打算暴露数据库端口，可以注释掉
    volumes:
      - 'dbjira_data:/bitnami/postgresql'
    environment:
      - POSTGRESQL_USERNAME=jira
      - POSTGRESQL_DATABASE=jira
      - POSTGRESQL_PASSWORD="password" # 请设置为自己的密码
    restart: always

  dbconf:
    image: docker.io/bitnami/postgresql:14
    ports:
      - '6432:5432' # 如果不打算暴露数据库端口，可以注释掉
    volumes:
      - 'dbconf_data:/bitnami/postgresql'
    environment:
      - POSTGRESQL_USERNAME=conf
      - POSTGRESQL_DATABASE=conf
      - POSTGRESQL_PASSWORD="password" # 请设置为自己的密码
    restart: always

volumes:
  dbjira_data: 
  dbconf_data:
  jiraVolume: 
  confluenceVolume:
```

## 破解

#### 宿主机安装Java

```bash
dnf install java-17-openjdk
```

#### 上传破解工具到宿主机和容器

:::tip
宿主机和容器内的存放位置最好一致，方便后续配置Java变量。

这里选择 `/opt/agent/atlassian-agent.jar`
:::

#### 宿主机配置Java环境变量

将下面的内容添加到宿主机和容器内的全局变量，可以直接在 `/etc/profile` 里添加，也可以添加在 `/opt/atlassian/jira/bin/setenv.sh` 里。

```bash title="宿主机"
vim /etc/profile
```

```bash
export JAVA_OPTS="-javaagent:/opt/agent/atlassian-agent.jar ${JAVA_OPTS}"
```

```Bash
source /etc/profile
```

#### 容器内配置Java环境变量

```Bash title="进入容器"
docker exec -it jira /bin/bash

docker exec -it confluence /bin/bash
```

```bash title="容器内"
vim /opt/atlassian/jira/bin/setenv.sh

vim /opt/atlassian/confluence/bin/setenv.sh
```

```bash
export JAVA_OPTS="-javaagent:/opt/agent/atlassian-agent.jar ${JAVA_OPTS}"
```

#### 重启容器

:::info
完成前两步后，需要重启容器，让环境变量生效，才能进行下一步。
:::

#### 计算破解码

:::tip
以下命令中：
- `jira`，`conf`，`crowd` 是对应的应用名。
- `-m` 为邮箱，`-n` 为用户名，`-o` 为网址，可任意填写。
- `-s` 为许可编号，根据输入秘钥界面的提示填入。
:::

```bash
java -jar /opt/agent/atlassian-agent.jar -d -p jira -m admin@homelab.wang -n admin -o https://homelab.wang -s BXAY-7KCQ-MXW2-K6D8
```

## 版本升级

```bash
docker compose pull
docker compose up -d
```