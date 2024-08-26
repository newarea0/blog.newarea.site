# note

## 1 实际问题

假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 `<script>` 标签引入 jQuery，然后就可以使用全局变量 $ 或 jQuery 了。如果直接这样使用会报错，因为 TypeScript 编译上下文并不知道 jQuery 是什么。

```ts
jQuery('#foo');
// ERROR: Cannot find name 'jQuery'.
```

有如下几种解决方式：

### 1.1 方式一

```ts
// 源文件
function jQuery(id: string): any {

}
jQuery('#foo')
```

```js
// 编译后
function jQuery(id) {
}
jQuery('#foo');
```

报错虽然解决了，但是重新定义了变量 jQuery，导致无法使用 jQuery 库。

### 1.2 方式二

```ts
// 源文件
var jQuery: (selector: string) => any
jQuery('#foo')
```

```js
// 编译后
var jQuery;
jQuery('#foo');
```

这种方式其实跟方式一是相似的，只是方式一中使用的是函数定义，这里使用的是函数表达式。为了跟方式三形成对比，这里只是定义了变量 jQuery 但没有赋值。

### 1.3 方式三

```ts
// 源文件
declare var jQuery: (selector: string) => any
jQuery('#foo')
```

```js
// 编译后
jQuery('#foo');
```

可以看出，这种方式既解决了报错问题，也不会向编译后的文件中添加多余的代码。

`declare var` 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，**仅仅会用于编译时的检查，在编译结果中会被删除**。

通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件。

```ts
// src/jQuery.d.ts

declare var jQuery: (selector: string) => any;
```

需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现

```ts
declare const jQuery = function(selector) {
    return document.querySelector(selector);
};
// ERROR: An implementation cannot be declared in ambient contexts.
```

declare namespace 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。

## 2 declare

declare 关键字告诉 TypeScript，你正在试图表述一个其他地方已经存在的代码。如

错误：

```ts
foo = 123 // Cannot find name 'foo'
```

正确：

```ts
declare var foo: any // 告诉 TypeScript 编译器，如果再次遇到 foo，foo是一个类型为 any 的变量。
foo = 123;
```

这就有点像 JS 中的变量先声明再赋值。

可以选择把这些声明放入 .ts 或者 .d.ts 里。在你实际的项目里，我们强烈建议你应该把声明放入独立的 .d.ts

## xxx.d.ts + xxx.js 等价于 一个 xxx.ts 文件

类型声明文件（xxx.d.ts）通常和 js 文件一起出现

[全局类库](https://www.dengwb.com/typescript/project/declaration-files.html#%E5%85%A8%E5%B1%80%E7%B1%BB%E5%BA%93)

一般发布到 npm 上的库都是 js 文件，所以要有一个相应的类型声明文件，对js进行解释（类型申明），这个类型什么文件要么是跟库一起的，要么是在 @types 下的。

在一个 ts 文件中

1

```ts
let a: number = 123
```

2

```ts
let a: number
a  = 123
```

3

```ts
declare let a: number
a  = 123
```

编译后

```js
a = 123
```
