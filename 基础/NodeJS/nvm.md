# nvm

[nvm-windows](https://github.com/coreybutler/nvm-windows)

下载并安装 nvm-windows。

安装向导会询问 NVM 的安装路径，这里选择 `D:\nvm`。

![](https://image.newarea.site/2025-04-27_22-34-55.png)

安装向导会询问当前 Node 的符号链接路径（表示当前 Node），这里选择 `E:\nvm4w\nodejs`。

![](https://image.newarea.site/2025-04-27_22-37-03.png)

安装 LTS Node、pnpm

```sh
# 下载完成后安装 LTS Node
nvm install lts
# 使用 LTS Node
nvm use 22.15.0

# 安装常用全局依赖，如 nrm、pnpm、rimraf
npm i nrm pnpm rimraf  -g
```

上面操作会产生如下目录文件：

- D:\nvm

  ![](https://image.newarea.site/2025-05-07_00-14-41.png)

- E:\nvm4w\nodejs

  ![](https://image.newarea.site/2025-05-07_00-23-20.png)

  ![](https://image.newarea.site/2025-05-07_00-28-44.png)
