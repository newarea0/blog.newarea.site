# 函数式组件

[函数式组件](https://cn.vuejs.org/guide/extras/render-function.html#functional-components)

借助渲染函数 `h` 定义函数式组件，有如下特点：

- 接收 `props`，返回 `vnodes`
- 属于无状态组件
- 不会触发常规的组件生命周期钩子


```js
// 函数名按帕斯卡形式命名
function MyComponent(props, { slots, emit, attrs }) {
  // ...
  return h(
    //...
  )
}

// 声明 props、emits
MyComponent.props = ['value']
MyComponent.emits = ['click']
```

## 注意

```html
<template>
  <my-node />
</template>

<script setup lang="tsx">
  const MyNode = () => {
    return h('div', 'hello')
  }
  
  const App = () => <div>Vue 3.0</div>
</script>
```

上面写法浏览器会报错：Failed to resolve component: my-node

修改方式有两种:

方式一：去掉 jsx 语法

即 渲染函数和 jsx 不能同时存在。

```html
<template>
  <my-node />
</template>
<script setup lang="tsx">
  const MyNode = () => {
    return h('div', 'hello')
  }
</script>
```

方式二：将组件名改成 VNode

```html
<template>
  <v-node />
</template>
<script setup lang="tsx">
  const VNode = () => {
    return h('div', 'hello')
  }
  
  const App = () => <div>Vue 3.0</div>
</script>
```
