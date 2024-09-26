# JSX

## 1 如何让 Vue3 支持 JSX

[@vitejs/plugin-vue-jsx](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx)

Vite3 + @vitejs/plugin-vue-jsx

安装：

`pnpm add @vitejs/plugin-vue-jsx -D`

配置：

```ts
// vite.config.ts
import vueJsx from '@vitejs/plugin-vue-jsx'

export default {
  plugins: [
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    })
  ]
}
```

## 2 如何使用


### 2.1 定义局部组件

`script` 标签上需要加 `lang="jsx"`。

```html
<!-- src/jsx/index.vue -->
<template>
  <div>jsx</div>
  <App />
</template>

<script setup lang="jsx">
  import { ref, defineComponent, withModifiers } from 'vue'

  // 方式一
  // const App = () => <div>Vue 3.0</div>

  // 方式二
  // const App = {
  //   render() {
  //     return <div>Vue 3.0</div>
  //   }
  // }

  // 方式三
  // const App = () => (
  //   <>
  //     <span>I'm</span>
  //     <span>Fragment</span>
  //   </>
  // )

  // 方式四
  const App = defineComponent({
    setup() {
      const count = ref(0)

      const inc = () => {
        count.value ++
      }

      return () => (
        <div onClick={withModifiers(inc, ['self'])}>{count.value}</div>
      )
    }
  })
</script>

<style scoped lang="scss"></style>
```

### 2.2 使用 JSX 定义单文件组件的模板

单文件组件无需定义顶级的 `template` 标签（写了不报错，但是不起效果），`script` 标签上需要加 `lang="jsx"`，`style` 中的样式代码有效果。

```html
<!-- src/jsx/components/app.vue -->
<script lang="jsx">
  import { withModifiers, defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      const count = ref(0)

      const inc = () => {
        count.value++
      }

      return () => (
        <div onClick={withModifiers(inc, ['self'])}>{count.value}</div>
      )
    }
  })
</script>

<style scoped lang="less">
  div {
    color: red;
  }
</style>
```

```html
<!-- src/jsx/index.vue -->
<template>
  <div>jsx</div>
  <App />
</template>

<script setup lang="jsx">
  import App from './components/app.vue'
</script>

<style scoped lang="scss"></style>
```

## 3 Vue3 中 JSX 语法

[@vue/babel-plugin-jsx](https://github.com/vuejs/babel-plugin-jsx) (@vitejs/plugin-vue-jsx 内部使用了该依赖)

### 3.1 文本插值

Vue 里面文本插值默认是用双大括号:

```html
<h1>{{ msg }}</h1>
```

在JSX中变成了单大括号：

```javascript
const name = 'Vue DevUI'
const element = <h1>Hello, { name }</h1>
```

和 Vue 模板语法中的文本插值一样，大括号内支持任何有效的 JavaScript 表达式，比如：`2 + 2`，`user.firstName`，`formatName(user)`等。

### 3.2 条件渲染

jsx 本身也是一个条件表达式，不再需要使用`v-if`指令。

#### 3.2.1 使用 if/else

```javascript
const element = (name) => {
  if (name) {
    return <h1>Hello, { name }</h1>
  } else {
    return <h1>Hello, Stranger</h1>
  }
}
```

以上代码等效于：

```javascript
const element = (name) => <h1>Hello, { name || 'Stranger' }</h1>
```

#### 3.2.2 使用三目运算符

```javascript
const element = icon ? <span class="icon"></span> : null;
```

以上代码等效于：

```javascript
const element = icon && <span class="icon"></span>;
```

### 3.3 列表渲染

列表渲染直接使用JS数组的map方法即可，不需要使用`v-for`指令。

```javascript
const data = [
  {
    id: 1,
    title: '通用'
  }, 
  {
    id: 2,
    title: '导航'
  }
]

const element = data.map(item => {
  return <div>{ item.title }</div>
})
```

### 3.4 标签属性绑定

属性绑定也是使用大括号包裹，不需要使用`v-bind`指令。

```javascript
const href = 'https://devui.design/'

const element = <a href={href}>DevUI Design</a>
```

### 3.5 class 类名绑定

直接使用JS模板字符串即可。

```javascript
const element = <div className={`devui-accordion-item-title ${ disabled ? 'disabled' : '' }`}></div>
```

也可以使用数组：

```javascript
const element = <div class={
    ['devui-accordion-item-title', disabled && 'disabled']
  }
>Item</div>
```

### 3.6 style 样式绑定

样式绑定需要使用双大括号。

```javascript
const width = '100px'

const element = <button style={{ width, fontSize: '16px' }}></button>
```

### 3.7 事件绑定

绑定事件也是用大括号，注意事件名前面要加上`on`前缀，比如click事件要写成`onClick`，mouseenter事件要写成`onMouseenter`。

```javascript
const confirm = () => {
  // 确认提交
}

<button onClick={confirm}>确定</button>
```

如果要带参数，需要使用箭头函数进行包裹：

```javascript
const confirm = (name) => {
  // 确认提交
}

<button onClick={() => confirm('devui')}>确定</button>
```

#### 3.7.1 事件修饰符

jsx中给事件增加修饰符需要借助`withModifiers`方法。

```javascript
import { withModifiers, defineComponent, ref } from 'vue'

const App = defineComponent({
  setup() {
    const count = ref(0);

    const inc = () => {
      count.value++;
    };

    return () => (
      <div onClick={ withModifiers(inc, ['self']) }>{ count.value }</div>
    );
  },
})
```

> 注意：Vue模板中 ref 变量是可以直接解构的，但是在 jsx 中不行，需要记得添加 `.value`，比如上面的 `{ count.value }`。

### 3.8 v-model 双向绑定

```jsx
<input v-model={val} />
```

```jsx
<input v-model:argument={val} />
```

```jsx
<input v-model={[val, ["modifier"]]} />
```

```jsx
<A v-model={[val, "argument", ["modifier"]]} />
```

### 3.9 slot 插槽

jsx中没有`<slot>`标签，定义插槽需要使用双大括号。

如果是具名插槽，则将`default`改成具名插槽的名称，比如`mySlot`，则使用`ctx.slots.mySlot?.()`。

插槽从setup的第二个参数`ctx`中获取，不需要加`$`前缀。

```javascript
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, { slots }) { // 逻辑
    return () => {
      return <button>{ slots.default?.() }</button>
    }
  },
})
```

还可以使用`renderSlot`方法：

```javascript
import { renderSlot } from 'vue'

<button>
  { renderSlot(slots, 'default') }
</button>
```

#### 3.9.1 Scoped Slots 作用域插槽

使用作用域插槽可以实现插槽传参，以下是具体的示例。

`JSX`和`SFC`中插槽使用的写法对比。

`JSX`写法：

```tsx
import { IconPlus } from '@arco-design/web-vue/es/icon'

<d-tree data={data}>
  {{
    mySlot: (item) => (item.open ? <IconOpen /> : <IconClose />),
  }}
</d-tree>
```

或者写成这样

```tsx
<d-tree data={data}>
  {{
    mySlot: (item) => (item.open ? <icon-open /> : <icon-close />),
  }}
</d-tree>
```

还可以通过`v-slots`的方式使用：

```tsx
<d-tree data={data} v-slots={{
  mySlot: (item) => (item.open ? <IconOpen /> : <IconClose />)
}}>
</d-tree>
```

`SFC`写法：

```html
<d-tree :data="data">
  <template #mySlot="item">
    <IconOpen v-if="item.open" />
    <IconClose v-else />
  </template>
</d-tree>
```

其中的`item`是插槽的参数，通过

```js
ctx.slots.mySlot(item)
```

的方式给插槽传入参数。

或者使用`renderSlot`方法，第三个参数就是要传给插槽的参数：

```javascript
import { renderSlot, useSlots } from 'vue'

<button>
  { renderSlot(useSlots(), 'mySlot', item) }
</button>
```

___

补充：

1.  属性绑定

```javascript
const properties = {a: 1, b: 2}
```

SFC中`<div v-bind="properties"></div>`批量绑定标签属性。

在JSX中的替换方案是`<div {...properties}></div>`。

2.  class绑定

使用`CSS Modules`，引入局部样式，相当于SFC中的`scoped`。

```javascript
import styles from './index.module.scss'

<div class={styles.wrap}></div>
```

## 4 例子

src/views/jsx/components/app.vue

```html
<script lang="tsx">
  import { withModifiers, defineComponent, ref, PropType } from 'vue'

  export default defineComponent({
    props: {
      modelValue: {
        type: String
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      return () => (
        <>
          <label>姓名</label>
          <input
            value={props.modelValue}
            onInput={(e) =>
              emit('update:modelValue', (e.target as HTMLInputElement).value)
            }
          />
        </>
      )
    }
  })
</script>
```

src/views/jsx/index.vue

```html
<script lang="tsx">
  import { ref, defineComponent, withModifiers } from 'vue'
  // 在 jsx 中直接使用，不用写 components 注册
  import App from './components/app.vue'

  export default defineComponent({
    setup() {
      const name = ref('Jack')

      function handleChange(val: string) {
        name.value = val
      }

      return () => (
        <>
          <div>{name.value}</div>

          {/* 写法1 */}
          {/* 在 jsx 中 ref 无法自动解构，需要使用 value 属性 */}
          <App v-model={name.value} />

          {/* 写法2 */}
          {/* <App v-model:model-value={name.value} /> */}

          {/* 写法3 */}
          {/* <App v-model={[name.value, 'model-value']} /> */}

          {/* 写法4 */}
          {/* <App model-value={name.value} onUpdate:model-value={handleChange} /> */}
        </>
      )
    }
  })
</script>
```