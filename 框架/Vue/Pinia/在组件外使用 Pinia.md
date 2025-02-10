# 在组件外使用 Pinia

[Using a store outside of a component](https://pinia.vuejs.org/core-concepts/outside-component-usage.html)

`useUserStore` 函数可以接收一个可选参数 `pinia`，这个参数是 Pinia 实例。在大多数情况下，我们不需要传入这个参数，因为：

1. 在组件中使用时，Vue 会自动注入 Pinia 实例（通过 `app.use(pinia)` 实现）
2. 在非组件中使用时，我们需要手动传入 Pinia 实例，这就是为什么代码中定义了 `useUserStoreWithOut` 函数

相关代码：

````ts
// store/modules/user/index.ts
// ... existing code ...
export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: ''
  })
})

// 这个函数就是为了在非组件中使用时，手动传入 pinia 实例
export function useUserStoreWithOut() {
  return useUserStore(store) // 这里显式传入了 store（pinia 实例）
}
// ... existing code ...
````

使用示例：
```ts
// 在组件中使用 - 不需要传参
const userStore = useUserStore()

// 在非组件中使用 - 需要传入 pinia 实例
const userStore = useUserStore(pinia实例)
// 或者使用封装好的函数
const userStore = useUserStoreWithOut()
```

这就是为什么在代码中会有两个版本的使用方式：
1. `useUserStore` - 主要用于组件中
2. `useUserStoreWithOut` - 主要用于非组件中（如工具函数、API 调用等场景）

这样的设计可以确保在任何地方都能正确地访问和使用 store。
