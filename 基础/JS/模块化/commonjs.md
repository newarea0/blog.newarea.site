# CommonJS

> 基于服务端、桌面端的模块化

在早期，对于运行在浏览器端的 `JavaScript` 代码，模块化的需求并不那么的强烈，反而是偏向 服务端、桌面端的应用对模块化有迫切的需求（相对来说，服务端、桌面端程序的代码和需求要复杂一些）。`CommonJS` 规范就是一套偏向服务端的模块化规范，它为非浏览器端的模块化实现制定了一些的方案和标准，`NodeJS` 就采用了这个规范。

## 1 独立模块作用域

一个文件就是模块，拥有独立的作用域

## 2 导出模块内部数据

### 2.1 常规导出

通过 `module.exports` 或 `exports` 对象导出模块内部数据。

```javascript
// a.js
let a = 1;
let b = 2;

module.exports = {
  x: a,
  y: b
}
// or
exports.x = a;
exports.y = b;
```

### 2.2 导出单一的值（整体导出）

如果一个模块的对外接口，就是一个单一的值，不能使用exports输出，只能使用module.exports输出。

foo.js

```js
module.exports = function (x){ console.log(x);};

// 不能这样写
exports = function (x){ console.log(x);};
```

index.js

```js
const foo = require('./foo')

foo('hello')
```

### 2.3 exports 说明

为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。

```js
var exports = module.exports;
```

注意，不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。

```js
exports = function(x) {console.log(x)};
```

上面这样的写法是无效的，因为exports不再指向module.exports了。下面的写法也是无效的。

```js
exports.hello = function() {
  return 'hello';
};

module.exports = 'Hello world';
```

上面代码中，hello函数是无法对外输出的，因为module.exports被重新赋值了。

## 3 导入外部模块数据

通过 `require` 函数导入外部模块数据

```javascript
// b.js
let a = require('./a');
a.x;
a.y;
```