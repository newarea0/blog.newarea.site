# moduleResolution

[Module Resolution|TypeScript](https://www.typescriptlang.org/docs/handbook/module-resolution.html)

当 `module` 为 `commonjs` 默认值是 `node`
其他情况默认值是 `classic`

这里存在两种截然不同的模块：

-   相对模块路径（路径以 `.` 开头，例如：`./someFile` 或者 `../../someFolder/someFile` 等）；
-   其他动态查找模块（如：`core-js`，`typestyle`，`react` 或者甚至是 `react/core` 等）。

## 1 相对模块路径

这很简单，仅仅是按照相对路径来就可以了：

-   如果文件 `bar.ts` 中含有 `import * as foo from './foo'`，那么 `foo` 文件必须与 `bar.ts` 文件存在于相同的文件夹下
-   如果文件 `bar.ts` 中含有 `import * as foo from '../foo'`，那么 `foo` 文件所存在的地方必须是 `bar.ts` 的上一级目录
-   如果文件 `bar.ts` 中含有 `import * as foo from '../someFolder/foo'`，那么 `foo` 文件所在的文件夹 `someFolder` 必须与 `bar.ts` 文件所在文件夹在相同的目录下

你还可以思考一下其他相对路径导入的场景。😃

## 2 动态查找

当导入路径不是相对路径时，模块解析将会模仿 [Node 模块解析策略](https://nodejs.org/api/modules.html#modules_all_together)，下面我将给出一个简单例子：

-   当你使用 `import * as foo from 'foo'`，将会按如下顺序查找模块：
    -   `./node_modules/foo`
    -   `../node_modules/foo`
    -   `../../node_modules/foo`
    -   直到系统的根目录
-   当你使用 `import * as foo from 'something/foo'`，将会按照如下顺序查找内容
    -   `./node_modules/something/foo`
    -   `../node_modules/something/foo`
    -   `../../node_modules/something/foo`
    -   直到系统的根目录


相关配置：`moduleResolution` 

相同代码，配置的 `moduleResolution` 不同，模块解析策略也不同

### 2.1 classic

### 2.2 node
