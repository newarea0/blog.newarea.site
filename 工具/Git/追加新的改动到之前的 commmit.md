# 追加新的改动到之前的 commmit

追加新的改动到之前的 commit，而不会新增一条新的 commit:

```sh
# 添加新的改动到暂存区
git add <new-file1> <new-file2> ...

# 追加到最新的 commit 中
git commit --amend --no-edit
```

> [!WARNING] 注意
> 如果之前的 commmit 已经提交到远程仓库。按照上述步骤在本地追加改动到之前的 commmit，让后跟远程仓库同步代码，会有代码冲突。
>
> 此时需要撤销 `git commit --amend`，将新改动作为一次新的 commit。如何撤销 `git commit --amend`
> - 查看 Git 历史记录，查找你想要恢复的提交的哈希值：
>
>   ```bash
>   git reflog
>   ```
> - 撤销修订并保留更改在工作目录中：
>
>   ```bash
>   # 将 <commit_hash> 替换为你从 git reflog 中找到的哈希值
>   git reset --soft <commit_hash>
>   ```
