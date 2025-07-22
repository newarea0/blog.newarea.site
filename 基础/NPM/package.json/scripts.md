# scripts

package.json 文件中的 scripts 字段用于定义项目运行脚本。有内置的生命周期脚本、自定义脚本。

- 内置的生命周期脚本：像 preinstall、install、postinstall、prepare、prepublish、preversion、version、postversion 等，都是 npm/pnpm/yarn 约定的特殊脚本名。它们会在特定的时机自动执行。
  - `preinstall`：在安装依赖之前执行。
  - `install`：在安装依赖之后执行。
  - `prepublish`：在发布之前执行。
  - `prepare`：在安装依赖之后执行，但比 install 更早。
  - `prepublishOnly`：在发布之前执行，但比 prepare 更早。
  - `prepublishOnly`：在发布之前执行，但比 prepare 更早。
- 自定义脚本：比如 "foo": "echo hello"，这种脚本只有你手动 npm run foo 时才会执行，不会被自动触发。

参考：[npm 官方文档](https://docs.npmjs.com/cli/v11/using-npm/scripts)
