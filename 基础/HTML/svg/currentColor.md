# currentColor

`currentColor` 是 CSS 中的一个特殊关键字，用于表示当前元素的 `color` 属性值。它可以在任何接受颜色值的属性中使用，如 `fill`、`stroke`、`border-color` 等。使用 `currentColor` 可以使样式更加一致和易于维护。

### 示例

以下是一些使用 `currentColor` 的示例：

#### HTML 和 CSS 示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>currentColor 示例</title>
  <style>
    .example {
      color: blue; /* 设置文本颜色 */
      border: 2px solid currentColor; /* 边框颜色与文本颜色一致 */
    }
  </style>
</head>
<body>
  <div class="example">
    这是一个示例文本，边框颜色与文本颜色一致。
  </div>
</body>
</html>
```

#### SVG 示例

在 SVG 中使用 `currentColor`：

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- 设置文本颜色 -->
  <style>
    .icon {
      color: red; /* 设置文本颜色 */
    }
  </style>

  <!-- 使用 currentColor 设置填充和边框颜色 -->
  <circle cx="50" cy="50" r="40" class="icon" fill="currentColor" stroke="currentColor" stroke-width="3" />
</svg>
```

### 优点

1. **一致性**：使用 `currentColor` 可以确保元素的颜色属性（如填充色、边框色等）与文本颜色一致，保持样式的一致性。
2. **可维护性**：修改 `color` 属性值时，所有使用 `currentColor` 的属性会自动更新，减少了重复修改的工作量。
3. **简洁性**：使 CSS 代码更加简洁和易读。

### 总结

`currentColor` 是一个非常有用的关键字，可以帮助开发者保持样式的一致性和简洁性。它在任何接受颜色值的属性中都可以使用，并且会自动继承当前元素的 `color` 属性值。
