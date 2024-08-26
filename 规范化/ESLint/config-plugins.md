# 插件

## 1 插件的命名规范
[Configuring Plugins](https://eslint.org/docs/user-guide/configuring/plugins#configuring-plugins)

[Working with Plugins](https://eslint.org/docs/developer-guide/working-with-plugins)

### 1.1 非域包插件

eslint-plugin-xxx -> xxx

格式 eslint-plugin-xxx，在 plugins 中可以省略前缀 `eslint-plugin-`

如 eslint-plugin-vue

在配置文件中的书写如下

```json
{
  "plugins": ["vue"],
  "extends": ["plugin:vue/recommended"],
  "rules": {
    "vue/no-unused-refs": "error"
  },
  "env": {
    "vue/xxx": true
  }
}
```

### 2.1 域包插件

有两种

#### 2.1.1 格式 @xxx/eslint-plugin -> @xxx

如 @typescript-eslint/eslint-plugin

```json
{
  "plugins": ["@typescript-eslint"],
  "extends": ["plugin:@typescript-eslint/recommended"],
  "rules": {
    "@typescript-eslint/a-rule": "error"
  },
  "env": {
    "@typescript-eslint/a-env": true
  }
}
```

#### 2.2.2 格式 @xxx/eslint-plugin-xxx -> @xxx/xxx

如 @foo/eslint-plugin-bar

```json
{
  "plugins": ["@foo/bar"],
  "extends": ["plugin:@foo/bar/recommended"],
  "rules": {
    "@foo/bar/a-rule": "error"
  },
  "env": {
    "@foo/bar/a-env": true
  }
}
```

观察上述三种方式，在配置文件中都只是省略了插件名中的 `eslint-plugin-` 或 `/eslint-plugin`：

- `eslint-plugin-xxx` 省略 `eslint-plugin-`后是 `xxx`
- `@xxx/eslint-plugin` 省略 `/eslint-plugin`后是 `@xxx`
- `@xxx/eslint-plugin-xxx` 省略 `eslint-plugin-`后是 `@xxx/xxx`


## 2 插件的作用

插件是一个 npm 包，可以为 ESLint 添加各种扩展。插件可以执行许多功能，包括但不限于添加新规则和导出可共享配置。

[自定义 rule](https://eslint.org/docs/developer-guide/working-with-plugins#rules-in-plugins)

[自定义 environment](https://eslint.org/docs/developer-guide/working-with-plugins#environments-in-plugins)

[自定义 processor](https://eslint.org/docs/developer-guide/working-with-plugins#processors-in-plugins)

如何使用上面的自定义配置，如自定义 rule，有两种方式

方式一：

使用配置 .eslintrc.js

```js
module.exports = {
  // ...
  rules: {
    'myplugin/dollar-sign': 2
  }
}
```

方式二：
插件源码 eslint-plugin-myPlugin/lib/index.js

```js
module.exports = {
  // ...
  configs: {
    recommended: {
      rules: {
        'myplugin/dollar-sign': 2
      }
    }
  }
}
```

使用配置 .eslintrc.js

```js
{
    'extends': ['plugin:myPlugin/myConfig']
}
```

`plugin:myPlugin/myConfig` 由以下几部分组成

- `pluing:`
- 包名（省略前缀，如 `myPlugin`）
- `/`
- 配置名（如 `recommended`）
