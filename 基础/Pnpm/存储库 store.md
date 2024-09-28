# 存储库 store

在 pnpm 中，所有安装的包都被存储在一个本地的存储库中，这样可以避免重复下载和浪费空间。

定期清理存储目录可以帮助释放磁盘空间，特别是当存储的包版本很多时。pnpm 提供了一些命令来管理和清理存储目录中的包，比如 `pnpm store prune` 命令可以清理不再使用的包版本，以减少占用的空间。

当你在一个新建的 pnpm 项目中执行 `pnpm install <package>` 命令时，pnpm 会先去检查 store-dir 中是否已经有该包的对应版本。**如果已经存在，则直接从 store-dir 中复制到你当前项目的 node_modules 目录中（例如 `project/node_modules/.pnpm/package@x.x.x/node_modules/package`），而不需要重新下载**。这样可以节省时间和带宽，特别是在多个项目之间共享依赖时尤为有效。

## .modules.yaml

`project/node_modules/.modules.yaml` 中记录了项目对应的 store 位置。

![](https://image.newarea.site/2024-07-10-18-05-30.png)

修改 Pnpm store 后，对于已经存在的项目再安装依赖，会报错：

![](https://image.newarea.site/2024-07-10-18-10-17.png)