# scripts-prepend-node-path

[scripts-prepend-node-path](https://docs.npmjs.com/cli/v6/using-npm/config#scripts-prepend-node-path)

一般 node 版本和 npm 版本是一一对应的，加入我本地通过 [nvm-window](https://github.com/coreybutler/nvm-windows)安装了两个版本 node：

- node v8.17.0、npm v6.13.4
- node v18.17.1、npm v9.6.7

当前使用的是 node v8.17.0、npm v6.13.4

现在有一个项目要求使用 node v18.17.1，进到项目根目录，执行：

```sh
D:\\soft\\nvm\\v8.17.0\\npm run start
```

提示如下，意思是虽然 npm 使用的是 v6.13.4，但 node 使用的是 v18.17.1，不匹配。

![](https://image.newarea.site/2024-03-06-10-30-08.png)

解决办法：

```sh
D:\\soft\\nvm\\v8.17.0\\npm run start --scripts-prepend-node-path auto
```

注意，该配置从 npm v7 开始已经移除（[参考](https://github.com/npm/cli/issues/2808#issuecomment-821431605)）。