---
title: Doris集群部署
sidebar_position: 8
sidebar_label: Doris集群部署
---

## 环境配置

### 节点规划

| 主机名     | 角色  |
|---------| --- |
| dorisfe | FE1 |
| doris01 | BE1 |
| doris02 | BE2 |
| doris03 | BE3 |

### 设置系统最大打开文件句柄数

```bash
sudo vim /etc/security/limits.conf
```

```bash
* soft nofile 65536
* hard nofile 65536
```

### 时钟同步


### 关闭交换分区（swap）