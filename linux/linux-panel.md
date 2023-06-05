---
sidebar_label: '运维面板'
sidebar_position: 3
title: '运维面板'
---

:::caution
Linux运维面板在学习初期可以提供很大的帮助，但熟练后其实必要性不高。

目前主要在一台主机上安装了宝塔面板，为管理Nginx和局域网内的网站提供便利。
:::

## 宝塔面板

:::info
宝塔面板是国内最成熟的运维面板，得到阿里云和腾讯云等大厂的认可，自己购买的轻量服务器，均提供了内置宝塔面板的镜像供选择。
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LinkCard from '@site/src/components/LinkCard';

<Tabs>
<TabItem value='官方安装' label='官方安装' default>

<LinkCard title='宝塔面板官方一键安装链接' description='宝塔面板下载，免费全能的服务器运维软件' to='https://www.bt.cn/new/download.html' />

```bash
yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec
```

</TabItem>
<TabItem value='破解安装' label='破解安装' default>

<LinkCard title='破解版博客' description='Linux宝塔面板《企业版》一键安装脚本-创信博客 (cxinyun.cn)' to='https://blog.cxinyun.cn/825.html' />

```bash
yum install -y wget && wget -O install.sh http://bt.cxinyun.com/install/install_6.0.sh && sh install.sh
```

</TabItem>
</Tabs>

#### 更换宝塔面板的用户名及密码
```bash
# 进入面板设置选项选择对应功能
bt 5 #更改密码
bt 6 #更改用户名
bt 14 #查看面板信息及登录地址
```

## 1Panel 面板

:::info
1Panel是由dataease团队开发的开源运维面板，目前还在开发中，但已经可以使用。功能方面还不够完善，但界面美观程度超过了宝塔面板。
:::

```bash
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sh quick_start.sh
```