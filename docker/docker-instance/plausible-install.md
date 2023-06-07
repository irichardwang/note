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

:::caution
此处用到的命令为`docker-compose`，而非`docker compose`。若未安装过`docker-compose`，请参考[安装Docker-Compose](/docker/docker-install#安装docker-compose)。
:::

```bash
docker-compose up -d
```

:::info
Plausible的默认端口为`8000`，若需要变更，请修改`docker-compose.yml`文件中的`ports`参数。
:::


## Docusaurus集成Plausible

在`docusaurus.config.js`中添加以下内容：

```js title="docusaurus.config.js"
module.exports = {
  scripts: [{src: 'https://plausible.io/js/script.js', defer: true, 'data-domain': 'yourdomain.com'}],
};
```
---
参考官方文档：[How to add the script to your Docusaurus site](https://plausible.io/docs/docusaurus-integration)

## Plausible的更新

```bash
docker-compose down --remove-orphans
docker-compose pull plausible
docker-compose up -d
```