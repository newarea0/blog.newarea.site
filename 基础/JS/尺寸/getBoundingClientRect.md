# getBoundingClientRect

返回元素的大小及其相对视口的位置。

如果是标准盒子模型，元素的大小等于width/height + padding + border-width的总和。如果box-sizing: border-box，元素的的大小等于 width/height。

![04](https://image.newarea.site/20230731/04.png)

```html
<style>
  div {
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
<body>
  <div>hello</div>
  <button type="button" onclick="handleClick()">click</button>
  <script>
    function handleClick () {
      const el = document.getElementsByTagName('div')[0]
      console.log(el.getBoundingClientRect())
    }
  </script>
</body>
```

点击按钮，浏览器控制台打印如下

![05](https://image.newarea.site/20230731/05.png)