---
title: Hadoop安装部署--补充配置
sidebar_position: 8
sidebar_label: 补充配置
---


### 1. 配置文件补充

1. 配置 workers
    ```bash
    vim /bigdata/server/hadoop/etc/hadoop/workers
    ```

    ```bash
    node01
    node02
    node03
    ```

2. 配置 hadoop-env.sh
    ```bash
    vim /bigdata/server/hadoop/etc/hadoop/hadoop-env.sh
    ```

    ```bash
    export JAVA_HOME=/bigdata/server/jdk
    export HADOOP_HOME=/bigdata/server/hadoop
    export HADOOP_CONF_DIR=${HADOOP_HOME}/etc/hadoop
    export HADOOP_LOG_DIR=${HADOOP_HOME}/logs
    ```

3. 配置 core-site.xml
    ```bash
    vim /bigdata/server/hadoop/etc/hadoop/core-site.xml
    ```

    ```xml
    <configuration>
        <property>
            <name>hadoop.http.staticuser.user</name>
            <value>hadoop</value>
        </property>
        <property>
            <name>hadoop.proxyuser.hadoop.hosts</name>
            <value>*</value>
        </property>
        <property>
            <name>hadoop.proxyuser.hadoop.groups</name>
            <value>*</value>
        </property>
        <property>
            <name>hadoop.proxyuser.hadoop.users</name>
            <value>*</value>
        </property>
    <configuration>
    ```

4. 配置 hdfs-site.xml
    ```bash
    vim /bigdata/server/hadoop/etc/hadoop/hdfs-site.xml
    ```

    ```xml
    <configuration>
        <property>
            <name>dfs.namenode.http-address</name>
            <value>node01:9870</value>
        </property>
        <property>
            <name>dfs.namenode.secondary.http-address</name>
            <value>node03:9868</value>
        </property>
        <property>
            <name>dfs.replication</name>
            <value>3</value>
        </property>
    </configuration>
    ```

5. 分发到其他节点
    ```bash
    xsync /bigdata/server/hadoop-3.3.6
    ```



