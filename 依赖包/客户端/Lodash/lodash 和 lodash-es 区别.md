# lodash 和 lodash-es 区别

## lodash

将 Lodash 库导出为 Node.js 模块，使用的是 CommonJs 模块系统。

::: code-group

```json [package.json]
{
  "main": "lodash.js"
}
```

```js [lodash.js]
;(function () {
  // Export lodash.
  const _ = runInContext()

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root._ = _

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(() => {
      return _
    })
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = _)._ = _
    // Export for CommonJS support.
    freeExports._ = _
  }
  else {
    // Export to the global object.
    root._ = _
  }
}.call(this))
```

```js [add.js]
const createMathOperation = require('./_createMathOperation')

/**
 * Adds two numbers.
 *
 * @static
 * @memberOf _
 * @since 3.4.0
 * @category Math
 * @param {number} augend The first number in an addition.
 * @param {number} addend The second number in an addition.
 * @returns {number} Returns the total.
 * @example
 *
 * _.add(6, 4);
 * // => 10
 */
const add = createMathOperation((augend, addend) => {
  return augend + addend
}, 0)

module.exports = add
```

:::

安装：

```shell
pnpm i lodash
```

在 Node.js 中使用：

```js
// 加载全部构建
const _ = require('lodash')

console.log(_.VERSION) // lodash 版本
console.log(_.add(1, 8)) // 在 Node.js 中执行该 JavaScript 文件，终端打印出 9
```

```js
// 加载某个函数
const add = require('lodash/add')

console.log(add(1, 2))
```

```js
// 加载某类函数
const math = require('lodash/math')

console.log(math.add(1, 2))
```

在客户端使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./node_modules/lodash/lodash.js"></script>
  <!-- 或者 -->
  <!-- <script src="./node_modules/lodash/lodash.min.js"></script> -->
</head>
<body>
  <script>
    console.log(_.add(1, 3))
  </script>
</body>
</html>
```

也可以使用 `import` 来加载 lodash，但是需要借助构建工具（如 Vite、Webpack 等）。

## lodash-es

将 Lodash 库导出为 ES 模块，使用的是 ESM 模块系统。

::: code-group

```json [package.json]
{
  "main": "lodash.js",
  "module": "lodash.js"
}
```

```js [lodash.js]
export { default as add } from './add.js'
export { default } from './lodash.default.js'
```

```js [lodash.default.js]
import lodash from './wrapperLodash.js'

lodash.add = math.add

export default lodash
```

```js [add.js]
import createMathOperation from './_createMathOperation.js'

/**
 * Adds two numbers.
 *
 * @static
 * @memberOf _
 * @since 3.4.0
 * @category Math
 * @param {number} augend The first number in an addition.
 * @param {number} addend The second number in an addition.
 * @returns {number} Returns the total.
 * @example
 *
 * _.add(6, 4);
 * // => 10
 */
const add = createMathOperation((augend, addend) => {
  return augend + addend
}, 0)

export default add
```

:::

安装：

```shell
pnpm i lodash-es
```

使用：

```js
// 加载全部构建
import _ from 'lodash'

console.log(_.VERSION)
console.log(_.add(1, 8))
```

```js
// 加载某个函数
import { add } from 'lodash'

console.log(add(1, 2))
```

```js
// 加载某类函数
import { add } from 'lodash-es/math'

console.log(math.add(1, 2))
```
