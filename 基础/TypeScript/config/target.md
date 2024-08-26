# [target](https://www.typescriptlang.org/tsconfig#target)

设置目标语言的版本（即编译后生成哪个版本的 JS），可设置为 `es3`、`es5` 和 `es6`/`es2015`、`es2016`、`es2017`、`es2018`、`es2019`、`es2020`、`es2021`，默认为 `es3`。

如下面代码根据不同的 `target` 编译后产生不同的产物：

```ts
let add = (x: number, y: number): number => {
  return x + y
}
```
`target: 'es3'`

```js
"use strict";
var add = function (x, y) {
    return x + y;
};
```

`target: 'esnext'`

```js
"use strict";
let add = (x, y) => {
    return x + y;
};
```