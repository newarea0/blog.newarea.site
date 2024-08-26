# AMD

> 基于浏览器的模块化

因为 CommonJS 规范一些特性（基于文件系统，同步加载），它并不适用于浏览器端，所以另外定义了适用于浏览器端的规范 

 `AMD(Asynchronous Module Definition)`

https://github.com/amdjs/amdjs-api/wiki/AMD

浏览器并没有具体实现该规范的代码，我们可以通过一些第三方库来解决

## 1 requireJS

https://requirejs.org/

```javascript
// 1.html
<script data-main="js/a" src="https://cdn.bootcss.com/require.js/2.3.6/require.min.js"></script>
```

**独立模块作用域**

通过一个 `define` 方法来定义一个模块，在该方法内部模拟模块独立作用域

```javascript
// b.js
define(function() {
  // 模块内部代码
})
```

**导出模块内部数据**

通过 `return` 导出模块内部数据

```javascript
// b.js
define(function() {
  let a = 1;
	let b = 2;
  return {
    x: a,
  	y: b
  }
})
```

**导入外部模块数据**

通过前置依赖列表导入外部模块数据

```javascript
// a.js
// 定义一个模块，并导入 ./b 模块
define(['./b'], function(b) {
	console.log(b);
})
```

## 2 `requireJS` 的 `CommonJS` 风格

`require.js` 也支持 `CommonJS` 风格的语法

**导出模块内部数据**

```javascript
// b.js
define(function(require, exports, module) {
  let a = 1;
	let b = 2;
  module.exports = {
    x: a,
    y: b
  }
})
```

**导入外部模块数据**

```javascript
// a.js
define(function(require, exports, module) {
  let b = require('./b')
  console.log(b);
})
```