# highlightjs

[highlightjs](https://www.npmjs.com/package/highlight.js) 是一个语法高亮器，不依赖任何库。

这里主要介绍通过 require、import 导入该库及用法，和在 Vue 中的使用

## 1 Node.js / require

### 1.1 导入所有语言

```js
const hljs = require('./highlight.js');
const highlightedCode = hljs.highlightAuto('<span>Hello World!</span>').value
```

### 1.2 导入通用语言子集

这种导入方式占用空间**较小**

```js
const hljs = require('highlight.js/lib/common');
```

### 1.3 仅导入需要的语言

这种导入方式占用空间**最小**

```js
const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

const highlightedCode = hljs.highlight('<span>Hello World!</span>', {language: 'xml'}).value
```

## 2 ES6 Modules / import

### 2.1 导入所有语言

```js
import hljs from 'highlight.js';
```

### 2.2 仅导入需要的语言

这种导入方式占用空间**最小**

```js
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
```

## 3 Vue

提供了相关的 Vue 插件，[详见](https://github.com/highlightjs/vue-plugin)
