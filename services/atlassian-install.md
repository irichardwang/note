---
sidebar_label: 'Atlassian'
title: Docker部署Atalssian全套软件

---

import LinkCard from '@site/src/components/LinkCard';

:::note
翻了全网对 Atlassian 软件(crowd, jira, confluence)的安装教程都是上古版本。其实官方提供了非常方便的 Docker 镜像，此处贴一发最新版本的安装 Docker 安装命令，为小白做个指导。
:::

## 安装说明

- 为每个应用创建数据卷，数据卷在移除容器时不会被删除，方便日后升级或迁移。
- 若使用 Nginx 反向代理，通过域名访问应用，需要添加 `ATL_PROXY_NAME`，`ATL_PROXY_PORT`，`ATL_TOMCAT_SCHEME`，`ATL_TOMCAT_SECURE` 环境变量。若计划直接通过 IP 访问可删除这几个环境配置。

:::caution
如果打算把软件反代到自己的域名，那么上述几个参数的配置非常重要，否则会导致应用内报错。反之，如果只是内网环境用IP+端口的方式使用，则不需要这几个参数，可以在Docker命令里删掉。
:::

## Crowd

```bash
docker volume create --name crowdVolume
```

```bash
docker run \
  -v crowdVolume:/var/atlassian/application-data/crowd \
  --name="crowd" -d -p 8095:8095 \
  -e ATL_PROXY_NAME='crowd.verystation.com' \
  -e ATL_PROXY_PORT='443' \
  -e ATL_TOMCAT_SCHEME='https' \
  -e ATL_TOMCAT_SECURE='true' \
  --restart=always \
  atlassian/crowd
```

## Jira

```bash
docker volume create --name jiraVolume
```

```bash
docker run \
  -v jiraVolume:/var/atlassian/application-data/jira \
  --name="jira" -d -p 8080:8080 \
  -e ATL_PROXY_NAME='jira.verystation.com' \
  -e ATL_PROXY_PORT='443' \
  -e ATL_TOMCAT_SCHEME='https' \
  -e ATL_TOMCAT_SECURE='true' \
  --restart=always \
  atlassian/jira-software
```

## Confluence

```bash
docker volume create --name confluenceVolume

docker run \
  -v confluenceVolume:/var/atlassian/application-data/confluence \
  --name="confluence" -d -p 8090:8090 \
  -p 8091:8091 -e ATL_PROXY_NAME='confluence.verystation.com' \
  -e ATL_PROXY_PORT='443' \
  -e ATL_TOMCAT_SCHEME='https' \
  -e ATL_TOMCAT_SECURE='true' \
  --restart=always \
  atlassian/confluence
```

## 破解

#### 宿主机安装Java

```bash
dnf install java-17-openjdk
```

#### 上传破解工具到宿主机和容器

:::tip
宿主机和容器内的存放位置最好一致，方便后续配置Java变量。

这里选择 `/opt/atlassian-agent.jar`
:::

#### 配置Java环境变量

将下面的内容添加到宿主机和容器内的全局变量，如果是root用户，可以直接在 `/etc/profile` 里添加，如果是普通用户，可以在 `~/.bashrc` 里添加。

```bash
export JAVA_OPTS="-javaagent:/opt/atlassian-agent.jar ${JAVA_OPTS}"
```

#### 计算破解码

:::info
以下命令中：
- `jira`，`conf`，`crowd` 是对应的应用名。
- `-m` 为邮箱，`-n` 为用户名，`-o` 为网址，可任意填写。
- `-s` 为许可编号，根据输入秘钥界面的提示填入。
:::

```bash
java -jar /opt/atlassian-agent.jar -d -p jira -m admin@verystation.com -n admin -o https://verystation.com -s BTHV-5X2G-8XNJ-ZHZG
```