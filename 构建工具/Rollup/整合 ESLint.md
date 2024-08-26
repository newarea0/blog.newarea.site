# 整合 ESLint

> 使用的插件 [@rollup/plugin-eslint](https://github.com/rollup/plugins/tree/master/packages/eslint)

- 新建 npm 项目 rollup-with-eslint
- 安装依赖 `npm i rollup @rollup/plugin-eslint -D`，不需要显式地安装 eslint，因为 @rollup/plugin-eslint 依赖了 eslint，执行该命令后，项目 node_modules 目录中会自动包含 eslint。
- 生成一个 ESLint 模板配置文件 `npx eslint --init`

注意 TSLint 已经废弃。

```
|-- rollup-with-eslint
    |-- .eslintrc
    |-- package-lock.json
    |-- package.json
    |-- rollup.config.js
    |-- src
        |-- foo.js
        |-- index.js
```

```js
// rollup.config.js
import { eslint } from '@rollup/plugin-eslint'

export default {
  input: ['src/index.js'],
  output: [
    {
      dir: 'dist'
    }
  ],
  plugins: [
    eslint({
      throwOnError: true,
      include: ['src/**/*.js'],
      exclude: ['node_modules/**', 'lib/**']
    })
  ]
}

```

```json
// .eslintrc
{
  "root": true,
  "env": {
    "browser": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2015,
    "sourceType": "module"
  },
  "rules": {
    "no-console": "error",
    "semi": "error"
  }
}
```

```js
// index.js
import { a } from './foo.js'

const b = a + 1;
alert(b)
```

```js
// foo.js
const a = 'hello'
console.log(a)

export { a }
```

执行 `npx rollup -c ` 即可在打包**前**，对由入口文件 index.js 构成地整个依赖树进行 ESLint 校验。

如果执行 `npx eslint ./src/index.js`，只会对单一文件进行校验，而通过上述方式，只需执行一个命令就可以对多个文件进行校验。
