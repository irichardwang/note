---
title: Hadoop安装部署--HDFS集群部署
sidebar_position: 3
sidebar_label: HDFS集群部署
---

### 节点规划

| 主机名 | 角色 |
| --- | --- |
| hadoop01 |  NameNode、DataNode |
| hadoop02 |  DataNode |
| hadoop03 |  DataNode、SecondaryNameNode |


### 1. 准备程序文件

1. 下载 Hadoop 程序包
    ```bash
    wget https://dlcdn.apache.org/hadoop/common/hadoop-3.3.4/hadoop-3.3.4.tar.gz
    ```

2. 解压
    ```bash
    tar -zxvf hadoop-3.3.4.tar.gz -C /opt/bigdata
    ```

3. 创建软链接
    ```bash
    ln -s /opt/bigdata/hadoop-3.3.4 /opt/bigdata/hadoop
    ```

### 2. 修改配置文件

1. 配置 workers
    ```bash
    vim /opt/bigdata/hadoop/etc/hadoop/workers
    ```

    ```bash
    hadoop01
    hadoop02
    hadoop03
    ```

2. 配置 hadoop-env.sh
    ```bash
    vim /opt/bigdata/hadoop/etc/hadoop/hadoop-env.sh
    ```

    ```bash
    export JAVA_HOME=/opt/bigdata/jdk
    export HADOOP_HOME=/opt/bigdata/hadoop
    export HADOOP_CONF_DIR=${HADOOP_HOME}/etc/hadoop
    export HADOOP_LOG_DIR=${HADOOP_HOME}/logs
    ```

3. 配置 core-site.xml
    ```bash
    vim /opt/bigdata/hadoop/etc/hadoop/core-site.xml
    ```

    ```xml
        <property>
            <name>fs.defaultFS</name>
            <value>hdfs://hadoop01:8020</value>
        </property>
    ```

4. 配置 hdfs-site.xml
    ```bash
    vim /opt/bigdata/hadoop/etc/hadoop/hdfs-site.xml
    ```

    ```xml
        <!-- namenode地址 -->
        <property>
            <name>dfs.namenode.http-address</name>
            <value>hadoop01:9870</value>
        </property>
        <!-- secondarynamenode地址 -->
        <property>
            <name>dfs.namenode.secondary.http-address</name>
            <value>hadoop03:9868</value>
        </property>
        <!-- 副本数量 -->
        <property>
            <name>dfs.replication</name>
            <value>1</value>
        </property>
        <!-- 指定哪些节点作为 NameNode -->
        <property>
            <name>dfs.namenode.hosts</name>
            <value>hadoop01, hadoop02, hadoop03</value>
        </property>
    ```

5. 创建目录
    ```bash
    # 在 NameNode 节点上执行，本例中为 hadoop01
    mkdir -p /data/nameNode

    # 在 DataNode 节点上执行，本例中为 hadoop01、hadoop02、hadoop03
    mkdir -p /data/dataNode
    ```

6. 分发到其他节点
    ```bash
    xsync /opt/bigdata/hadoop-3.3.4/etc/hadoop
    ```

### 3. 配置环境变量

```bash
vim /etc/profile.d/bigdata.sh
```

```bash
export HADOOP_HOME=/opt/bigdata/hadoop
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
```

```bash
source /etc/profile
```

### 4. 授权 hadop 用户

```bash
chown -R hadoop:hadoop /data
```

### 5. 格式化 NameNode

```bash
su - hadoop
```

```bash
hdfs namenode -format
```

### 6. 启动 HDFS

```bash
start-dfs.sh
```

### 7. 查看进程

```bash
jpsall
```

### 8. 访问 HDFS

1. 访问 NameNode
    ```bash
    http://hadoop01:9870
    ```

2. 访问 DataNode
    ```bash
    http://hadoop02:9864
    http://hadoop03:9864
    ```

3. 访问 SecondaryNameNode
    ```bash
    http://hadoop03:9868
    ```

### 9. 停止 HDFS
    
```bash
stop-dfs.sh
```

