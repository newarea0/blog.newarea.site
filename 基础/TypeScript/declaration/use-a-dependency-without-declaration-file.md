# TS 项目如何使用一个不含声明文件的依赖

测试包 bar

```
|-- bar
    |-- index.js
    |-- package.json
```

```js
// index.js
export const add = function (a, b) {
  return a + b
}

export default function (a, b) {
  return a - b
}
```

```json
// package.json
{
  "name": "bar",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

通过执行 `npm link` 在本地对包进行测试。

新建项目 typescript-test:

进入项目，执行 `npm link bar`

```
|-- typescript-test
    |-- foo.ts
    |-- package-lock.json
    |-- package.json
    |-- tsconfig.json
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "esnext"
  }
}
```

```ts
// foo.ts
import { add } from 'bar'

console.log(add(1, 2))
```

此时 foo.ts 文件报错，且编辑器没有代码提示：

![02](https://image.newarea.site/20230714/02.png)

为了消除报错，且可以使用代码提示功能，有如下方法：

方法一：

新建文件 bar.d.ts，必须在跟目录下

文件名必须是 bar.d.ts

![03](https://image.newarea.site/20230714/03.png)

![04](https://image.newarea.site/20230714/04.png)

方法二：

新建文件 declarations.d.ts，

文件名没有要求（不用必须是 declarations），可以放到一个文件夹中

![05](https://image.newarea.site/20230714/05.png)

方法一、二，编译后生产的 JS 文件：

```js
// foo.js
import { add } from 'bar';
console.log(add(1, 2));
```
