---
sidebar_position: 4
title: NTP时间同步
---

## NTP服务器

:::tip
NTP服务端建议使用软路由自带的NTP服务器功能，爱快、梅林和OpenWRT都有NTP服务器功能。
:::

## NTP客户端配置

#### 安装客户端

:::tip
RockyLinux9 默认安装了 `chrony` 时间同步服务，不需要再单独安装。
:::

```bash
dnf install -y chrony
```

#### 使用 `chronyd` 命令手动将时间与远程NTP服务器进行同步

```bash
chronyd -q 'server 192.168.100.1 iburst' # 修改为你的NTP服务器地址
```

#### 配置服务器参数

找到 `/etc/chrony.conf` 并修改

```bash 
vim /etc/chrony.conf
```

```bash title="/etc/chrony.conf"
server 192.168.100.1 iburst
```

#### 重启时间服务 & 查看服务启动状态

```bash
systemctl restart chronyd && systemctl status chronyd
```

#### 设置开机自动启动

```bash
systemctl enable chronyd
```

## 验证 Chrony 的同步

#### (服务器端)查看有哪些客户端通过此NTP服务器进行时钟同步

```bash
chronyc clients
```

#### 验证系统时间是否已使用chrony同步

```bash
chronyc tracking
```

#### 检查chrony来源，列出有关chronyd使用的当前时间源的信息

```bash
chronyc sources
```

#### 列出有关chronyd使用的每个源的漂移速度和偏移估计的信息

```bash
chronyc sourcestats  -v
```