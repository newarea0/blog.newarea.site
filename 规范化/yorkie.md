# yorkie

pre-commit 钩子，代码质量检查：在 vue-cli 3.x 版本中，已经使用尤大改写的yorkie，yorkie实际是fork husky，然后做了一些定制化的改动，使得钩子能从package.json的 "gitHooks"属性中读取。


[vue cli 官方介绍](https://cli.vuejs.org/zh/guide/cli-service.html#git-hook)

[pre-commit钩子，代码质量检查](https://github.com/ZSI2017/blog/issues/14)

[github](https://github.com/yyx990803/yorkie)

在前端工程化中，通常利用 GitHook 做如下事情：

- 提交前执行 eslint 检查代码
- 检查 commit message 是否符合规范