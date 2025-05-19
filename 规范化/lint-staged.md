# lint-staged

是一个用于在 Git 暂存文件（staged files）上运行 linters（如 ESLint、Prettier 等）的工具，主要用于前端项目中自动代码检查和格式化。它常与 husky 搭配，在 Git 提交前自动运行检查，以确保代码质量。

lint-staged 的核心功能就是：

- 只对 staged 的文件运行 lint 命令，提高效率；

- 在 commit 之前自动格式化或修复代码；

- 如果 lint 出错或修复失败，则阻止 commit。
