# 属性值 currentColor

是一个 CSS 属性值，哪些 CSS 属性的属性值呢？接受颜色值作为其属性值的 CSS 属性，如 `border-color`、`background-color`、`fill`、`stroke`等，有些颜色属性的默认值是 `currentColor`，如 [border-color|MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-color)。

CSS 属性 `color` 的属性值也可以设置为 `currentColor`，此时 `currentColor` 相当于 `inherit`。

当一个 CSS 属性设置为 `currentColor`，那么真实的属性值跟元素 CSS 属性 `color` 的值一致，这恰好是 `currentColor` 的字面含义。

CSS 属性 `color` 具有继承性。如果当前元素没有显式设置 `color`，那么继承父元素的 `color` 值，如果父元素也没有设置，那么继承父元素的父元素的 `color` 值，以此类推，直至文档跟元素 html。

利用 `currentColor` 和 CSS 属性 `color` 具有继承性的特性，可以实现类似多主题的功能。例如通过修改祖先元素 body 的 `color`，可以影响其子孙元素的颜色样式。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
  <style>
    body {
      /* color: red; */
      color: blue;
      background-color: white;
      height: 100vh;
      padding: 2em;
    }
    hr {
      border: 3px solid;
    }
    div {
      padding: 1em;
      width: 200px;
      height: 150px;
      border: 5px solid;
      box-shadow: 5px 5px 5px;
    }
    p {
      background-color: currentColor;
      padding: .5em;
      width: 80%;
      margin: 1em auto;
    }
    li {
      border: 1px solid
    }
    strong {
      outline: 2px solid;
    }
  </style>
</head>
<body>
  <div>
    <p>Text</p>
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
  <br>
  <strong>outline me</strong>
  <hr>
  Resources
</body>
</html>
```

![12](https://image.newarea.site/20230725/12.png)

![13](https://image.newarea.site/20230725/13.png)