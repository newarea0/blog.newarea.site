# nvm-windows

[nvm-windows](https://github.com/coreybutler/nvm-windows)

## 安装

选择 nvm 安装目录。

![](https://image.newarea.site/2024-07-14-21-14-01.png)

当前使用的 Node.js 软连接，选择跟 nvm 安装同一目录下。

![](https://image.newarea.site/2024-07-14-21-15-31.png)

![](https://image.newarea.site/2024-07-14-21-16-25.png)

![](https://image.newarea.site/2024-07-14-21-17-05.png)

## 检查是否安装成功

```sh
nvm -v
```

## 安装成功后

![](https://image.newarea.site/2024-07-14-21-29-52.png)

![](https://image.newarea.site/2024-07-14-21-32-41.png)

## 安装长期支持版 Nodejs

```sh
nvm install lts
nvm ls
nvm use 20.15.1
```

![](https://image.newarea.site/2024-07-15-22-29-17.png)

![](https://image.newarea.site/2024-07-15-22-31-05.png)

nodejs 是一个软连接，指向 `D:\nvm\v20.15.1`，表示当前的 Node.js，可用于存放全局可执行脚本（`D:\nodejs`）和依赖包（`D:\nodejs\node_modules`）

![](https://image.newarea.site/2024-07-15-22-32-08.png)

![](https://image.newarea.site/2024-07-15-22-32-34.png)

![](https://image.newarea.site/2024-07-15-22-40-59.png)

## 安装全局包

安装全局包，如 pnpm，`npm i pnpm -g`

![](https://image.newarea.site/2024-07-15-22-46-26.png)

![](https://image.newarea.site/2024-07-15-22-46-57.png)

安装完 pnpm 后应首先修改默认配置，防止 pnpm 将相关下载放入 C 盘，参考 [pnpm 配置](../pnpm/config.md)
