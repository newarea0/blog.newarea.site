# type

[Determining module system](https://nodejs.org/dist/latest-v16.x/docs/api/packages.html#packages_determining_module_system)

默认情况下，Node.js 将 JavaScript 代码视为 CommonJS 模块。可以通过下面方式告诉 Node.js 将 JavaScript 代码视为 ECMAScript 模块：

- 文件扩展名为 `.mjs `。
- 文件扩展名为 `.js `，但最近的父 package.json 文件包含值为 `module` 的 `type` 字段。
- 当设置`--input-type=module` 标志时，作为参数传入 --eval 的字符串将被视为 ES 模块。

新建一个 Node 项目 execa:

```
|-- execa
    |-- package-lock.json
    |-- package.json
    |-- src
        |-- index.js
```

index.js

```js
import { execa } from 'execa'

execa('ls').then((res) => {
  console.log(res)
  console.log(res.stdout)
})
```

执行

```shell
cd execa
node src/index.js
```

控制台报错，提示 SyntaxError: Cannot use import statement outside a module。要想执行成功，可以通过下列三种方式：

方式一：

将文件后缀改成 `.mjs`，index.js -> index.mjs

方式二

package.json 中添加 `type` 字段，并设置值为 `module`

```json
{
  "type": "module"
}
```

方式三：

```shell
node --input-type=module --eval "import { execa } from 'execa';execa('ls').then(res => { console.log(res);console.log(res.stdout) })"
```
