# 自定义属性

CSS 自定义属性（Custom Properties），也叫 **CSS 变量（CSS Variables）**，是指我们可以在 CSS 中定义和使用变量，提升样式的可维护性、复用性和动态性。

## 基本语法

### 定义变量

```css
:root {
  --main-color: #3498db;
  --font-size: 16px;
}
```

* 使用 `--变量名` 的形式命名。
* 通常写在 `:root` 选择器下，代表全局变量。

### 使用变量

```css
body {
  color: var(--main-color);
  font-size: var(--font-size);
}
```

## 特点

| 特点       | 说明                                                                              |
|----------|---------------------------------------------------------------------------------|
| **作用域** | 变量的作用域由它定义的位置决定。可以是全局的（`:root`），也可以是局部的（某个选择器下） |
| **动态性** | 可通过 JavaScript 动态修改变量值，自动影响所有引用的地方                           |
| **继承性** | CSS 变量会像常规属性一样被继承                                                    |

## 示例

主题切换

```css
/* 默认主题 */
:root {
  --bg-color: white;
  --text-color: black;
}

/* 黑暗主题 */
body.dark {
  --bg-color: #121212;
  --text-color: #f5f5f5;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
```

## 在 JS 中修改变量

```js
document.documentElement.style.setProperty('--main-color', '#e74c3c')
```

## 设置默认值

```css
color: var(--unknown-color, red); /* 如果 --unknown-color 未定义，则使用 red */
```
