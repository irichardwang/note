---
sidebar_position: 3
title: 最小化安装下的补充软件包
sidebar_label: 软件包
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note
由于安装时采用了最小化安装，因此需要手动安装一些必备的软件包，比如 vim、wget 等。
:::

### 1. 基础软件包

<Tabs>
<TabItem value='RockyLinux' label='RockyLinux' default>
```bash
sudo dnf install -y vim wget git
```
</TabItem>

<TabItem value='Ubuntu' label='Ubuntu' default>
```bash
sudo apt install -y vim wget git qemu-guest-agent
```
</TabItem>
</Tabs>