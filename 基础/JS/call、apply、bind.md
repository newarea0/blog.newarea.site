# call、apply、bind

`call`、`apply` 和 `bind` 是 JavaScript 中用来控制函数调用时 `this` 指向的三个方法。它们都是 `Function` 对象的原型方法，可以用来改变函数上下文的 `this` 值，从而灵活地调用函数。三者之间有些相似，但在使用上也有一些区别。

## 1. **`call` 方法**

`call` 方法用于调用一个函数，并显式地指定函数内部的 `this` 指向。它接受的参数是一个对象作为 `this` 值，后续的参数作为调用函数的参数。

### 语法：
```javascript
func.call(thisArg, arg1, arg2, ...)
```

- **thisArg**: 指定函数内部 `this` 的指向。
- **arg1, arg2,...**: 传递给函数的参数。

### 示例：
```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`)
}

const person = { name: 'Alice' }
greet.call(person, 'Hello', '!') // 输出: "Hello, Alice!"
```

在这个例子中，`greet` 函数内部的 `this` 被设置为 `person` 对象，因此输出了 `person.name`。

## 2. **`apply` 方法**

`apply` 方法与 `call` 方法几乎相同，只是它接受的参数形式不同。`apply` 的第二个参数是一个数组或类数组对象，用来作为函数调用时的参数列表。

### 语法：
```javascript
func.apply(thisArg, [argsArray])
```

- **thisArg**: 指定函数内部 `this` 的指向。
- **argsArray**: 传递给函数的参数数组。

### 示例：
```javascript
function sum(a, b) {
  return a + b
}

const numbers = [5, 10]
console.log(sum.apply(null, numbers)) // 输出: 15
```

在这个例子中，`apply` 方法将数组 `numbers` 作为 `sum` 函数的参数传入，等效于 `sum(5, 10)`。

### 区别：
- **`call`** 需要逐个传递参数，而 **`apply`** 接受参数数组。

## 3. **`bind` 方法**

`bind` 方法会创建一个新的函数，并将原函数的 `this` 绑定到指定的对象。与 `call` 和 `apply` 不同的是，`bind` 并不会立即调用函数，而是返回一个新的函数，供后续调用。

### 语法：
```javascript
const boundFunc = func.bind(thisArg, arg1, arg2, ...)
```

- **thisArg**: 指定 `this` 的指向。
- **arg1, arg2,...**: 可以预设的部分参数，返回的函数调用时会先用这些参数。

### 示例：
```javascript
const person = {
  name: 'Bob',
  greet() {
    console.log(`Hello, ${this.name}`)
  }
}

const greetBob = person.greet.bind(person)
greetBob() // 输出: "Hello, Bob"
```

`bind` 创建了一个绑定了 `this` 为 `person` 的新函数 `greetBob`，即使在独立调用时，`this` 仍指向 `person`。

### 预设参数：
`bind` 还可以预设参数，这种机制叫做 **部分应用**（partial application）。
```javascript
function multiply(a, b) {
  return a * b
}

const double = multiply.bind(null, 2)
console.log(double(5)) // 输出: 10
```
在这个例子中，`double` 是一个预设了第一个参数 `a` 为 `2` 的新函数，调用时只需要传递第二个参数。

## 区别总结：

1. **`call`**：立即调用函数，参数逐个传递。
   - **用法**：`func.call(thisArg, arg1, arg2, ...)`

2. **`apply`**：立即调用函数，参数以数组形式传递。
   - **用法**：`func.apply(thisArg, [argsArray])`

3. **`bind`**：创建一个新的函数，并绑定 `this`，可以预设参数，但不会立即调用。
   - **用法**：`func.bind(thisArg, arg1, arg2, ...)`

## 使用场景：
- `call` 和 `apply`：常用于函数的即时调用，特别是当你需要改变 `this` 指向时。比如继承、借用方法等。
- `bind`：适合延迟调用函数，并确保 `this` 的正确指向。常见于事件处理函数、回调函数等。

这些方法可以让我们在函数调用时更灵活地控制 `this`，适应不同的场景。
