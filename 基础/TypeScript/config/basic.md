# 配置文件 tsconfig.json

[Compiler Options](https://www.staging-typescript.org/zh/tsconfig#include)

[官网（中文）](https://www.typescriptlang.org/zh/tsconfig)

[官网](https://www.typescriptlang.org/tsconfig)

本篇主要介绍 TypeScript 中的 tsconfig.json 文件的作用以及配置参数。主要介绍文件选项和编译选项两部分.

如果一个目录下存在一个 `tsconfig.json` 文件，那么它意味着这个目录是 TypeScript 项目的根目录。`tsconfig.json` 文件中指定了用来编译这个项目的根文件和编译选项。 一个项目可以通过以下方式之一来编译：

-   不带任何输入文件的情况下调用 `tsc`，编译器会从当前目录开始去查找 `tsconfig.json文` 件，逐级向上搜索父目录。
-   不带任何输入文件的情况下调用 `tsc`，且使用命令行参数 `--project`（或 `-p` ）指定一个包含 `tsconfig.json` 文件的目录。

当命令行上指定了输入文件时，tsconfig.json 文件会被忽略。

1 文件选项
----

### files

它的含义是编译器需要编译的相对或绝对文件路径的单个文件列表。当项目只有少量文件时，该选项就很有用。

```
{
  "files": [
    "src/index.ts"
  ]
}
```

这时执行 `tsc` 命令，编译器会编译 `src/index.ts` 文件。

### include

它的含义是编译器需要编译的文件或者目录。

```
{
  "include": [
    "src"
  ]
}
```

这时执行 `tsc` 命令，编译器会编译 `src` 目录下的所有 `ts` 文件。

### exclude

它的含义是编译器需要排除的文件或者目录。默认会排除 `node_modules` 目录下的所有文件。

```
{
  "exclude": [
    "src/lib"
  ]
}

```

- 如果 `files` 和 `includes` 都没有指定，编译器默认包含当前目录下所有的 `ts` 文件。（`.ts`、`.d.ts`、`.tsx`）
- 如果 `exclude` 存在，`exclude` 配置优先级高于 `files` 和 `includes` 配置
- `exclude` 和 `includes` 配置支持 glob 通配符：`*`、`?`、`**`

### extends

我们可以把一些配置抽离出一个配置文件，在 `tsconfig.json` 文件引入，方便以后管理与维护。

```
// tsconfig.json

{
  "extends": "./base.json"
}

```

在主配置文件中，设置文件选项会覆盖调继承文件中的相同的配置项。

### compileOnSave

它可以让 IDE 在保存文件时，编译器自动编译。

```
{
  "compileOnSave": true
}

```

目前只有个别 IDE 支持。

2 编译选项
----

大致配置如下所示：

```
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将多个相互依赖的文件生成一个文件，可以用在 AMD 模块中
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表，默认 node_modules/@types
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}

```

接下来，我们会逐个分析上面的配置项。

### incremental

它的含义是增量编译，TypeScript 编译器在第一次编译后会生成一个可以编译信息的文件，在之后的编译之后会根据这个文件提高编译的速度。该文件默认会在根目录下名称为 `tsconfig.tsbuildinfo`：

```
{
  "program": {
    "fileInfos": {
      "../../../../../usr/local/lib/node_modules/typescript/lib/lib.d.ts": {
        "version": "49ff9798f592c8b7e628fd881401e68810c1b3589ecd7a41b32b3c287374cde0",
        "signature": "49ff9798f592c8b7e628fd881401e68810c1b3589ecd7a41b32b3c287374cde0"
      },
      "../../../../../usr/local/lib/node_modules/typescript/lib/lib.es5.d.ts": {
        "version": "ff5688d6b2fcfef06842a395d7ff4d5730d45b724d4c48913118c889829052a1",
        "signature": "ff5688d6b2fcfef06842a395d7ff4d5730d45b724d4c48913118c889829052a1"
      },
      "../../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts": {
        "version": "2d53f3741e5a4f78a90f623387d71a1cc809bb258f10cdaec034b67cbf71022f",
        "signature": "2d53f3741e5a4f78a90f623387d71a1cc809bb258f10cdaec034b67cbf71022f"
      },
      "../../../../../usr/local/lib/node_modules/typescript/lib/lib.webworker.importscripts.d.ts": {
        "version": "fe4e59403e34c7ff747abe4ff6abbc7718229556d7c1a5b93473fb53156c913b",
        "signature": "fe4e59403e34c7ff747abe4ff6abbc7718229556d7c1a5b93473fb53156c913b"
      },
      "../../../../../usr/local/lib/node_modules/typescript/lib/lib.scripthost.d.ts": {
        "version": "b9faa17292f17d2ad75e34fac77dd63a6403af1dba02d39cd0cbb9ffdf3de8b9",
        "signature": "b9faa17292f17d2ad75e34fac77dd63a6403af1dba02d39cd0cbb9ffdf3de8b9"
      },
      "./src/index.ts": {
        "version": "a0e2a405f15ab7f6218e22c622acc2706d51eae2aa90f302f81f68628e22cd55",
        "signature": "ec8f4696ee1308e5fbc9f50626f5677f0f15bd7c228311cbcc0669233461fa1d"
      }
    },
    "options": {
      "incremental": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../usr/local/lib/node_modules/typescript/lib/lib.d.ts",
      "./src/index.ts",
      "../../../../../usr/local/lib/node_modules/typescript/lib/lib.es5.d.ts",
      "../../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
      "../../../../../usr/local/lib/node_modules/typescript/lib/lib.webworker.importscripts.d.ts",
      "../../../../../usr/local/lib/node_modules/typescript/lib/lib.scripthost.d.ts"
    ]
  },
  "version": "3.6.2"
}

```

### tsBuildInfoFile

可以修改增量编译文件的存储文件夹和文件名

### diagnostics

打印编译信息。

```
Files:            6
Lines:        24817
Nodes:       111372
Identifiers:  41045
Symbols:      27914
Types:         8268
Memory used: 68338K
I/O read:     0.01s
I/O write:    0.00s
Parse time:   0.42s
Bind time:    0.23s
Check time:   1.13s
Emit time:    0.02s
Total time:   1.80s

```

### target

设置目标语言的版本（即编译后生成哪个版本的 JS），可设置为 `ES3`、`ES5` 和 `ES2015` 等等，默认为 `ES3`。

### module

设置生成代码的模块标准，可以设置为 `CommonJS`、`AMD` 和 `UMD` 等等。

### outFile

将多个相互依赖的文件生成一个文件，可以用在 AMD 模块中。

我们创建两个文件，分别为 `index.ts` 和 `amd.ts`，如下所示：

```
// ./src/index.ts
import a = require('./amd')

let str: string = 'abc'

```

```
// ./src/amd.ts

let amd: number = 0

export = amd

```

`index.ts` 引入 `amd.ts`，我们再设置一下 `tsconfig.json` 文件。

```
{
  "compilerOptions": {
    "module": "amd",
    "outFile": "./app.js"
  }
}

```

然后在命令行执行 `tsc` 命令，编译器会将两个 `ts` 文件合并编译成一个 `app.js` 文件。

```
define("amd", ["require", "exports"], function (require, exports) {
    "use strict";
    var amd = 0;
    return amd;
});
define("index", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var str = 'abc';
});

```

### lib

指定 `ts` 需要引用的库，即声明文件，若 `target` 设置为 `es5` 时，`lib` 默认为 `["dom", "es5", "scripthost"]`。

例如，我们想在 `ts` 中使用 es2019 的方法。可以在 `lib` 配置里添加 `es2019`。

### allowJs

允许编译器编译 JS 文件（js、jsx）。

### checkJs

允许在 JS 文件中报错，通常与 allowJS 一起使用。

### outDir

指定输出目录

### rootDir

指定输入文件目录

### declaration

编译器编译时，允许生成声明文件（`.d.ts`）。

### declarationDir

指定声明文件的生成的目录。

### emitDeclarationOnly

编译器编译时，只允许生成声明文件。

### sourceMap

编译器编译时，生成目标文件的 sourceMap 文件。

### inlineSourceMap

编译器编译时，将 sourceMap 生成在 `js` 文件中。

### declarationMap

编译器编译时，生成声明文件的 sourceMap。

### typeRoots

设置声明文件目录，默认 `node_modules/@types`

### types

这是声明文件包，如果设置了某一个声明文件，那么编译器只会加载这个声明文件。

### removeComments

是否删除注释

### noEmit

执行 `tsc` 不会输出任何文件

### noEmitOnError

发生错误时不输出文件

### noEmitHelpers

设置为 `true` 时，不生成 `helper` 函数。先看下面示例：

```
class B {}

class A extends B {}

export = A

```

我们创建了一个模块。然后在控制台执行 `tsc`，下面就是编译后的结果：

```
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var A = /** @class */ (function (_super) {
    __extends(A, _super);
    function A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return A;
}(B));
module.exports = A;

```

编译器会自动生成 `__extends`。

如果我们将 noEmitHelpers 这个配置设置为 `true` 之后。编译后的结果如下：

```
"use strict";
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var A = /** @class */ (function (_super) {
    __extends(A, _super);
    function A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return A;
}(B));
module.exports = A;

```

上面的编译后的结果中 `__extends` 未定义。`ts` 已经为开发者定义了一个配置项，方便解决该问题。 就是接下来要介绍的配置 `importHelpers`。

### importHelpers

通过 `tslib` 引入 `helper` 函数，文件必须是模块。编译结果如下：

```
"use strict";
var tslib_1 = require("tslib");
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var A = /** @class */ (function (_super) {
    tslib_1.__extends(A, _super);
    function A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return A;
}(B));
module.exports = A;

```

若提示 `tslib` 未找到时，可以手动安装它。

### downlevelIteration

降级遍历器的实现，下面是一个 `es6` 语法：

```
let a = [1, 2, 3]
let b = [4, ...a]

```

我们打开这项配置，进行编译后结果如下：

```
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var a = [1, 2, 3];
var b = __spread([4], a);

```

会生成两个 `helper` 函数。

### strict

表示开启所有严格的类型检查，若 `strict` 为 true，`alwaysStrict`、`noImplicitAny`、`strictNullChecks`、`strictFunctionTypes`、`strictPropertyInitialization`、`strictBindCallApply` 和 `noImplicitThis` 选项默认都为 true。

### alwaysStrict

在代码中注入 `use strict`。

### noImplicitAny

不允许隐式的 `any` 类型。

### strictNullChecks

不允许把 `null`、`undefined` 赋值给其他类型变量。

### strictFunctionTypes

不允许函数参数双向协变。

### strictPropertyInitialization

类的实例属性必须初始化。

启用 strictNullChecks 和 strictPropertyInitialization

```js
class BadGreeter {
  name: string;
  // Property 'name' has no initializer and is not definitely assigned in the constructor.
}
```

### strictBindCallApply

严格的 `bind`、`call`、`apply` 检查。

```
function add (a: number, b: number) {
  return a + b
}

add.call(undefined, 1, '2')
// Error: Argument of type '"2"' is not assignable to parameter of type 'number'.

```

### noImplicitThis

不允许 `this` 有隐式的 `any` 类型。

```
class A {
  name: string = 'abc'
  getName () {
    return function () {
      console.log(this.name)
    }
  }
}
// Error: 'this' implicitly has type 'any' because it does not have a type annotation.

```

### noUnusedLocals

检查只声明，未使用的局部变量

### noUnusedParameters

检查未使用的函数参数

### noFallthroughCasesInSwitch

防止 switch 语句贯穿

### noImplicitReturns

每个分支都要有返回值

### esModuleInterop

允许 `export =` 方式导出，也可以用 `import =` 的方式导入。

### allowUmdGlobalAccess

允许在模块中访问 UMD 全局变量

### moduleResolution

模块解析策略，这里提供两种解析策略 `node` 和 `classic`，`ts` 默认使用 `node` 解析策略。

-   **classic** 模块解析策略

适用于 `AMD`、`System`、`ES2015`

如果一个模块使用相对方式导入时，`ts` 就会依次解析同级目录 `.ts`、`.d.ts` 文件。

```
// /root/src/moduleA.ts

import { b } from './moduleB'

/**
 * /root/src/moduleB.ts
 * /root/src/moduleB.d.ts
 */

```

如果使用非相对方式导入时如下， `ts` 会从当前目录的 `node_modules` 目录里查找，如果未找到，会依次向上级目录查找。

```
// /root/src/moduleA.ts

import { b } from 'moduleB'

/**
 * /root/src/node_modules/moduleB.ts
 * /root/src/node_modules/moduleB.d.ts
 *
 * /root/node_modules/moduleB.ts
 * /root/node_modules/moduleB.d.ts
 *
 * /node_modules/moduleB.ts
 * /node_modules/moduleB.d.ts
 */

```

-   **node** 模块解析策略

使用相对方式导入

```
// /root/src/moduleA.ts

import { b } from './moduleB'

/**
 * /root/src/moduleB.ts
 * /root/src/moduleB.tsx
 * /root/src/moduleB.d.ts
 * /root/src/moduleB/package.json ( types 属性)
 * /root/src/moduleB/index.ts
 * /root/src/moduleB/index.tsx
 * /root/src/moduleB/index.d.ts
 */

```

使用非相对方式导入

```
// /root/src/moduleA.ts

import { b } from 'moduleB'

/**
 * /root/src/node_modules/moduleB.ts
 * /root/src/node_modules/moduleB.tsx
 * /root/src/node_modules/moduleB.d.ts
 * /root/src/node_modules/package.json ( types 属性)
 * /root/src/node_modules/index.ts
 * /root/src/node_modules/index.tsx
 * /root/src/node_modules/index.d.ts
 *
 * 依次向上目录查找
 */

```

### baseUrl

解析非相对模块的基地址，默认为当前目录

### paths

路径映射，相对于 baseUrl。比如示例中我们想引入 jquery 精简版本，可以制定它的相对路径。

### rootDirs

将多个目录放在一个虚拟目录下，用于运行时。

比如 我们创建量以下两个文件。

```
// /util/a.ts
let a: string = 'A'
export = a

```

```
// /src/index.ts
import a from './a'

```

注意在引入 `a` 时，是引入的当前目录。因为当 `rootDirs` 设置了 `src` 和 `util` 目录时，编译器默认它们属于同级目录。

### listEmittedFiles

打印输出的文件。

### listFiles


重点 esModuleInterop、allowSyntheticDefaultImports、importHelpers、downlevelIteration 

target、module、lib的区别

- target 设置源码的环境，从而绝对编译时哪些 JS 特性会被降级，哪些会被保留
- module 决定源码被编译成何种模块语法的代码
- 使用哪些内建类型。如值为 `[ES5]`，则在编写源码时，如输入 `Math.`，编辑器会有输入自动。
