# 如何对 reactive 定义的数组进行赋值

## 1 问题

```js
const arr = reactive([1, 2, 3])

function handleClick() {
  // 方法一 失败
  // arr = [4, 5, 6]
  // console.log(arr) // 4 5 6

  // 方法二 失败
  arr.concat([4, 5, 6])
}
```

执行上面方法，虽然能正确打印出 `arr`，但页面视图并不会发送改变（假设视图使用了`arr`）。直接赋值（`arr = [4, 5, 6]`）会让 `arr` 失去响应式。

`reactive` 方法将 target 对象生成一个 Proxy 代理对象，从而可以对操作 target 对象属性的一些行为进行拦截。直接赋值使 `arr` 由 Proxy 对象变成普通对象，从而实去拦截、代理功能。

同理，对 `reactive` 定义的对象也不能直接进行赋值，

就像 Commonjs 中模块导出 `var exports = module.exports`，可以对 `module.exports` 进行赋值，但是不能对 `exports` 赋值，只能通过 `.` 操作符添加属性。

```js
const a = 1
const b = 2

// module.exports = {
//   a,
//   b
// }

// 错误，赋值前 exports 引用地址和 module.exports 相同，赋值后 exports 指向一个新地址，
// 本来 exports 只是相当于 module.exports 的别名，赋值后 exports 跟 module.exports 没关系了
exports = {
  a,
  b
}

// 正确
exports.b = b
exports.a = a
```

## 2 解决办法

方法一 通过 `reactive` 创建一个响应式对象，对象的属性是数组

```js
const state = reactive({
  arr: [1, 2, 3]
})

function handleClick() {
  state.arr = [4, 5, 6]
}
```

方法二 使用 ref

```js
const arr = ref([1, 2, 3])

function handleClick() {
  arr.value = [4, 5, 6]
}
```

推荐使用方法一，平时开发时，最好将组件中所有状态都作为一个对象的属性，然后用 `reactive` 包裹这个对象（如下），这样做的好处有：

- 所有状态数据写在一个地方，便于管理、查找。
- 解决了本文中所描述的问题，即可以对状态直接赋值而不用担心视图不变化。

这样做的缺点是，对于组合式API语法糖写法（`<script setup>`），如果想在模板中使用状态，都必须得带上`state.`，多写了些代码，有点麻烦。

```js
const state = reactive({
  num: 0,
  info: {
    name: 'Jack',
    age: 20
  }
  arr: [1, 2, 3]
})
```
