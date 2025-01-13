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

## 打包项目

在package.json 中进行相关配置，具体配置如下：

```json
"build": {
  "appId": "newarea",  // 应用程序的唯一标识符
  // 打包windows平台安装包的具体配置
  "win": {
    "icon":"./logo.ico", //应用图标
    "target": [
      {
        "target": "nsis",  // 指定使用 NSIS 作为安装程序格式
        "arch": ["x64"]  // 生成 64 位安装包
      }
    ]
  },
  "nsis": {
    "oneClick": false,  // 设置为 false 使安装程序显示安装向导界面，而不是一键安装
    "perMachine": true,  // 允许每台机器安装一次，而不是每个用户都安装
    "allowToChangeInstallationDirectory": true  // 允许用户在安装过程中选择安装目录
  }
},
```

执行打包命令

```bash
pnpm build
```

打包完成后，会在项目根目录下生成 `dist` 文件夹，里面包含打包后的安装包。

## Electron-vite

[Electron-vite](https://cn-evite.netlify.app/) 快速、简单且功能强大，旨在开箱即用。

![](https://image.newarea.site/2025-01-13_11-13-00.png)

Electron-vite 是一个新型构建工具，旨在为 Electron 提供更快、更精简的体验。

主要由五部分组成：
- 一套构建指令，它使用 [Vite](https://cn.vitejs.dev/) 打包你的代码，并且它能够处理 Electron 的独特环境，包括 [Node.js](https://nodejs.org/) 和浏览器环境。
- 集中配置主进程、渲染器和预加载脚本的 Vite 配置，并针对 Electron 的独特环境进行预配置。
- 为渲染器提供快速模块热替换（HMR）支持，为主进程和预加载脚本提供热重载支持，极大地提高了开发效率。
- 优化 Electron 主进程资源处理。
- 使用 V8 字节码保护源代码。