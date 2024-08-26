# 配置对象

配置文件最终导出的是一个包含一个或多个[配置对象](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects)的数组，每个配置对象都包含 ESLint 在一组文件上执行所需的全部信息。配置对象由下列属性组成：

## 1 name

配置对象的名称。这在错误消息和配置检查器中使用，以帮助识别正在使用哪个配置对象。 （命名约定）

## 2 files

一组 glob 模式，指示配置对象应应用到的文件。如果未指定，则配置对象适用于与任何其他配置对象匹配的所有文件。

默认情况下，ESLint 匹配 `**/*.js`、`**/*.cjs`、`**/*.mjs`

## 3 ignores

一组 glob 模式，指示配置对象不应应用于的文件。如果未指定，则配置对象适用于所有与 `files`.

## 4 languageOptions

包含与如何配置 JavaScript 进行 linting 相关的设置的对象。

### 4.1 ecmaVersion

支持的 ECMAScript 版本。可以是任何年份（即 `2022`）或版本（即 `5`）。设置 `latest` 为最新支持的版本。 （默认：`latest`）

### 4.2 sourceType

JavaScript 源代码的类型。可能的值 `script` 适用于传统脚本文件、`module` ECMAScript 模块 (ESM) 和 `commonjs` CommonJS 文件。 （默认值：`module` 用于`.js` 和 `.mjs` 文件；`commonjs` 用于 `.cjs` 文件）

### 4.3 globals

指定在 linting 期间应添加到全局范围的其他对象的对象。如：

```js
// eslint.config.mjs
import globals from 'globals'

export default [
  { languageOptions: { globals: globals.browser } },
]
```

globals.browser 内容：

```js
{
  AbortController: false,
  AbortSignal: false,
  AbsoluteOrientationSensor: false,
  AbstractRange: false,
  Accelerometer: false,
  addEventListener: false,
  alert: false,
  //...
}
```

### 4.4 parser

包含 `parse()` 或 `parseForESLint()` 方法的对象。（默认：`espree`）

### 4.5 parserOptions

指定直接传递给解析器上的 `parse()` 或 `parseForESLint()` 方法的附加选项的对象。可用选项取决于解析器。

## 5 linterOptions

包含与 linting 过程相关的设置的对象。

### 5.1 noInlineConfig

指示是否允许内联配置的布尔值。

### 5.2 reportUnusedDisableDirectives

严重性字符串，指示是否以及如何应跟踪和报告未使用的禁用和启用指令。对于旧版兼容性，true相当于"warn"和false相当于"off". （默认：“warn”）。

## 6 processor

包含 `postprocess()` 和 `postprocess()` 方法的对象或指示插件内部处理器名称的字符串（即 `pluginName/processorName`）。

## 7 plugins

包含插件名称到插件对象的名称-值映射的对象。当 `files` 指定时，这些插件仅适用于匹配的文件。

## 8 rules

包含配置规则的对象。当指定 `files` 或 `ignores` 时，这些规则配置仅适用于匹配的文件。

## 9 settings

包含应可用于所有规则的名称-值对信息的对象。
