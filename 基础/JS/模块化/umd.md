# UMD

严格来说，`UMD` 并不属于一套模块规范，它主要用来处理 `CommonJS`、`AMD`、`CMD` 的差异兼容，让模块代码能在前面不同的模块环境下都能正常运行。随着 `Node.js` 的流行，前端和后端都可以基于 `JavaScript` 来进行开发，这个时候或多或少的会出现前后端使用相同代码的可能，特别是一些不依赖宿主环境（浏览器、服务器）的偏低层的代码。我们能实现一套代码多端适用（同构），其中在不同的模块化标准下使用也是需要解决的问题，`UMD` 就是一种解决方式

```javascript
(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory()
  }
  else if (typeof define === 'function' && define.amd) {
    // AMD 模块环境下
    define(factory)
  }
  else {
    // 不使用任何模块系统，直接挂载到全局
    root.kkb = factory()
  }
}(this, () => {
  const a = 1
  const b = 2

  // 模块导出数据
  return {
    x: a,
    y: b
  }
}))
```
