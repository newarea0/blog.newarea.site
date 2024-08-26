# 追加新的改动到之前的 commmit

追加新的改动到之前的 commit，而不会新增一条新的 commit:

```sh
# 添加新的改动到暂存区
git add <new-file1> <new-file2> ...

# 追加到最新的 commit 中
git commit --amend --no-edit
```
