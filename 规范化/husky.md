# husky

husky 可以让我们向项目中方便添加 git hooks。

[官网](https://typicode.github.io/husky/#/)

[husky使用总结](https://zhuanlan.zhihu.com/p/366786798)

[GitHook 工具 —— husky介绍及使用](https://www.cnblogs.com/jiaoshou/p/12222665.html)

创建一个 husky 项目 husky-test

```sh
mkdir husky-test
cd husky-test
npm init -y
git init
npm i husky -D
npx husky install
npx husky add .husky/commit-msg 'npm test'
```

`npm husky install` 的作用是生成 `.husky/_/.gitignore` 和 `.husky/_/husky.sh`

`npx husky add .husky/commit-msg 'npm test'` 的作用是生成 `.husky/pre-commit`

目录结构

```
|-- husky-test
    |-- .gitignore
    |-- package-lock.json
    |-- package.json
    |-- .husky # 通过命令 npx husky-init 生成的
    |   |-- pre-commit # pre-commit hooks
    |   |-- _
    |       |-- .gitignore
    |       |-- husky.sh
```

```json
// package.json
{
  "name": "husky-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "prepare": "husky install"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "husky": "^7.0.0"
  }
}
```

```sh
// husky.sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm test
```

项目创建了一个 pre-commit hooks，每次提交代码之前会执行命令`npm test`

添加git hooks，运行一下命令创建git hooks

`npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'` 
如果没成功，就执行 `husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`
或 `.\node_modules\.bin\husky.cmd add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`

运行完该命令后我们会看到 `.husky/` 目录下新增了一个名为 pre-commit 的 shell 脚本。