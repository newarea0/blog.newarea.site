# husky

> 本笔记基于 husky v9

husky 是一个 git hooks 管理器，可以让我们向项目中方便添加 git hooks。

Husky 能让你在 Git 的生命周期事件中插入脚本，比如：

- pre-commit：提交前运行，比如运行 ESLint

- commit-msg：检查提交信息格式（如使用 commitlint）

- pre-push：推送前运行测试

```sh
# 创建测试项目
mkdir husky-test
cd husky-test
npm init -y
git init

# 安装 husky
pnpm i husky -D

# 在 .husky/ 中创建 pre-commit 脚本，并更新 package.json 中的 prepare 脚本
npx husky init
```

参考：

- [官网](https://typicode.github.io/husky/#/)

- [GitHook 工具 —— husky介绍及使用](https://www.cnblogs.com/jiaoshou/p/12222665.html)
