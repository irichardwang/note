---
title: 解决Gitlab Gravatar头像无法显示的问题
authors: richard
tags: [gitlab, gravatar]
---

import LinkCard from '@site/src/components/LinkCard';

:::note
因为众所周知的原因，Gitlab的Gravatar头像在国内无法显示，本文记录如何解决这个问题。
:::

## 找到国内Gravatar镜像

- https://gravatar.loli.net/avatar/
- https://cdn.sep.cc/avatar/

## 修改 `gitlab.rb` 配置

:::info
由于前期使用Docker安装，`gitlab.rb` 文件位于宿主机的 `/srv/gitlab/config` 路径中。
:::

```bash
gitlab_rails['gravatar_plain_url'] = 'https://cdn.sep.cc/avatar/%{hash}?s=%{size}&d=identicon'
gitlab_rails['gravatar_ssl_url'] = 'https://cdn.sep.cc/avatar/%{hash}?s=%{size}&d=identicon'
```