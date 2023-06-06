---
sidebar_position: 2
---

# Docker的安装部署

import LinkCard from '@site/src/components/LinkCard';

<LinkCard title="Docker官方安装文档" description="Install Docker Engine on CentOS | Docker Documentation" to="https://docs.docker.com/engine/install/centos/#install-using-the-repository" />

## Docker的官方源安装

#### 安装 yum 工具包
```bash
yum install -y yum-utils
```

#### 添加docker官方仓库

:::info 若没有国外网络环境，可以替换为国内镜像源。
:::

```bash
yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

#### Docker的安装命令
```bash
yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### 启动docker
```bash
systemctl start docker
```

#### 设置开机自启
```bash
systemctl enable docker
```

## 安装Docker-Compose

:::tip
Docker compose 与 docker-compose 服务不同，前者为plugin，后者为standalone。

绝大多数情况下不需要安装，但少数应用可能需要使用 docker-compose。
:::

#### 下载docker-compose
```bash
curl -SL https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
```

#### 授权执行命令
```bash
chmod +x /usr/local/bin/docker-compose
```

#### 确认是否安装成功
```bash
docker-compose --version
```

## 安装管理工具Portainer

:::info Portainer是一款Docker的可视化管理工具。
:::

:::caution
虽然Portainer具有很多简化易用的操作功能，但建议有限使用Portainer，可能产生一些不可预期的问题。

实际应用中建议主要用来做可视化监控，而具体操作仍应使用命令行。
:::

```bash
docker run -d -p 8080:8000 -p 9443:9443 --name=portainer --restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v portainer_data:/data \
portainer/portainer-ee:latest
```