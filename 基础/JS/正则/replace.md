# replace

`replace` 方法是 JavaScript 字符串对象上的一个方法，常用于替换字符串中的某些部分。结合正则表达式（RegExp）使用时，它可以进行复杂的匹配和替换操作。

语法：

```javascript
str.replace(regexp|substr, newSubstr|function)
```

- **regexp**：可以是正则表达式（RegExp）对象或字符串。字符串将直接匹配，而正则表达式可以进行复杂的模式匹配。
- **newSubstr**：要替换成的字符串，可以使用一些特殊的符号（如 `$1`, `$2` 等）来引用匹配组。
- **function**：可以用一个函数来动态生成替换的内容，函数参数包括匹配到的子串和匹配组。

## 基本用法

1. **直接替换字符串**：
   ```javascript
   const str = 'Hello world'
   const result = str.replace('world', 'JavaScript')
   console.log(result) // "Hello JavaScript"
   ```

2. **使用正则表达式替换**：
   ```javascript
   const str = 'abc123abc456'
   const result = str.replace(/\d+/g, '数字')
   console.log(result) // "abc数字abc数字"
   ```

   - `/\d+/g` 是一个正则表达式，表示匹配一个或多个数字。
   - `g` 修饰符表示全局匹配，即替换所有匹配的子串。

## 使用捕获组进行替换

通过使用捕获组（用圆括号括起来的部分）可以在 `replace` 的替换字符串中使用 `$1`, `$2` 来引用。

```javascript
const str = 'I have 2 apples and 3 oranges'
const result = str.replace(/(\d+) (apples|oranges)/g, '$1 个 $2')
console.log(result) // "I have 2 个 apples and 3 个 oranges"
```

这里，`$1` 引用第一个捕获组，即数字，`$2` 引用第二个捕获组，即水果类型。

## 使用函数动态替换

当需要更灵活的替换时，可以传递一个回调函数给 `replace`。该函数会被每次匹配调用，并传递匹配结果。

```javascript
const str = 'The price is 15 dollars'
const result = str.replace(/(\d+)/, (match, p1) => {
  return `$${p1 * 1.2}` // 价格增加 20%
})
console.log(result) // "The price is $18 dollars"
```

## 总结

- `replace` 方法结合正则表达式可以非常强大，用于处理复杂的字符串替换场景。
- 可以使用捕获组 `$1, $2` 等来引用匹配到的子字符串。
- 动态生成替换内容时，可以传递一个回调函数。

你可以根据需要利用正则表达式匹配复杂的模式，实现灵活的文本替换。
