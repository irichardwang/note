---
title: Hadoop安装部署--Hive部署
sidebar_position: 5
sidebar_label: Hive部署
---

### 节点规划

| 主机名   | 角色 |
| -------- | ---- |
| hadoop01 |      |
| hadoop02 |      |
| hadoop03 |      |

### 1. 准备程序文件

1. 上传 `apache-hive-3.1.3-bin.tar.gz` 到 `/opt/software` 目录下

2. 解压

   ```bash
   tar -zxvf /opt/software/apache-hive-3.1.3-bin.tar.gz -C /opt/bigdata
   ```

3. 创建软链接

   ```bash
    ln -s /opt/bigdata/apache-hive-3.1.3-bin /opt/bigdata/hive
   ```

### 2. 配置环境变量

```bash
vim /etc/profile.d/bigdata.sh
```

```bash
#HIVE_HOME
export HIVE_HOME=/opt/bigdata/hive
export PATH=$PATH:$HIVE_HOME/bin
```

```bash
source /etc/profile.d/bigdata.sh
```

### 3. 解决日志 Jar 包冲突

```bash
mv /opt/bigdata/hive/lib/log4j-slf4j-impl-2.17.1.jar /opt/bigdata/hive/lib/log4j-slf4j-impl-2.17.1.jar.bak
```

### 4. 上传 mysql 驱动包

1. 上传 mysql 驱动包 `mysql-connector-j-8.0.33.jar` 到 `/opt/software` 目录

2. 将 mysql 驱动包复制到 Hive 的 lib 目录下

   ```bash
   cp /opt/software/mysql-connector-j-8.0.33.jar /opt/bigdata/hive/lib/
   ```

### 5. 配置 hive-site.xml

```bash
vim /opt/bigdata/hive/conf/hive-site.xml
```

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?><!--
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->
<configuration>
    <!-- 配置 Hive 保存元数据的数据库 -->
    <property>
        <name>javax.jdo.option.ConnectionURL</name>
        <value>jdbc:mysql://hadoop01:3306/hive?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-8&amp;allowPublicKeyRetrieval=true</value>
    </property>
    <!-- 配置 Hive 连接 mysql 的驱动 -->
    <property>
        <name>javax.jdo.option.ConnectionDriverName</name>
        <value>com.mysql.cj.jdbc.Driver</value>
    </property>
    <!-- 配置 Hive 连接 mysql 的用户名 -->
    <property>
        <name>javax.jdo.option.ConnectionUserName</name>
        <value>root</value>
    </property>
    <!-- 配置 Hive 连接 mysql 的密码 -->
    <property>
        <name>javax.jdo.option.ConnectionPassword</name>
        <value>Password-9@@</value>
    </property>
    <!-- 配置 Hive 保存元数据的位置 -->
    <property>
        <name>hive.metastore.warehouse.dir</name>
        <value>/user/hive/warehouse</value>
    </property>
    <!-- 配置 Hive schema 验证 -->
    <property>
        <name>hive.metastore.schema.verification</name>
        <value>false</value>
    </property>
    <!-- 配置 sever2 端口 -->
    <property>
        <name>hive.server2.thrift.port</name>
        <value>10000</value>
    </property>
    <!-- 配置 sever2 服务器的地址 -->
    <property>
        <name>hive.server2.thrift.bind.host</name>
        <value>hadoop01</value>
    </property>
    <!-- 关闭 notifaction api authentication -->
    <property>
        <name>hive.metastore.event.db.notification.api.auth</name>
        <value>false</value>
    </property>
    <!-- 开启 print header -->
    <property>
        <name>hive.cli.print.header</name>
        <value>true</value>
    </property>
    <!-- 开启 print current database -->
    <property>
        <name>hive.cli.print.current.db</name>
        <value>true</value>
    </property>
</configuration>
```

6. 配置 hive-env.sh

```bash
mv /opt/bigdata/hive/conf/hive-env.sh.template /opt/bigdata/hive/conf/hive-env.sh
vim /opt/bigdata/hive/conf/hive-env.sh
```

```bash
# 取消注释
export HADOOP_HEAPSIZE=1024
```

### 7. 初始化 Hive 元数据

3. 初始化 Hive 元数据

```bash
schematool -initSchema -dbType mysql -verbose
```

4. 修改元数据字符集

```bash
mysql -uroot -p
```

```sql
use hive;
alter table COLUMNS_V2 modify column COMMENT varchar(256) character set utf8mb4;
alter table TABLE_PARAMS modify column PARAM_VALUE mediumtext character set utf8mb4;
```

### 8. 启动 Hive

```bash
hive
```