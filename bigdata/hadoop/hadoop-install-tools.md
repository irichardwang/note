---
title: Hadoop安装部署--脚本工具
sidebar_position: 8
sidebar_label: 脚本工具
---


### 1. 配置文件补充


1. 配置 core-site.xml
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



### 小工具：集群分发脚本

1. 确认是否安装 rsync

    ```bash
    dnf install rsync
    ```

2. 创建脚本
    ```bash
    vim /usr/bin/xsync
    ```

    ```bash
    #!/bin/bash 
    
    # 1. 判断参数个数 
    if [ $# -lt 1 ] 
    then 
        echo Not Enough Arguement! 
        exit; 
    fi

    # 2. 遍历集群所有机器
    # 替换集群中全部主机名
    for host in hadoop01 hadoop02 hadoop03 
    do 
        echo ====================  $host  ==================== 
        #3. 遍历所有目录，挨个发送 
    
        for file in $@ 
        do 
            #4. 判断文件是否存在 
            if [ -e $file ] 
                then 
                    #5. 获取父目录 
                    pdir=$(cd -P $(dirname $file); pwd) 
    
                    #6. 获取当前文件的名称 
                    fname=$(basename $file) 
                    ssh $host "mkdir -p $pdir" 
                    rsync -av $pdir/$fname $host:$pdir 
                else 
                    echo $file does not exists! 
            fi 
        done 
    done
    ```

3. 赋予执行权限
    ```bash
    chmod +x /usr/bin/xsync
    ```

### 小工具：查看集群jps进程脚本

```
vim /usr/bin/jpsall
```

```bash
#！/bin/bash
for i in hadoop01 hadoop02 hadoop03
do
    echo "===================$i==================="
    ssh $i /opt/bigdata/jdk/bin/jps
done
```

```bash
chmod +x /usr/bin/jpsall
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
    ssh hadoop02 "/opt/bigdata/hadoop/sbin/start-yarn.sh"
    echo "========== 启动 HistoryServer =========="
    ssh hadoop01 "/opt/bigdata/hadoop/bin/mapred --daemon start historyserver"
;;
"stop")
    echo "========== 停止 Hadoop 集群 =========="

    echo "========== 停止 HistoryServer =========="
    ssh hadoop01 "/opt/bigdata/hadoop/bin/mapred --daemon stop historyserver"
    echo "========== 停止 YARN =========="
    ssh hadoop02 "/opt/bigdata/hadoop/sbin/stop-yarn.sh"
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