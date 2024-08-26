# 与 Rollup 对比

- 创建一个 npm 项目 espree-test
- 安装 espree `npm i espree`

```
|-- espree-test
    |-- package-lock.json
    |-- package.json
    |-- rollup.config.js
    |-- src
        |-- index.js
```

```js
// index.js
import * as espree from 'espree'

const test = `
import { a } from './foo.js'
const b = a + 1
`

const ast = espree.parse(test, {
  ecmaVersion: 6,
  sourceType: 'module'
})

console.log(ast)
```

进入 espree-test 目录，直接执行 `node ./src/index.js` 肯定是不行的，因为 Node 使用的是 CommonJS 规范，而 index.js 文件使用的是 ES6 模块语法。

index.js 依赖了 espree，espress 也依赖了其他依赖，这些依赖也有自己的依赖...从而形成了一颗依赖树。

Rollup 可以将整个依赖树打包成一个 js 文件。

```js
// rollup.config.js
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: ['src/index.js'],
  output: [
    {
      dir: 'dist'
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    json()
  ]
}
```

执行打包命令 `npx rollup -c`，生成文件 dist/index.js，该文件可以在 Node 环境被运行，即此时可以成功执行 `node ./src/index.js`