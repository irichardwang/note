---
sidebar_label: 替换软件源
sidebar_position: 1
title: 替换软件源
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## RockyLinux替换软件源

### 替换 `yum` 软件源

1. 更换软件源
    <Tabs>
    <TabItem value='RockyLinux8' label='RockyLinux8' default>

    ```bash
    sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
            -e 's|^#baseurl=http://dl.rockylinux.org/$contentdir|baseurl=https://mirrors.cernet.edu.cn/rocky|g' \
            -i.bak \
            /etc/yum.repos.d/Rocky-AppStream.repo \
            /etc/yum.repos.d/Rocky-BaseOS.repo \
            /etc/yum.repos.d/Rocky-Extras.repo \
            /etc/yum.repos.d/Rocky-PowerTools.repo
    ```
    </TabItem>
    <TabItem value='RockyLinux9' label='RockyLinux9' default>

    ```bash
    sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
            -e 's|^#baseurl=http://dl.rockylinux.org/$contentdir|baseurl=https://mirrors.cernet.edu.cn/rocky|g' \
            -i.bak \
            /etc/yum.repos.d/rocky-extras.repo \
            /etc/yum.repos.d/rocky.repo
    ```
    </TabItem>
    </Tabs>

2. 清除历史缓存
    ```bash
    sudo dnf clean all
    ```

3. 生成缓存
    ```bash
    sudo dnf makecache
    ```

### 替换 `EPEL` 软件源

## Ubuntu替换软件源

1. 在安装时替换以下 mirror 地址

    ```
    https://mirrors.cernet.edu.cn/ubuntu/
    ```