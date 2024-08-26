# 注意

## 1 监听源什么时候使用函数

通常监听源是一个ref、一个响应式对象，此时不需要使用函数，如果要监听响应式对象的某个属性就需要使用 getter 函数，如：

```js
const obj = reactive({ count: 0 })

// 这不起作用，因为此时监听源是一个值，是不变的
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

## 2 什么时候使用 deep

如果监听源是引用类型（如`ref(数组)`、`ref(对象)`、`reactive`）或**返回值为引用类型的 getter 函数**，当需要强制深度遍历，以便在深层级变更时触发回调，就需要设置 deep 为 true，**且变化前后，监听源值相同**。

如果不设置 deep 为 true，**只有**当监听源被整体**赋值或替换**时才触发回调函数，val1、val2 为变化后和变化前的值，且不一样。

### 2.1 `ref(数组)`

```js
const users = ref([])
watch(users, (val1, val2) => {
  console.log(val1, val2)
})

// 不触发监听回调
function handleAdd() {
  users.value.push({ name: `name${Math.random()}`, age: 20 })
}
```

```js
const users = ref([])
watch(users, (val1, val2) => {
  console.log(val1, val2)
}, { deep: true })

// 触发监听回调，val1、val2 相同
function handleAdd() {
  users.value.push({ name: `name${Math.random()}`, age: 20 })
}
```

```js
const users = ref([])
watch(users, (val1, val2) => {
  console.log(val1, val2)
})

// 触发监听回调，val1、val2 不同，打印[{ name: 'Jack', age: 18 }] 和 []
function test() {
  users.value = [{ name: 'Jack', age: 18 }]
}
```

### 2.2 `ref(对象)`

下面是监听源为一个 `ref(对象)` 的例子：

```js
const user = ref({ name: 'Jack' })
watch(user, (val1, val2) => {
  console.log(val1, val2)
}, { deep: true })

// 仅当设置了 deep 为 true，触发监听回调，val1、val2 相同，否则不触发
function test1() {
  user.value.name = 'Marry'
}

// 触发监听回调，val1、val2 不同，打印 {name: 'Marry'} 和 {name: 'Jack'}
function test1() {
  user.value = { name: 'Marry' }
}
```

### 2.3 `reactive`

注意如果监听源是 `reactive`，会**隐式**地创建一个深层侦听器，因此无需再显式设置 deep 为 true。

```js
let user = reactive({ name: 'Jack' })
watch(user, (val1, val2) => {
  console.log(val1, val2)
}, { deep: true })

// 不管是否设置deep，都会触发监听回调，且 val1、val2 相同
function test1() {
  user.name = 'Marry'
}
// 直接给 reactive 赋值，这种做法是不对的。不会触发监听回调
function test2() {
  user = { name: 'Marry' }
}
```

### 2.4 返回值为引用类型的 getter 函数

```js
const user = reactive({
  info: {
    name: 'Jack'
  }
})
watch(() => user.info, (val1, val2) => {
  console.log(val1, val2)
}, { deep: true })

// 仅当设置了 deep 为 true，触发监听回调，val1、val2 相同，否则不触发
function test1() {
  user.info.name = 'Marry'
}
// 触发监听回调，val1、val2 不同，打印 {name: 'Marry'} 和 {name: 'Jack'}
function test2() {
  user.info = { name: 'Marry' }
}
```

因为 `reactive` 会递归创建响应式对象，因此 `user.info` 也是响应式对象，所以下面写法更便捷。

```js
const user = reactive({
  info: {
    name: 'Jack'
  }
})
watch(user.info, (val1, val2) => {
  console.log(val1, val2)
})

// 不管是否设置deep，都会触发监听回调，且 val1、val2 相同
function test1() {
  user.info.name = 'Marry'
}
// 相当于直接给 reactive 赋值，这种做法是不对的。不会触发监听回调
function test2() {
  user.info = { name: 'Marry' }
}
```
