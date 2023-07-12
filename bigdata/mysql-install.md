---
title: RockyLinux(CentOS) 安装 MySQL
sidebar_position: 7
sidebar_label: MySQL安装
---

## 1. 安装 MySQL

1. 安装 MySQL 软件包

```bash
dnf install mysql-server
```

2. 启动 MySQL 服务并设置开机启动

```bash
systemctl start mysqld.service
systemctl enable mysqld.service
```

3. 安全性设置

```bash
mysql_secure_installation
```

:::info
该命令涉及如下配置
1. 设置 root 密码
2. 确认是否删除匿名用户
3. 确实是否禁止 root 远程登录
4. 确认是否删除 test 数据库
5. 确认是否重新加载权限表
:::

## 2. 配置 MySQL

1. 修改配置文件

```bash
vim /etc/my.cnf.d/mysql-server.cnf
```

其中，`[mysqld]` 下的配置项可以修改端口等信息。