# namespace

命名空间 `namespace` 主要用于组织类型、变量，避免命名冲突，方便管理

```ts
namespace Tools {
    const TIMEOUT = 100;

    export class Ftp {
        constructor() {
            setTimeout(() => {
                console.log('Ftp');
            }, TIMEOUT)
        }
    }

    export class Http {
        constructor() {
            console.log('Http');
        }
    }

    export function parseURL(){
        console.log('parseURL');
    }
}
```

`export` 在这里用来表示哪些功能是可以外部访问的:

```ts
Tools.TIMEOUT // 报错, Tools上没有这个属性
Tools.parseURL() // 'parseURL'
```

编译成js后的代码:

```js
"use strict";
var Tools;
(function (Tools) {
    const TIMEOUT = 100;
    class Ftp {
        constructor() {
            setTimeout(() => {
                console.log('Ftp');
            }, TIMEOUT);
        }
    }
    Tools.Ftp = Ftp;
    class Http {
        constructor() {
            console.log('Http');
        }
    }
    Tools.Http = Http;
    function parseURL() {
        console.log('parseURL');
    }
    Tools.parseURL = parseURL;
})(Tools || (Tools = {}));
```

namespace中不仅可以放入变量，还可以放入类型

```ts
namespace Food {
    export type A = Window;
    export interface Fruits{
        taste: string;
        hardness: number;
    }

    export interface Meat{
        taste: string;
        heat: number;
    }
}

let meat: Food.Meat;
let fruits: Food.Fruits;
```

编译结果：

```js
var meat;
var fruits;
```

因为 `Food` 中只要类型，没有变量，所以编译后不会出现 `Food` 相关代码。