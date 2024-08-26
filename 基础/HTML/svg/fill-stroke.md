# fill、stroke

区别

有哪些值

currentColor

如何设置

当做元素属性设置

通过样式设置

```html
<svg fill="red" />
```

```html
<style>
.svg {
  fill: red;
}
</style>

<svg class="svg" />
```

`color` 属性可以为 `fill`、`stroke` 提供一个潜在的默认值。

`fill` 可继承。

```html
<style>
  .svg-icon {
    fill: yellow;
  }
</style>
<svg class="svg-icon">
  <!-- 此时图标颜色 fill 继承自父元素 -->
  <use xlink:href="#icon-user"></use>
</svg>
```
