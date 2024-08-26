使用 Rollup 进行打包时，会自动排查任何未实际使用的代码。

main.js

```js
const a = 'jack'

function add(x, y) {
  return x + y
}
```

执行 `rollup main.js --file bundle.js --format iife` 生成的是一个空 bundle。此时不要怀疑 Rollup 是不是没有起作用。

bundle.js

```js
(function () {
  'use strict';



}());
```
