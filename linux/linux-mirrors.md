---
sidebar_label: 替换国内软件源
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LinkCard from '@site/src/components/LinkCard';

# 替换国内软件源

<LinkCard title="推荐使用MirrorZ高校镜像站点集合" description="Rocky Linux 软件仓库镜像使用帮助 MirrorZ Help" to="https://help.mirrors.cernet.edu.cn/rocky/" />

## 替换软件源

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


#### 清除历史缓存
```bash
dnf clean all
```

#### 生成缓存
```bash
dnf makecache
```

## 替换EPEL企业源

> 学习和折腾过程中经常会使用到企业源的软件，在此也安装和替换一下国内企业源。

#### 如果没有安装过企业源，先进行安装
```bash
yum install epel-release
```

#### 替换EPEL企业源
```bash
sudo sed -e 's!^metalink=!#metalink=!g' \
    -e 's!^#baseurl=!baseurl=!g' \
    -e 's!https\?://download\.fedoraproject\.org/pub/epel!https://mirrors.cernet.edu.cn/epel!g' \
    -e 's!https\?://download\.example/pub/epel!https://mirrors.cernet.edu.cn/epel!g' \
    -i /etc/yum.repos.d/epel*.repo
```

#### 测试效果
```bash
yum update
```

## 异常处理

:::info
若生成缓存时仍不能连接到镜像源，检查DNS是否为国内DNS地址。
:::

```bash
vi /etc/resolv.conf

# 修改其中的DNS地址如下
nameserver 223.5.5.5
nameserver 114.114.114.114
```
