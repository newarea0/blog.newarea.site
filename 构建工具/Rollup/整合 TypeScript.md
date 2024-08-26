# 整合 TypeScript

> 使用的插件 [rollup-plugin-typescript2](https://github.com/rollup/plugins/tree/master/packages/node-resolve)

- 新建 npm 项目 rollup-with-eslint
- 安装依赖 `npm i rollup-plugin-typescript2 typescript tslib --D`

```
|-- rollup-with-eslint
    |-- tsconfig.json
    |-- package-lock.json
    |-- package.json
    |-- rollup.config.js
    |-- src
        |-- index.ts
```

```js
// rollup.config.js
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: ['src/index.ts'],
  output: [
    {
      dir: 'dist'
    }
  ],
  plugins: [
    json(),
    nodeResolve(),
    commonjs(),
    typescript()
  ]
}

```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"]
  },
  "include": ["src/**/*.ts"]
}
```

```js
// index.js
interface Person {
  name: string,
  age: number
}

const p: Person = {
  name: 'Jack',
  age: 20
}

console.log(p)
```

执行 `npx rollup -c `，生成 dist/index.js

可以发现，之前需要使用 tsc 命令，现在使用 rollup。
