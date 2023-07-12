---
title: Hadoop安装部署--Hive on Spark
sidebar_position: 6
sidebar_label: Hive on Spark
---

### 1. 准备 Spark 安装包

1. 上传 `spark-3.3.1-bin-hadoop3.tgz` 到 `/opt/software` 目录下

2. 解压

   ```bash
   tar -zxvf /opt/software/spark-3.3.1-bin-hadoop3.tgz -C /opt/bigdata
   ```

3. 创建软链接

   ```bash
    ln -s /opt/bigdata/spark-3.3.1-bin-hadoop3 /opt/bigdata/spark
    ```

### 2. 配置环境变量

```bash
vim /etc/profile.d/bigdata.sh
```

```bash
#SPARK_HOME
export SPARK_HOME=/opt/bigdata/spark
export PATH=$PATH:$SPARK_HOME/bin
```

```bash
source /etc/profile.d/bigdata.sh
```

### 3. 修改 spark-env.sh

```bash
cp /opt/bigdata/spark/conf/spark-env.sh.template /opt/bigdata/spark/conf/spark-env.sh
vim /opt/bigdata/spark/conf/spark-env.sh
```

```bash
export HADOOP_CONF_DIR=/opt/bigdata/hadoop/etc/hadoop/
```

### 4. 修改 hive 中的 spark-defaults.conf

```bash
vim /opt/bigdata/hive/conf/spark-defaults.conf
```

```bash
spark.master                 yarn
spark.eventLog.enabled       true
spark.eventLog.dir           hdfs://hadoop01:8020/spark-history
spark.executor.memory        4g
spark.driver.memory          2g
spark.yarn.populateHadoopClasspath true
```

### 5. 在 hdfs 中创建 spark-history 目录

```bash
hdfs dfs -mkdir -p /spark-history
```

### 6. 向 hdfs 中上传纯净版的 spark

1. 创建路径

    ```bash
    hdfs dfs -mkdir -p /spark-jars
    ```

2. 解压纯净版的 spark

    ```bash
    tar -zxvf /opt/software/spark-3.3.1-bin-without-hadoop.tgz -C /opt/software
    ```

3. 上传

    ```bash
    hdfs dfs -put /opt/software/spark-3.3.1-bin-without-hadoop/jars/* /spark-jars
    ```

### 7. 修改 hive-site.xml

```bash
vim /opt/bigdata/hive/conf/hive-site.xml
```

```xml
    <!-- Hive 执行引擎 -->
    <property>
        <name>hive.execution.engine</name>
        <value>spark</value>
    </property>
    <!-- Spark 依赖位置 -->
    <property>
        <name>spark.yarn.jars</name>
        <value>hdfs://hadoop01:8020/spark-jars/*</value>
    </property>
```

### 8. Yarn 环境设置运行多个 Spark 任务

```bash
vim /opt/bigdata/hadoop/etc/hadoop/capacity-scheduler.xml
```

```xml
    <!-- 设置 Application Master 的最大资源占比 -->
    <property>
        <name>yarn.scheduler.capacity.maximum-am-resource-percent</name>
        <value>0.5</value>
    </property>
```
