---
title: Hadoop安装部署之环境准备
---

:::info
环境准备工作需要在所有节点上执行。

学习中以三台虚拟机为例，主机名分别为 node01、node02、node03，系统为 minimal 安装的 Rocky Linux 9.2。
:::

### 1. 修改主机名

若多台虚拟机使用克隆的方式创建，需要修改主机名，避免冲突。

```bash
hostnamectl set-hostname node01
# ...
```

### 2. 修改静态 ip 地址

```bash
vim /etc/sysconfig/network-scripts/ifcfg-ens33
```

```bash
...
BOOTPROTO=static
...
IPADDR="192.168.1.2"
NETMASK="255.255.255.0"
GATEWAY="192.168.1.1"
DNS1="192.168.1.1"
```


### 3. 配置 hosts 主机名映射

```bash
vim /etc/hosts
```

```
192.168.100.40 node01
192.168.100.41 node02
192.168.100.42 node03
```

### 4. 配置 root 用户 ssh 免密登录

1. 生成密钥对
    ```bash
    ssh-keygen -t rsa -b 4096
    ```

2. 将公钥分发到各个节点
    ```bash
    ssh-copy-id node01
    ssh-copy-id node02
    ssh-copy-id node03
    ```

### 5. 创建 hadoop 用户

```bash
useradd hadoop
passwd hadoop
```

### 6. 配置 hadoop 用户 sudo 权限

```bash
vim /etc/sudoers
```

```bash
...
hadoop ALL=(ALL) NOPASSWD: ALL
...
```

### 7. 配置 hadoop 用户 ssh 免密登录

1. 切换到 hadoop 用户
    ```bash
    su - hadoop
    ```

2. 生成密钥对
    ```bash
    ssh-keygen -t rsa -b 4096
    ```

3. 将公钥分发到各个节点
    ```bash
    ssh-copy-id node01
    ssh-copy-id node02
    ssh-copy-id node03
    ```

### 8. 关闭防火墙

```bash
systemctl stop firewalld
systemctl disable firewalld
```

### 9. 关闭 SELinux

```bash
vim /etc/selinux/config
```

```bash
...
SELINUX=disabled
...
```

### 10. 永久关闭 swap

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

### 11. 配置时间同步

:::tip
Rocky Linux 9.2 默认使用 chrony 作为时间同步服务。而 CentOS 7 默认使用 ntpd 作为时间同步服务。
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


