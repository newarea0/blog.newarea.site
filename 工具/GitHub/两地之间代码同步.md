# 同步家里和公司代码

假如有一种场景，家里可以正常推拉 GitHub、Gitee 仓库代码，而公司只能推拉 Gitee 仓库代码，此时如何同步同步家里和公司代码，以下是实现流程：

![](https://image.newarea.site/2024-01-25-00-54-38.png)

如上图所示，蓝线表示代码如何从家里到公司，绿线表示代码如何从公司到家里。

家里项目要同时关联多个远程仓库（GitHub、Gitee），公司项目只需要关联一个远程仓库（Gitee）。

既然家里和公司都可以正常推拉 Gitee 仓库代码，直接使用 Gitee 不就解决问题了吗，为什么还弄的这么复杂。因为不管从用户数量、功能还是开源生态来讲，GitHub 都比 Gitee 强，所以尽管 GitHub 访问速度慢，甚至有时无法访问，我还是选择拥抱 GitHub，把 Gitee 只是当做备选方案。

## 如何关联多个远程仓库

在 Git 中，可以通过设置多个远程仓库来关联一个项目。这样你就可以将代码同时推送到多个远程仓库或者从多个远程仓库获取更新。下面是一种常见的方式来实现关联多个远程仓库（以 GitHub 和 Gitee 为例）：

1.首先，在你的本地项目中添加远程仓库：

- 打开终端或命令行界面，进入你的项目目录。
- 运行命令 `git remote add github <GitHub 仓库 URL>`，将 GitHub 仓库添加为名为 "github" 的远程仓库。
- 运行命令 `git remote add gitee <Gitee 仓库 URL>`，将 Gitee 仓库添加为名为 "gitee" 的远程仓库。

2.推送代码到多个远程仓库：

- 当你想要将代码推送到多个仓库时，可以运行命令 `git push github <branch-name>` 将代码推送到 GitHub 仓库。
- 同样地，运行命令 `git push gitee <branch-name>` 将代码推送到 Gitee 仓库。

3.获取多个远程仓库的更新：

- 运行命令 `git pull github <branch-name>` 获取 GitHub 仓库的更新。
- 运行命令 `git pull gitee <branch-name>` 获取 Gitee 仓库的更新。
