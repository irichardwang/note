---
title: Hadoop安装部署--YARN集群部署
sidebar_position: 4
sidebar_label: YARN集群部署
---

### 节点规划

| 主机名 | 角色 |
| --- | --- |
| hadoop01 |  Nodemanager |
| hadoop02 |  ResourceManager、Nodemanager |
| hadoop03 |  Nodemanager |

### 1. MapReduce配置文件

1. 配置 `mapred-env.sh`

```bash
vim /opt/bigdata/hadoop/etc/hadoop/mapred-env.sh
```

```bash
# 设置JAVA_HOME
export JAVA_HOME=/opt/bigdata/jdk

export HADOOP_JOB_HISTORYSERVER_HEAPSIZE=1000
# 设置日志级别为INFO
export HADOOP_MAPRED_ROOT_LOGGER=INFO,RFA
```

2. 配置 `mapred-site.xml`

```bash
vim /opt/bigdata/hadoop/etc/hadoop/mapred-site.xml
```

```xml
<configuration>
    <!-- 设置MapReduce框架运行在YARN上 -->
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
    <!-- 设置MapReduce的JobHistoryServer的地址 -->
    <property>
        <name>mapreduce.jobhistory.address</name>
        <value>hadoop01:10020</value>
    </property>
    <!-- 设置MapReduce的JobHistoryServer的web地址 -->
    <property>
        <name>mapreduce.jobhistory.webapp.address</name>
        <value>hadoop01:19888</value>
    </property>


    <!-- 设置MapReduce的JobHistoryServer的日志地址 -->
    <property>
        <name>mapreduce.jobhistory.intermediate-done-dir</name>
        <value>/data/mrhistory/tmp</value>
    </property>
    <property>
        <name>mapreduce.jobhistory.done-dir</name>
        <value>/data/mrhistory/done</value>
    </property>
    <!-- 设置MapReduce Home 为 Hadoop Home -->
    <property>
        <name>yarn.app.mapreduce.am.env</name>
        <value>HADOOP_MAPRED_HOME=$HADOOP_HOME</value>
    </property>
    <property>
        <name>mapreduce.map.env</name>
        <value>HADOOP_MAPRED_HOME=$HADOOP_HOME</value>
    </property>
    <property>
        <name>mapreduce.reduce.env</name>
        <value>HADOOP_MAPRED_HOME=$HADOOP_HOME</value>
    </property>
</configuration>
```

### 2. 配置YARN

1. 配置 `yarn-env.sh`

```bash
vim /opt/bigdata/hadoop/etc/hadoop/yarn-env.sh
```

```bash
# 设置JAVA_HOME
export JAVA_HOME=/opt/bigdata/jdk
# 设置 Hadop Home
export HADOOP_HOME=/opt/bigdata/hadoop
# 设置配置文件目录
export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
# 设置日志目录
export HADOOP_LOG_DIR=$HADOOP_HOME/logs
```

2. 配置 `yarn-site.xml`

```bash
vim /opt/bigdata/hadoop/etc/hadoop/yarn-site.xml
```

```xml
<configuration>
    <!-- 为 MapReduce 开启 shuffle 服务 -->
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
    <!-- 设置ResourceManager的节点 -->
    <property>
        <name>yarn.resourcemanager.hostname</name>
        <value>hadoop02</value>
    </property>
    <!-- 设置环境变量的继承 -->
    <property>
        <name>yarn.nodemanager.env-whitelist</name>
        <value>JAVA_HOME,HADOOP_COMMON_HOME,HADOOP_HDFS_HOME,HADOOP_CONF_DIR,CLASSPATH_PREPEND_DISTCACHE,HADOOP_YARN_HOME,HADOOP_MAPRED_HOME</value>
    </property>
    <!-- 关闭yarn对虚拟内存的检查 -->
    <property>
        <name>yarn.nodemanager.vmem-check-enabled</name>
        <value>false</value>
    </property>
    <!-- 开启日志聚合 -->
    <property>
        <name>yarn.log-aggregation-enable</name>
        <value>true</value>
    </property>
    <!-- 设置 历史服务器 日志聚合 URL -->
    <property>
        <name>yarn.log.server.url</name>
        <value>http://hadoop01:19888/jobhistory/logs</value>
    </property>
    <!-- 设置日志保留时间为 30 天 -->
    <property>
        <name>yarn.log-aggregation.retain-seconds</name>
        <value>2592000</value>
    </property>


    <!-- NodeManager中间数据本次存放目录 -->
    <property>
        <name>yarn.nodemanager.local-dirs</name>
        <value>/data/nmlocal</value>
    </property>
    <!-- NodeManager日志存放目录 -->
    <property>
        <name>yarn.nodemanager.log-dirs</name>
        <value>/data/nmlog</value>
    </property>
    <!-- 设置 代理服务器主机和端口 -->
    <property>
        <name>yarn.web-proxy.address</name>
        <value>hadoop02:8089</value>
    </property>

    <!-- 程序日志HDFS存放目录 -->
    <property>
        <name>yarn.nodemanager.remote-app-log-dir</name>
        <value>/tmp/logs</value>
    </property>
    <!-- 选择公平调度器 -->
    <property>
        <name>yarn.resourcemanager.scheduler.class</name>
        <value>org.apache.hadoop.yarn.server.resourcemanager.scheduler.fair.FairScheduler</value>
    </property>
</configuration>
```

---

### 分发配置文件

```bash
xsync /opt/bigdata/hadoop/etc/hadoop
```


### 启动YARN

```bash
start-yarn.sh
```
