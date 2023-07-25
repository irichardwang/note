---
title: 定时同步IMDB数据集
sidebar_position: 4
sidebar_label: 定时同步
---

:::note
调度工具采用低代码的 dolpinschedular，每周同步一次 IMDB 数据集，以确保数据集中包含最新的电影信息以及评分信息。
:::

## 工作流创建

:::info
- 工作流创建位于 项目管理 > 选择/创建项目 > 工作流定义 > 创建工作流。
- 示例以导入表 `title.ratings` 数据为例，该表数据量较小，可作为测试使用。
:::

### 1. shell 任务：下载 IMDB 数据集到本地

:::caution
注意添加`-O`实现覆盖本地已有的同名文件，同时添加`-c`实现断点续传，以确保下载成功。
:::

```bash
wget -c -O /opt/data/imdb/title.ratings.tsv.gz https://datasets.imdbws.com/title.ratings.tsv.gz
```

### 2. shell 任务：解压下载的数据集

:::caution
注意添加`-f`实现覆盖本地已有的同名文件。
:::

```bash
gunzip -f /opt/data/imdb/title.ratings.tsv.gz
```

### 3. sql 任务：清除原有数据

```sql
DELETE
FROM movie.stg_imdb_title_ratings
WHERE tconst IS NOT NULL;
```

### 4. shell 任务：数据导入

:::note
数据导入通过 Doris 的 streaming_load 功能实现。也可以使用 DataX，但查阅了 DataX 的官方文档，其原理同样是通过 streaming_load 实现，所以直接使用脚本更为直接。
:::

```bash
curl --location-trusted -u homelab:cRiwVxEv66jcce8v -H "format:csv_with_names" -T /opt/data/imdb/title.ratings.tsv http://192.168.100.60:8030/api/movie/stg_imdb_title_ratings/_stream_load
```

:::caution
1. 导入表的字段数量与顺序，必须与被导入 csv 文件的字段数量与顺序一致。
2. 被导入文件的首行默认会作为数据而非字段名，需要指定文件类型为 csv_with_names，才能正确导入。
:::

## 任务上线与定时

### 保存工作流

1. 租户选择具有该 shell 脚本操作权限的 Linux 用户。若没有，应在安全中心 > 租户管理中创建。
2. 执行策略选择 `并行` 即可。

### 测试运行

1. 运行前需要先操作 `上线` 按钮，方可运行。
2. 运行后，可在 `工作流实例` 中找到运行中的实例，进入后，可查看当前执行中的任务状态，及已完成任务成功与否。
3. 若任务失败，可右键查看日志，根据日志信息进行排查。

:::caution
对于第四个节点`导入`任务，需要在日志中查看成功与否，即便在工作流实例中显示为成功。因为该任务是通过 streaming_load 实现的，即使导入失败，也会返回 message 结果信息，在工作流实例中仍然显示为成功。只有当日志中看到 `"Status": "Success"`，才说明确实导入成功。
:::

### 定时运行

1. 首先在 `定时` 选项中设置定时任务。
    由于影视信息的更新频率不高，所以定时任务设置为每周一次即可。我这里选择每周一的夜里 3 点运行，表达式为 `0 0 3 ? * MON *`。

2. 然后在 `定时管理` 选项中，点击 `上线` 按钮，即可完成定时任务的上线。