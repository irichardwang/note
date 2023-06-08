---
title: ipmitool调整超微主板风扇报警下限
authors: richard
tags: [ipmitool, hardware]
---

import LinkCard from '@site/src/components/LinkCard';

:::danger
服务器安装后，发现风扇速度很有规律的在高低转速之间变化。查看主板IPMI日志发现如下的错误
> FANA Fan Lower Critical – Going Low – Assertion
> FANA Fan Lower Non-Recoverable – Going Low – Assertion
判断原因为风扇转速太低造成的风扇低速报警，在产生报警后，风扇会以满速运行一段时间，直到测速发现一切正常，再次降低转速，并最终导致这种规律的报警。
:::

## 在一台Linux主机上安装 `ipmitool`

```bash
yum install ipmitool
```

## 调整风扇转速警报线

#### 查看所有的风扇名称和默认配置

:::tip
注意将以下命令中的 -H [IP Address] -U [UserID] -P [Password]，更换为自己服务器的 IPMI IP地址、用户名和密码。
:::

```bash
ipmitool -H 192.168.100.100 -U ADMIN -P PASSWORD sensor list all
```

:::note
运行后发现，超微默认的风扇下限阈值是300 500 700，而风扇的最低转速在100多转，低负载下很容易低于警告线，触发报警。
:::


#### 逐个设置风扇的警报线

:::tip
风扇警报线根据自己服务器和风扇的实际情况调节。我这里由于刚组装完成，服务器几乎无负载，就先把下线调到了100，带后续负载上来以后再调高。
:::

```bash
ipmitool -H 192.168.10.100 -U ADMIN -P PASSWORD sensor thresh FANA lower 100 100 100
```
最后重新执行上述查看命令，检查配置是否生效并观测警报问题是否解除。
