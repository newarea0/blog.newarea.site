# toRef、toRefs

## toRef

## toRefs

将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 `toRef()` 创建的。

[官网](https://v3.cn.vuejs.org/api/refs-api.html#torefs)

可用于为响应式对象上的 property 创建 ref。这样创建的 ref 与其源 property 保持同步：改变源 property 将更新 ref，反之亦然。

例1 toRefs

```js
const info = reactive({
  name: 'Jack',
  age: 20
})

let { name, age } = toRefs(info)  // 这里变量 name、age 为 ref
```

例2 toRef

```vue
<template>
  <p>{{info.name}}</p>
  <p>{{name1}}</p>
  <p>{{name2}}</p>
</template>

<script setup lang="ts">
  import { reactive, ref, toRef, toRefs } from 'vue'

  const info = reactive({
    name: 'Jack'
  })

  const name1 = ref(info.name)
  const name2 = toRef(info, 'name')
</script>
```

当通过 Vue Devtools 修改 info.name，可以发现 name2 也跟着变化，且变化后的值和 info.name 相等。同样的，当修改 name2，info.name 也随之变化。
但是 name1 和 info.name 之间没有关联性，修改其中一个，另一个不会随之变化。

例子3 toRefs

[组合式函数](https://cn.vuejs.org/guide/reusability/composables.html#conventions-and-best-practices)

index.vue

```vue
<template>
  <!--1-->
  <!--<h2>x: {{ x }}</h2>-->
  <!--<h2>y: {{ y }}</h2>-->

  <!--2-->
  <!--<h2>x: {{ position.x }}</h2>-->
  <!--<h2>y: {{ position.y }}</h2>-->

  <!--3-->
  <h2>x: {{ x }}</h2>
  <h2>y: {{ y }}</h2>
</template>

<script setup lang="ts">
  import usePosition from './usePosition'

  // 1
  const { x, y } = usePosition()

  // 2
  // const position = usePosition()

  // 3 这种方式不行
  // const { x, y } = usePosition()
  // 等价于，直接使用了值，不是引用的，不是响应式
  // const x = usePosition().x
  // const y = usePosition().y
</script>
```

usePosition.ts

```ts
import { reactive, toRefs } from 'vue'

export default function usePosition() {
  const position = reactive({
    x: 0,
    y: 0
  })
  // 绑定鼠标移动事件
  const onMouseMove = (event) => {
    position.x = event.x
    position.y = event.y
  }
  window.addEventListener('mousemove', onMouseMove)

  // 1
  return toRefs(position)

  // 2
  // return position

  // 3
  // return position
}
```
