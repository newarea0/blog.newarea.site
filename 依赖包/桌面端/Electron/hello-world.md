# Hello World

下面是一个 Electron 项目的创建过程，项目结构如下：

```
electron-app
├─ pages
│  ├─ index.html
├─ main.js
├─ nodemon.json
├─ package.json
├─ pnpm-lock.yaml
├─ nodemon.json
```
## 初始化项目

```bash
# 创建一个文件夹并进入
mkdir electron-app && cd electron-app
# 初始化
pnpm init
# 安装相关依赖
pnpm i electron electron-builder nodemon -D
```

package.json 中几个关键配置：

```json
{
  "main": "main.js", // 主进程文件
  "description": "this is a electron dome", // 为后续能顺利打包，此处要编写描述。
  "author": "newarea", // 为后续能顺利打包，此处要写明作者。
  "scripts": {
    "start": "electron .", // 启动项目
    "build": "electron-builder" // 打包项目
  }
}
```

## 创建主进程

创建主进程 `main.js` 并编写代码，创建一个基本窗口

```js
/*
  main.js: 运行在应用的主进程上，无法访问Web相关API
  主要负责：控制生命周期、显示界面、控制渲染进程等其他操作。
*/
const { app, BrowserWindow } = require('electron')

// 创建窗口
function createWindow() {
  const win = new BrowserWindow({
    width: 800, // 窗口宽度
    height: 600, // 窗口高度
    autoHideMenuBar: true, // 自动隐藏菜单栏
    alwaysOnTop: true, // 置顶
  })

  // 加载一个远程页面
  win.loadURL('https://www.baidu.com/')
}

// 当 app 准备好后，执行 createWindow 创建窗口
app.on('ready', () => {
  createWindow()
  // 当应用被激活时
  app.on('activate', () => {
    // 如果当前应用没有窗口，则创建一个新的窗口
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
  })
})

// 当所有窗口都关闭时
app.on('window-all-closed', () => {
  // 如果所处平台不是 mac(darwin)，则退出应用。
  if (process.platform !== 'darwin')
    app.quit()
})
```

> [!NOTE] 说明
> 关于 BrowserWindow 的更多配置项，请参考[官方文档](https://www.electronjs.org/zh/docs/latest/api/base-window##%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7)

## 启动项目

```bash
pnpm start
```

效果如下：

![](https://image.newarea.site/2025-01-12_17-41-49.png)

## 加载本地页面

上面是加载远程页面，下面改为加载本地页面。创建 `pages/index.html` 编写内容：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Electron</title>
  </head>

  <body>
    <h1>Electron</h1>
  </body>
</html>
```

修改 main.js 加载本地页面

```js
win.loadURL('https://www.douyin.com') // [!code --]
win.loadFile('./pages/index.html') // [!code ++]
```

重启项目，此时开发者工具（Ctrl + Shift + I ）控制台会报出一个安全警告

![](https://image.newarea.site/2025-01-12_16-35-00.png)

解决办法是修改 `index.html` 文件，添加以下内容

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;">
```

::: info 上述配置的说明

1. `default-src 'self'`

   `default-src`：配置加载策略，适用于所有未在其它指令中明确指定的资源类型。

   `self`：仅允许从同源的资源加载，禁止从不受信任的外部来源加载，提高安全性。

2. `style-src 'self' 'unsafe-inline'`

   `style-src`：指定样式表（CSS）的加载策略。

   `self`：仅允许从同源的资源加载，禁止从不受信任的外部来源加载，提高安全性。

   `unsafe-inline`：允许在HTML文档内使用内联样式。

3. `img-src 'self' data:`

   `img-src`：指定图像资源的加载策略。

   `self`：表示仅允许从同源加载图像。

   `data:`：允许使用 `data: URI` 来嵌入图像。这种URI模式允许将图像数据直接嵌入到HTML或CSS中，而不是通过外部链接引用。
:::

> [!NOTE] 说明
> 关于内容安全策略（CSP）的详细说明请参考：[MDN-Content-Security-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy)、[Electron Security](https://www.electronjs.org/docs/latest/tutorial/security)

## 配置自动重启

`main.js`（主进程）是 Node 环境，每次修改 `main.js` 后，需要重启项目才能生效。借助 nodemon 可以实现自动重启。修改 `package.json` 命令。

```json
"scripts": {
  "start": "electron ." // [!code --]
  "start": "nodemon --exec electron ." // [!code ++]
},
```

创建 `nodemon.json` 文件 配置以下规则

```json
{
  "ignore": [
    "node_modules",
    "dist"
  ],
  "restartable": "r",
  "watch": ["*.*"],
  "ext": "html,js,css"
}
```
