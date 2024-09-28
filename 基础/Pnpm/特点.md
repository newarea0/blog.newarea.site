# 特点

## 1 速度更快

> 类似 maven

之前依赖都是扁平化的安装在项目的 node_modules 文件夹中。如果尝试复制、删除项目，都要很长时间。若使用 pnpm，依赖存放在系统的某个位置 store，项目 node_modules 中的依赖仅仅是指向 store 中依赖的硬连接。

用 npm/yarn 的时候，如果 100 个项目都依赖 lodash，那么 lodash 很可能就被安装了 100 次，磁盘中就有 100 个地方写入了这部分代码。但在使用 pnpm 只会安装一次，磁盘中只有一个地方写入，后面再次使用都会直接使用 hardlink

## 2 更安全

避免了npm中的依赖提升，使用 pnpm，项目 node_modules 下的依赖基本跟项目 package.json 声明的依赖一致。如果项目依赖了 a，a 依赖了 b，若是 npm，项目中可以使用 b，若是 pnmp，则项目中不能使用 b。

**使用 npm 的项目:**

执行 `npm i express`，node_modules 下不仅安装了 express，还有很多其他依赖，如 qs，在项目中可以使用 qs `const qs = require('qs')`

![02](https://image.newarea.site/20230721/02.png)

**使用 pnpm 的项目：**

执行 `npm i express`，node_modules 下仅安装了 express 和 mini-types 的软连接，如果像上面那样在项目中使用 qs `const qs = require('qs')`，提示未安装

![01](https://image.newarea.site/20230721/01.png)

执行 `node src/index.js` 会报错

![03](https://image.newarea.site/20230721/03.png)

## 3 支持 monorepo


