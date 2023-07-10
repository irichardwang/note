---
title: Hadoop安装部署--环境准备
sidebar_position: 2
sidebar_label: 环境准备
---

:::info
环境准备工作需要在所有节点上执行。

学习中以三台虚拟机为例，主机名分别为 hadoop01、hadoop02、hadoop03。系统为 Rocky Linux 8.8。
:::

### 1. 修改主机名

若多台虚拟机使用克隆的方式创建，需要修改主机名，避免冲突。

```bash
hostnamectl set-hostname hadoop01
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
192.168.100.61 hadoop01
192.168.100.62 hadoop02
192.168.100.63 hadoop03
```

### 4. 配置 root 用户 ssh 免密登录

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
    ssh-keygen -t rsa
    ```

3. 将公钥分发到各个节点
    ```bash
    ssh-copy-id hadoop01
    ssh-copy-id hadoop02
    ssh-copy-id hadoop03
    ```

### 6. 关闭防火墙

```bash
systemctl stop firewalld
systemctl disable firewalld.service
```

### 7. 关闭 SELinux

```bash
vim /etc/selinux/config
```

```bash
...
SELINUX=disabled
...
```

### 8. 永久关闭 swap

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

### 9. 配置时间同步

:::tip
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

### 10. 创建目录

1. 创建目录
    ```bash
    mkdir -p /opt/bigdata # 用于存放软件
    mkdir -p /opt/software # 用于存放安装包
    ```

2. 授权 hadoop 用户
    ```bash
    chown -R hadoop:hadoop /opt/bigdata
    chown -R hadoop:hadoop /opt/software
    ```

### 11. 安装 JDK

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
    vim /etc/profile
    ```

    ```bash
    export JAVA_HOME=/opt/bigdata/jdk
    export PATH=$PATH:$JAVA_HOME/bin
    ```

    ```bash
    source /etc/profile
    ```

5. 配置 JAVA 执行程序的软链接
    ```bash
    ln -s /opt/bigdata/jdk/bin/java /usr/bin/java
    ln -s /opt/bigdata/jdk/bin/jps /usr/bin/jps
    ```


---

### 小工具：集群分发脚本

1. 确认是否安装 rsync

    ```bash
    dnf install rsync
    ```

2. 创建脚本
    ```bash
    vim /usr/bin/xsync
    ```

    ```bash
    #!/bin/bash 
    
    # 1. 判断参数个数 
    if [ $# -lt 1 ] 
    then 
        echo Not Enough Arguement! 
        exit; 
    fi

    # 2. 遍历集群所有机器
    # 替换集群中全部主机名
    for host in hadoop01 hadoop02 hadoop03 
    do 
        echo ====================  $host  ==================== 
        #3. 遍历所有目录，挨个发送 
    
        for file in $@ 
        do 
            #4. 判断文件是否存在 
            if [ -e $file ] 
                then 
                    #5. 获取父目录 
                    pdir=$(cd -P $(dirname $file); pwd) 
    
                    #6. 获取当前文件的名称 
                    fname=$(basename $file) 
                    ssh $host "mkdir -p $pdir" 
                    rsync -av $pdir/$fname $host:$pdir 
                else 
                    echo $file does not exists! 
            fi 
        done 
    done
    ```

3. 赋予执行权限
    ```bash
    chmod +x /usr/bin/xsync
    ```

### 小工具：查看集群jps进程脚本

```
vim /usr/bin/jpsall
```

```bash
#！/bin/bash
for i in hadoop01 hadoop02 hadoop03
do
    echo "===================$i==================="
    ssh $i /opt/bigdata/jdk/bin/jps
done
```

```bash
chmod +x /usr/bin/jpsall
```---
title: Hadoop安装部署--环境准备
sidebar_position: 2
sidebar_label: 环境准备
---

:::info
环境准备工作需要在所有节点上执行。

学习中以三台虚拟机为例，主机名分别为 hadoop01、hadoop02、hadoop03。系统为 Rocky Linux 8.8。
:::

### 1. 修改主机名

若多台虚拟机使用克隆的方式创建，需要修改主机名，避免冲突。

```bash
hostnamectl set-hostname hadoop01
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
192.168.100.61 hadoop01
192.168.100.62 hadoop02
192.168.100.63 hadoop03
```

### 4. 配置 root 用户 ssh 免密登录

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


### 5. 创建 hadoop 用户

```bash
useradd hadoop
passwd hadoop
```

### 6. 关闭防火墙

```bash
systemctl stop firewalld
systemctl disable firewalld.service
```

### 7. 关闭 SELinux

```bash
vim /etc/selinux/config
```

```bash
...
SELINUX=disabled
...
```

### 8. 永久关闭 swap

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

### 9. 配置时间同步

:::tip
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

### 10. 创建目录

1. 创建目录
    ```bash
    mkdir -p /opt/bigdata # 用于存放软件
    mkdir -p /opt/software # 用于存放安装包
    ```

2. 授权 hadoop 用户
    ```bash
    chown -R hadoop:hadoop /opt/bigdata
    chown -R hadoop:hadoop /opt/software
    ```

### 10. 安装 JDK

2. 上传 `jdk-8u212-linux-x64.tar.gz` 到 `/bigdata/software` 目录

3. 解压
    ```bash
    tar -zxvf jdk-8u212-linux-x64.tar.gz -C /opt/bigdata
    ```

4. 创建软链接
    ```bash
    ln -s /opt/bigdata/jdk1.8.0_212 /opt/bigdata/jdk
    ```

5. 配置环境变量
    ```bash
    vim /etc/profile
    ```

    ```bash
    export JAVA_HOME=/opt/bigdata/jdk
    export PATH=$PATH:$JAVA_HOME/bin
    ```

    ```bash
    source /etc/profile
    ```

6. 配置 JAVA 执行程序的软链接
    ```bash
    ln -s /opt/bigdata/jdk/bin/java /usr/bin/java
    ln -s /opt/bigdata/jdk/bin/jps /usr/bin/jps
    ```

### 11. 配置 hadoop 用户 sudo 权限

```bash
vim /etc/sudoers
```

```bash
...
hadoop ALL=(ALL) NOPASSWD: ALL
...
```

### 12. 配置 hadoop 用户 ssh 免密登录

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


---

### 小工具：集群分发脚本

1. 确认是否安装 rsync

    ```bash
    dnf install rsync
    ```

2. 创建脚本
    ```bash
    vim /usr/bin/xsync
    ```

    ```bash
    #!/bin/bash 
    
    # 1. 判断参数个数 
    if [ $# -lt 1 ] 
    then 
        echo Not Enough Arguement! 
        exit; 
    fi

    # 2. 遍历集群所有机器
    # 替换集群中全部主机名
    for host in hadoop01 hadoop02 hadoop03 
    do 
        echo ====================  $host  ==================== 
        #3. 遍历所有目录，挨个发送 
    
        for file in $@ 
        do 
            #4. 判断文件是否存在 
            if [ -e $file ] 
                then 
                    #5. 获取父目录 
                    pdir=$(cd -P $(dirname $file); pwd) 
    
                    #6. 获取当前文件的名称 
                    fname=$(basename $file) 
                    ssh $host "mkdir -p $pdir" 
                    rsync -av $pdir/$fname $host:$pdir 
                else 
                    echo $file does not exists! 
            fi 
        done 
    done
    ```

3. 赋予执行权限
    ```bash
    chmod +x /usr/bin/xsync
    ```

### 小工具：查看集群jps进程脚本

```
vim /usr/bin/jpsall
```

```bash
#！/bin/bash
for i in hadoop01 hadoop02 hadoop03
do
    echo "===================$i==================="
    ssh $i /opt/bigdata/jdk/bin/jps
done
```

```bash
chmod +x /usr/bin/jpsall
```