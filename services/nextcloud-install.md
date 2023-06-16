---
sidebar_label: 'Nextcloud'
title: Docker部署Nextcloud AIO
tags:
  - docker
  - nextcloud
---

import LinkCard from '@site/src/components/LinkCard';

:::note
Nextcloud是一款开源的私有云存储软件，可以用来搭建私有网盘，支持文件同步、日历、联系人、音乐播放、视频播放、在线文档编辑等功能。
:::

<LinkCard title="Nextcloud官方安装文档" description="Nextcloud AIO stands for Nextcloud All-in-One and provides easy deployment and maintenance with most features included in this one Nextcloud instance." to="https://github.com/nextcloud/all-in-one#how-to-use-this"></LinkCard>

## 安装 Nextcloud AIO 引导

1. 创建 docker-compose.yml 文件

   yaml文件参考：[nextcloud/all-in-one/compose.yaml](https://github.com/nextcloud/all-in-one/blob/main/compose.yaml)

    ```bash
    version: '3.6'
    services:
      nextcloud:
        image: nextcloud/all-in-one:latest
        restart: always
        container_name: nextcloud-aio-mastercontainer 
        volumes:
          - nextcloud_aio_mastercontainer:/mnt/docker-aio-config 
          - /var/run/docker.sock:/var/run/docker.sock:ro 
        ports:
          - 8080:8080
        environment:
          - SKIP_DOMAIN_VALIDATION=true
          - AIO_DISABLE_BACKUP_SECTION=true
          - APACHE_PORT=11000 
          - APACHE_IP_BINDING=127.0.0.1 
          - NEXTCLOUD_DATADIR=/mnt/ncdata 
          - NEXTCLOUD_UPLOAD_LIMIT=20G 
          - NEXTCLOUD_MAX_TIME=7200 
          - NEXTCLOUD_MEMORY_LIMIT=1024M 
    
    volumes:
      nextcloud_aio_mastercontainer:
        name: nextcloud_aio_mastercontainer 
    ```

2. 启动引导服务

    ```bash
    docker compose up -d
    ```