# Vue3 不同构建版本的区别

[对不同构建版本的解释](https://v3.cn.vuejs.org/guide/installation.html#%E5%AF%B9%E4%B8%8D%E5%90%8C%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC%E7%9A%84%E8%A7%A3%E9%87%8A)

[vue CDN files](https://cdn.jsdelivr.net/npm/vue@3.0.2/dist/)

[不使用构建工具](https://cn.vuejs.org/guide/best-practices/production-deployment.html#without-build-tools)

[构建文件指南](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use)

Vue3 各构建版本：

![10](https://image.newarea.site/20230828/10.png)

1. 在浏览器端通过`<script src="...">`使用 Vue 的完整版本。一个文件包含全部内容
2. 在浏览器端通过`<script src="...">`使用 Vue 的运行时版本。一个文件包含全部运行时内容
3. 在浏览器端通过`<script type="module">`使用 Vue 的完整版本。一个文件包含全部内容
4. 在浏览器端通过`<script type="module">`使用 Vue 的运行时版本。一个文件包含全部运行时内容
5. 基于构建工具使用。内容很简短，使用了 import 导入其它模块，利用 ES6 的模块优势来做“tree-shaking”。
6. 基于构建工具使用，只包含运行时版。内容很简短，使用了 import 导入其它模块，利用 ES6 的模块优势来做“tree-shaking”。
7. 用于服务器端渲染



文件名中带 prod 的相当于 min，表示压缩优化后的版本，用于生成环境。

文件名中带 runtime，表示运行时版本，如 vue.runtime.global.js，而 vue.global.js 表示运行时+编译器的版本。

从上面可以看出，Vue 提供了两种 ESM 构建文件（5、6）：

- 为打包工具提供的 ESM（6）：为诸如 webpack 或 Rollup 等现代打包工具提供的。ESM 格式被设计为可以被静态分析，所以打包工具可以利用这一点来进行“tree-shaking”并将用不到的代码排除出最终的包。为这些打包工具提供的默认文件 (pkg.module，即 package.json 中的 module 字段) 是只有运行时的 ES Module 构建 (vue.runtime.esm-bundler.js)，即将解析 Vue 单文件组件、解析模板字符串、将模板字符串编译成为 JavaScript 渲染函数等任务交给了打包工具去处理。

- 为浏览器提供的 ESM （5）：用于在现代浏览器中通过 `<script type="module">` 直接导入。

## 1 编译器 Compiler

用于解析模板字符串，将模板字符串编译成为 JavaScript 渲染函数，如果需要在客户端上编译模板 (即：将字符串传递给 template 选项，或者使用元素的 in-DOM HTML 作为模板挂载到元素)，你将需要编译器，因此需要完整的构建版本

```html
<div id="app">
  <h1>{{name}}</h1>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@3.0.2/dist/vue.global.js"></script>
<script>
  const app = Vue.createApp({
    data() {
      return {
        name: 'Jack'
      }
    }
  })
  app.mount('#app')
</script>
```

“解析模板字符串”，其实就是做下面这个操作

![12](https://image.newarea.site/20230828/12.png)

上述 Vue3 所有构建版本中没有单独提供只含编译器的版本。

## 2 运行时 Runtime

运行时是 Vue 中除去编译器剩下的全部功能，如，ref、reactive等等。

上述 Vue3 所有构建版本中有单独提供只含运行时的版本。

使用场景：

- 只想使用 Vue 中除去编译器剩下的某些功能，如，ref、reactive
- 对于使用Vue cli、Vite的项目，在打包时，会将单文件组件中的 template 编译成 JavaScript，因此使用运行时版本即可。

## 3 编译器 + 运行时

即完整的 Vue 构建版本

上述 Vue3 所有构建版本中有提供含编译器 + 运行时的版本。

使用场景：

-  想在浏览器端运行一个完整的 Vue 项目

运行时版本体积仅为完整版本体积的68.5%，也就是说，相比之下，运行时版本体积减少了31.5%

![13](https://image.newarea.site/20230828/13.png)

为什么要将 Vue 拆分成编译器和运行时两部分？

Vue2 各构建版本：

![11](https://image.newarea.site/20230828/11.png)

Vue2 [对不同构建版本的解释](https://cn.vuejs.org/v2/guide/installation.html#%E5%AF%B9%E4%B8%8D%E5%90%8C%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC%E7%9A%84%E8%A7%A3%E9%87%8A)

新建一个 node 项目，仅安装 Vue（`npm i vue@next`）

![14](https://image.newarea.site/20230828/14.png)
