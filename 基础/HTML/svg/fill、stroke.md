# fill、stroke

`fill` 和 `stroke` 是 SVG 中用于设置图形元素颜色的两个属性，它们的作用和区别如下：

### `fill` 属性

`fill` 属性用于设置图形元素的填充颜色。它适用于大多数闭合图形元素，如 `<rect>`、`<circle>`、`<ellipse>`、`<polygon>` 和 `<path>` 等。

#### 示例

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- 设置矩形的填充颜色为红色 -->
  <rect x="10" y="10" width="100" height="100" fill="red" />
</svg>
```

### `stroke` 属性

`stroke` 属性用于设置图形元素的边框颜色。它适用于所有图形元素，包括闭合和非闭合图形，如 `<line>`、`<polyline>`、`<path>` 等。

#### 示例

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- 设置矩形的边框颜色为蓝色，边框宽度为3 -->
  <rect x="10" y="10" width="100" height="100" stroke="blue" stroke-width="3" />
</svg>
```

### 综合示例

同时使用 `fill` 和 `stroke` 属性，可以为图形元素设置填充颜色和边框颜色：

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- 设置圆形的填充颜色为绿色，边框颜色为黑色，边框宽度为2 -->
  <circle cx="50" cy="50" r="40" fill="green" stroke="black" stroke-width="2" />
</svg>
```

### 总结

- **`fill`**：设置图形元素的填充颜色，适用于闭合图形。
- **`stroke`**：设置图形元素的边框颜色，适用于所有图形。
