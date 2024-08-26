# offsetTop、offsetLeft、offsetHeight、offsetWidth、offsetParent

offsetLeft 与 offsetTop 类似，offsetWidth 与 offsetHeight，下面只讲解 offsetTop、offsetHeight、offsetParent

## 1 offsetTop 含义

只读属性，返回元素的 **顶部边框（边框与外边距交界处）** 相对于其 offsetParent 元素的 **顶部内边距（内边距与边框交界处）** 的距离。

```html
<!DOCTYPE html>
<html lang="en">
<style>
  .outer {
    position: relative;
    width: 100px;
    height: 100px;
    padding: 50px;
    border: 10px solid red;
    margin: 5px;
  }
  .inner {
    border: 5px solid blue;
    padding: 10px;
    margin: 10px;
    background-color: green;
  }
</style>
<body>
  <button type="button" onclick="handleClick()">click</button>
  <div class="outer">
    <div class="inner">hello</div>
  </div>
  <script>
    function handleClick() {
      const inner = document.getElementsByClassName('inner')[0]
      console.log(inner.offsetTop, inner.offsetParent) // 打印 60px、outer 元素
    }
  </script>
</body>
</html>
```
![06](https://image.newarea.site/20230731/06.png)

## 2 如何确定 offsetParent 元素

offsetParent，只读属性，返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素（position：absolute、relative、fixed）或者最近的 table,td,th,body元素

- 如果元素为隐藏的（该元素或其祖先元素的 style.display 为 "none"），或者该元素的 style.position 被设为 "fixed"，则该属性返回 null
- 否则
  - 父元素也不存在定位，offsetParent 为 body 元素
  - 父元素存在定位，offsetParent 为离自身最近且经过定位的父元素

## 3 offsetHeight

一个只读属性，包含元素内容、内边距、边框、水平滚动条（如果存在的话）。有时候它也可以称为一个元素的物理或图形尺寸，或者 border-box（译者注：即 CSS3 中的 border-box 模型）的高度。

如果元素被隐藏（例如 元素或者元素的祖先之一的元素的 style.display 被设置为 none），则返回 0
