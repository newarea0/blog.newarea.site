# commitlint

[官网](https://commitlint.js.org/#/)

[commitlint 使用总结](https://blog.csdn.net/qq_38290251/article/details/111646491)

当我们运行 git commmit -m 'xxx' 时，commitlint 用来检查 xxx 是否满足固定格式的工具。就像 ESLint 是用来检测代码格式的。

## 创建一个使用 Git 的 Node 项目 commitlint-test

```sh
mkdir commitlint-test
cd commitlint-test
npm init -y
git init
```

## 安装 husky

```sh
npm i husky -D
npx husky install
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

## 安装 commitlint

```sh
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

新增配置文件 commitlint.config.js

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

注意这里不要使用 `echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js` 来新建配置文件，否则生成的 commitlint.config.js 文件不是 utf8 格式的，使用 commitlint 时会报错：commitlint.config.js:1 SyntaxError: Invalid or unexpected token

## 测试

```
PS E:\01-front-end\test\24husky\husky-test> git commit -m "foo: this will fail"
⧗   input: foo: this will fail
✖   type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)
```

如果 commit 信息符合规范，提交成功，控制台不会打印出任何内容

## 提交规范

[Commit conventions](https://commitlint.js.org/#/concepts-commit-conventions)

```
type(scope?): subject
body?
footer?
```

- type：用于表明我们这次提交的改动类型。
- scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
- subject：一句话描述此次提交的主要内容，做到言简意赅