# __dirname 和 . 的区别

`__dirname` 总是指向被执行 js 文件（也就是当前模块）所在**文件夹**的**绝对路径**。`__filename` 返回当前模块的绝对路径，包含文件名（/dir1/dir2/foo.js）

`.` 表示当前的**工作目录**。

假如有如下目录结构

```
|-- dir1
    |-- dir2
        |-- foo.js
```

foo.js 内容如下

```js
const path = require('path')
console.log('__dirname', __dirname)
console.log('.', path.resolve('.'))
```

**场景一**

```
cd /dir1/dir2
node foo.js
```

结果

```
__dirname /dir1/dir2
. /dir1/dir2
```

**场景二**

```
cd /dir1
node dir2/foo.js
```

结果

```
__dirname /dir1/dir2
. /dir1
```

由此可以看出，不管进到哪层目录下，`__dirname` 的打印结果都 **一致**，只有进入到被执行 Js 文件所在目录，`__dirname` 和 `.` 打印结果才一样。

例子

新建 node 项目 fs-extra，安装依赖：`npm i fs-extra`

```
|-- fs-extra
    |-- package-lock.json
    |-- package.json
    |-- src
        |-- emptyDir.js
```

emptyDir.js

```js
const fs = require('fs-extra')

fs.emptyDir('./foo').then(() => {
  console.log('success')
}).catch(err => {
  console.log(err)
})
```

进入 /e/01-front-end/test/06node/fs-extra，执行 `node src/emptyDir.js`，会在 /e/01-front-end/test/06node/fs-extra 目录下产生一个新目录 foo。

假如，进入 /e/01-front-end/test/06node/fs-extra/src，执行 `node emptyDir.js`，会在 /e/01-front-end/test/06node/fs-extra/src 目录下产生一个新目录 foo。

如果 emptyDir.js 使用了 `__dirname`:

```js
const fs = require('fs-extra')
const { resolve } = require('path')

fs.emptyDir(resolve(__dirname, './foo')).then(() => {
  console.log('success')
}).catch(err => {
  console.log(err)
})
```

不管工作目录怎样，都是在 /e/01-front-end/test/06node/fs-extra/src 下产生一个新目录 foo。

参考：

[__dirname](https://nodejs.org/dist/latest-v16.x/docs/api/modules.html#__dirname)
