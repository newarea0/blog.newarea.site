# note

[GitHook 工具 —— husky（格式化代码）](https://juejin.cn/post/6947200436101185566)

将代码提交到仓库前，既需要对代码进行 ESLint 检查，也要检查 commit 信息的格式是否规范。（先检查代码，再检查commit 信息）
- 在 git 操作中设置一些 hooks，需要 husky。
- 对代码进行 ESLint 检查，需要 ESLint、lint-staged
- 检查 commit 信息，需要 commitlint

## Commitzen

| 工具 | 描述 |
| ---- | --- | --- |
| Commitzen | 使用 Commitizen 后，控制台出现交互式的会话，提示填写必要的提交字段。 |

方便人们写出符合规范的 commit 信息，该工具运行在 commitlint 之前。

## lint 工具

| 工具 | 描述 | WebStorm 支持 |
| ---- | --- | --- |
| ESLint | 检查代码是否符合规范 | 默认支持 Languages & Frameworks - Code Quality Tools - ESLint |
| stylelint | 检查样式是否符合规范 | 默认支持 Languages & Frameworks - Style Sheets - Stylelint |
| commitlint | 检查 commit 信息是否符合规范 | 安装插件 Commitlint Conventional Commit |

上面3个工具的共同点是当代码、样式、commit 消息已经写完后，对代码、样式、commit 消息进行校验，再控制台输出检查结果，同时可以修复错误或者警告。

都可以通过配置文件对校验行为进行配置。

## git hooks

| 工具 | 描述 |
| ---- | --- | --- |
| husky | 我们向项目中方便添加 git hooks |
| yorkie | 基于husky，由尤大编写 |

lint 工具可以整合 husky，在代码提交之前校验代码、样式、commit 消息，而不需要手动的执行各 lint 命令。
