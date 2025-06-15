# viewBox
`viewBox` 是 SVG 中一个非常重要的属性，它定义了 SVG 图像的可见区域。理解 `viewBox` 对于掌握 SVG 的缩放和定位至关重要。让我们详细探讨一下 `viewBox` 的含义和用法。

## `viewBox` 的定义

`viewBox` 属性定义了一个坐标系统，指定了 SVG 内容应该如何适应到它的容器中。它的语法如下：

```xml
viewBox="x y width height"
```

- `x`：可视区域的左上角 x 坐标
- `y`：可视区域的左上角 y 坐标
- `width`：可视区域的宽度
- `height`：可视区域的高度

## `viewBox` 的作用

1. **定义坐标系统**：`viewBox` 创建了一个新的坐标系统，SVG 内的所有元素都相对于这个坐标系统定位。

2. **控制缩放**：通过调整 `viewBox` 的尺寸，可以实现 SVG 内容的缩放。

3. **裁剪内容**：`viewBox` 可以用来显示 SVG 的特定部分。

4. **适应容器**：`viewBox` 帮助 SVG 内容适应不同大小的容器。

## 示例

以下是一些使用 `viewBox` 的示例：

### 基本使用

```xml
<svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="red" />
</svg>
```

在这个例子中，SVG 的物理尺寸是 200x200 像素，但 `viewBox` 定义了一个 100x100 的坐标系统。这意味着 SVG 内容会被放大两倍来填充容器。

### 改变视图

```xml
<svg width="200" height="200" viewBox="25 25 50 50" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="blue" />
</svg>
```

这个例子中，`viewBox` 只显示了圆的一部分，因为视图被移动并缩小了。

### 保持宽高比

```xml
<svg width="300" height="150" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="green" />
</svg>
```

这里，`preserveAspectRatio` 属性与 `viewBox` 一起使用，确保内容在保持宽高比的同时居中显示。

## 注意事项

1. `viewBox` 的值是没有单位的，它们代表一个抽象的坐标系统。

2. 如果 `viewBox` 的宽高比与 SVG 容器的宽高比不同，可能会导致内容被拉伸或压缩。使用 `preserveAspectRatio` 可以控制这种情况。

3. `viewBox` 可以用来创建响应式的 SVG 图像，使其能够适应不同大小的屏幕。

## 总结

`viewBox` 是 SVG 中控制视图、缩放和定位的强大工具。通过合理使用 `viewBox`，可以创建灵活、可缩放的 SVG 图像，适应各种显示需求。
