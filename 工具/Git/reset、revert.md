# reset 和 revert

## git reset

### 在 Gitee 上新增仓库 git-demo，并 clone 到本地

```bash
git clone https://gitee.com/stormzhangbx/git-demo.git
```

### 通过 VSCode 打开项目

新增文件 `README.md`

3次编辑 `README.md`，每次都提交更改，并同步到远程仓库 Gitee

![](https://image.newarea.site/2024-03-04-11-39-30.png)

![](https://image.newarea.site/2024-03-04-11-41-28.png)

### 现在要回退到之前版本，如 `主要组成`

![](https://image.newarea.site/2024-03-04-11-45-50.png)

```bash
git reset --hard 731473
```

或者通过 VSCode 操作

![](https://image.newarea.site/2024-03-04-11-47-54.png)

![](https://image.newarea.site/2024-03-04-14-13-03.png)

Reset 更改保留在本地

Soft Reset 更改保留在暂存区

Hard Reset 丢弃更改

回退后：

![](https://image.newarea.site/2024-03-04-11-49-29.png)

### 同步到远程

此时本地库HEAD指向的版本比远程库的要旧，使用 `git push` 会报错

![](https://image.newarea.site/2024-03-04-13-40-30.png)

改用使用 `git push -f` 强制推上去

![](https://image.newarea.site/2024-03-04-13-43-38.png)

## git revert

我们commit了三个版本（版本一、版本二、 版本三），突然发现版本二不行（如：有bug），想要撤销版本二，但又不想影响撤销版本三的提交，就可以用 git revert 命令来反做版本二，生成新的版本四，这个版本四里会保留版本三的东西，但撤销了版本二的东西。
