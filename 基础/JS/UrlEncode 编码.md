# UrlEncode 编码

默认情况下浏览器只能访问以下 响应头

- Cache-Control
- Content-Language
- Content-Type
- Expires
- Last-Modified
- Pragma

想让浏览器访问到其他响应头，

则需要在服务器上设置 `Access-Control-Expose-Headers`

`Access-Control-Expose-Headers : 'FileNName'`

```
HttpContext.Response.Headers.Append("Access-Control-Expose-Headers", "FileNName");
Response.Headers.Append("FileNName", "666");
```

或者

```
HttpContext.Response.Headers.Add("Access-Control-Expose-Headers", "fileNName2");
Response.Headers.Add("fileNName2", "666");
```

注：

```
//Http报头中不能添加中文字符,否则报错，需要进行编码
//Response.ContentType = "application/octet-stream";
Response.Headers.Append("Charset", "utf-8");
Response.Headers.Append("Access-Control-Expose-Headers", "FileName");
Response.Headers.Append("FileName", WebUtility.UrlEncode(fileName));
```

使用UrlEncode 会出现空格变成加号，

解决：

```
Response.Headers.Append("Access-Control-Expose-Headers", "FileName");
Response.Headers.Append("FileName", Uri.EscapeDataString(fileName));
```

HttpUtility.UrlEncode 会将空格转换为 + 号，而将 + 编码为 %2b。

HttpUtility.UrlPathEncode 会将空格转换为 %20 而保持 + 号不变。

Uri.EscapeDataString 既会编码 + 号也会编码空格。

Uri.EscapeUriString 已经废弃了，作用和 HttpUtility.UrlPathEncode 一样。

推荐使用： Uri.EscapeDataString

## js方面

encodeURIComponent 和 decodeURIComponent 可以编码和解码URI特殊字符（如#，/，￥等），而decodeURI则不能。

axios:

```js
service.interceptors.response.use(
  response => {

  }
)
```
