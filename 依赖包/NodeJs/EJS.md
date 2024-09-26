EJS

[EJS 是什么 ，怎么用，以及优点](https://www.cnblogs.com/leolovexx/p/5594371.html)

用法：

```js
let template = ejs.compile(str, options);
template(data);
// => 输出渲染后的 HTML 字符串

ejs.render(str, data, options);
// => 输出渲染后的 HTML 字符串

ejs.renderFile(filename, data, options, function(err, str){
    // str => 输出渲染后的 HTML 字符串
});
```

```
|-- ejs-test
    |-- index.js
    |-- views
        |-- index.ejs
```

## 1 常用标签说明

### 1.1 `<%#`

注释标签，不执行、不输出内容

index.ejs

```ejs
<body>
      <%# 这是段注释 %>
</body>
```

### 1.2 `<%`

'脚本' 标签，用于流程控制，无输出

```js
import ejs from 'ejs'

ejs.renderFile('./views/index.ejs', {
  flag: true
}, (err, data) => {
  if (err) console.log(err)
  console.log(data)
})
```

index.ejs

```ejs
<body>
    <% if (flag) { %>
        hello
    <% } %>
</body>
```

![04](https://image.newarea.site/20230719/04.png)

### 1.3 `<%%`、`%%>`

`<%%` 输出字符串 '<%'，`%%>` 输出字符串 '%>'。若想输出 `<%`，如果直接在模板中写 `<%`，执行 `node index.js` 会报错，原因是解析模板时，ejs 把 `<%` 当中一个开始标签，但是没有找到对应的结束标签，所以报错

错误的方式：

index.ejs

```ejs
<body>
    <%
</body>
```


正确的方式：

index.ejs

```ejs
<body>
    <%%
</body>
```

### 1.4 `<%=`、`<%-`

有些字符（如 `<`、`>`）在模板中有特殊的含义，如果 data 中的属性值包含这些特殊字符，`<%=`、`<%-`对它们的处理是不一样的

- `<%=` 会对特殊字符进行转义，如在解析后的结果中 `<` 变成了 `&gt;` 
- `<%-` 输出非转义的数据到模板，如在解析后的结果中 `<` 还是 `<`

index.js

```js
import ejs from 'ejs'

ejs.renderFile('./views/index.ejs', {
  message: '<'
}, (err, data) => {
  if (err) console.log(err)
  console.log(data)
})
```

index.ejs

```ejs
<body>
    <%= message %>
    <%- message %>
</body>
```

![01](https://image.newarea.site/20230719/01.png)

### 1.5 `-%>`、`_%>`

模板一般写在后缀为 `ejs` 的文件中，默认情况下模板中的空格、换行会被原样输出

- `-%>` 将结束标签后面的空格符删除
- `_%>` 删除紧随其后的换行符

index.js

```js
import ejs from 'ejs'

ejs.renderFile('./views/index.ejs', {
  message: 'hello'
}, (err, data) => {
  if (err) console.log(err)
  console.log(data)
})
```

index.ejs

```ejs
<body>
    <%= message %>   <%= message %>
    <%= message -%>   <%= message %>
</body>
```

![02](https://image.newarea.site/20230719/02.png)

index.ejs

```ejs
<body>
    <%= message %>
    <%= message %>
    <%= message _%>
    <%= message %>
</body>
```

![03](https://image.newarea.site/20230719/03.png)

备注：打印结果中最后一个 `hello` 前存在空格的原因是模板中最后的 `<%= message %>`前不仅有换行，还有空格，`-%>`只是去掉了换行，空格会被保留
