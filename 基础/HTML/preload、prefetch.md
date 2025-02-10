# preload、prefetch

合理地使用 `preload` 和 `prefetch` 能显著提升页面的加载速度，减少用户的等待时间。

- `preload` 是为了提升当前页面的渲染性能，应该用于当前页面渲染所需的关键资源。
- `prefetch` 则是为了提升后续页面加载的性能，应该用于预加载未来需要的资源，以减少跳转时的延迟。

## preload

用于提前加载当前页面渲染所需的关键资源（如样式表、脚本、字体、图片等）。当页面引入了许多资源时，代码是从上到下执行的，当某些资源加载、执行时间较长时，会阻塞后续资源的加载、执行。可以通过 `preload` 在 `<head>` 标签顶部提前加载资源，后续页面使用到该资源时，可以直接使用其**缓存版本**。

### 用法

```html
<!-- 先预加载 CSS 文件 -->
<link rel="preload" href="index.css" as="style">

<!-- 再实际使用 CSS 文件 -->
<link rel="stylesheet" href="index.css">
```

- `href`：资源的 URL。
- `as`：指定资源类型，告诉浏览器如何处理这个资源（如 script、style、font 等）。
- `crossorigin`：处理跨域请求时所需的 CORS 策略。

### 注意点

- `preload` 只是提前加载，并不会立即执行、使用资源。需要使用时，正常使用即可，浏览器会使用预加载的缓存版本。
- 带有`ref="preload"`的 `link` 标签并不会先于不带`ref="preload"`的 `link` 先加载，**加载顺序与标签顺序一致**。
- 最佳实践：将 `<link rel="preload">` 放在 `<head>` 标签的顶部，以确保浏览器能够尽早加载资源。

示例1：

下面示例中，页面并没有应用 `index.css` 文件样式，只是加载了 `index.css` 文件。

::: code-group

```html [index.html]
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="preload" href="index.css" as="style">
</head>
<body>
  <p>hello world</p>
</body>
</html>
```

```css [index.css]
p {
  color: red;
}
```

![](https://image.newarea.site/2025-01-16_09-51-47.png)

:::

示例2：

下面示例中，页面应用了 `index.css` 文件样式。

::: code-group

```html [index.html]
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- 先预加载 CSS 文件 -->
  <link rel="preload" href="index.css" as="style">

  <!-- 再实际使用 CSS 文件 -->
  <link rel="stylesheet" href="index.css"> <!-- [!code ++] -->
</head>
<body>
  <p>hello world</p>
</body>
</html>
```

可以发现网络面板里只有一次 `index.css` 的请求，这是因为当后面的 `<link rel="stylesheet">` 需要同样的资源时，浏览器会使用已经**预加载的缓存版本，而不会重新发起请求**。

```css [index.css]
p {
  color: red;
}
```

![](https://image.newarea.site/2025-01-16_10-05-10.png)

## prefetch

`prefetch` 是一种资源预取机制，允许浏览器在**空闲时间**加载一些未来可能需要的资源。不同于 `preload`，`prefetch` 的目的是为将来页面的访问做好准备，通常用于后续页面或功能的资源预加载。

使用场景一般是，**后续页面的资源预加载**，在用户当前页面上不会立即需要某些资源，但可能会在未来的交互或页面跳转中使用。例如，预加载下一页的 JavaScript 文件、图片或样式表。

### 用法

```html
<link rel="prefetch" href="next-page.js" as="script">
```

- `href`：资源的 URL。
- `as`：指定资源类型，告诉浏览器如何处理这个资源（如 script、style、font 等）。
