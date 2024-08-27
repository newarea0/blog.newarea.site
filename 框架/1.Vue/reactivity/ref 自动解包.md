# ref 自动解包

## 1 什么是解包

通常情况下，如果想要使用 ref，需要通过 `.value`，如 `name.value`，解包就是可以不通过 `.value` 来使用 ref。

## 2 手动解包 `unref`

这是 `val = isRef(val) ? val.value : val` 计算的一个语法糖。

通过 `unref`，如果参数是 ref，则返回内部值，否则返回参数本身。

## 3 哪些场景下会自动解包

[响应式基础](https://staging-cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#reactivity-fundamentals)

### 3.1 ref 在模板中的解包

当 ref 在模板中作为顶层 property 被访问时，它们会被自动“解包”，所以不需要使用 `.value`

### 3.2 ref 在响应式对象中的解包

当一个 ref 作为一个响应式对象的 property 被访问或更改时，它会自动解包，因此会表现得和一般的 property 一样：

```js
// count 和 state.count 是相关联的，修改其中一个，另一个也相应变化。
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
// 注意此时 count 的值也改变了
console.log(count.value) // 1
```

```js
// 此时，count 和 state.count 不是相关联的
const count = ref(0)
const state = reactive({
  count: count.value
})
```

注意，当 count 是一个数组或 Map ref 时，不会自动解包。 

### 3.4 ref 在 defineExpose 中的解包

[defineExpose](https://staging-cn.vuejs.org/api/sfc-script-setup.html#defineexpose)

hello.vue

```js
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// 写法一，这种形式与 3.2 中的 state 类似
// const temp = reactive({ a: a, b: b })
// defineExpose(temp)

// 写法二
// defineExpose({
//   a: a,
//   b: b
// })

// 或者三
defineExpose({
  a,
  b
})
</script>
```

index.vue

```html
<template>
  <button type="button" @click="handleClick">click</button>
  <hello ref="helloRef" />
</template>

<script setup>
  import Hello from '#/components/Hello.vue'

  const helloRef = ref(null)
  console.log(helloRef.value) // null

  nextTick(() => {
    console.log(helloRef.value.b) // 2
  })

  function handleClick() {
    helloRef.value.b += 1
    console.log(helloRef.value.b) // 点击按钮后打印 3，此时hello.vue 中 b 的值变为 3
  }
</script>
```

注意：在依赖注入中，ref 不会自动解包（[注入](https://staging-cn.vuejs.org/guide/components/provide-inject.html#inject)）
