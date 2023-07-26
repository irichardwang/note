---
sidebarlabel: STG层
sidebar_position: 2
title: 创建STG缓存层--基础建表语句
---

### IMDB 数据集

:::info
IMDB 提供了开源的影视数据集，包括了电影、电视剧、演员、导演、编剧等信息。

数据集的下载地址为：[https://www.imdb.com/interfaces/](https://www.imdb.com/interfaces/)
:::

### 创建第一层原始表(STG缓存层)

:::info
- 字段 comment 照抄了官网对应的字段说明，没有做翻译。
- 作为导入 ods 层的临时表，备份数量设置为 1。
:::

:::tip
这一层作为原始数据的缓存，不做任何数据处理。为了保证写入数据的完整性，在指定字段类型时，尽量使用 `STRING` 字符串类型，避免因为类型转换导致的数据丢失。
:::

### movie.stg_imdb_title_akas

```sql
CREATE TABLE IF NOT EXISTS movie.stg_imdb_title_akas
(
    `titleId`         VARCHAR(2000) NOT NULL COMMENT 'a tconst, an alphanumeric unique identifier of the title',
    `ordering`        SMALLINT COMMENT 'a number to uniquely identify rows for a given titleId',
    `title`           VARCHAR(2000) COMMENT 'the localized title',
    `region`          VARCHAR(200) COMMENT 'the region for this version of the title',
    `language`        VARCHAR(200) COMMENT 'the language of the title',
    `types`           VARCHAR(200) COMMENT 'Enumerated set of attributes for this alternative title. One or more of the following: "alternative", "dvd", "festival", "tv", "video", "working", "original", "imdbDisplay". New values may be added in the future without warning',
    `attributes`      VARCHAR(200) COMMENT 'Additional terms to describe this alternative title, not enumerated',
    `isOriginalTitle` BOOLEAN COMMENT '0: not original title; 1: original title'
) ENGINE = OLAP
    COMMENT '电影的国际化和本地化标题表' DISTRIBUTED BY HASH(`titleId`) BUCKETS 3
PROPERTIES (
    "replication_num" = "1"
);
```

### movie.stg_imdb_title_episode

```sql
CREATE TABLE IF NOT EXISTS movie.stg_imdb_title_episode
(
    `tconst`        VARCHAR(200) NOT NULL COMMENT 'The alphanumeric identifier of the title.',
    `parentTconst`  VARCHAR(200) COMMENT 'The alphanumeric identifier of the parent title.',
    `seasonNumber`  TINYINT COMMENT 'The season number of the tv episode.',
    `episodeNumber` TINYINT COMMENT 'The episode number of the tv episode.'
) ENGINE = OLAP
    COMMENT '电视剧信息表' DISTRIBUTED BY HASH(`parentTconst`) BUCKETS 3
PROPERTIES (
    "replication_num" = "1"
);
```

### movie.stg_imdb_title_basics

```sql
CREATE TABLE IF NOT EXISTS movie.stg_imdb_title_basics
(
    `tconst`         VARCHAR(200) NOT NULL COMMENT 'The alphanumeric identifier of the title.',
    `titleType`      VARCHAR(200) COMMENT 'The type/format of the title (e.g. movie, short, tvseries, tvepisode, video, etc).',
    `primaryTitle`   VARCHAR(2000) COMMENT 'The more popular title / the title used by the filmmakers on promotional materials at the point of release.',
    `originalTitle`  VARCHAR(2000) COMMENT 'Original title, in the original language.',
    `isAdult`        BOOLEAN COMMENT '0: non-adult title; 1: adult title.',
    `startYear`      SMALLINT COMMENT 'Represents the release year of a title. In the case of TV Series, it is the series start year.',
    `endYear`        SMALLINT COMMENT 'TV Series end year. ‘0’ for all other title types.',
    `runtimeMinutes` INT COMMENT 'Primary runtime of the title, in minutes.',
    `genres`         VARCHAR(200) COMMENT 'Includes up to three genres associated with the title.'
) ENGINE = OLAP
    COMMENT '电影基本信息表' DISTRIBUTED BY HASH(`titleType`) BUCKETS 3
PROPERTIES (
    "replication_num" = "1"
);
```

### movie.stg_imdb_title_crew

```sql
CREATE TABLE IF NOT EXISTS movie.stg_imdb_title_crew
(
    `tconst`    VARCHAR(200) NOT NULL COMMENT 'The alphanumeric identifier of the title.',
    `directors` VARCHAR(20000) COMMENT 'A comma separated list of nconsts of directors.',
    `writers`   VARCHAR(20000) COMMENT 'A comma separated list of nconsts of writers.'
) ENGINE = OLAP
    COMMENT '电影的导演和编剧表' DISTRIBUTED BY HASH(`tconst`) BUCKETS 3
PROPERTIES (
    "replication_num" = "1"
);
```

### movie.stg_imdb_title_principals

```sql
CREATE TABLE IF NOT EXISTS movie.stg_imdb_title_principals
(
    `tconst`     VARCHAR(200) NOT NULL COMMENT 'The alphanumeric identifier of the title.',
    `ordering`   SMALLINT          COMMENT 'A number to uniquely identify rows for a given titleId.',
    `nconst`     VARCHAR(200) COMMENT 'The alphanumeric identifier of the name/person.',
    `category`   VARCHAR(200) COMMENT 'The category of job that person was in.',
    `job`        VARCHAR(2000) COMMENT 'The specific job title if applicable, else \N.',
    `characters` VARCHAR(2000) COMMENT 'The name of the character played if applicable, else \N.'
) ENGINE = OLAP
    COMMENT '电影的演员和其他成员表' DISTRIBUTED BY HASH(`tconst`) BUCKETS 3
PROPERTIES (
    "replication_num" = "1"
);
```

### movie.stg_imdb_title_ratings

```sql
CREATE TABLE IF NOT EXISTS movie.stg_imdb_title_ratings
(
    `tconst`        varchar(65533) NOT NULL COMMENT 'The alphanumeric identifier of the title.',
    `averageRating` varchar(65533) COMMENT 'The average rating of the title.',
    `numVotes`      varchar(65533) COMMENT 'The number of votes the title has received.'
) ENGINE = OLAP
    COMMENT '电影评分表' DISTRIBUTED BY HASH(`tconst`) BUCKETS 3
PROPERTIES (
    "replication_num" = "1"
);
```

### movie.stg_imdb_name_basics

```sql
CREATE TABLE IF NOT EXISTS movie.stg_imdb_name_basics
(
    `nconst`            VARCHAR(200) NOT NULL COMMENT 'The alphanumeric identifier of the name/person.',
    `primaryName`       VARCHAR(20000) COMMENT 'The name by which the person is most often credited.',
    `birthYear`         SMALLINT COMMENT 'The year in which the person was born.',
    `deathYear`         SMALLINT COMMENT 'The year in which the person died.',
    `primaryProfession` VARCHAR(20000) COMMENT 'The top-3 professions of the person.',
    `knownForTitles`    VARCHAR(20000) COMMENT 'Titles the person is known for.'
) ENGINE = OLAP
    COMMENT '演员和其他成员的基本信息表' DISTRIBUTED BY HASH(`nconst`) BUCKETS 3
PROPERTIES (
    "replication_num" = "1"
);
```