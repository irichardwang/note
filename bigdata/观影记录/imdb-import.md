---
sidebarlabel: IMDB数据集导入
title: 影视基础信息的导入
---

## IMDB 数据集

:::info
IMDB 提供了开源的影视数据集，包括了电影、电视剧、演员、导演、编剧等信息。

数据集的下载地址为：[https://www.imdb.com/interfaces/](https://www.imdb.com/interfaces/)
:::

## 建表语句(Doris 数据库)

:::info
- 新建了 `imdb` 数据库，用于存放 IMDB 原始数据表。
- 字段 comment 照抄了官网对应的字段说明，没有做翻译。
:::

### imdb.title_akas

```sql
CREATE TABLE IF NOT EXISTS movie.title_akas
(
    `titleId`         VARCHAR(12)  NOT NULL COMMENT 'a tconst, an alphanumeric unique identifier of the title',
    `ordering`        INT          NOT NULL DEFAULT '-1' COMMENT 'a number to uniquely identify rows for a given titleId',
    `title`           VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'the localized title',
    `region`          VARCHAR(20)  NOT NULL DEFAULT '' COMMENT 'the region for this version of the title',
    `language`        VARCHAR(20)  NOT NULL DEFAULT '' COMMENT 'the language of the title',
    `types`           VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'Enumerated set of attributes for this alternative title. One or more of the following: "alternative", "dvd", "festival", "tv", "video", "working", "original", "imdbDisplay". New values may be added in the future without warning',
    `attributes`      VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'Additional terms to describe this alternative title, not enumerated',
    `isOriginalTitle` BOOLEAN      NOT NULL COMMENT '0: not original title; 1: original title',
        `update_time`   DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = OLAP
    COMMENT '电影的国际化和本地化标题表' DISTRIBUTED BY HASH(`titleId`) BUCKETS 3
PROPERTIES (
    "replication_num" = "1"
);
```

### imdb.title_basics

```sql
CREATE TABLE IF NOT EXISTS movie.title_episode
(
    `tconst`        VARCHAR(12) NOT NULL COMMENT 'The alphanumeric identifier of the title.',
    `parentTconst`  VARCHAR(12) NOT NULL DEFAULT '' COMMENT 'The alphanumeric identifier of the parent title.',
    `seasonNumber`  TINYINT     NOT NULL DEFAULT '-1' COMMENT 'The season number of the tv episode.',
    `episodeNumber` TINYINT     NOT NULL DEFAULT '-1' COMMENT 'The episode number of the tv episode.',
    `update_time`   DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = OLAP
    COMMENT '电视剧信息表' DISTRIBUTED BY HASH(`parentTconst`) BUCKETS 3
PROPERTIES (
    "replication_num" = "1"
);
```

### imdb.title_basics

```sql
CREATE TABLE IF NOT EXISTS movie.title_basics
(
    `tconst`         VARCHAR(12)  NOT NULL COMMENT 'The alphanumeric identifier of the title.',
    `titleType`      VARCHAR(20)  NOT NULL DEFAULT '' COMMENT 'The type/format of the title (e.g. movie, short, tvseries, tvepisode, video, etc).',
    `primaryTitle`   VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'The more popular title / the title used by the filmmakers on promotional materials at the point of release.',
    `originalTitle`  VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'Original title, in the original language.',
    `isAdult`        VARCHAR(2)   NOT NULL DEFAULT '' COMMENT '0: non-adult title; 1: adult title.',
    `startYear`      TINYINT      NOT NULL         DEFAULT '-1' COMMENT 'Represents the release year of a title. In the case of TV Series, it is the series start year.',
    `endYear`        TINYINT      NOT NULL DEFAULT '0' COMMENT 'TV Series end year. ‘0’ for all other title types.',
    `runtimeMinutes` INT          NOT NULL DEFAULT '-1' COMMENT 'Primary runtime of the title, in minutes.',
    `genres`         VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'Includes up to three genres associated with the title.',
    `update_time`    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = OLAP
    COMMENT '电影基本信息表' DISTRIBUTED BY HASH(`titleType`) BUCKETS 5
PROPERTIES (
    "replication_num" = "1"
);
```

### imdb.title_crew

```sql
CREATE TABLE IF NOT EXISTS movie.title_crew
(
    `tconst`     VARCHAR(12) NOT NULL COMMENT 'The alphanumeric identifier of the title.',
    `directors`  VARCHAR(48) NOT NULL DEFAULT '' COMMENT 'A comma separated list of nconsts of directors.',
    `writers`    VARCHAR(48) NOT NULL DEFAULT '' COMMENT 'A comma separated list of nconsts of writers.',
    `update_time` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = OLAP
    COMMENT '电影的导演和编剧表' DISTRIBUTED BY HASH(`tconst`) BUCKETS 3
PROPERTIES (
    "replication_num" = "1"
);
```

### imdb.title_principals

```sql
CREATE TABLE IF NOT EXISTS movie.title_principals
(
    `tconst`     VARCHAR(12)  NOT NULL COMMENT 'The alphanumeric identifier of the title.',
    `ordering`   INT          NOT NULL DEFAULT '-1' COMMENT 'A number to uniquely identify rows for a given titleId.',
    `nconst`     VARCHAR(12)  NOT NULL DEFAULT '' COMMENT 'The alphanumeric identifier of the name/person.',
    `category`   VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'The category of job that person was in.',
    `job`        VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'The specific job title if applicable, else '\N'.',
    `characters` VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'The name of the character played if applicable, else '\N'.',
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = OLAP
    COMMENT '电影的演员和其他成员表' DISTRIBUTED BY HASH(`tconst`) BUCKETS 3
PROPERTIES (
    "replication_num" = "1"
);
```

### imdb.title_ratings

```sql
CREATE TABLE IF NOT EXISTS movie.title_ratings
(
    `tconst`        VARCHAR(12) NOT NULL COMMENT 'The alphanumeric identifier of the title.',
    `averageRating` FLOAT       NOT NULL DEFAULT '-1' COMMENT 'The average rating of the title.',
    `numVotes`      INT         NOT NULL DEFAULT '-1' COMMENT 'The number of votes the title has received.',
    `update_time`   DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = OLAP
    COMMENT '电影评分表' DISTRIBUTED BY HASH(`tconst`) BUCKETS 3
PROPERTIES (
    "replication_num" = "1"
);
```

### imdb.name_basics

```sql
CREATE TABLE IF NOT EXISTS movie.name_basics
(
    `nconst`            VARCHAR(12)  NOT NULL COMMENT 'The alphanumeric identifier of the name/person.',
    `primaryName`       VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'The name by which the person is most often credited.',
    `birthYear`         TINYINT          NOT NULL DEFAULT '-1' COMMENT 'The year in which the person was born.',
    `deathYear`         TINYINT          NOT NULL DEFAULT '-1' COMMENT 'The year in which the person died.',
    `primaryProfession` VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'The top-3 professions of the person.',
    `knownForTitles`    VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'Titles the person is known for.',
    `update_time`       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = OLAP
    COMMENT '演员和其他成员的基本信息表' DISTRIBUTED BY HASH(`nconst`) BUCKETS 3
PROPERTIES (
    "replication_num" = "1"
);
```
