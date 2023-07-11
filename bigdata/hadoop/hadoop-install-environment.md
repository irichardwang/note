---
title: Hadoop安装部署--环境准备
sidebar_position: 2
sidebar_label: 环境准备
---

:::info
学习中以三台虚拟机为例，主机名分别为 hadoop01、hadoop02、hadoop03。系统为 Rocky Linux 8.8。
:::

## 虚拟机创建

:::tip
若多台虚拟机使用克隆的方式创建，需要按如下步骤分别修改主机名和静态ip地址，避免冲突。若各个虚拟机采用独立安装，则可在安装时直接配置好主机名和静态ip地址。
:::

### 1.1 修改主机名

```bash
hostnamectl set-hostname hadoop01 # hadoop02、hadoop03
```

### 1.2 修改静态 ip 地址

```bash
vim /etc/sysconfig/network-scripts/ifcfg-ens33
```

```bash
...
BOOTPROTO=static
...
IPADDR="192.168.1.2"    # 每台虚拟机的 ip 地址不同
NETMASK="255.255.255.0" # 子网掩码，一般不用修改
GATEWAY="192.168.1.1"   # 网关地址
DNS1="192.168.1.1"      # DNS地址，可与网关地址相同
```


## 用户配置

:::caution
用户配置可以通过 xshell `发送键入到所有会话窗口` 的功能，同时在三台主机上执行，可以简化 ssh 免密登录的重复操作。否则需要在每台主机上分别执行。
:::

### 2.1 配置 hosts 主机名映射

```bash
vim /etc/hosts
```

```
192.168.100.61 hadoop01
192.168.100.62 hadoop02
192.168.100.63 hadoop03
```

### 2.2 配置 root 用户 ssh 免密登录

1. 生成密钥对

    ```bash
    ssh-keygen -t rsa
    ```

2. 将公钥分发到各个节点

    ```bash
    ssh-copy-id hadoop01
    ssh-copy-id hadoop02
    ssh-copy-id hadoop03
    ```

### 2.3 创建 `hadoop` 用户

:::tip
hadoop 用户可以在安装虚拟机过程中创建。若在安装时创建，则可跳过此步骤。
:::

```bash
useradd hadoop
passwd hadoop
```

### 2.4 配置 hadoop 用户 sudo 权限

```bash
vim /etc/sudoers
```

:::caution
以下配置需要在 %wheel ALL=(ALL) ALL 之后添加，否则无效。因为所有用户都在 %wheel 组中，若在 %wheel 之前添加，则会被之后的 %wheel 这一行配置覆盖。
:::

```bash
hadoop ALL=(ALL) NOPASSWD: ALL
```

### 2.5 配置 hadoop 用户 ssh 免密登录

1. 切换到 hadoop 用户
    ```bash
    su - hadoop
    ```

2. 生成密钥对
    ```bash
    ssh-keygen -t rsa
    ```

3. 将公钥分发到各个节点
    ```bash
    ssh-copy-id hadoop01
    ssh-copy-id hadoop02
    ssh-copy-id hadoop03
    ```

## 系统配置

### 3.1 关闭防火墙

```bash
systemctl stop firewalld
systemctl disable firewalld.service
```

### 3.2 关闭 SELinux

```bash
vim /etc/selinux/config
```

```bash
...
SELINUX=disabled
...
```

### 3.3 永久关闭 swap

```bash
swapoff -a
vim /etc/fstab
```

```bash
# 注释掉 swap 行
...
#/dev/mapper/cl-swap swap                    swap    defaults        0 0
...
```

### 3.4 配置时间同步

:::info
Rocky Linux 9.2 默认使用 chrony 作为时间同步服务。而 CentOS 7/8 默认使用 ntpd 作为时间同步服务。
:::

```bash
vim /etc/chrony.conf
```

```bash
...
server ntp.aliyun.com iburst
...
```

```bash
systemctl restart chronyd && systemctl status chronyd
systemctl start chronyd
systemctl enable chronyd
```

## 安装 JDK

### 4.1 创建目录

1. 创建目录
    ```bash
    mkdir -p /opt/bigdata # 用于存放软件
    mkdir -p /opt/software # 用于存放安装包
    ```

2. 授权给 hadoop 用户
    ```bash
    chown -R hadoop:hadoop /opt/bigdata
    chown -R hadoop:hadoop /opt/software
    ```

### 4.2 安装 JDK

1. 上传 `jdk-8u212-linux-x64.tar.gz` 到 `/bigdata/software` 目录

2. 解压
    ```bash
    tar -zxvf jdk-8u212-linux-x64.tar.gz -C /opt/bigdata
    ```

3. 创建软链接
    ```bash
    ln -s /opt/bigdata/jdk1.8.0_212 /opt/bigdata/jdk
    ```

4. 配置环境变量
    ```bash
    vim /etc/profile.d/bigdata.sh
    ```

    ```bash
    export JAVA_HOME=/opt/bigdata/jdk
    export PATH=$PATH:$JAVA_HOME/bin
    ```

5. 使环境变量生效

    :::tip
    通过 `source` 命令使环境变量生效，不需要重启系统，但是只对当前 shell 会话生效，若同时打开多个 shell 会话，则需要在每个 shell 会话中执行此命令，或者重启系统。
    :::

    ```bash
    source /etc/profile.d/bigdata.sh
    ```

6. 配置 JAVA 执行程序的软链接（可选）
    ```bash
    ln -s /opt/bigdata/jdk/bin/java /usr/bin/java
    ln -s /opt/bigdata/jdk/bin/jps /usr/bin/jps
    ```