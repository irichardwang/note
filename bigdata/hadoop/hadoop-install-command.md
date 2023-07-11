---
title: Hadoop安装部署--常用命令
sidebar_position: 4
sidebar_label: 常用命令
---

## HDFS集群启停命令

### 1. 集群启停命令

1. 启动
    ```bash
    start-dfs.sh
    ```
2. 停止
    ```bash
    stop-dfs.sh
    ```

### 2. 单独进程启停命令

1. `hadoop-daemon.sh` 脚本，用于单独控制所在节点的某个进程

    ```bash
    hadoop-daemon.sh <start|stop|restart|status> <namenode|datanode|secondarynamenode>
    ```

2. `hdfs` 命令，用于单独控制所在节点的某个进程
    ```bash
    hdfs --daemon <start|stop|restart|status> <namenode|datanode|secondarynamenode>
    ```

## HDFS文件系统操作命令

### 1. 创建目录

```bash
hdfs dfs -mkdir [-p] <path>
```

### 2. 查看目录

```bash
hdfs dfs -ls [-h] [-R] <path>
```

### 3. 上传文件

```bash
hdfs dfs -put [-f] [-p] <localsrc> ... <dst>
```

### 4. 查看文件

```bash
hdfs dfs -cat <path>
```

读取大文件时，可以使用管道符配合 more 命令分页查看

```bash
hdfs dfs -cat <path> | more
```

### 5. 下载文件

```bash
hdfs dfs -get [-f] [-p] <src> ... <localdst>
```

### 6. 拷贝文件

```bash
hdfs dfs -cp [-f] <src> ... <dst>
```

### 7. 追加数据

```bash
hdfs dfs -appendToFile <localsrc> ... <dst>
```

### 8. 移动文件

```bash
hdfs dfs -mv <src> ... <dst>
```

### 9. 删除文件

```bash
hdfs dfs -rm [-r] [-skipTrash] URI [URI ...]
```

## 其他命令

1. 查看副本数量

    ```bash
    hdfs fsck <path> -files -blocks -locations
    ```