---
title: Hadoop安装部署--安装HDFS
sidebar_position: 3
sidebar_label: 安装HDFS
---

### 节点规划

| 主机名 | 角色 |
| --- | --- |
| node01 |  NameNode、DataNode |
| node02 |  DataNode |
| node03 |  DataNode、SecondaryNameNode |


### 1. 准备程序文件

1. 下载 Hadoop 程序包
    ```bash
    wget https://dlcdn.apache.org/hadoop/common/hadoop-3.3.6/hadoop-3.3.6.tar.gz
    ```

2. 解压
    ```bash
    tar -zxvf hadoop-3.3.6.tar.gz -C /bigdata/server
    ```

3. 分发到其他节点
    ```bash
    xsync /bigdata/server/hadoop-3.3.6
    ```

4. 创建软链接
    ```bash
    ln -s /bigdata/server/hadoop-3.3.6 /bigdata/server/hadoop
    ```

### 2. 修改配置文件

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
            <name>fs.defaultFS</name>
            <value>hdfs://node01:8020</value>
        </property>
        <property>
            <name>io.file.buffer.size</name>
            <value>131072</value>
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
            <name>dfs.namenode.data.dir.perm</name>
            <value>700</value>
        </property>
        <property>
            <name>dfs.namenode.name.dir</name>
            <value>/bigdata/server/hadoop/data/nameNode</value>
        </property>
        <property>
            <name>dfs.datanode.data.dir</name>
            <value>/bigdata/server/hadoop/data/dataNode</value>
        </property>
        <property>
            <name>dfs.namenode.hosts</name>
            <value>node01, node02, node03</value>
        </property>
        <property>
            <name>dfs.namenode.handler.count</name>
            <value>100</value>
        </property>
        <property>
            <name>dfs.blocksize</name>
            <value>268435456</value>
        </property>
    </configuration>
    ```

5. 创建目录
    ```bash
    # 在 NameNode 节点上执行，本例中为 node01
    mkdir -p /bigdata/server/hadoop/data/nameNode

    # 在 DataNode 节点上执行，本例中为 node01、node02、node03
    mkdir -p /bigdata/server/hadoop/data/dataNode
    ```

6. 分发到其他节点
    ```bash
    xsync /bigdata/server/hadoop-3.3.6
    ```

### 3. 配置环境变量

```bash
vim /etc/profile
```

```bash
export HADOOP_HOME=/bigdata/server/hadoop
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
```

```bash
source /etc/profile
```

### 4. 授权 hadop 用户

```bash
chown -R hadoop:hadoop /bigdata
```

### 5. 格式化 NameNode

```bash
su - hadoop
```

```bash
hadoop namenode -format
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
    http://node01:9870
    ```

2. 访问 DataNode
    ```bash
    http://node02:9864
    http://node03:9864
    ```

3. 访问 SecondaryNameNode
    ```bash
    http://node03:9868
    ```

### 9. 停止 HDFS
    
```bash
stop-dfs.sh
```

