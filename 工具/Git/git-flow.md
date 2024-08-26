# git flow

[A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)

## 1 主要分支

### 1.1 master

永远处在即将分布的状态，永远是“正确”的代码。

该分支上的 commit 都有对应的 tag。该分支跟线上版本一直，也就是该分支用于**生产环境**。

### 1.2 develop

![01](https://image.newarea.site/20230809/01.webp)

不能直接在 master 分支上进行开发，否则很危险，develop 基于 master 分支创建而来，也不能直接在该分支上开发，当有新功能来了，可以从 master 分支创建 `feat-*` 分支，然后在`feat-*` 分支上进行开发，当开发完成后将 `feat-*` 分支 merge 到 develop 分支（此后，`feat-*` 分支可以删除也可以不删除）。

develop 不能直接合并到 master 分支，而是通过 release 分支合并到 master 分支。

由此可以看出，develop 相当于 master 和 功能分支之间的一个缓冲分支。


## 2 辅助分支

### 2.1 feature

![02](https://image.newarea.site/20230809/02.webp)

开发新功能的分支, 基于 develop, 完成后 merge 回 develop。

**开发环境**使用的是该分支，如在本地启动一个 Vue 项目，在浏览器通过 `http://localhost:8080/**` 进行访问前端页面。

### 2.2 release

![03](https://image.newarea.site/20230809/03.webp)

基于 develop 分支，用来测试、修复 bug，完成后 merge 回 develop 和 master。同时在 master 分支上打个 tag 记住 release 版本号，删除Release分支（不删也行）

该分支可以用来打包发布**测试环境**。

merge 回 develop 分支的原因：因为 release 基于 develop 分支，如果测试时在 release 分支发现了bug，并在该分支上对 bug 进行了修改，说明 develop 分支也存在相同的 bug，所以需要把修复后的 release 分支合并到 develop 分支。

merge 回 master 分支的原因：一个新功能经过开发（在 feature 分支上进行）、测试（在 release 分支上进行）后，已经是“正确”的代码，可以合并到 master 分支

当新功能开发完成后（feature 分支合并到 develop 分支），我们需要测试新开发的功能，和修复 bug。

**注意**：release 分支创建后，不要从 develop 分支上合并新的改动到 release 分支上。

### 2.3 hotfix

![04](https://image.newarea.site/20230809/04.webp)

修复 master 上的问题，情况比较紧急，完成后 merge 回 master 和 develop
