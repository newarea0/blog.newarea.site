# esModuleinterop

[typescript中的esModuleInterop选项](http://www.manongjc.com/detail/14-fqvwmvlkhrclhdm.html)

---
当没有加esModuleInterop时

库的代码：

```ts
export const a = 1;
export default function b() {}
```

生成代码

```js
exports.__esModule = true;
exports.a = 1;
function b() { }
exports["default"] = b;
```

使用库的代码：

```ts
import * as lib from './export';

console.log(lib);
```

生成代码

```js
exports.__esModule = true;
var lib = require("./export");
console.log(lib);
```

```ts
import lib from './export';

console.log(lib);
```

生成代码

```js
exports.__esModule = true;
var export_1 = require("./export");
console.log(export_1["default"]);
```

以上代码使用ts生成代码都是可以的。但是如果我们使用的库是第三方的，比如fs。我们的代码如下

```ts
import fs from 'fs';

console.log(fs);
```

生成代码

```js
exports.__esModule = true;

var fs_1 = require("fs");
console.log(fs_1["default"]);
```

fs是没有default属性的，所以这种使用fs的方法是不对的。

所以，不加esModuleInterop时，正确引用fs的方法是下面这样：

```ts
import * as fs from 'fs';
console.log(fs);

// 或者

import {fsync} from 'fs';
console.log(fsync);
```

加上esModuleInterop，代码

```ts
import * as lib from './export';

console.log(lib);
```

编译为：

```js
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var lib = __importStar(require("./export"));
console.log(lib);
```

代码

```ts
import lib from './export';

console.log(lib);
```

编译为

```js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var export_1 = __importDefault(require("./export"));
console.log(export_1["default"]);
```

这时

```ts
import fs from 'fs';

console.log(fs);
```

就可以正常使用了。

总结：

因为很多老的js库使用了commonjs的导出方式，并且没有导出default属性，而是使用module.exports=xxx直接导出，这样会导致 import fs from 'fs';的语法引入失败。

typescript为了兼容这些js库，于是引入了esModuleInterop，使import fs from 'fs'能正常使用。
