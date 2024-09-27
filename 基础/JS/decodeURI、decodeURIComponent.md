# decodeURI、decodeURIComponent

`encodeURIComponent()` 与 `encodeURI()` 相比，会编码更多的字符。

encodeURI/decodeURI

- `encodeURI()` 通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码
- `decodeURI()` 解码由 `encodeURI` 创建或其它流程得到的统一资源标识符（URI）

`encodeURI` 会替换所有的字符，但不包括以下字符，即使它们具有适当的 UTF-8 转义序列：

| 类型 | 包含 |
| --- | --- |
| 保留字符 | `;` `,` `/` `?` `:` `@` `&` `=` `+` `$` |
| 非转义的字符 | 字母 数字 `-` `_` `.` `!` `~` `*` `'` `(` `)` |
| 数字符号 | `#` |

请注意，`encodeURI` 自身_无法_产生能适用于 HTTP GET 或 POST 请求的 URI，例如对于 XMLHTTPRequests，因为 "&", "+", 和 "=" 不会被编码，然而在 GET 和 POST 请求中它们是特殊字符。然而 [`encodeURIComponent`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) 这个方法会对这些字符编码。

例如，现在需要调用后台 GET 请求 `http://www.xxx.com`，并传入参数 `country`（`中国#cn`），如果使用 `encodeURI`：

```js
const url = `http://www.xxx.com?country=${encodeURI('中国#cn')}`
console.log(url) // http://www.xxx.com?country=%E4%B8%AD%E5%9B%BD#cn
```

后端获取到的 `country` 为 `%E4%B8%AD%E5%9B%BD`，经解码得到的是 `中国`，显然不是要传的 `中国#cn`。使用 `encodeURIComponent` 即可解决该问题：

```js
const url = `http://www.xxx.com?country=${encodeURIComponent('中国#cn')}`
console.log(url) // http://www.xxx.com?country=%E4%B8%AD%E5%9B%BD%23cn
```
