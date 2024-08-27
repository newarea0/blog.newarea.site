# 拖放

拖放动作过程

![01](https://image.newarea.site/20230729/01.png)

## 1 被拖动元素

在 HTML 中，除了图像、链接和选择的文本默认的可拖拽行为之外，其他元素在默认情况下是不可拖拽的。

要使其他的 HTML 元素可拖拽，必须：

- 将想要拖拽的元素的 `draggable` 属性设置成 `draggable="true"`。
- 监听 `dragstart` 事件，并设置拖拽数据  `event.dataTransfer.setData('key', 'value')`


## 2 目标元素

- 监听 `dragenter` 和 `dragover` (常用) 事件，阻止默认的处理，使得该元素能够接收 `drop` 事件，如：`<div ondragover="event.preventDefault()">`
- 监听 `drop` 事件，获取拖拽数据 
  ```js
  event.preventDefault()
  event.dataTransfer.getData('key', 'value')
  ```


## 3 事件

<table>
  <tr>
    <td>元素</td>
    <td>事件</td>
    <td>On 型事件处理程序</td>
    <td>触发时刻</td>
  </tr>
  <tr>
    <td rowspan="3">被拖动元素</td>
    <td>dragstart</td>
    <td>ondragstart</td>
    <td>按下鼠标，开始移动时触发</td>
  </tr>
  <tr>
    <td>drag</td>
    <td>ondrag</td>
    <td>当被拖动元素离开原位置，鼠标按住不放（不管鼠标是否移动）时触发，所以该事件会触发很多次</td>
  </tr>
  <tr>
    <td>dragend</td>
    <td>ondragend</td>
    <td>松开鼠标时（不管鼠标是否落在目标元素上）触发 (比如松开鼠标按键或敲“Esc”键)</td>
  </tr>
  <tr>
    <td rowspan="4">目标元素</td>
    <td>dragenter</td>
    <td>ondragstart</td>
    <td>按住、移动鼠标，当进入目标元素时触发</td>
  </tr>
  <tr>
    <td>dragover</td>
    <td>ondragover</td>
    <td>鼠标在目标元素上方时触发（每 100 毫秒触发一次）</td>
  </tr>
  <tr>
    <td>dragleave</td>
    <td>ondragleave</td>
    <td>按住、移动鼠标当离开目标元素时触发</td>
  </tr>
  <tr>
    <td>drop</td>
    <td>ondrop</td>
    <td>鼠标在目标元素上松开时触发</td>
  </tr>
</table>

其中常用 dragstart、dragover、drop。

一个关于事件执行顺序的例子：

```html
<style>
  .d1 {
    width: 40px;
    height: 40px;
    background: url(".https://image.newarea.site/error.png") no-repeat;
  }
  .d2 {
    width:350px;
    height:70px;
    padding:10px;
    border:1px solid #aaaaaa;
  }
</style>

<body>
  <div class="d1" draggable="true"></div>
  <br>
  <div class="d2"></div>

  <script>
    const d1 = document.querySelector('.d1')
    const d2 = document.querySelector('.d2')

    d1.ondragstart = function (ev) {
      console.log('dragstart')
      ev.dataTransfer.setData('url1','.https://image.newarea.site/error.png');
    }
    d1.ondrag = function () {
      console.log('drag')
    }
    d1.ondragend = function () {
      console.log('dragend')
    }

    d2.ondragenter = function () {
      console.log('dragenter')
    }
    d2.ondragover = function (ev) {
      ev.preventDefault()
    }
    d2.ondragleave = function () {
      console.log('dragleave')
    }
    d2.ondrop = function (ev) {
      ev.preventDefault()
      console.log('drop')
      const img = new Image()
      img.src = ev.dataTransfer.getData('url1')
      ev.target.appendChild(img)
    }
  </script>
</body> 
```

![02](https://image.newarea.site/20230729/02.png)

![03](https://image.newarea.site/20230729/03.png)

## 4 dropEffect、effectAllowed

### dropEffect

[拖拽献祭中的黑山羊-DataTransfer对象](https://www.zhangxinxu.com/wordpress/2018/09/drag-drop-datatransfer-js/)

`dropEffect` 属性顾名思意拖拽效果，在 PC web 端主要表现在鼠标手形上。不同的 `dropEffect` 值，鼠标的手形效果是不一样的。值可以是 `move`，`copy`，`link` 和 `none`。

`dropEffect` 属性的设置主要用在 `dragenter` 和 `dragover` 事件中，同时受 `effectAllowed` 属性影响。

例如，我们在 `dragstart` 的时候设置 `effectAllowed` 属性值为 `none`，则 `dropEffect` 只能表现为 `none`，而不会出现其他手形，即使设置了其他手形对应的属性值。

### effectAllowed

`effectAllowed` 和 `dropEffect` 通常应用的事件方法名不一样，`effectAllowed` 多用在 `dragstart` 事件中，而 `dropEffect` 属性的设置主要用在 `dragenter` 和 `dragover` 事件中。

`effectAllowed` 和 `dropEffect` 的彼此间是有制约关系，当我们给 `effectAllowed` 设置了对应的属性值，则 `dropEffect` 只能设置为 `effectAllowed` 允许的值，否则是无效的。

举个例子，如果我们设置 `effectAllowed` 值为 `copyMove`，则 `dropEffect` 只有 `copy` 和 `move` 这两个属性值才有效。

`effectAllowed` 看上去很屌，但实际应用的时候相当鸡肋。我们通常的拖拽应用是用不到这个的。只要下面这个场景，那就是当我们有很多个元素需要拖拽，但是需要像垃圾一样分门别类的时候，`effectAllowed` 就有用了。

## 5 数据类型

[Recommended Drag Types](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types)

常用 'text/plain'

### 5.1 拖动图像

```html
<img src=".https://image.newarea.site/error.png" class="d1">
<br>
<input>

<script>
  const input = document.querySelector('input')

  input.ondrop = function (ev) {
    const items = ev.dataTransfer.items
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      console.log(item, ev.dataTransfer.getData(item.type))
    }
  }
</script>
```

![04](https://image.newarea.site/20230729/04.png)

### 5.2 拖动链接

```html
<a href="https://www.baidu.com" >百度</a>
<br>
<input>

<script>
  const input = document.querySelector('input')

  input.ondrop = function (ev) {
    const items = ev.dataTransfer.items
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      console.log(item, ev.dataTransfer.getData(item.type))
    }
  }
</script>
```

![05](https://image.newarea.site/20230729/05.png)

### 5.3 拖动选择的文本

```html
<p>拖放功能真强大</p>
<input>

<script>
  const input = document.querySelector('input')

  input.ondrop = function (ev) {
    const items = ev.dataTransfer.items
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      console.log(item, ev.dataTransfer.getData(item.type))
    }
  }
</script>
```

![06](https://image.newarea.site/20230729/06.png)

### 5.4 拖动元素

```html
<div draggable="true">拖放功能真强大</div>
<input>

<script>
  const div = document.querySelector('div')
  const input = document.querySelector('input')

  div.ondragstart = function (ev) {
    // 自定义
    // ev.dataTransfer.setData('name', 'Jack')
    ev.dataTransfer.setData('text/plain', 'Jack')
  }
  input.ondragover = function (ev) {
    ev.preventDefault()
  }
  input.ondrop = function (ev) {
    const items = ev.dataTransfer.items
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      console.log(item, ev.dataTransfer.getData(item.type))
    }
  }
</script>
```

![07](https://image.newarea.site/20230729/07.png)

