# match

`match` 方法是正则表达式的一种常用方法，用于检查字符串是否与正则表达式模式相匹配。它通常返回匹配结果或者 `null`，具体取决于是否找到了匹配项。

## 语法

在 JavaScript 中，`match` 方法的基本语法如下：

```javascript
const result = string.match(regexp)
```

- `string`：要匹配的字符串。
- `regexp`：正则表达式对象，可以是字面量表示法或 `RegExp` 对象。

## 返回值

- 如果找到匹配项，`match` 返回一个数组，包含匹配的结果和捕获组（如果有）。
- 如果没有找到匹配项，返回 `null`。

## 示例

1. **简单匹配**

```javascript
const str = 'Hello, world!'
const regex = /Hello/
const result = str.match(regex)

console.log(result) // ["Hello"]
```

2. **使用捕获组**

```javascript
const str = 'My name is John.'
const regex = /My name is (\w+)/
const result = str.match(regex)

console.log(result) // ["My name is John", "John"]
```

3. **未找到匹配项**

```javascript
const str = 'Hello, world!'
const regex = /Goodbye/
const result = str.match(regex)

console.log(result) // null
```

## 注意事项

- `match` 方法只会从字符串的开始位置进行匹配，如果想要全局匹配，可以使用 `exec` 方法或者在正则表达式中添加 `g` 修饰符。
- 使用 `g` 修饰符时，`match` 返回的数组只包含所有匹配项，而不包括捕获组。

## 总结

`match` 方法是处理字符串与正则表达式匹配的重要工具，能够帮助开发者轻松地进行字符串查找和提取。
