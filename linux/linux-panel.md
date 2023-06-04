---
sidebar_label: '运维面板'
sidebar_position: 3
title: '运维面板'
---

:::caution
Linux运维面板主要装在一台Nginx主机上。
:::

## 宝塔面板

:::info
宝塔面板是国内最成熟的运维面板。
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value='官方安装' label='官方安装' default>

[宝塔面板下载，免费全能的服务器运维软件](https://www.bt.cn/new/download.html)

```bash
yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec
```

</TabItem>
<TabItem value='破解安装' label='破解安装' default>

[Linux宝塔面板《企业版》一键安装脚本-创信博客 (cxinyun.cn)](https://blog.cxinyun.cn/825.html)

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

# 1Panel 面板

```bash
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sh quick_start.sh
```
