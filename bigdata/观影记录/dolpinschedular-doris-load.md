---
title: 定时同步IMDB数据集
sidebar_position: 4
sidebar_label: 定时同步
---

:::note
调度工具采用低代码的 dolpinschedular，每周同步一次 IMDB 数据集，以确保数据集中包含最新的电影信息以及评分信息。
:::

### 1. shell 任务：下载 IMDB 数据集到本地

:::caution
注意添加`-O`实现覆盖本地已有的同名文件，同时添加`-c`实现断点续传，以确保下载成功。
:::

```bash
wget -c -O /opt/data/imdb/title.basics.tsv.gz https://datasets.imdbws.com/title.basics.tsv.gz
wget -c -O /opt/data/imdb/title.ratings.tsv.gz https://datasets.imdbws.com/title.ratings.tsv.gz
```

### 2. shell 任务：解压下载的数据集

:::caution
注意添加`-f`实现覆盖本地已有的同名文件。
:::

```bash
gunzip -f /opt/data/imdb/title.basics.tsv.gz
gunzip -f /opt/data/imdb/title.ratings.tsv.gz
```

### 3. sql 任务：清除原有数据

```sql
DELETE
FROM movie.title_ratings
WHERE tconst IS NOT NULL;
```

### 4. shell 任务：数据导入

:::info
数据导入通过 Doris 的 streaming_load 功能实现。也可以使用 DataX，但查阅了 DataX 的官方文档，其原理同样是通过 streaming_load 实现，所以直接使用脚本更为直接。
:::