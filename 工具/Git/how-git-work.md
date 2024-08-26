[Git的原理简介和常用命令](https://www.cnblogs.com/yelbosh/p/7471979.html)

每执行下 `git add`、`git commit` 命令都会在 .git/objects 文件夹中新建一个二进制文件

COMMIT_EDITMSG 文件在初始化 git 项目时并不存在，在第一次 `git commit` 后才生成。

Git 内部有一个对象数据库，向数据库中存数据的命令是 `git hash-object`；取数据的命令是 `git cat-file`

.git 最初的目录结构和主要文件内容

```
|-- .git
    |-- config
    |-- description
    |-- FETCH_HEAD
    |-- HEAD
    |-- hooks
    |   |-- applypatch-msg.sample
    |   |-- commit-msg.sample
    |   |-- fsmonitor-watchman.sample
    |   |-- post-update.sample
    |   |-- pre-applypatch.sample
    |   |-- pre-commit.sample
    |   |-- pre-merge-commit.sample
    |   |-- pre-push.sample
    |   |-- pre-rebase.sample
    |   |-- pre-receive.sample
    |   |-- prepare-commit-msg.sample
    |   |-- push-to-checkout.sample
    |   |-- update.sample
    |-- info
    |   |-- exclude
    |-- objects
    |   |-- info
    |   |-- pack
    |-- refs
        |-- heads
        |-- tags
```

config

```
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
```

description

```
Unnamed repository; edit this file 'description' to name the repository.
```

HEAD

```
ref: refs/heads/master
```