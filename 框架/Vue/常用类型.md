# 常用类型

[工具类型](https://staging-cn.vuejs.org/api/utility-types.html)

[source](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131)

`PropType<T>`

## 1 数组

1.1

hello.vue

```html
<template>
  <div>{{ porps.trigger }}</div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'

  export type Trigger = 'contextmenu' | 'click' | 'hover'
  const porps = defineProps({
    // 不仅定义了 trigger 类型为数组，还定义了数组选项值的范围。
    trigger: {
      type: Array as PropType<Trigger[]>,
      default: () => {
        return ['contextmenu']
      }
    }
  })
</script>
```

index.vue

```html
<template>
  <div>hello</div>
  <hello :trigger="trigger" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Hello, { Trigger } from './components/hello.vue'

  const trigger = ref<Trigger[]>(['click']) // 如果不加泛型参数 Trigger[]，则这里自动推断出类型是 string[]，从而会报类型不匹配
</script>
```

ref 会根据初始化时的值推导其类型，也可以使用泛型参数显式的指定类型，来覆盖默认的推导行为 - 参考[为 ref() 标注类型](https://staging-cn.vuejs.org/guide/typescript/composition-api.html#typing-ref)

1.2

```html
<script setup lang="ts">
  const porps = defineProps({
    activeSubMenuNames: {
      type: Array as PropType<(string | number)[]>
    }
  })
</script>
```

1.3

```html
<script setup lang="ts">
  interface Menu {
    name: string
    icon?: string
  }

  const porps = defineProps({
    items: {
      type: Array as PropType<Menu[]>,
      default: () => [],
    }
  })
</script>
```
## 2 对象

```html
<script setup lang="ts">
  interface ButtonOptions = {
    color?: string
    size?: string
  }

  const porps = defineProps({
    resetButtonOptions: {
      type: Object as PropType<ButtonOptions>,
      default: () => ({}),
    }
  })
</script>
```

## 3 函数

```html
<script setup lang="ts">
  const porps = defineProps({
    api: {
      type: Function as PropType<(...arg: any[]) => Promise<any>>,
      default: null,
    }
  })
</script>
```

## 4 多种可能的类型

```html
<script setup lang="ts">
  type Recordable<T = any> = Record<string, T>

  const porps = defineProps({
    params: {
      type: [Object, String] as PropType<Recordable | string>,
      default: () => ({}),
    }
  })
</script>
```

## 5 定义值的范围

```html
<script setup lang="ts">
  type SizeType = 'default' | 'middle' | 'small' | 'large'

  const porps = defineProps({
    size: {
      type: String as PropType<SizeType>,
      default: 'middle',
    }
  })
</script>
```
