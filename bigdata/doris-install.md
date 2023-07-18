---
title: Doris集群部署
sidebar_position: 8
sidebar_label: Doris集群部署
---

## 环境配置

### 节点规划

| 主机名  | 角色             |
| ------- | ---------------- |
| doris01 | FE1, BE1, Broker |
| doris02 | FE2, BE2, Broker |
| doris03 | FE3, BE3, Broker |

### 设置系统最大打开文件句柄数

```bash
vi /etc/security/limits.conf
```

```bash
* soft nofile 65536
* hard nofile 65536
```

### 时钟同步


### 关闭交换分区（swap）