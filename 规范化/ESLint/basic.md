# helloWorld

[Getting Started with ESLint](https://eslint.org/docs/user-guide/getting-started)

- 创建一个 npm 项目
- 生成一个 ESLint 模板配置文件 `npx eslint --init`

最终项目的目录结构如下。

```
|-- eslint-test
    |-- .eslintrc
    |-- package-lock.json
    |-- package.json
    |-- src
        |-- index.js
```

```json
// .eslintrc
{
  "root": true,
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "rules": {
    "no-console": 2
  }
}
```

```js
// index.js
const a = 'hello'
console.log(a)
```

进入 eslint-test 目录，执行 `npx eslint ./src/index.js` （注意，要指定一个目标文件）或者执行 `npx eslint --ext .js,.jsx,.ts,.tsx`。

在配置文件 `rules` 属性中可以自定义规则：

- `off` 或 0 表示关闭该规则。
- `warn` 或 1 表示将该规则作为一个警告打开。
- `error` 或 2 表示将该规则作为一个错误打开。
