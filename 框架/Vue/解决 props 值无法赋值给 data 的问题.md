# 解决 props 值无法赋值给 data 的问题

[Vue中用props给data赋初始值遇到的问题解决](https://www.cnblogs.com/mouseleo/p/11135291.html)

我们知道，在 onMounted 中是可以获取 props 的，一个常见的场景就是在 onMounted 生命周期钩子中通过 props 调用接口，并在成功请求接口后的回调中将返回值赋值给 data。

但是不能在 onMounted 中将 prpos 赋值给 data。现在想让一个 data 跟 props 关联起来（即 props 用来传递一个初始值，并且当 props 变化时，data 也变化 ），该怎么办呢。

错误做法

```js
import { defineProps, reactive, watch } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    default: 0
  }
})

const state = reactive({
  id: 0
})

onMounted(() => {
  state.id = props.id
})
```

正确做法

```js
import { defineProps, ref, provide, reactive, watch } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    default: 0
  }
})

const state = reactive({
  id: props.id
})

watch(() => props.id, (newVal, oldVal) => {
  state.id = newVal
})
```