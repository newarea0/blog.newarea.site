# 模块系统

## export type

`export =` 是 TS 为了兼容 AMD 规范和 commonjs 规范而创立的新语法，**用于模块导出单一的值（也可以叫做整体导出）**。

当使用 `export =` 来导出时，必须使用 `import = require()` 来导入。

该语法不常用。

```ts
// foo.ts
function add(x: number, y: number) {
  return x + y
}
export = add;
```

```ts
// index.js
import add = require('./foo')

console.log(add(1, 2))
```

### 1 commonjs

设置 `"module": "commonjs"`，编译结果

```js
// foo.js
function add(x, y) {
    return x + y;
}
module.exports = add;
```

```js
// index.js
"use strict";
exports.__esModule = true;
var add = require("./foo");
console.log(add(1, 2));
```

### 2 amd

设置 `"module": "amd"`，编译结果

```js
// index.js
define(["require", "exports"], function (require, exports) {
    "use strict";
    function add(x, y) {
        return x + y;
    }
    return add;
});
```

```js
// index.js
define(["require", "exports", "./foo"], function (require, exports, add) {
    "use strict";
    exports.__esModule = true;
    console.log(add(1, 2));
});
```

### 3 esnext

设置 "module": "exnext"，TS 报错，提示信息如下：

![01](https://image.newarea.site/20230530/01.png)

![02](https://image.newarea.site/20230530/02.png)

## export {}

在默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中，要想快速将一个全局命名空间变成一个模块，在文件中添加 `export {}` 即可。

## export =

[你不知道的 「 import type 」](https://segmentfault.com/a/1190000039800522?utm_source=tag-newest)

[Type-Only Imports and Export](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export)

TS 中不仅可以导入导出值，还可以导入导出类型。如 TS 中类、枚举既可以表示类型，也可以表示值，使用 `import type` 可以确切的表示导入的类型还是值。

此外 TS 扩展了 `import` 语法

### 1 [import type](https://www.typescriptlang.org/docs/handbook/2/modules.html#import-type)

用于导入类型

```ts
// @filename: animal.ts
export const createCatName = () => "fluffy"

// @filename: app.ts
import type { createCatName } from "./animal.js"
```

#### [内联类型导入](https://www.typescriptlang.org/docs/handbook/2/modules.html#inline-type-imports)

TypeScript 4.5 还允许单个导入以 type 为前缀，以指示导入的引用是一种类型：

```ts
// @filename: app.ts
import { createCatName, type Cat, type Dog } from "./animal.js";
 
export type Animals = Cat | Dog;
const name = createCatName();
```
