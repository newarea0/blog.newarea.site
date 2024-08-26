# Github 默认主分支变成了 main

Github 在 2020/10/1 宣布上的所有新库都将用中性词 main 命名，取代原来的 master，而我们在本地用 `git init` 初始化的项目，主分支默认是 master。如何解决这个问题呢？

方式一

修改 github 设置，使新创建的仓库默认主分支依然是 master: Settings - Reositories - 修改默认主分支为 master

方式二

在本地使用 `git branch -M main`，强制将当前分支名重命名为 main

Github 为什么做出这个更改？

原因是像 Blacklist（黑名单）、whitelist（白名单）、master（主）、slave（从）等敏感词汇涉及种族歧视。