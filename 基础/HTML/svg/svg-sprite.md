# SVG 雪碧图

## 1 几种图标使用方式的对比

### 1.1 原始时代

在没有 image 雪碧图的时代，页面中每处用到图标的地方都意味着一次 http 请求，过多的请求不利于页面的优化。 

### 1.2 image 雪碧图

image 雪碧图就是将多个图片合成一个图片，然后利用 css 的 background-position 定位显示不同的图片。image 雪碧图有些缺点：

- 难以维护，每新增一个图标，都需要改动原始图片，还可能不小心出错影响到前面定位好的图片。
- 不能修改很好修改图标的颜色和大小。

### 1.3 SVG 雪碧图

SVG 雪碧图具有如下优点：

- 减少了http请求。
- 通过webpack 的 require.context可以批量、自动导入 SVG 文件，易于维护。
- 很好修改图标颜色（支持多色）、大小

## 2 通过 Vue 组件使用 SVG 雪碧图

[手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)

[https://segmentfault.com/a/1190000015367490](https://segmentfault.com/a/1190000015367490)

# svg 雪碧图

## 背景

SVG 可以直接嵌入 HTML 中展示。如果在页面每个用到图标的地方都写一个 SVG 元素，可能导致 HTML 文件很大。当页面中多处使用了相同图标，会使相同 SVG 元素多处出现，造成代码冗余。

## symbol 和 use

SVG 雪碧图主要利用了 `symbol` 和 `use` 元素

[symbol](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/symbol) 元素用来定义一个图形模板对象，它可以用一个 `use` 元素实例化。注意，一个 `symbol` 元素本身是不呈现的。只有 `symbol` 元素的实例（亦即，一个引用了 `symbol` 的 `use` 元素）才能呈现。

[use](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/use) 元素在 SVG 文档内取得目标节点，并在别的地方复制它们。具有一下特点：

- 可重复调用
- 跨 SVG 调用

如：

```html
<svg>
  <symbol id="sym01" viewBox="0 0 150 110">
    <circle cx="50" cy="50" r="40" stroke-width="8" stroke="red" fill="red"/>
    <circle cx="90" cy="60" r="40" stroke-width="8" stroke="green" fill="white"/>
  </symbol>

  <use xlink:href="#sym01" x="0" y="0" width="100" height="50"/>
  <use xlink:href="#sym01" x="0" y="50" width="75" height="38"/>
  <use xlink:href="#sym01" x="0" y="100" width="50" height="25"/>
</svg>

<svg>
  <use xlink:href=sym01""></use>
</svg>
```

在页面某处载入充满 `symbol` 的 SVG:

```html
<svg>
  <symbol id="sym01">
    <!-- ... -->
  </symbol>
  <symbol id="sym02">
    <!-- ... -->
  </symbol>
  <!-- ... -->
</svg>
```

在页面的任何角落，只要想使用图标，只要简单一点代码就可以了：

`<svg><use xlink:href="#sym01" /></svg>`

故意在 `symbol` 元素上设置一个测试属性 `a="111"`，结果发现在 `use` 内也出现了。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
</head>
<body>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="display:none;">
    <symbol id="arrow-down" viewBox="0 0 1024 1024" a="111">
      <path d="M726.653 429.306H297.347l214.846 208.85z"/>
    </symbol>
  </svg>

  <svg>
    <use xlink:href="#arrow-down"></use>
  </svg>
</body>
</html>
```

![01](https://image.newarea.site/20230729/08.png)

## SVG图标如何变成symbol并整合在一起

- 通过在线工具[SVG在线压缩合并工具](https://www.zhangxinxu.com/sp/svgo/)
- 通过一些构建工具，如使用 Vite 插件 [vite-plugin-svg-icons](https://kgithub.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md)

## 除去不必要属性、压缩

从阿里图标库 [iconfont.cn](https://www.iconfont.cn/) 通常含有一些无用的信息，去掉这些无用信息和多余的空格、换行可以大幅降低 SVG 大小。下面方法可以压缩 SVG：

- 通过在线工具[SVG在线压缩合并工具](https://www.zhangxinxu.com/sp/svgo/)
- 通过一些构建工具，如使用 Vite 插件 [vite-plugin-svg-icons](https://kgithub.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md) 的配置项 `svgoOptions`

## 修改图标颜色

`use` 图标时如何修改图标颜色？

方式一：

- 对 `symbol` 要求：symbol或其内部path上不要设置属性 fill、stroke，否则图标颜色不可变
- 对 `use` 要求：使用图标处 SVG 上设置 color 或 style，`svg`或`use` 上设置 `fill="currentColor"`、`stroke="currentColor"`

```html
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="display:none;">
  <symbol id="arrow-down" viewBox="0 0 1024 1024">
    <path d="M726.653 429.306H297.347l214.846 208.85z"/>
  </symbol>
</svg>

<!-- 可以 -->
<svg color="red">
  <use xlink:href="#arrow-down" fill="currentColor"></use>
</svg>

<!-- 可以 -->
<svg color="red" fill="currentColor">
  <use xlink:href="#arrow-down"></use>
</svg>

<!-- 不可以 -->
<svg color="red">
  <use xlink:href="#arrow-down"></use>
</svg>

<!-- 可以，推荐这种方式-->
<svg  style="color: red">
  <use xlink:href="#arrow-down" fill="currentColor"></use>
</svg>

<!-- 可以 -->
<svg style="color: red" fill="currentColor">
  <use xlink:href="#arrow-down" fill="currentColor"></use>
</svg>

<!-- 不可以 -->
<svg style="color: red">
  <use xlink:href="#arrow-down"></use>
</svg>
```

![02](https://image.newarea.site/20230729/09.png)

方式二：

通过 CSS 样式来实现，像这样：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
  <style>
    .svg {
      color: red;
      fill: currentColor;
    }
  </style>
</head>
<body>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="display:none;">
    <symbol id="arrow-down" viewBox="0 0 1024 1024">
      <path d="M726.653 429.306H297.347l214.846 208.85z"/>
    </symbol>
  </svg>

  <svg class="svg">
    <use xlink:href="#arrow-down"></use>
  </svg>
</body>
</html>
```

方式三：

继承父元素的颜色。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
</head>
<body>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="display:none;">
    <symbol id="arrow-down" viewBox="0 0 1024 1024">
      <path d="M726.653 429.306H297.347l214.846 208.85z"/>
    </symbol>
  </svg>

  <i style="color: red">
    <svg fill="currentColor">
      <use xlink:href="#arrow-down"></use>
    </svg>
  </i>
</body>
</html>
```

## 修改图标尺寸

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
  <style>
    .svg {
      width: 50px;
      height: 50px;
    }
  </style>
</head>
<body>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="display:none;">
    <symbol id="arrow-down" viewBox="0 0 1024 1024">
      <path d="M726.653 429.306H297.347l214.846 208.85z"/>
    </symbol>
  </svg>

  <!--方式一-->
  <svg style="width: 50px;height: 50px;">
    <use xlink:href="#arrow-down"></use>
  </svg>

  <!--方式二-->
  <svg class="svg">
    <use xlink:href="#arrow-down"></use>
  </svg>

  <!--方式三-->
  <svg width="50px" height="50px">
    <use xlink:href="#arrow-down"></use>
  </svg>
</body>
</html>
```

## 修改线宽、断点类型、拐角类型

<svg>
<path d="M10 10 h 80" fill="red" height="6" stroke="black" stroke-width="10" stroke-linecap="square"/>
</svg>
