# tag

tag 是 Git 版本库的一个快照，指向某个 commit 的指针。注意 commit 本身就是一次快照。

## 1 列出已有的 tag

```sh
git tag
```

## 2 新建tag

新建一个 tag

```sh
git tag v1.0.1
```

新建一个 tag，并填写备注信息

```sh
git tag -a v1.0.1 -m "my tag"
```

## 3 查看 tag 详细信息

```sh
git show v1.0.1
```

## 4 删除某个 tag

本地删除

```sh
git tag -d v1.0.1 
```

远端删除

```sh
git push origin :refs/tags/v1.0.1
```

## 5 切换到某个分支

跟分支一样，可以直接切换到某个tag去。这个时候不位于任何分支，处于游离状态，可以考虑基于这个tag创建一个分支

```sh
git checkout v1.0.1
```

## 6 将 tag 同步到远程仓库

推送单个 tag

```sh
git push origin v1.0.1
```

推送所有 tag

```sh
git push origin --tags
```