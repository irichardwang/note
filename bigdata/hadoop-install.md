

## 环境准备

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

### 4. root 用户配置 ssh 免密登录

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

