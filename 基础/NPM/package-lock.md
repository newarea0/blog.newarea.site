# package-lock.json

> `dependencies` 是一个对象，对象和 `node_modules` 中的包结构一一对应，对象的 `key` 为包名称，值为包的一些描述信息：

-   `version`：包版本 ------ 这个包当前安装在 `node_modules` 中的版本
-   `resolved`：包具体的安装来源
-   `integrity`：包 `hash` 值，基于 `Subresource Integrity` 来验证已安装的软件包是否被改动过、是否已失效
-   `requires`：对应子依赖的依赖，与子依赖的 `package.json` 中 `dependencies`的依赖项相同。
-   `dependencies`：结构和外层的 `dependencies` 结构相同，存储安装在子依赖 `node_modules` 中的依赖包。

**这里注意，并不是所有的子依赖都有 `dependencies` 属性，只有子依赖的依赖和当前已安装在根目录的 `node_modules` 中的依赖冲突之后，才会有这个属性**。

新建项目 npm A，执行 `npm i npm-test-zbx`

package.json 中会新增依赖记录

```json
"dependencies": {
  "npm-test-zbx": "^1.0.0"
}
```

同时生成 package-lock.json

```json
{
  "name": "test",
  "version": "1.0.0",
  "lockfileVersion": 1,
  "requires": true,
  "dependencies": {
    "npm-test-zbx": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/npm-test-zbx/-/npm-test-zbx-1.0.0.tgz",
      "integrity": "sha512-SK+N7PK+3ah74suLvVaGIR2pDvxFySafer/At4xChbx5i9d3M+v9absig3qiwbQLku7EakcCDwvgaPVwaF3T/A=="
    }
  }
}
```

并且 node_modules 中安装了版本号为 1.0.0 的 npm-test-zbx。

一段时间后库 npm-test-zbx 更新了，版本变成了 1.0.1，在项目 A 中执行 `npm i`，node_modules 下并不会安装 1.0.1 版本的 npm-test-zbx。因为 package-lock.json 中记录的 npm-test-zbx 版本是 1.0.0，npm 会按照 package-lock.json 去安装依赖。

package-lock.json 具有“锁版”的作用，**package-lock.json 中描述的依赖树跟 node_modules 实际结构一一对应**。当 package-lock.json、package.json 同时存在，且**两者不冲突**时，执行命令 `npm i` 会依据 package-lock.json 来生成 node_modules 文件夹。

冲突的场景：
**package.json 中记录了库 A，而 package-lock.json 中没有记录库 A**

如果依据 package-lock.json 去生成 node_modules，则 node_modules 中没有库 A，这与 package.json 描述的矛盾
  
**package-lock.json、package.json 都记录了库 A，package.json 中的版本是 `^2.2.1`，package-lock.json 中记录的版本是 `1.4.3`**

如果依据 package-lock.json 去生成 node_modules，则 node_modules 中库 A 版本是 `1.4.3`，这与 package.json 描述的矛盾

**package.json 中没有记录库 A，而 package-lock.json 中有记录库 A**

不能手动修改 package-lock.json 中`dependencies`、`devDependencies` 等字段，执行 `npm update [库]`、`npm update 库`、`npm uninstall 库` 等命令会自动修改package-lock.json 文件
