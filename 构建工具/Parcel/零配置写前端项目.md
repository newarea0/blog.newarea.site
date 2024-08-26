# 零配置写前端项目

假设现在我想写一个 demo 测试下 Vue3 中渲染函数，有以下几种方式：

## 方式一

下载 Vue3 的浏览器版本 vue.global.js，新建文件夹 test，结构如下：

![01](https://image.newarea.site/20230715/01.png)

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
</head>
<body>
  <div id="app"></div>
  <script src="vue.global.js"></script>
  <script src="index.js"></script>
</body>
</html>
```

index.js

```js
const { h } = Vue

const vNode = h('div',
  {class: 'msg', onclick: ($event) => console.log($event.target)},
  [h('span', ['hello']), 'world']
)

console.log(vNode)const vNode = h('div',
  {class: 'msg', onclick: ($event) => console.log($event.target)},
  [h('span', ['hello']), 'world']
)

console.log(vNode)
```

在浏览器中打开index.html，查看控制台。这种方式最原始，不够灵活。例如，如果中途想添加新的依赖，必须得手动下载资源文件，然后将资源移到项目中。

## 方式二

使用官方提供的命令行工具或 Vite 创建一个 Vue 项目，在项目中通过下面方式使用：

```js
import { h } from 'vue'

const vNode = h('div',
  {class: 'msg', onclick: ($event) => console.log($event.target)},
  [h('span', ['hello']), 'world']
)

console.log(vNode)
```

有时候我只想写个小demo，简单测试下某个方法，这种方式就显得很笨重，它会下载很多冗余代码。

## 方式三 

使用 [Parcel](https://v2.parceljs.org/getting-started/webapp/)

初始化一个 npm 项目

安装 Parcle: `yarn add parcel@next -D`

安装 Vue3: `yarn add vue@next`

在项目下新建下面两个文件：

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
</head>
<body>
  <script src="index.js" type="module"></script>
</body>
</html>
```

index.js

```js
import { h } from 'vue'

const vNode = h('div',
  {class: 'msg', onclick: ($event) => console.log($event.target)},
  [h('span', ['hello']), 'world']
)

console.log(vNode)
```

修改 package.json

```json
{
  "scripts": {
    "start": "parcel serve ./src/index.html",
    "build": "parcel build ./src/index.html"
  }
}
```

执行 `npm run start`

![02](https://image.newarea.site/20230715/02.png)

在浏览器中打开服务器地址，在打开控制台查看结果。对比上面两种方式，这种方式就很理想。零配置，而且还用热更新得功能。项目结构简单，目标明确，不会产生冗余代码。

**注意**

如果不使用 Parcel，而是通过 script 标签使用 ESM 的方式是不行的，这种方式只能 import 项目中已经存在的文件，不能导入 npm 包。

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
</head>
<body>
  <script src="index.js"  type="module"></script>
</body>
</html>
```

index.js

```js
import { h } from 'vue'

const vNode = h('div',
  {class: 'msg', onclick: ($event) => console.log($event.target)},
  [h('span', ['hello']), 'world']
)

console.log(vNode)
```

此时通过服务器的方式打开 html 文件控制台会报错：

Uncaught TypeError: Failed to resolve module specifier "vue". Relative references must start with either "/", "./", or "../".
