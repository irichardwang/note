---
title: GitHub/GitLab通过镜像仓库实现自动同步
authors: richard
tags: [github, gitlab]
---

:::note
因为Github网络访问不稳定，所以在家里部署了一个Gitlab，但又想用Github作为分享平台，因此需要实现Github与本地Gitlab的自动同步。
:::

### 创建 Personal Access Token

在Github的`Settings`->`Developer settings`->`Personal access tokens`中创建一个新的Token，注意勾选`repo`权限。

### 导入Github原有仓库到Gitlab

:::info
如不需要导入Github上的原有仓库，可跳过此步骤。
:::

在新建项目时选择导入项目，输入上述生成的`Personal access tokens`连接Github，选择需要导入的仓库和目标位置即可。

:::tip
若Gitlab导入仓库功能提示未开启，可在管理员设置中`Settings`->`Visibility and access controls`中将`Import sources`设置为`Enabled`。
:::

### 配置镜像仓库

在Gitlab仓库的设置中，选择`Repository`->`Mirroring repositories`，填入Github仓库的地址和上述生成的`Personal access tokens`，选择`Mirror direction`为`Push`，点击`Mirror repository`即可完成配置。

:::caution
Github仓库地址的格式为`https://username@gitlab.company.com/group/project.git`，注意不要遗漏其中的`username@`。
:::

至此，Github与Gitlab的自动同步配置完成。当Gitlab仓库发生变更时，Github仓库会自动同步更新。也可以手动点击`Update now`进行同步。



