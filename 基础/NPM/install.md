## npm config 命令

`npm help config` 在浏览器打开命令 `npm config` 的介绍页。

- `npm config list` 展示部分配置
- `npm config list --json` 展示所有配置
- `npm config list --json` 以 json 格式展示所有配置

`npm config list`

```
; "builtin" config from D:\nodejs\node_modules\npm\npmrc

prefix = "C:\\Users\\zbxtqw\\AppData\\Roaming\\npm"

; node bin location = D:\nodejs\node.exe
; node version = v16.18.1
; npm local prefix = E:\Desktop
; npm version = 8.19.2
; cwd = E:\Desktop
; HOME = C:\Users\zbxtqw
; Run `npm config ls -l` to show all defaults.
```

`npm config list --json`

```json
{
  "prefix": "C:\\Users\\zbxtqw\\AppData\\Roaming\\npm",
  "cache": "C:\\Users\\zbxtqw\\AppData\\Local\\npm-cache",
  "registry": "https://registry.npmjs.org/",
  "userconfig": "C:\\Users\\zbxtqw\\.npmrc",
  // ...
}
```

### prefix

[prefix Configuration](https://docs.npmjs.com/cli/v10/configuring-npm/folders#prefix-configuration)

[prefix config](https://docs.npmjs.com/cli/v10/using-npm/config#prefix)

表示全局包（prefix/node_modules）、执行脚本（prefix）存放位置。

默认 `C:\Users\xxx\AppData\npm`

### cache

缓存位置。

### registry

npm 源。

### userconfig

用于存放用户修改的配置信息，如 `npm config set prefix "D:\nodejs"` 会向 .npmrc 写入 `prefix=D:\nodejs`。

## 配置来源

配置存放[位置](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)：

- 项目级配置，跟 package.json 文件相邻，如 /path/to/my/project/.npmrc。

- 操作系统用户级配置，如 C:\Users\xxx\.npmrc。

- 全局配置文件，位于 Node 安装目录，如 D:\soft\nvm\v20.10.0\etc\npmrc。

- 内置配置 path/to/npm/itself/npmrc。

![](https://image.newarea.site/2024-07-10-09-56-01.png)

执行 `npm config list --json`，打印：

```json
{
  //...
  "globalconfig": "D:\\soft\\nvm\\v20.10.0\\etc\\npmrc",
  "userconfig": "C:\\Users\\01422772\\.npmrc",
}
```

## Node 包分类

**内置包**

位于 Node 安装目录下 node_modules 文件夹中，如果内置包提供了可执行脚本，这些脚本直接位于 Node 安装目录下。

![](https://image.newarea.site/20230719/13.png)

![](https://image.newarea.site/20230719/14.png)

**全局包**

安装 prefix/node_modules 文件夹中，如果全局包提供了可执行脚本，这些脚本直接位于 prefix 文件夹下。

**项目包**

安装在项目根目录下 node_modeules 文件夹中，如果项目包提供了可执行脚本，这些脚本位于 node_modules/.bin 下，可以通过 `npx xxx index.js` (等价于 `node_modules/.bin/xxx index.js`)使用这些脚本。

|| 安装位置 | 可执行脚本位置|
|:--|:--|:--|
|内置包|Node 安装目录下 node_modules 文件夹|Node 安装目录|
|全局包|prefix/node_modules|prefix|
|项目包|项目根目录下 node_modeules 文件夹|项目/node_modules/.bin|

安装完 Node，`C:\Users\zbxtqw\AppData\Roaming\npm`、`D:\nodejs\` 均已写入全局变量 Path 中。

## 修改全局包安装位置

修改全局包安装位置、相应可执行脚本位置：

`npm config set prefix "D:\nodejs"`

实际上，该命令会在用户目录下的新建 `C:\Users\zbxtqw\.npmrc` 文件并写入 `prefix=D:\nodejs`

修改缓存位置

`npm config set cache "D:\nodejs\npm-cache"`

同时会向用户目录下 .npmrc 文件并写入 `cache=D:\nodejs\npm-cache`

## 安装 nrm

有时候需要切换 npm 源，如向 npm 上发布包时，需要将源切换到 `https://registry.npmjs.org/`

工作中经常同时打开多个项目，当在一个项目终端下执行 `npm use xxx`，此时实际是将整个环境下的 npm 源切换了，即其他项目下的 npm 源也切换了

`npm install -g  nrm`

安装完成后，如果通过系统 CMD 或者开发工具终端无法使用 nrm 命令，可以尝试使用 git bash。

- `nrm ls` 列出当前可使用的源

- `nrm use yarn`，如切换 npm 源

- `nrm test` 测试源的速度

## 安装 pnmp

`npm install pnpm -g`

