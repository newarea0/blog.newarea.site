[The .eslintignore File](https://eslint.org/docs/user-guide/configuring/ignoring-code#the-eslintignore-file)

隐式的忽略规则：
- `node_modules/` 将被忽略
- 点文件（`.eslintrc.*`除外）以及点文件夹和其内容将被忽略

Eslint 中的“主动”忽略校验方式有 3 种：

- 文件中使用注释取消校验
- 使用忽略文件 `.eslintignore`
- 使用命令行参数 `--ignore-pattern`

.eslintignore

```
!.build
.build/*
!.build/test.js
```

等价于

```
eslint --ignore-pattern '!.build' --ignore-pattern '.build/*' --ignore-pattern '!.build/test.js' parent-folder/
```

## 如何通过注释取消校验

[Disabling Rules](https://eslint.org/docs/user-guide/configuring/rules#disabling-rules)

### 1 全文注释

取消对整个文件的校验

```js
/* eslint-disable */

alert('foo');
```

取消对整个文件中指定规则的校验

```js
/* eslint-disable no-alert, no-console */

alert('foo');
```

### 2 块注释

取消对某块代码的校验

```js
/* eslint-disable */

alert('foo');

/* eslint-enable */
```

取消对某块代码中指定规则的校验

```js
/* eslint-disable no-alert, no-console */

alert('foo');

/* eslint-enable no-alert, no-console */
```

### 3 单行注释

取消对某行代码的校验

```js
alert('foo'); // eslint-disable-line

// eslint-disable-next-line
alert('foo');

/* eslint-disable-next-line */
alert('foo');

alert('foo'); /* eslint-disable-line */
```

取消对某行代码中指定规则的校验

```js
alert('foo'); // eslint-disable-line no-alert

// eslint-disable-next-line no-alert
alert('foo');

alert('foo'); /* eslint-disable-line no-alert */

/* eslint-disable-next-line no-alert */
alert('foo');
```
