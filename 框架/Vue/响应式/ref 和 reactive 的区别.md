# ref和reactive的区别

Vue3 在9月18号晚上发布了，在 vue3 中对响应式数据的声明官方给出了 `ref()` 和 `reactive()` 这两种方式，今天我们来聊聊两种定义定义数据方式有什么不同。

![](https://image.newarea.site/20230830/pic_014.jpg)

如上代码，我们使用变量声明的方式，`ref` 的方式，`reactive` 的方式定义的三个变量，`num1`，`num2`，`num3`

![](https://image.newarea.site/20230830/pic_015.png)

我们发现使用 `ref` 定义的数据，打印结果是一个被对象包裹的响应的数据，使用 `reactive` 的方式和纯变量声明的方式打印结果是一样的，这是什么原因呢？

我们发现在控制台输出一个警告信息， 提示 100 这个值不能被 `reactive` 创建，官方也推荐我们在定义数据的时候，`reactive` 定义复杂的数据类型的数据，`ref` 推荐定义基本数据类型，所以如果要使用 `reactive` 定义基本数据类型的话，我们需要在 `reactive` 中将数据包装一下

![](https://image.newarea.site/20230830/pic_016.png)

![](https://image.newarea.site/20230830/pic_017.png)

我们在使用 `reactive` 定义数据的时候用对象做一层包裹，这样控制台就不会报警告信息了。

但是使用 `reactive` 定义的数据和 `ref` 定义的数据打印结果有一些差异。

![](https://image.newarea.site/20230830/pic_018.png)

![](https://image.newarea.site/20230830/pic_019.png)

我们发现 `ref` 定义的数据打印结果需要 `.value` 才能获取到结果，而 `reactive` 则不需要。

![](https://image.newarea.site/20230830/pic_020.png)

总结:

- `reactive` 和 `ref` 都是用来定义响应式数据的 `reactive` 更推荐去定义复杂的数据类型 `ref` 更推荐定义基本类型
- `ref` 和 `reactive` 本质我们可以简单的理解为 `ref` 是对 `reactive` 的二次包装， `ref` 定义的数据访问的时候要多一个 `.value`

- 使用 `ref` 定义基本数据类型，`ref` 也可以定义数组和对象。
