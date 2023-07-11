---
title: Hadoop安装部署--YARN集群部署
sidebar_position: 4
sidebar_label: YARN集群部署
---

### 节点规划

| 主机名   | 角色                         |
| -------- | ---------------------------- |
| hadoop01 | Nodemanager                  |
| hadoop02 | ResourceManager、Nodemanager |
| hadoop03 | Nodemanager                  |

### 1. 配置 yarn-site.xml

```bash
vim /opt/bigdata/hadoop/etc/hadoop/yarn-site.xml
```

```xml
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


    <!-- 选择公平调度器 -->
    <property>
        <name>yarn.resourcemanager.scheduler.class</name>
        <value>org.apache.hadoop.yarn.server.resourcemanager.scheduler.fair.FairScheduler</value>
    </property>
```

### 2. 配置 mapred-site.xml

```bash
vim /opt/bigdata/hadoop/etc/hadoop/mapred-site.xml
```

```xml
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
```

### 3. 分发配置文件

:::warning
注意只分发 /hadoop-3.3.4/etc/hadoop 配置文件夹，切勿同步整个 /opt/bigdata/hadoop-3.3.4 文件夹。
:::

```bash
xsync /opt/bigdata/hadoop-3.3.4/etc/hadoop
```

### 4. 启动 YARN 集群启动

1. 启动 YARN

   ```bash
   start-yarn.sh
   ```

2. 启动历史服务器

   ```bash
   hadoop --daemon start historyserver
   ```

3. 停止 YARN

   ```bash
   hadoop --daemon stop historyserver
   stop-yarn.sh
   ```

### 访问 YARN 集群

1. 访问 ResourceManager

   ```bash
   http://hadoop02:8088
   ```

2. 访问历史服务器

   ```bash
   http://hadoop01:19888
   ```
