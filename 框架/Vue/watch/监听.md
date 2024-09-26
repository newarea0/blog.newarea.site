# 监听 watch

[Vue官网-侦听器](https://staging-cn.vuejs.org/guide/essentials/watchers.html)

## 1 监听 ref

```js
const name = ref('Bob')

watch(name, (newVal, oldVal) => {
  console.log(newVal, oldVal) // 组件初次渲染无打印，执行 handleClick 打印 `Tom Bob`
})

function handleClick() {
  name.value = 'Tom'
}
```

```js
const name = ref('Bob')

watch(name, (val, oldVal) => {
  console.log(val, oldVal) // 组件初次渲染打印 `Bob undefined`，执行 handleClick 打印 `Tom Bob`
}, { immediate: true })

function handleClick() {
  name.value = 'Tom'
}
```

### 1.1 监听 `ref(数组)`

### 1.2 监听 `ref(对象)`

## 2 监听计算属性

```js
const x = ref(0)
const y = ref(0)
const count = computed(() => x.value + y.value)

watch(count, (val, oldVal) => {
  console.log(val, oldVal) // 组件初次渲染打印 `0 undefined`，执行 handleClick 打印 `4 0`
}, { immediate: true})

// 等价于上面，getter 函数
// watch(
//   () => x.value + y.value,
//   (val, oldVal) => {
//     console.log(val, oldVal)
//   }
// )

function handleClick() {
  x.value = 4
}
```

## 3 监听响应式对象

```js
const info = reactive({
  name: '',
  age: 0,
  father: {}
})
watch(info, (val, oldVal) => {
  console.log(1, val, oldVal) // 注意：`val` 此处和 `oldVal` 是相等的，因为它们是同一个对象！
})
// 等价于上面
// watch(
//   () => info,
//   (val, oldVal) => {
//     console.log(1, val, oldVal)
//   },
//   { deep: true } // 必须deep设置为true，否则监听无效
// )

// 执行 handleClick1、handleClick2 都可触发监听回调，且打印的 val 和 oldVal 相同
function handleClick1() {
  info.name = 'Tom'
}
// handleClick2 里虽然有两处改动，执行 handleClick2，只会触发一次监听
function handleClick2() {
  info.father.name = 'Tom'
  info.father.age = '50'
}
```
有以下结论：

- 直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发，即修改对象的子属性、孙属性，曾孙属性...都会触发监听，也就是监听对象所有属性
- val 和 oldVal 相等
- watch 第一个参数是 info，等价于 `() => info` + `deep: true`
- 一个事件回调函数内 info 虽然多次变化，但只会触发一次监听
- 设置 `immediate: true`，组件初次渲染会触发监听，且 val 为 info 初始值，oldVal 为 undefined


```js
//注意：下面这样写只能在组件第一次渲染时监听到，有打印，但当info内容改变时，无法监听，没有打印
watch(
  () => info,
  (val, oldVal) => {
    console.log(val, oldVal)
  },
  { immediate: true }
)
```

## 4 监听响应式对象的普通属性

```js
const obj = reactive({ count: 0 })

// 这不起作用，因为此时监听源是一个值
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
```

应该

```js
// 提供一个 getter 函数，只有当 obj 对象的 count 属性发送变化时才触发监听
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```

## 5 监听响应式对象的对象属性

跟上面“3 监听响应式对象”类似

```js
watch(info.father, (val, oldVal) => {
  console.log(val, oldVal)
})
// 等价于
// watch(() => info.father, (val, oldVal) => {
//   console.log(val, oldVal)
// }, {deep: true})
```

## 6 监听多源数据组成的数据

```js
const x = ref(0)
const y = ref(0)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

## 7 监听 prop

详见 [监听 prop](./监听%20prop.md)
