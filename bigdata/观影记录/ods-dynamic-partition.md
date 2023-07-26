---
sidebarlabel: ODS层
title: 创建ODS层--动态分区表
sidebar_position: 4
description: 在创建ODS层过程中，学习如何使用动态分区表。
---

:::note
在把 IMDB 官网的数据集抽取到缓存表后，接下来要将数据写入到 ods 层。ods 层开始采用分区表，计划保留近 1 个月的数据。建表过程使用到 doris 的动态分区功能。
:::

### 创建 ODS 层动态分区表

```sql
CREATE TABLE
    IF NOT EXISTS movie.ods_imdb_title_ratings (
        `tconst` VARCHAR(200) NOT NULL COMMENT 'The alphanumeric identifier of the title.',
        `averageRating` FLOAT COMMENT 'The average rating of the title.',
        `numVotes` INT COMMENT 'The number of votes the title has received.',
        `dt` DATE COMMENT 'data update date'
    ) ENGINE = OLAP
    DUPLICATE KEY(`tconst`)
    COMMENT '电影评分表'
    PARTITION BY RANGE (`dt`) ()
    DISTRIBUTED BY HASH (`tconst`) BUCKETS 3
    PROPERTIES (
        "replication_num" = "1",
        "dynamic_partition.time_unit" = "DAY", # 分区时间单位
        "dynamic_partition.start" = "-30", # 保留之前30天的分区
        "dynamic_partition.end" = "1", # 创建未来1天的分区
        "dynamic_partition.prefix" = "p", # 分区前缀
        "dynamic_partition.buckets" = "3"
    );
```

:::tip
动态分区的执行频率默认为 10 分钟。为了确保次日凌晨写入数据时，分区已经创建出来，可以配置 `"dynamic_partition.end" = "1"`，表示提前创建未来一天的分区。
:::

:::info
若分区时间单位选择 `WEEK` 或 `MONTH`，则额外需要配置 `dynamic_partition.start_day_of_week` 或 `dynamic_partition.start_day_of_month`，分别表示每周的第几天和每月的第几天。
- `dynamic_partition.start_day_of_week` 取值范围为 1-7，其中 1 表示周一，7 表示周日。
- `dynamic_partition.start_day_of_month` 取值范围为 1-28，其中 1 表示每月 1 号，28 表示每月 28 号。
:::

### 插入数据

```sql
INSERT INTO
  movie.ods_imdb_title_ratings
SELECT
  *,
  CURRENT_DATE() AS `dt`
FROM
  movie.stg_imdb_title_ratings;
```

### 查看分区

```sql
SHOW PARTITIONS FROM movie.ods_imdb_title_ratings;
```

可以看到，分区 `p20230726` 中的 `DataSize` 已经不再为 0，说明数据已写入到该分区中。且可以观察到未来一天的分区 `p20230727` 也已经创建出来，但 `DataSize` 为 0，还没有数据。

### 添加到定时调度

在 DolphinScheduler 中 `IMDB数据导入` 工作流中，添加一个 `stg to ods` sql 任务，执行上述插入数据的 sql 语句。