# width、flex-basis、min-widht、max-width的区别

[Flex Basis与Width的区别](https://www.jianshu.com/p/17b1b445ecd4)

Flex 项目默认在容器中不换行水平排列，项目的 `flex-basis` 表示项目在被放进一个 flex 容器之前的宽度，即项目不伸缩时的初始宽度。

当所有项目的初始宽度之和小于容器宽度时，如果项目 `flex-grow` 不为 `0`，项目就会伸长。项目最终的宽度 = 初始宽度 + 伸长的宽度。

当所有项目的初始宽度之和大于容器宽度时，如果项目 `flex-shrink` 不为 `0`，项目就会收缩。项目最终的宽度 = 初始宽度 - 收缩的宽度。

所以知道项目的初始宽度很重要，因为项目的最终宽度跟其有关。

如何确定项目的初始宽度（即 `flex-basis`）呢？

- 显式的设置了项目的 `flex-basis` 属性，属性值可以为带单位的长度值，或者百分数，如`100px`、`50%`。

- 如果没有显式设置项目的 `flex-basis` 属性，但设置了项目的 `width` 属性，那么初始宽度就是 `width` 属性的大小。

- 如果 `flex-basis`、`width` 都没设置，初始宽度就是项目内容（`content`）的宽度。

- 如果同时设置 flex-basis、width，初始宽度取 flex-basis 值。

即下面从左至右，优先级逐渐增大：

content –> width –> flex-basis (limted by max|min-width)

下面通过给一个 `1000px` 的 `flex` 容器来添加一些 `flex` 项目来说明一下 Flex Items 的应用准则：

```css
.container {
    display: flex;
    width: 1000px;
}
```

![01](https://image.newarea.site/20230725/01.webp)

## 设置宽度(Width)

添加四个 200x200 像素的项目到 flex 容器中

```css
.item {
    width: 200px;
    height: 200px;
}
```

![02](https://image.newarea.site/20230725/02.webp)

因为 flex 容器有足够多的空间，所以项目可以很好的填充在容器内部，最终：

![03](https://image.newarea.site/20230725/03.webp)

上面的示例就是当 `flex-basis` 没有被指定，默认值是 `flex-basis: auto`，也就意味着项目以宽度 width(200px) 为准。

## 设置一个Flex Basis值

让我们看看当给这些已经设置固定宽度 `width` 的项目设置一个 `flex-basis` 值会发生什么。

```css
.item {
    width: 30px;
    flex-basis: 250px;
}
```

![04](https://image.newarea.site/20230725/04.webp)

就像你所看到的，当指定一个 `flex-basis` 值的时候，盒子的宽度属性被忽略了，所以我们就不需要指定盒子的宽度 `width` 属性了

```css
.item {
    flex-basis: 250px;
}
```

items 完全填充了flex 容器：

![05](https://image.newarea.site/20230725/05.webp)

因此项目的宽度关键在于最终的 `flex-basis`。最佳的方法是只使用 `flex-basis` 而不是 `width` 或 `height` 属性。特别是 Safari 10 之前的版本的浏览器有一个 flexbox bug，在给项目应用 `flex-shrink` 属性的时候，浏览器会使用 `height` 属性而不是 `flex-basis`。

## 使用max-width来限制flex-basis

`min-width` 和 `max-width` 会限制 `flex-basis` 值。下面是给 flex 项目设置 `max-width` 的结果：

```css
.item {
    flex-basis: 250px;
    max-width: 100px;
}
```

![06](https://image.newarea.site/20230725/06.webp)

可以看到即使我们将 `flex-basis` 设置为 250px，项目的宽度还是被限制在了 100px。所以在这个示例中最终的 `flex-basis` 是100px：

![07](https://image.newarea.site/20230725/07.webp)

接着试试 `min-width` 来看看最终的 `flex-basis` 有什么不同：

```css
.item {
    flex-basis: 100px;
    min-width: 250px;
}
```

![08](https://image.newarea.site/20230725/08.webp)

可以看到最终项目的宽度是 250px 而不是 100px：

![09](https://image.newarea.site/20230725/09.webp)

## Flex-basis 到底是什么？

现在我们知道了 width 属性只是一个当 flex-basis 没有被设置时的回退选项。min-width 和 max-width 则是 flex-basis 的下限和上限。那么 flex-basis 到底是什么呢？

也许你注意到了上面我们所有的示例在将 flex 项目放入 flex 容器之前都直观地列出了 flex 项目的大小。之所以这么做是因为这就是 flex-basis 的含义：flex 项目在被放进一个flex容器之前的大小。也就是项目理想或假设的大小。但是 flex-basis 不能保证其大小！一旦将项目放入flex容器中，flex-basis的值就无法保证了。在上面的示例中，你可以看到 flex 项目完美地填充了容器，那是因为容器的大小正好等于项目最终的 `flex-basis` 之和。但是如果容器没有足够的空间来容纳或者有多余的空间呢？下面就分别讲解一下这两种情况。

## 当没有足够空间的时候

比方说我们想要放更多的 `flex-basis：200px` 的项目到我们的容器：

![10](https://image.newarea.site/20230725/10.webp)

在项目被放进容器之前，每个项目会占据 200px，所有的项目会占据 1600px。但是容器只有 1000px。当容器没有足够大的空间来存放所有的项目的时候，flex 项目会按照压缩率（shrink rate）被压缩（shrink）其大小来填充容器，这个压缩率就是 `flex-shrink` 来设置的，默认情况下每个项目的压缩率都是一样的：

![11](https://image.newarea.site/20230725/11.webp)

## 当有额外的空间的时候

通常我们会有额外的空间剩余当所有的项目都添加进容器后：

```css
.item {
    flex-basis: 100px;
}
```

![12](https://image.newarea.site/20230725/12.webp)

我们可以控制 flex 项目的增长来填充可用的空间，这也就是 `flex-grow` 属性的作用。默认值为0，意味着项目不会增长。如果将每个项目设置 `flex-grow: 1`，那么所有的项目都会等比例的增长来填充剩余的空间：

```css
.item {
    flex-basis: 100px;
    flex-grow: 1;
}
```

![13](https://image.newarea.site/20230725/13.webp)

以上这些设置同样适用于 `height` 属性，当你将 `flex-direction` 设置为 `column` 或者`column-reverse` 的时候。
