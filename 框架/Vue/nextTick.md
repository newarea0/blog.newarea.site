# nextTick

nextTick()是 Vue 的核心方法之一，官方文档解释如下：

> 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

根据这个解释，我们可以知道放在 `nextTick()` 中的回调函数应该是会对 DOM 进行操作的代码。我们先来个简单的场景理解一下：

```vue
<script setup>
import { ref } from 'vue'

const message = ref('第一条消息')

const refP = ref(null)
console.log(refP.value)
</script>

<template>
  <div>
    <p ref="refP">
      消息：{{ message }}
    </p>
  </div>
</template>
```

这个场景中，会打印出null，这是因为在 Vue 的生命周期中，setup是最先执行的，这时组件还没渲染完成，refP.value并不能读取到 p 标签，所以打印的是null。如果要拿到我们想要的结果该怎么做呢？

```vue
nextTick(() => {
  console.log(refP.value)
})
```

我们只需将 `console.log(refP.value)` 放入 `nextTick()` 的回调函数中即可，这时打印为 `<p>消息：初始消息</p>`。

所以，你可以把 `nextTick()` 理解为一个能够让你在 Vue 数据更新并且对应的 DOM 渲染完成后执行的延迟函数。可以让你在 DOM 更新完成后立即执行一些操作，这些操作可能依赖于更新后的 DOM 结构。
