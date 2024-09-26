# 渲染函数

[h](https://cn.vuejs.org/api/render-function.html#h)

## 1 参数及返回值

### 1.1 签名

```ts
// 完整参数签名
function h(
  type: string | Component,
  props?: object | null,
  children?: Children | Slot | Slots
): VNode

// 省略 props
function h(type: string | Component, children?: Children | Slot): VNode

type Children = string | number | boolean | VNode | null | Children[]

type Slot = () => Children

type Slots = { [name: string]: Slot }
```

### 1.2 当 vnode 没有 property

```js
// 写法一
// const Hello = h('span', null, 'hello')
// 写法二
// const Hello = h('span', {}, 'hello')
// 写法三
const Hello = h('span', 'hello')
```

### 1.3 插槽

#### 1.3.1 定义（具名）插槽

```html
<template>
  <h1>渲染函数</h1>
  <hello>
    <template #default>
      <div>Jack</div>
    </template>
    <template #friend>
      <div>Marry</div>
    </template>
  </hello>
</template>

<script setup lang="ts">
  import { h } from 'vue'

  const Hello = (props, { slots }) => {
    console.log(slots) // 打印如下
    return h('div', ['hello', slots.default(), slots.friend()])

    // 或者
    // return h('div', [ 'hello', ...Object.keys(slots).map((item) => slots[item]())])
  }
</script>
```

![17](https://image.newarea.site/20230828/17.png)

#### 1.3.2 定义作用域插槽

```html
<template>
  <h1>渲染函数</h1>
  <hello>
    <template #default>
      <div>Jack</div>
    </template>
    <template #friend="{ age, sex }">
      <div>Marry {{ age }} {{ sex }}</div>
    </template>
  </hello>
</template>

<script setup lang="ts">
  import { h } from 'vue'

  const Hello = (props, { slots }) => {
    return h('div', [
      'hello',
      slots.default(),
      slots.friend({ age: 20, sex: 'girl' })
    ])
  }
</script>
```

#### 1.3.3 使用插槽

test.vue

```html
<template>
  <h1>渲染函数</h1>
  <slot name="default"></slot>
  <slot name="friend" v-bind="{ age: 20, sex: 'gril' }"></slot>
</template>

<script setup></script>
```

index.vue

```html
<template>
    <hello />
</template>

<script setup lang="ts">
  import { h } from 'vue'
  import Test from './components/test.vue'

  const Hello = (props, { slots }) => {
    return h(
      Test,
      {},
      {
        default: () => h('div', 'Jack'),
        friend: ({ age, sex }) => h('div', ['Marry', age, sex])
      }
    )
  }
</script>
```

### 1.4 返回值

渲染函数 `h` 的返回值是一个对象：

```html
<template>
  <h1>渲染函数</h1>
  <hello />
</template>

<script setup lang="ts">
  import { h } from 'vue'

  const Hello = h(
    'span',
    {
      class: 'active',
      ref: 'helloRef',
      onClick: (e) => {
        console.log(e)
      }
    },
    'hello'
  )
  console.log(Hello) // 打印内容如下图

  // const Hello = () => {
  //   return h(
  //     'span',
  //     {
  //       class: 'active',
  //       ref: 'helloRef',
  //       onClick: (e) => {
  //         console.log(e)
  //       }
  //     },
  //     'hello'
  //   )
  // }
  // console.log(Hello()) // 打印内容如下图
</script>
```

![16](https://image.newarea.site/20230828/16.png)


## 2 使用场景

### 2.1 简单使用

局部注册组件 Hello

```html
<template>
  <h1>渲染函数</h1>
  <hello />
</template>

<script setup lang="ts">
  import { h } from 'vue'

  const Hello = h(
    'span',
    {
      class: 'active',
      ref: 'helloRef',
      onClick: (e) => {
        console.log(e)
      }
    },
    'hello'
  )
</script>
```

### 2.2 函数式组件（常用）

```html
<template>
  <h1>渲染函数</h1>
  <hello />
</template>

<script setup lang="ts">
  import { h } from 'vue'

  const Hello = () => {
    return h(
      'span',
      {
        class: 'active',
        ref: 'helloRef',
        onClick: (e) => {
          console.log(e)
        }
      },
      'hello'
    )
  }
</script>
```

**上面函数 `Hello` 除了可以返回一个 vnode，还可以返回字符串、数组**，返回数组可以用来创建**多根节**点组件

```html
<template>
  <h1>渲染函数</h1>
  <hello />
</template>

<script setup lang="ts">
  import { h } from 'vue'

  // 字符串
  // const Hello = () => {
  //   return 'Hello Jack'
  // }

  // 数组
  // const Hello = () => {
  //   return ['hello', 'Jack']
  // }

  // 数组
  const Hello = () => {
    return ['hello', h('span', 'Jack')]
  }
</script>
```

### 2.3 声明渲染函数

这里的单文件组件无需 template 部分。

hello.vue

```html
<script>
  import { h } from 'vue'

  export default {
    props: {
      name: String
    },
    setup(props) {
      return () =>
        h(
          'span',
          {
            class: 'active',
            ref: 'helloRef',
            onClick: (e) => {
              console.log(e)
            }
          },
          `hello ${props.name}`
        )
    }
  }
</script>
```

index.vue

```html
<template>
  <hello name="Jack" />
</template>

<script setup lang="ts">
  import Hello from './components/hello.vue'
</script>
```
