# 监听 prop

defineProps 的返回值 props 可以看出一个响应式对象， 监听响应式对象的某个属性

## 1 给 prop 传一个普通值 ref

跟 [note](./note.md) 中的“1 监听 ref”类似

child.vue

```html
<template>
  <ul>
    <li>{{ props.initData }}</li>
  </ul>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps({
  initData: {
    type: String,
    default: ''
  }
})

watch(
    () => props.initData,
    (newVal, oldVal) => {
      console.log(1, newVal, oldVal)
    },
    {
      immediate: true, // 非必须设置，组件第一次渲染时有监听, 初次渲染打印 1 'Jack' undefined
    }
)
</script>
```

parent.vue

```html
<template>
  <info :init-data="info"></info>
  <el-button @click="test1">click1</el-button>
  <el-button @click="test2">click2</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Info from './components/child.vue'

const info = ref('Jack')

function test1() {
  info.value = 'Bob'
}
function test2() {
  info.value = 'Tom'
}

defineExpose()
</script>
```

## 2 给 prop 传一个引用值 ref

info.vue

```html
<template>
  <ul>
      <!-- 如果不加“?”，会报错：Uncaught (in promise) TypeError: Cannot read properties of null (reading 'name')-->
      <li>{{ props.initData?.name }}</li>
      <li>{{ props.initData?.age }}</li>
      <li>{{ props.initData?.father?.name }} - {{ props.initData?.father?.age }}</li>
  </ul>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps({
  initData: {
    type: Object,
    default: () => ({})
  }
})

watch(
    () => props.initData,
    (newVal, oldVal) => {
      console.log(1, newVal, oldVal)
      // 这里最好做一次校验
      if (!props.initData || !Object.keys(props.initData).length) return
      // do something...
    },
    // 不需要 deep: true
    {
      immediate: true
    }
)
</script>
```

- 组件第一次渲染时有监听，打印出 1 null undefined
- 打印的 newVal 和 oldVal 不一定相同
- 前后两次点击同一个按钮，均会触发watch

index.vue

```html
<template>
  <info :init-data="info"></info>
  <el-button @click="test1">click1</el-button>
  <el-button @click="test2">click2</el-button>
</template>

<script setup lang="ts">
import { reactive, watch, defineProps, ref } from 'vue'
import Info from './components/info.vue'

const info = ref(null)

// 函数是直接对 info.value 赋值，如果 test1 内容是 info.value.name = 'Marry'，则触发 test1 时会报错：
// Uncaught TypeError: Cannot set properties of null (setting 'name')
function test1() {
  info.value = {
    name: 'Marry',
    father: {
      name: 'Jack',
      age: 40
    }
  }
}
function test2() {
  info.value = {
    name: 'Bob',
    father: {
      name: 'Tom',
      age: 20
    }
  }
}
defineExpose()
</script>

<style scoped lang="less"></style>
```

对于：

`info.value.name = 'hello'`

需要设置 `deep: true`

## 3 给 prop 传一个 reactive

跟 [note](./note.md) 中的“3 监听响应式对象”类似，此时有两种方式可以实现监听，即
- watch 第一个参数是 props.initData
- watch 第一个参数是 `() => props.initData`，并且 `deep: true`

child.vue

```html
<template>
  <ul>
    <li>{{ props.initData.name }}</li>
    <li>{{ props.initData.age }}</li>
    <li>{{ props.initData.father?.name }} - {{ props.initData.father?.age }}</li>
  </ul>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps({
  initData: {
    type: Object,
    default: () => ({})
  }
})

watch(
    () => props.initData,
    (newVal, oldVal) => {
      console.log(1, newVal, oldVal)
      // 这里最好做一次校验
      if (!Object.keys(props.initData).length) return
      // do something...
    },
    {
      immediate: true, // 非必须设置，组件第一次渲染时有监听
      deep: true // 必须，只有这样写，才能监听到 props.initData 变化
    }
)
</script>
```

- 设置了 immediate 为 true，所以第一次渲染 打印 1 {name: 'Marry', age: 0, father: {name: 'Tom', age: '20'}} undefined
- 此后每次交替点击按钮，都会触发变更，且打印的 newVal 和 oldVal 相同

parent.vue

```html
<template>
  <info :init-data="info"></info>
  <el-button @click="handleClick1">click1</el-button>
  <el-button @click="handleClick2">click2</el-button>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Info from './components/child.vue'

const info = reactive({
  name: 'Marry',
  age: 0,
  father: {}
})

function handleClick1() {
  info.name = 'Jack'
}
// 虽然有三次赋值，但只触发一次监听
function handleClick2() {
  info.name = 'Bob'
  info.father.name = 'Tom'
  info.father.age = '20'
}
</script>
```
