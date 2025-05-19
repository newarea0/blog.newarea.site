# commitlint

当我们运行 `git commit -m 'xxx'` 时，commitlint 可以检查 `xxx` 是否满足特点规范。就像 ESLint 是用来检测代码格式的。

## 1 创建测试项目 commitlint-test

```sh
mkdir commitlint-test
cd commitlint-test
pnpm init
git init
```

## 2 安装 commitlint

```sh
pnpm i -D @commitlint/config-conventional @commitlint/cli
```

创建配置文件 `commitlint.config.js`

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

注意不要通过 `echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js` 来创建配置文件，否则生成的 `commitlint.config.js` 文件不是 utf8 格式的，使用 commitlint 时会报错：commitlint.config.js:1 SyntaxError: Invalid or unexpected token

## 3 安装 husky

```sh
pnpm i husky -D
npx husky init
```

`npx husky init` 简化了项目中的 husky 设置。它会在 `.husky/` 中创建 `pre-commit` 脚本，并更新 `package.json` 中的 `prepare` 脚本。

删除文件 `.husky/pre-commit`、`package.json` 中的 `"prepare": "husky"`，创建 `.husky/commit-msg`：

```
npx --no-install commitlint --edit "$1"
```

## 4 测试

如果 commit 信息符合规范，提交成功，控制台不会打印出任何内容

```sh
PS E:\01-front-end\test\24husky\husky-test> git add .
PS E:\01-front-end\test\24husky\husky-test> git commit -m "foo: this will fail"
⧗   input: foo: this will fail
✖   type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg script failed (code 1)
```

检查最后一次提交

```sh
npx commitlint --from HEAD~1 --to HEAD --verbose
```

## 5 提交规范

[Commit conventions](https://commitlint.js.org/#/concepts-commit-conventions)

```
type(scope?): subject
body?
footer?
```

### type

用于表明我们这次提交的改动类型。

- feat: 新增了一个功能；
- fix: 修复了一个 bug；
- build: 用于修改项目构建系统，例如修改依赖库、外部接口或者升级 Node 版本等；
- chore: 用于对非业务性代码进行修改，例如修改构建流程或者工具配置等；
- ci: 用于修改持续集成流程，例如修改 Travis、Jenkins 等工作流配置；
- docs: 用于修改文档，例如修改 README 文件、API 文档等；
- style: 用于修改代码的样式，例如调整缩进、空格、空行等；
- refactor: 用于重构代码，例如修改代码结构、变量名、函数名等但不修改功能逻辑；
- perf: 用于优化性能，例如提升代码的性能、减少内存占用等；
- test: 用于修改测试用例，例如添加、删除、修改代码的测试用例等。

### scope

一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。可以写文件、页面、模块、组件等你认为合适的粒度，关键是它要有助于说明此次更改影响的范围。

### subject

一句话描述此次提交的主要内容，做到言简意赅

参考：

- [commitlint](https://commitlint.js.org/)
