---
title: Hadoop安装部署--补充配置
sidebar_position: 8
sidebar_label: 补充配置
---


### 1. 配置文件补充


3. 配置 core-site.xml
    ```bash
    vim /opt/bigdata/hadoop/etc/hadoop/core-site.xml
    ```

    ```xml
    <configuration>
        <!-- 配置 HDFS 网页登录使用的用户名 -->
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



### 一键 Hadoop 集群启停脚本

1. 创建脚本

```bash
vim /usr/bin/hdp
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
    ssh hadoop01 "/opt/bigdata/hadoop/sbin/start-dfs.sh"
    echo "========== 启动 YARN =========="
    ssh hadoop01 "/opt/bigdata/hadoop/sbin/start-yarn.sh"
    echo "========== 启动 HistoryServer =========="
    ssh hadoop01 "/opt/bigdata/hadoop/bin/mapred --daemon start historyserver"
;;
"stop")
    echo "========== 停止 Hadoop 集群 =========="

    echo "========== 停止 HistoryServer =========="
    ssh hadoop01 "/opt/bigdata/hadoop/bin/mapred --daemon stop historyserver"
    echo "========== 停止 YARN =========="
    ssh hadoop01 "/opt/bigdata/hadoop/sbin/stop-yarn.sh"
    echo "========== 停止 HDFS =========="
    ssh hadoop01 "/opt/bigdata/hadoop/sbin/stop-dfs.sh"
;;
*)
    echo "Input Args Error..."
;;
esac
```

3. 赋予执行权限

```bash
chmod +x /usr/bin/hdp
```

4. 使用命令

```bash
hdp.sh start
hdp.sh stop
```