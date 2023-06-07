---
sidebar_label: 'Plausible'
title: Docker部署Plausible
---

import LinkCard from '@site/src/components/LinkCard';

<LinkCard title="Plausible官方安装文档" description="Self-hosted Plausible Analytics" to="https://plausible.io/docs/self-hosting"></LinkCard>

## Plausible的安装

#### 克隆官方Docker仓库
```bash
git clone https://github.com/plausible/hosting
cd hosting
```

#### 生成秘钥

```bash
openssl rand -base64 64 | tr -d '\n' ; echo
```

#### 在`plausible-conf.env`文件中填入秘钥和域名

```bash title="plausible-conf.env"
BASE_URL=https://plausible.example.com # 更换为你的域名
SECRET_KEY_BASE=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 启动/关闭服务

```bash
docker-compose up -d
```

:::info
Plausible的默认端口为`8000`，若需要变更，请修改`docker-compose.yml`文件中的`ports`参数。
:::