# peerDependencies

 > 主要用于告诉使用者, npm 包本身依赖哪些模块, 并且需要安装它

## 1 为什么使用 peerDependencies 而不是 dependencies？

新建一个 npm 项目 test，安装依赖 element-ui `npm i element-ui`，控制台给出如下警告：

![12](https://image.newarea.site/20230719/12.png)

意思是项目 test 需要提前安装 `vue@^2.5.17`，通俗的讲就是“如果你安装我，那么你最好也安装X”，确实，使用库 element-ui 的项目本身也是 Vue 项目。

element-ui/package.json：

```json
{
  "peerDependencies": {
    "vue": "^2.5.17"
  },
  "dependencies": {
    "async-validator": "~1.8.1",
    "babel-helper-vue-jsx-merge-props": "^2.0.0",
    "deepmerge": "^1.2.0",
    "normalize-wheel": "^1.0.1",
    "resize-observer-polyfill": "^1.5.0",
    "throttle-debounce": "^1.0.1"
  },
}
```

如果在 element-ui/package.json 中使用 dependencies 而不是 peerDependencies 来声明 Vue，即执行完 `npm i vue@2.4.4 element-ui` 后的依赖图是这样

```
|-- test
    |-- node_modules
        |-- vue
        |-- element-ui
            |-- node_modules
                |-- vue
```

因为 element-ui 的 dependencies（假设的）中声明了 `vue@^2.5.17`，与主工程 test 本身声明的 `vue@2.4.4` 有冲突，导致 Vue 会被安装2次，产生冗余安装。

而 peerDependency 就可以**避免类似的核心依赖库被重复下载的问题，减少项目最终打包后的体积**。

## 2 peerDependency 的常见使用场景

- 自动化工具（如 Rollup、Webpack等）的相关插件，如 plugin-node-resolve
- 基于某个框架的 UI 组件库，如 element-ui
