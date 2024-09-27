# 捕获、冒泡

[浅谈JS事件冒泡](https://www.cnblogs.com/moqing/p/5590216.html)

[事件冒泡、事件捕获和事件委托](https://www.cnblogs.com/Chen-XiaoJun/p/6210987.html)

[【js】event(事件对象)详解](https://www.cnblogs.com/websmile/p/8807334.html)

点击页面中的某个按钮，其实也单击了按钮的容器元素，甚至单击了整个页面。如果在这些元素上绑定点击事件回调，回调都将被触发，那么这些回调的触发的顺序是怎样的呢。

![03](https://image.newarea.site/20230831/03.png)

1. 一个完整的JS事件流是从window开始，最后回到window的一个过程。

2. 事件流被分为三个阶段(1-5)捕获过程、(5-6)目标过程、(6-10)冒泡过程。捕获阶段是从外到里，即从外层元素到内部元素。冒泡阶段刚好相反。

事件绑定有如下几种方式：

1. 在html 元素中使用使用事件属性。

2. 直接获取元素绑定：
    ```js
    element.onclick = function(e) {
      //...
    }
    ```
    只会在事件冒泡中运行；一个元素一次只能绑定一个事件处理函数，新绑定的事件处理函数会覆盖旧的事件处理函数；事件对象参数(e)仅非IE浏览器可用。

3. 通过addEventListener，第三个参数默认值是 false。
   
   ```js
   element.addEventListener('click', function(e){
     // ...
   }, false)
   ```

   该方法同时支持事件处理的捕获和冒泡阶段；事件阶段取决于addEventListener最后的参数设置：false (冒泡) 或 true (捕获)；可以为同一个元素绑定你所希望的多个事件回调，同时并不会覆盖先前绑定的事件。addEventListener 没有指定第三个参数 useCapture 时，默认值是 false。

例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body onclick="bodyClick()">
    <div onclick="divClick()">
        <button onclick="btn()">
            <span onclick="span()">点击冒泡</span>
        </button>
    </div>
    <script>
        function bodyClick() {
            console.log('1 body')
        }

        document.getElementsByTagName('div')[0].onclick = function () {
            console.log('2 div')
        }

        function btn() {
            console.log('3 btn')
        }

        function span() {
            console.log('4 span')
        }

        document.querySelector('body').addEventListener('click', function () {
            console.log('body capacher')
        }, true)
    </script>
</body>
</html>
```

点击按钮，控制台依次打印body capacher -> 4 span -> 3 btn -> 2 div -> 1 body

e.target和e.currentTarget的区别：

- e.target 表示触发事件的元素
- e.currentTarget 表示绑定事件回调函数的元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
  <style>
    main {
      background-color: red;
      padding: 20px;
    }
    section {
      background-color: green;
      padding: 20px;
    }
    p {
      background-color: blue;
      padding: 20px;
    }
  </style>
</head>
<body>
  <main>
    <section>
      <p>
        <button type="button">click</button>
      </p>
    </section>
  </main>
</body>
<script>
  const main = document.getElementsByTagName('main')[0]
  const section = document.getElementsByTagName('section')[0]
  const p = document.getElementsByTagName('p')[0]
  const button = document.getElementsByTagName('button')[0]

  main.addEventListener('click', function (e) {
    console.log(4, e.target)
    console.log(4, e.currentTarget)
  })
  section.addEventListener('click', function (e) {
    console.log(3, e.target)
    console.log(3, e.currentTarget)
  })
  p.addEventListener('click', function (e) {
    console.log(2, e.target)
    console.log(2, e.currentTarget)
  })
  button.addEventListener('click', function (e) {
    console.log(1, e.target)
    console.log(1, e.currentTarget)
  })
</script>
</html>
```

![04](https://image.newarea.site/20230801/04.png)

点击按钮button，打印信息如下：

![05](https://image.newarea.site/20230801/05.png)

点击 p 元素（蓝色区域），打印信息如下：

![06](https://image.newarea.site/20230801/06.png)

![07](https://image.newarea.site/20230801/07.png)