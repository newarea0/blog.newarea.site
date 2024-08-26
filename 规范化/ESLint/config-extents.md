# 扩展 extents

[Extending Configuration Files](https://eslint.org/docs/user-guide/configuring/configuration-files#extending-configuration-files)

使用 extents 可以继承另一个配置文件的所有特征（包括rules、plugins、language options）。

除非在配置中使用 extents 或者 rules，否则 Eslint 不会对代码进行 lint。

如果配置文件中使用 extents，那么这里存在3个配置：

- 基础配置：extents 指定的配置
- 衍生配置：当前除去 extents 的配置
- 实际配置：合并后的最终配置

extends 属性值可以时字符串，也可以是一个数组（如果规则冲突，位置靠后的包将覆盖前面的）

## 1 extents 值的类型

extents 的值可以是一个字符串，也可以是一个数组。

### 1.1 使用一个共享配置包

如 eslint-config-airbnb、eslint-config-standard 等，配置时，可以省略前缀 `eslint-config-`。

```json
{
  "extends": [
    "standard"
  ]
}
```

[npm scoped modules](https://eslint.org/docs/developer-guide/shareable-configs#npm-scoped-modules)

如 `@foo/eslint-config`（可以省略`/eslint-config`）

```json
{
  "extends": "@foo"
}
```

如 `@foo/eslint-config-bar`（为防止歧义，此处不能省略`eslint-config-`）

```json
{
  "extends": "@foo/eslint-config-bar"
}
```

### 1.2 使用 ESlint 内置的一些规则

如 `eslint:recommended`、`eslint:all`

```json
{
  "extends": [
    "eslint:recommended"
  ]
}
```

### 1.3 使用插件中的配置

如 eslint-plugin-react、eslint-plugin-vue 等。

```js
{
    "plugins": [
        "react"
    ],
    "extends": [
        "plugin:react/recommended"
    ],
    "rules": {
       "react/no-set-state": "off"
    }
}
```
extends 的值的组成形式为 `plugin:xxx/yyy`

- xxx 表示省略前缀 eslint-plugin- 之后的包名。

- yyy 表示配置名称。

### 1.4 使用一个配置文件

extents 的值可以是指向一个配置文件的路径。

```json
{
    "extends": [
        "./node_modules/coding-standard/eslintDefaults.js",
        "./node_modules/coding-standard/.eslintrc-es6",
        "./node_modules/coding-standard/.eslintrc-jsx"
    ],
    "rules": {
        "eqeqeq": "warn"
    }
}
```

