---
title: 部署 DolphinScheduler
sidebar_position: 4
sidebar_label: 部署 DolphinScheduler
---

## 环境准备

### 安装 JDK

1. 下载 JDK 并解压到 `/opt/bigdata` 目录下

    ```bash
    wget https://download.oracle.com/otn/java/jdk/8u381-b09/8c876547113c4e4aab3c868e9e0ec572/jdk-8u381-linux-x64.tar.gz
    tar -zxvf /opt/software/jdk-8u381-linux-x64.tar.gz -C /opt/bigdata
    ```

2. 创建软链接

    ```bash
    ln -s /opt/bigdata/jdk1.8.0_381 /opt/bigdata/jdk
    ```

3. 配置环境变量

    ```bash
    vim /etc/profile.d/bigdata.sh
    ```

    ```bash
    export JAVA_HOME=/opt/bigdata/jdk
    export PATH=$JAVA_HOME/bin:$PATH
    ```

### 安装 zookeeper

1. 下载 zookeeper 并解压到 `/opt/bigdata` 目录下

    ```bash
    wget https://dlcdn.apache.org/zookeeper/zookeeper-3.8.2/apache-zookeeper-3.8.2-bin.tar.gz
    tar -zxvf /opt/software/apache-zookeeper-3.8.2-bin.tar.gz -C /opt/bigdata
    ```

2. 创建软链接

    ```bash
    ln -s /opt/bigdata/apache-zookeeper-3.8.2-bin /opt/bigdata/zookeeper
    ```

3. 创建用于存储 zookeeper 数据的目录

    ```bash
    mkdir /opt/zkdata
    ```

4. 修改配置文件

    ```bash
    mv /opt/bigdata/zookeeper/conf/zoo_sample.cfg /opt/bigdata/zookeeper/conf/zoo.cfg
    vim /opt/bigdata/zookeeper/conf/zoo.cfg
    ```

    ```bash
    dataDir=/opt/zkdata
    ```

5. 启动 zookeeper

    ```bash
    /opt/bigdata/zookeeper/bin/zkServer.sh start
    ```

### 配置用户及免密登录

1. 创建用户

    ```bash
    useradd dolphinscheduler
    ```

2. 添加密码

    ```bash
    echo "dolphinscheduler" | passwd --stdin dolphinscheduler
    ```

3. 添加 sudo 权限

    ```bash
    sed -i '$adolphinscheduler  ALL=(ALL)  NOPASSWD: NOPASSWD: ALL' /etc/sudoers
    sed -i 's/Defaults    requirett/#Defaults    requirett/g' /etc/sudoers
    ```

4. 修改目录权限

    ```bash
    chown -R dolphinscheduler:dolphinscheduler /opt
    ```

## 安装部署

### 安装包准备

1. 下载安装包并解压到当前目录

    :::info
    DolphinScheduler 的安装包解压到下载目录即可，其提供的一键部署脚本会自动将安装包拷贝到指定的安装目录。
    :::

    ```bash
    wget https://dlcdn.apache.org/dolphinscheduler/3.1.7/apache-dolphinscheduler-3.1.7-bin.tar.gz
    tar -zxvf /opt/software/apache-dolphinscheduler-3.1.7-bin.tar.gz -C /opt/software
    ```


2. 上传 mysql 驱动

    :::note
    由于 Apache License 2.0 的限制，DolphinScheduler 的安装包中不包含 mysql 驱动，需要自行上传。
    :::

    我这里首先上传 mysql 驱动到 `/opt/software` 目录，然后拷贝到所需驱动的各个服务的 libs 目录下。

    ```bash
    cp /opt/software/mysql-connector-java-8.0.16.jar /opt/software/apache-dolphinscheduler-3.1.7-bin/alert-server/libs
    cp /opt/software/mysql-connector-java-8.0.16.jar /opt/software/apache-dolphinscheduler-3.1.7-bin/api-server/libs
    cp /opt/software/mysql-connector-java-8.0.16.jar /opt/software/apache-dolphinscheduler-3.1.7-bin/master-server/libs
    cp /opt/software/mysql-connector-java-8.0.16.jar /opt/software/apache-dolphinscheduler-3.1.7-bin/worker-server/libs
    cp /opt/software/mysql-connector-java-8.0.16.jar /opt/software/apache-dolphinscheduler-3.1.7-bin/tools/libs
    ```
    :::caution
    - 官方文档说明，若使用 mysql 作为元数据库，则添加的驱动版本必须为 8.0.16。
    - 官方文档中只提及了前四个服务，但实际上 tools 也需要 mysql 驱动，否则在初始化元数据库时会报缺少驱动。部署时这里卡了很久，后来才发现 tools 下也有 libs 目录。
    :::

### 初始化元数据库

:::note
此处使用 mysql 作为元数据库，mysql 的安装和配置请参考 [mysql 安装](/bigdata/mysql-install)。
:::

1. 创建元数据库

    ```bash
    mysql -uroot -p

    mysql> CREATE DATABASE dolphinscheduler DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

    # 修改 {user} 和 {password} 为你希望的用户名和密码
    mysql> CREATE USER 'homelab'@'%' IDENTIFIED BY 'yourpassword';
    mysql> GRANT ALL PRIVILEGES ON dolphinscheduler.* TO 'homelab'@'%';
    mysql> CREATE USER 'homelab'@'localhost' IDENTIFIED BY 'yourpassword';
    mysql> GRANT ALL PRIVILEGES ON dolphinscheduler.* TO 'homelab'@'localhost';
    mysql> FLUSH PRIVILEGES;
    ```


2. 修改 dolphinscheduler_env.sh 配置文件

    ```bash
    vim /opt/bigdata/apache-dolphinscheduler-3.1.7-bin/bin/env/dolphinscheduler_env.sh
    ```

    ```bash
    export DATABASE=${DATABASE:-mysql}
    export SPRING_PROFILES_ACTIVE=${DATABASE}
    export SPRING_DATASOURCE_URL="jdbc:mysql://127.0.0.1:3306/dolphinscheduler?useUnicode=true&characterEncoding=UTF-8&useSSL=false"
    export SPRING_DATASOURCE_USERNAME={user}
    export SPRING_DATASOURCE_PASSWORD={password}
    ```

3. 初始化数据库

    ```bash
    bash /opt/bigdata/apache-dolphinscheduler-3.1.7-bin/tools/bin/upgrade-schema.sh
    ```

### 部署 DolphinScheduler

1. 

