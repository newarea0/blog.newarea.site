# 单独使用某个功能

[可做到零配置写前端项目](https://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ%3D%3D&chksm=ec0c2816db7ba10090095cab33fee96938c8b99d283b577078c4459b2414b5d8902f4c4976b7&idx=1&mid=2247487356&scene=21&sn=4b0f924aa68c16d81dae750da2932132#wechat_redirect)

Vue3 现在将核心功能拆分成了不同得包，可以单独安装某一个包，饭后使用。

通过 Parcle

`yarn add @vue/compiler-core`

index.js

```js
import { baseCompile } from '@vue/compiler-core'

let app = document.getElementById('app')

let ret = baseCompile(app.innerHTML)

console.log(ret)
```

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
  <div id="app">
    <p class="wrap">hello</p>
  </div>
  <script src="index.js"></script>
</body>
</html>
```