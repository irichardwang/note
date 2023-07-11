---
title: Hadoop安装部署--HDFS集群部署
sidebar_position: 3
sidebar_label: HDFS集群部署
---

### 节点规划

| 主机名   | 角色                        |
| -------- | --------------------------- |
| hadoop01 | NameNode、DataNode          |
| hadoop02 | DataNode                    |
| hadoop03 | DataNode、SecondaryNameNode |

### 1. 准备程序文件

1. 下载 Hadoop 程序包

   :::tip
   若下载速度过慢，可更换使用国内镜像如 [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/) 下载
   :::

   ```bash
   cd /opt/software
   wget https://dlcdn.apache.org/hadoop/common/hadoop-3.3.4/hadoop-3.3.4.tar.gz
   ```

2. 解压

   ```bash
   tar -zxvf /opt/software/hadoop-3.3.4.tar.gz -C /opt/bigdata
   ```

3. 创建软链接
   ```bash
   ln -s /opt/bigdata/hadoop-3.3.4 /opt/bigdata/hadoop
   ```

### 2. 配置环境变量

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

### 3. 配置 workers

```bash
vim /opt/bigdata/hadoop/etc/hadoop/workers
```

```bash
hadoop01
hadoop02
hadoop03
```

### 4. 配置 core-site.xml

```bash
vim /opt/bigdata/hadoop/etc/hadoop/core-site.xml
```

```xml
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://hadoop01:8020</value>
    </property>
```

### 5. 配置 hdfs-site.xml

```bash
vim /opt/bigdata/hadoop/etc/hadoop/hdfs-site.xml
```

:::caution
针对副本数量 `dfs.replication`，由于我们在家中部署时，多数情况下三台虚拟机均在同一台物理机上和硬盘上，设置多个副本没有实际意义，反而浪费磁盘空间，所以设置为 1。生产环境中，需要修改为 3。
:::

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

### 6. 分发到其他节点

:::warning
文件夹 `/opt/bigdata/hadoop-3.3.4` 只可在集群初次启动之前分发，若已启动过，不可再分发，因为每个节点生成的数据不同，分发后会导致集群损坏。
:::

```bash
xsync /opt/bigdata/hadoop-3.3.4
```

### 7. HDFS 集群启动

1. 格式化 NameNode

   ```bash
   su - hadoop
   ```

   ```bash
   hdfs namenode -format
   ```

2. 启动 HDFS

   ```bash
   start-dfs.sh
   ```

3. 查看进程

   ```bash
   jps
   ```

4. 停止 HDFS
   ```bash
   stop-dfs.sh
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
