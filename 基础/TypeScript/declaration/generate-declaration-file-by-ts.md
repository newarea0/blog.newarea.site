# 由 TS 生成声明文件

```js
|-- ts-test
    |-- package.json
    |-- tsconfig.json
    |-- src
        |-- index.ts
```

**index.ts**

```ts
export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw'
}

const enum ReactiveFlags1 {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw'
}

export function add(x: number, y: number) {
  return x + y
}

function add1(x: number, y: number) {
  return x + y
}
```

**tsconfig.json**

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true
  }
}
```

执行命令 tsc，生成 dist/index.js、dist/index.d.ts，内容如下

**index.js**

```js
"use strict";
exports.__esModule = true;
exports.add = void 0;
function add(x, y) {
    return x + y;
}
exports.add = add;
function add1(x, y) {
    return x + y;
}
```

**index.d.ts**

```ts
export declare const enum ReactiveFlags {
    SKIP = "__v_skip",
    IS_REACTIVE = "__v_isReactive",
    IS_READONLY = "__v_isReadonly",
    RAW = "__v_raw"
}
export declare function add(x: number, y: number): number;
```

可以看出

- 只有 index.ts 中对外导出的部分才会在 index.d.ts 中生成类型声明
- index.ts 中的类型声明在 index.js 中会被删除

修改 package.json:

```json
{
  // ...
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
}
```

若将库 ts-test 发布到 npm，当其他项目依赖该库时：

```js
import { add } from 'ts-test' // 当编辑器输入a、d、d时会有语法提示
```

