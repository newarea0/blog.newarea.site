# note

## 1 store 目录结构及内容

```
|-- store
    |-- index.ts
    |-- modules
        |-- user
            |-- index.ts
            |-- types.ts
|-- main.ts
|-- test.ts
```
store/modules 用于存放各个 store，store/index.ts 用于定义 pinia 实例，并暴露对外“接口”。

store/modules/user/types.ts
```ts
export interface UserState {
  name: string
}
```

store/modules/user/index.ts
```ts
import { defineStore } from 'pinia'
import { UserState } from './types'
import store from '@/store'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: ''
  })
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
```

store/index.ts
```ts
import { createPinia } from 'pinia'

// 集中一起导出，方便使用
export { useUserStore, useUserStoreWithOut } from './modules/user'

// 创建一个 pinia 实例
const pinia = createPinia()

// 1.用在 main.ts 中；2.用在各个 modules 中
export default pinia
```

## 2 Vue 项目入口文件 main.ts

```ts
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.css'
import router from './router'
import pinia from './store'
import '@/assets/style/index.less'
import './test'

const app = createApp(App)
app.use(ArcoVue)
app.use(router)
app.use(pinia)
app.mount('#app')
```

## 3 使用

### 3.1 在组件中使用

```vue
<template>
  <p>hello {{ userStore.name }}</p>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/store'

  const userStore = useUserStore()
</script>
```

### 3.2 在非组件中使用

test.ts

```ts
import { useUserStoreWithOut } from '@/store'

const userStore = useUserStoreWithOut()
```
