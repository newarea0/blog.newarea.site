# cross-env

Windows 和 Linux 系统临时设置、使用环境变量的方式不一样，通过 cross-env，可以消除不同系统间的差异性。

## 安装

`npm install --save-dev cross-env`

## 使用

如：

package.json

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

另一个例子：新建一个 Node 项目

```
|-- test
    |-- index.js
    |-- package-lock.json
    |-- package.json
```

index.js

```js
console.log(process.env.TEST_ENV)
```

package.js

```json
{
  "script": {
    "dev": "cross-env TEST_ENV=one node ./index.js"
  },
  "devDependencies": {
    "cross-env": "^7.0.3",
  }
}
```

执行 `npm run dev`，控制台输出 `one`

参考

[github](https://github.com/kentcdodds/cross-env)
