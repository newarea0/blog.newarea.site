# flex 属性值简写

`flex` 属性是 `flex-grow`、`flex-shrink` 和 `flex-basis` 的简写，flex 属性值可以由一部分组成，也可以由两部分组成，或者是三部分组成，其中

- `flex-grow`、`flex-shrink` 是非负整数，`0`、`2`
- `flex-basis` 带单位的长度值、百分数、`auto`，如 `100px`、`0%`、`auto`

`flex` 属性值最多有两个非负整数、最多有一个带单位的长度值或百分数，否则就是无效的 `flex` 属性值，即使设置了也不起作用。

`flex` 属性值中如果出现带单位的长度值或者百分数，则一定是 `flex-basis` 的值；如果有一个非负整数值，则是 `flex-grow` 的值；如果有两个非负整数值，则是依次是 `flex-grow`、`flex-shrink` 的值。

`flex-basis` 的值（带单位的长度值或者百分数）不一定只能出现再最后，出现在任意顺序都可以。

`flex-basis` 值为 auto， 如果元素设置了width（即 width 不为 auto），那么元素不伸缩时的初始大小就是 width；如果元素没有设置 width，那么元素不伸缩时的初始大小就是内容（content）的大小。

## 1 flex 取值情况说明

### 1.1 `flex: none;`

```css
.item {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
}
```

### 1.2 `flex: auto;`

```css
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}
```

### 1.3 当 `flex` 取值为一个非负整数，则该数值为 `flex-grow` 值，另外，`flex-shrink: 1; flex-basis: 0%;`

```css
/* 表示元素会尽可能地扩展（grow），也允许收缩（shrink），并从 0 的基础大小开始分配空间。 */
.item { flex: 1; }

/* 等价 */
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}
```

```css
.item { flex: 0; }

/* 等价 */
.item {
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 0%;
}
```

### 1.4 当 `flex` 取值为一个长度值或百分比，则该值为 `flex-basis` 值，另外，`flex-grow: 1; flex-shrink: 1;`

```css
.item {flex: 0%;}
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}
```

```css
.item {flex: 24px;}
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 24px;
}
```

### 1.5 当 `flex` 取值为两个非负数字，则分别视为 `flex-grow` 和 `flex-shrink` 的值，另外，`flex-basis: 0%;`

```css
.item {flex: 2 3;}
.item {
  flex-grow: 2;
  flex-shrink: 3;
  flex-basis: 0%;
}
```

## 2 `flex: 1` 和 `flex: auto` 的区别

```css
.box {
  border: 1px solid red;
  width: 400px;
  height: 100px;
  display: flex;
}
.item0 {
  background-color: red;
}
.item1 {
  background-color: green;
}
.flex-1 {
  flex: 1
}
.flex-auto {
  flex: auto;
}
```

```html
<div class="box">
  <div class="item0 flex-1">hello</div>
  <div class="item1 flex-1">hello world</div>
</div>
```

![01](https://image.newarea.site/20230728/01.png)

↑ `flex: 1;`，则 `flex-basis: 0%;`，表示初始宽度为 0，且 `flex-grow` 为 1，所以两个项目将均分容器宽度。

```html
<div class="box">
  <div class="item0 flex-auto">hello</div>
  <div class="item1 flex-auto">hello world</div>
</div>
```

![02](https://image.newarea.site/20230728/02.png)

↑ `flex: auto;`，则 `flex-basis: auto;`，表示初始宽度为项目内容宽度，虽然`flex-grow` 为 1，两个项目放大宽度一样，但初始宽度不一样，所以最终宽度也不一样。

## 3 例子

举一个不同的值之间的区别：

```html
<style>
    .parent {
        display: flex;
        width: 600px;
    }
    .parent > div {
        height: 100px;
    }
    .item-1 {
        width: 140px;
        flex: 2 1 0%;
        background: blue;
    }
    .item-2 {
        width: 100px;
        flex: 2 1 auto;
        background: darkblue;
    }
    .item-3 {
        flex: 1 1 200px;
        background: lightblue;
    }
</style>

<div class="parent">
    <div class="item-1"></div>
    <div class="item-2"></div>
    <div class="item-3"></div>
</div>
```

主轴上父容器总尺寸为 600px，子元素的总基准值是：0% + auto + 200px = 300px，其中

- 0% 即 0 宽度
- auto 对应取主尺寸即 100px

主轴上有剩余空间，剩余空间为600px - 300px = 300px

各子元素放大系数为：2、2、1

剩余空间分配如下：

- item-1 和 item-2 各分配 2/5，各得 120px
- item-3 分配 1/5，得 60px

各项目最终宽度为：

- item-1 = 0% + 120px = 120px
- item-2 = auto + 120px = 220px
- item-3 = 200px + 60px = 260px

![01](https://image.newarea.site/20230725/01.png)

当 item-1 基准值取 `0%` 的时候，是把该项目视为零尺寸的，故即便声明其尺寸为 `140px`，也并没有什么用，形同虚设

而 item-2 基准值取 `auto` 的时候，根据规则基准值使用值是主尺寸值即 `100px`，故这 100px 不会纳入剩余空间

## 4 flex:1 搭配 min-width:0

在某些浏览器中，特别是 Chrome 和 Firefox，flex 子项的默认 min-width 是 auto，也就是说它不会收缩到小于其内容的宽度。这就会导致当 flex: 1 想要让元素收缩时，内容撑住了它，导致溢出或布局异常。

在一个 flex 布局中，对于一个设置了 `flex:1` 的div容器，再对其设置 `min-width: 0`，可以保证内容不超出该div。这样设置后，元素可以真正按照 flex 容器的期望去收缩。

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }
    .box {
        display: flex;
        height: 100px;
        width: 300px;
        margin-bottom: 20px;
        background-color: #ccc;
    }
    .item1 {
        flex: 1;
    }
    p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>

<body>
    <div class="box">
        <div class="item1">
            <p>在一个flex布局中，对于一个设置了flex属性设置为1的div容器，再对其设置min-width：0，对这个div有啥影响？或者这种做法是为了解决什么问题？谢谢大佬指点</p>
        </div>
    </div>
</body>
```

![02](https://image.newarea.site/20230725/02.png)

当 div.item 样式：

```css
.item1 {
    flex: 1;
    min-width: 0;
}
```

页面效果：

![03](https://image.newarea.site/20230725/03.png)

## 参考

- [【CSS】由 flex: 1; 引发的思考](https://blog.csdn.net/u013451157/article/details/79011679)
