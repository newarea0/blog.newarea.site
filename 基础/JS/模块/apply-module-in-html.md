# 在 HTML 中使用模块

## type="module"

在 `<script>` 标签中写 JavaScript  代码，或者使用 src 引入 JavaScript  文件时，默认不能使用 ES6 中的模块语法。除非在 `<script>` 标签上加 `type="module"`，声明这个脚本是一个 JavaScript  模块。

假如有个示例项目 module-demo，文件结构：

```plain
index.html
index.js
module.js
```

module.js

```js
export default function add(a, b) {
  return a + b
}
```

index.js

```js
import add from './module.js'
console.log(add(1, 2))
```

index.html

```html
// index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- 方法 1 ： 引入 module.js，然后在 script 标签里面调用 -->
  <script type="module">
    import add from './module.js';
    console.log(add(1, 2))
  </script>
 
 <!-- 方法 2 ： 直接引入 index.js，使用src引入 -->
  <script type="module" src="./index.js"></script>
</body>
</html>
```

注意 index.html 必须通过本地服务的方式访问，不能通过 “file:///” 的形式访问。

模块文件的路径用于查找模块，有以下几种形式：

- 相对于站点根目录（module-demo/）的相对路径，如：`import add from '/module.js'`。
- 相对当前路径的相对路径，如 `import add from './module.js'`。
- 绝对路径，如 `import add from 'https://example.com/module.js'`。
- 任意文本，如果使用导入映射（import maps）

## 导入映射

导入映射是一个 JSON 对象，在导入 JavaScript 模块时，用来告诉浏览器如何解析模块路径。

导入映射允许使用裸模块名称（如在 Node.js 中）导入模块。一个 Html 文档有且只有一个导入映射，导入映射需要位于所有 `<script>` 元素之前。

检测是否支持导入映射：

```js
if (HTMLScriptElement.supports?.("importmap")) {
  console.log("Browser supports import maps.");
}
```

在 index.html 中添加导入映射。

```html
<script type="importmap">
  {
    "imports": {
      "module": "./module.js",
    }
  }
</script>
```

则可以使用如下方式导入模块 `module.js`。

```js
import add from 'module'
```
