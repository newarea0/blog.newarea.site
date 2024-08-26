# 插件

> 插件其实就是一个返回插件对象的函数

[官方插件列表](https://github.com/rollup/plugins)

[Awesome Rollup](https://github.com/rollup/awesome)

Rollup支持使用插件的方式，并不像webpack中分为loader、plugins和minimize三种扩展方式，插件时Rollip唯一扩展途径

## 1 插件解析

以插件 rollup-plugin-node-resolve 为例：

```shell
rollup -i input.js -f es -p @rollup/plugin-node-rolve
```

通过命令行使用插件时，如果插件名不是以 `rollup-plugin-`、`@rollup/plugin-` 开头，解析时 Rollup 会自动尝试加上这些前缀。

## 2 常用插件

### 2.1 普通插件
**rollup-plugin-json**

[参考](https://rollupjs.org/guide/en/#using-plugins)

转化 json 文件为 ES6 模块。

**rollup-plugin-node-resolve**

用于加载 npm 模块，Rollup 不能像 Webpack 一样，直接使用模块的名称导入第三方模块，需要使用 rollup-plugin-node-resolve。

**rollup-plugin-commonjs**

Rollup设计只处理 ESModule 的打包，导入 CommonJS 模块是不支持的，需使用 rollup-plugin-commonjs。

**rollup-plugin-typescript2**

整合 Rollup 和 Typescript

## 2.2 输出插件

**rollup-plugin-terser**

用于压缩构建结果