# 环境 env、全局变量 globals

[官网说明](https://eslint.org/docs/user-guide/configuring/language-options)

环境 env 提供预定义的全局变量。要在配置文件中指定环境，请使用 `env` 键并通过将每个环境设置为 `true` 来指定要启用的环境。

首先看一个例子

.eslintrc

```json
{
  "env": {
    "node": true
  },
  "rules": {
    "no-undef": "error"
  }
}
```

![01](https://image.newarea.site/20230718/01.png)

如下是两种解决办法。

一种方法是 window 是浏览器环境特有的变量，因此在 eslint 配置文件中新增浏览器环境。

.eslintrc

```json
{
  "env": {
    "node": true,
    "browser": true
  },
  "rules": {
    "no-undef": "error"
  }
}
```

另一种方法是在配置文件中手动添加全局变量 window

```json
{
    "env": {
        "node": true
    },
    "globals": {
        "window": "readonly"
    },
    "rules": {
        "no-undef": "error"
    }
}
```
某些 ESLint 规则的检测结果跟全局变量有关，如上面例子中的 `no-undef`

添加一个环境，其实是为项目添加了一组全局变量。配置文件中可以同时配置多个环境。

看环境中有哪些变量呢？ESLint 内部使用了依赖 global，其中定义了每个环境下的全局变量。

![02](https://image.newarea.site/20230718/02.png)

## 另一个例子

.eslintrc

```json
{
  "root": true,
  "env": {
    "browser": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "rules": {
    "no-console": 2
  }
}
```

index.js

```js
const a = 'hello'
console.log(a)
```

执行 `npx eslint index.js`，控制台提示如下信息：

Parsing error: The keyword 'const' is reserved

如果向配置文件中添加 es6 环境，即

```json
{
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  }
  // ...
}
```

或者 ESLint 配置文件这样改也可以

```json
{
  "parserOptions": {
    "ecmaVersion": 2015
  },
  // ...
}
```

就可以正常校验文件。

