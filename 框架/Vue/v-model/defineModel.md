# defineModel

`defineModel` 是 Vue 3.4 版本中引入的一个新的组合式 API 宏函数。它的主要目的是简化组件中 v-model 的使用，使得父子组件之间的双向数据绑定更加简洁和直观，而不需要手动处理 props 和 emit。

:::code-group

```vue [Child.vue]
<script setup>
const model = defineModel({
  type: Number,
  required: true,
})

function update() {
  model.value++
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">
    Increment
  </button>
</template>
```

```vue [Parent.vue]
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const countModel = ref(0)
</script>

<template>
  <Child v-model="countModel" />
</template>
```

:::

使用 `defineProps` 和 `defineEmits` 也可以实现类似的效果，但是需要手动处理 props 和 emit。明显 `defineModel` 更简洁。

:::code-group

```vue [Child.vue]
<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

function update() {
  emit('update:modelValue', props.modelValue + 1)
}
</script>

<template>
  <div>Parent bound v-model is: {{ props.modelValue }}</div>
  <button @click="update">
    Increment
  </button>
</template>
```

```vue [Parent.vue]
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const countModel = ref(0)
</script>

<template>
  <Child v-model="countModel" />
</template>
```

:::

## 实现原理

`defineModel` 其实就是在子组件内定义了一个叫 `model` 的 ref 变量和 `modelValue` 的 props，并且 watch `modelValue`。当 `modelValue` 的值改变后会同步更新 `model` 变量的值。并且当在子组件内改变 `model` 变量的值后会抛出 `update:modelValue` 事件，父组件收到这个事件后就会更新父组件中对应的变量值。

实现原理代码如下：

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const model = ref()

watch(
  () => props.modelValue,
  () => {
    model.value = props.modelValue
  }
)
watch(model, () => {
  emit('update:modelValue', model.value)
})
</script>

<template>
  <input v-model="model">
</template>
```

其实 `defineModel` 的源码中是使用 `customRef` 和 `watchSyncEffect` 去实现的，我这里是为了让大家能够更容易的明白 `defineModel` 的实现原理才举的 `ref` 和 `watch` 的例子。

## 参考

- [Vue 文档 - defineModel](https://cn.vuejs.org/api/sfc-script-setup.html#definemodel)
