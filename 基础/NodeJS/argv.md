# 命令行参数

通过 `process.argv` 可以获取命令行参数，`process.argv` 返回一个数组，数组第一项是 Node 可执行命名的绝对路径，第二项是被执行 JavaScript 文件绝对路径，从第三项开始即为命令行参数。

index.js

```js
console.log(process.argv)
```

执行 `node index.js  name=Jack --age=20 -address=sz county china`，打印：

```js
[
  'D:\\nodejs\\node.exe',
  'E:\\01-front-end\\test\\06node\\node-test\\命令行参数.js',
  'name=Jack',
  '--age=20',
  '-address=sz',
  'county',
  'china'
]
```

相关工具 [minimist](https://github.com/substack/minimist)
