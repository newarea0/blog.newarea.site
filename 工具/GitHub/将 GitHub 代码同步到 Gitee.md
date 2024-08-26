# 将 GitHub 代码同步到 Gitee

由于 Github 的有时无法访问或访问慢，可能需要将 Github 代码同步到国内的 Gitee。可以使用 Github Actions，写一个工作流，每当将代码提交到 GitHub 时，自动将代码同步到 Gitee。

关于 Github Actions 的介绍，可以参考阮一峰老师的 [《GitHub Actions 入门教程》](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)。

下面借助 [Git Repo Sync](https://github.com/wangchucheng/git-repo-sync) 来实现。

`.github/workflows/sync.yml`

```yml
name: sync

on:
  - push
  - delete

jobs:
  sync:
    runs-on: ubuntu-latest
    name: Git Repo Sync
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: wangchucheng/git-repo-sync@v0.1.0
        with:
          # Gitee 仓库地址
          target-url: https://gitee.com/stormzhangbx/blog.git
          # Gitee 用户名
          target-username: stormzhangbx
          # 存储在 GitHub Secrets 中的 Gitee 令牌
          target-token: ${{ secrets.GITEE_TOKEN }}
```

`secrets.GITEE_TOKEN` 存储在 GitHub Secrets 中，是 [Gitee 令牌](https://gitee.com/profile/personal_access_tokens)
