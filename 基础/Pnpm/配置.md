# 配置

配置存放[位置](https://pnpm.io/zh/npmrc)：

- 项目级配置，跟 package.json 文件相邻，如 `path\to\my\project\.npmrc`。

- 工作空间（单体多仓项目）级配置（包含 pnpm-workspace.yaml 文件的目录）。

- 操作系统**用户级**配置，如 `C:\Users\xxx\.npmrc`。

- 全局配置文件，位于 Node 安装目录，如 `D:\soft\nvm\v20.10.0\etc\npmrc`。

在[官网](https://pnpm.io/zh/npmrc)中全局搜索 `AppData`（位于 Windows C 盘 `C:\Users\xxx\AppData`），发现下列相关配置：cache-dir、state-dir、global-dir、store-dir、global-bin-dir， 修改这些配置值，防止后期下载的文件放入 C 盘中。

## 1 cache-dir

缓存的位置（包元数据和 dlx）。

默认 `C:\Users\xxx\AppData\Local\pnpm-cache`。

修改：

```sh
pnpm config set cache-dir "E:\pnpm-cache"
```

校验是否修改成功：

![](https://image.newarea.site/2024-07-10-11-07-08.png)

## 2 state-dir

存储 pnpm-state.json 文件的目录，该文件当前仅由更新检查器使用。

默认 `C:\Users\xxx\AppData\Local\pnpm-state`。

![](https://image.newarea.site/2024-07-10-10-56-17.png)

修改：

```sh
pnpm config set state-dir "E:\pnpm-state"
```

校验是否修改成功：

![](https://image.newarea.site/2024-07-10-11-08-28.png)

## 3 store-dir

用来存储 pnpm 安装的包。在 pnpm 中，所有安装的包都被存储在一个本地的存储库中，这样可以避免重复下载和浪费空间。

定期清理存储目录可以帮助释放磁盘空间，特别是当存储的包版本很多时。pnpm 提供了一些命令来管理和清理存储目录中的包，比如 `pnpm store prune` 命令可以清理不再使用的包版本，以减少占用的空间。

当你在一个新建的 pnpm 项目中执行 `pnpm install <package>` 命令时，pnpm 会先去检查 store-dir 中是否已经有该包的对应版本。**如果已经存在，则直接从 store-dir 中复制到你当前项目的 node_modules 目录中（例如 `project/node_modules/.pnpm/package@x.x.x/node_modules/package`），而不需要重新下载**。这样可以节省时间和带宽，特别是在多个项目之间共享依赖时尤为有效。

默认 `C:\Users\xxx\AppData\Local\pnpm\store`

![](https://image.newarea.site/2024-07-10-10-48-05.png)

修改：

```sh
pnpm config set store-dir "E:\pnpm\store"
```

校验是否修改成功：

![](https://image.newarea.site/2024-07-10-11-15-10.png)

## 4 global-dir

默认 `C:\Users\xxx\AppData\Local\pnpm\global`

用于存放全局包：

![](https://image.newarea.site/2024-07-10-10-40-43.png)

修改：

```sh
pnpm config set global-dir "E:\pnpm\global"
```

校验是否修改成功：

![](https://image.newarea.site/2024-07-10-11-18-22.png)

## 5 global-bin-dir

默认 `C:\Users\xxx\AppData\Local\pnpm`

用户存放全局包的可执行脚本，如安装 rimraf：

```sh
pnpm i rimraf -g
```

![](https://image.newarea.site/2024-07-10-10-12-43.png)

修改：

```sh
pnpm config set global-bin-dir "E:\pnpm"
```

校验是否修改成功：

![](https://image.newarea.site/2024-07-10-11-19-32.png)

注意确保将修改后的地址添加到环境变量 PATH

![](https://image.newarea.site/2024-07-10-11-27-20.png)

## 配置写到哪了

执行上面修改命令，改动将写入 `C:\Users\xxx\AppData\Local\pnpm\config\rc`：

```
cache-dir=E:\pnpm-cache
state-dir=E:\pnpm-state
store-dir=E:\pnpm\store
global-dir=E:\pnpm\global
global-bin-dir=E:\pnpm
```
