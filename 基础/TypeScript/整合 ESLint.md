# 整合 ESLint

[typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)（该项目中包含了多个 npm 包）

[Getting Started - Linting your TypeScript Codebase](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)（下文参考了该说明）

## 安装

`npm i eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin -D`

- TypeScrpt 项目肯定得安装 typescript

- 项目使用 ESLint 进行代码校验，所以需要安装 eslint

- @typescript-eslint/parser，一个将 TypeScript 转化为兼容 ESTree 的格式，从而用于 ESLint

- @typescript-eslint/eslint-plugin，包含了一些 TypeScript 指定的校验 rules

## 配置

```js
// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser'
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ]
}
```