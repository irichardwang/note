---
title: Hadoop安装部署--补充配置
sidebar_position: 8
sidebar_label: 补充配置
---


### 1. 配置文件补充


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
    xsync /bigdata/server/hadoop-3.3.6/etc/hadoop
    ```



### 一键 Hadoop 集群启停脚本

1. 创建脚本

```bash
vim /home/hadoop/bin/hdp.sh
```

2. 脚本内容

```bash
#!/bin/bash
if [ $# -lt 1 ]
then
    echo "No Args Input..."
    exit;
fi

case $1 in
"start")
    echo "========== 启动 Hadoop 集群 =========="

    echo "========== 启动 HDFS =========="
    ssh node01 "/bigdata/server/hadoop/sbin/start-dfs.sh"
    echo "========== 启动 YARN =========="
    ssh node01 "/bigdata/server/hadoop/sbin/start-yarn.sh"
    echo "========== 启动 HistoryServer =========="
    ssh node01 "/bigdata/server/hadoop/bin/mapred --daemon start historyserver"
;;
"stop")
    echo "========== 停止 Hadoop 集群 =========="

    echo "========== 停止 HistoryServer =========="
    ssh node01 "/bigdata/server/hadoop/bin/mapred --daemon stop historyserver"
    echo "========== 停止 YARN =========="
    ssh node01 "/bigdata/server/hadoop/sbin/stop-yarn.sh"
    echo "========== 停止 HDFS =========="
    ssh node01 "/bigdata/server/hadoop/sbin/stop-dfs.sh"
;;
*)
    echo "Input Args Error..."
;;
esac
```

3. 赋予执行权限

```bash
chmod +x /home/hadoop/bin/hdp.sh
```

4. 使用命令

```bash
hdp.sh start
hdp.sh stop
```