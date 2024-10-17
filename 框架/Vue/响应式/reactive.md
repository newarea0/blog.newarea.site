# reactive

Vue3 中的 `reactive` 是一个核心 API，用于创建响应式对象。

## 特点

- 深层次的响应式转换
- 递归解包所有 `ref` 的属性
- 不能解构，解构后会失去响应性，但可以借助 `toRefs` 解构
- 只能用于对象（对象、数组、`Map`、`Set` 等）类型，基本类型使用 `ref`
- 返回一个 `Proxy` 对象，用于拦截对目标对象的访问和修改

### 深层次的响应式转换

`reactive` 是深层次的，当属性值为一个对象或数组时，会将该属性值也转换为 `reactive`。

```js
import { isReactive, reactive } from 'vue'

const obj = reactive({
  name: 'Jack',
  father: {
    name: 'Tom'
  },
  friends: ['Marry', 'Bob']
})

Object.keys(obj).forEach((item) => {
  console.log(item, isReactive(obj[item]), obj[item])
})

// 打印：
// name false Jack
// father true Proxy {name: 'Tom'}
// friends true Proxy {0: 'Marry', 1: 'Bob'}
```

若要避免深层响应式转换，只想保留对这个对象顶层次访问的响应性，请使用 `shallowReactive` 作替代。（注意区别单词 shallow 和 shadow，前者表示浅的，后者表示阴影）

### 递归解包所有 `ref` 的属性

`reactive` 也将递归解包所有值为 `ref` 的属性。

```js
import { reactive, ref } from 'vue'

const city = ref('sz')

const info = reactive({
  // 写法1
  city: city.value,
  // 写法2
  // city: city
})
console.log(info.city) // sz
```

上面两种写法是有区别的，对于写法 1，`city` 和 `info.city` 之间不会互相影响，写法 2 则相反，`city` 和 `info.city` 有联系，改变一个，另外一个也改变。

### 不能解构

不能解构，解构后会失去响应性，但可以借助 `toRefs` 解构，解构后，`name` 和 `age` 仍然是响应式的。

```js
import { reactive, toRefs } from 'vue'

const obj = reactive({
  name: 'Jack',
  age: 18
})

const { name, age } = toRefs(obj)

console.log(name, age) // {value: 'Jack'} {value: 18}
```

## toRaw

使用 `toRaw` 可以获取到原始对象，修改原始对象的属性，响应式对象的属性也会改变。

```js
import { reactive, toRaw, toRefs } from 'vue'

const obj = reactive({
  name: 'Jack',
  age: 18
})

const raw = toRaw(obj)
raw.name = 'Tom'
console.log(obj.name) // Tom
```

## toRef

`toRef` 可以用来创建一个响应式引用，这个引用是响应式的，但是它不会像 `ref` 那样被自动解包。

```js
import { reactive, toRef } from 'vue'

const obj = reactive({
  name: 'Jack',
  age: 18
})

const name = toRef(obj.name)
name.value = 'Tom'
console.log(obj.name) // Tom
```

## 简版手写

```js
// 定义一个reactive函数，传入一个目标对象
function reactive(target) {
  // 判断当前的目标对象是不是object类型(对象/数组)
  if (target && typeof target === 'object') {
    // 对数组或者是对象中所有的数据进行reactive的递归处理
    // 先判断当前的数据是不是数组
    if (Array.isArray(target)) {
      // 数组的数据要进行遍历操作0
      target.forEach((item, index) => {
        // 如果数组中还有数组
        // 使用递归
        target[index] = reactive(item)
      })
    }
    else {
      // 再判断当前的数据是不是对象
      // 对象的数据也要进行遍历的操作
      Object.keys(target).forEach((key) => {
        target[key] = reactive(target[key])
      })
    }
    return new Proxy(target, reactiveHandler)
  }
  // 如果传入的数据是基本类型的数据，那么就直接返回
  return target
}

// 定义一个reactiveHandler处理对象
const reactiveHandler = {
  // 获取属性值
  get(target, prop) {
    if (prop === '_is_reactive')
      return true
    const result = Reflect.get(target, prop)
    console.log('拦截了读取数据', prop, result)
    return result
  },
  // 修改属性值或者是添加属性
  set(target, prop, value) {
    const result = Reflect.set(target, prop, value)
    console.log('拦截了修改数据或者是添加属性', prop, value)
    return result
  },
  // 删除某个属性
  deleteProperty(target, prop) {
    const result = Reflect.deleteProperty(target, prop)
    console.log('拦截了删除数据', prop)
    return result
  }
}
```
