# declare module

## 重写类型的动态查找

[参考](https://jkchao.github.io/typescript-book-chinese/project/modules.html#%E9%87%8D%E5%86%99%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%8A%A8%E6%80%81%E6%9F%A5%E6%89%BE)

在你的项目里，你可以通过 declare module 'somePath' 声明一个全局模块的方式，来解决查找模块路径的问题。

```ts
// global.d.ts
declare module 'foo' {
  // some variable declarations
  export var bar: number;
}
```

接着

```ts
// anyOtherTsFileInYourProject.ts
import * as foo from 'foo';
// TypeScript 将假设（在没有做其他查找的情况下）
// foo 是 { bar: number }
```

## 扩展原有模块

如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 declare module 扩展原有模块

```ts
// types/moment-plugin/index.d.ts

import * as moment from 'moment';

declare module 'moment' {
    export function foo(): moment.CalendarKey;
}
```

```ts
// src/index.ts

import * as moment from 'moment';
import 'moment-plugin';

moment.foo();
```

除了可以在声明文件中通过 import 导入另一个声明文件中的类型之外，还有一个语法也可以用来导入另一个声明文件，那就是三斜线指令。


## 声明多个模块的类型

一般一个声明文件只是对一个模块进行类型声明。

declare module 也可用于在一个文件中一次性声明多个模块的类型

```ts
// types/foo-bar.d.ts

declare module 'foo' {
    export interface Foo {
        foo: string;
    }
}

declare module 'bar' {
    export function bar(): string;
}
```

```ts
// src/index.ts

import { Foo } from 'foo';
import * as bar from 'bar';

let f: Foo;
bar.bar();
```