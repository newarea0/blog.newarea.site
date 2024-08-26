# 在组件外使用 Pinia

[Using a store outside of a component](https://pinia.vuejs.org/core-concepts/outside-component-usage.html)

要想 store (通过 defineStore 定义，一般存放在 store/modules/xx 中)起作用，需要依赖 pinia 实例（通过 createPinia 定义，一般存放在 store/index.ts 中）。

大部分情况下，在组件中我们都是通过如下方式使用 store。

```vue
<script>
  import { useXxxStore } from '@/store'
  
  const xxxStore = useXxxStore()
</script>
```

store 看似和 pinia 实例没有联系，在背后，调用 `useXxxStore()` 其实注入了 pinia 实例（在 main.ts 中导入的）。

所以正常的“理解”顺序是：

main.ts 中导入 pinia 实例 -> 组件中使用 store。

但 main.ts 中有时会在 pinia 实例导入前使用 store。
