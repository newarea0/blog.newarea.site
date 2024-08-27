# viewbox

可以用在如下元素上：`<svg>`、`<symbol>`、`<view>`、`<marker>`、`<pattern>`

拿 `<svg>` 元素来说明，如果 `<svg>` 元素上不设置 `viewbox` 属性，则 `<svg>` 元素 大小是固定的，默认尺寸是 300*150px，也可以显式设置其大小，**其内部的图形元素大小也是固定尺寸的**。

```html
<svg width="300" height="300"></svg>
```

或者

```html
<svg style="width: 300px;height: 300px;"></svg>
```

当使用了 `viewbox` 属性后，**svg 内部的图形元素大小不是固定的**，会根据 svg 尺寸的变化而变化。

`viewbox` 属性值：`offsetX offsetY width height`，其中 offsetX、offsetY 可以是负数、0、正数，width、height 必须大于 0。

## 1 画布的宽高比和 viewbox 的宽高比一样

```html
<style>
  svg {
    position: absolute;
    top: 700px;
    left: 700px;
  }
</style>

<body>
  <svg style="width: 300px;height: 300px;background: red" viewbox="-105 -55 150 150">
    <rect x="10" y="10" width="200" height="100" fill="skyblue"></rect>
  </svg>
</body>
```

### 1.1 绘制模型

`viewbox="-105 -55 300 300"`、`<rect x="10" y="10" width="200" height="100" fill="skyblue"></rect>` 中的数学的单位都是"虚拟单位"。

想象在宽为 150 "虚拟单位"、高为 150 "虚拟单位"的画布上绘制矩形，矩形长 200 "虚拟单位"、宽 100 "虚拟单位"，矩形左上角在画布左上角右下方，且水平方向距离 10 "虚拟单位"，垂直方向距离 10 "虚拟单位"。

从而得到“虚拟单位”模型。

### 1.2 确定实际大小

根据 svg 实际尺寸和 width、height 确定“虚拟单位”和px之间的**比例**，从而得到实际单位（px）模型

svg 的实际大小是 `300*300px`，模型大小是 `width*height虚拟单位`，即 1虚拟单位=2px

### 1.3 确定实际位置

根据 offsetX、offsetY 确定实际单位模型的位置。

offsetX > 0，距 svg 实际位置（即本例中 `position: absolute; top: 700px; left: 700px;` 确定的位置）左上角左侧 offsetX 个实际单位
offsetX < 0，距 svg 实际位置左上角右侧 offsetX 个实际单位（这里是 210px）
offsetX = 0，跟 svg 实际位置左上角水平位置重合。

offsetY > 0，距 svg 实际位置左上角上方 offsetY 个实际单位
offsetY < 0，距 svg 实际位置左上角下方 offsetY 个实际单位（这里是 210px）
offsetY = 0，跟 svg 实际位置左上角垂直位置重合。

根据上面规则确定实际模型的左上角位置，从而确定实际模型的实际位置。

## 2 画布的宽高比和 viewbox 的宽高比不一样