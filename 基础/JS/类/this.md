# this 的指向

printName 方法中的 this，默认指向 Logger 类的实例。如果将这个方法提取出来单独使用，this 会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是 undefined），从而导致找不到 print 方法而报错。

```js
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`)
  }
  print(text) {
    console.log(text)
  }
}
const logger = new Logger()
console.log(logger) // 一个空对象，原型上有printName、print方法

logger.printName() // Hello there

const { printName } = logger
printName() // Uncaught TypeError: Cannot read property 'print' of undefined
```

![01](https://image.newarea.site/20230803/01.png)


在构造函数中执行 `this.printName = this.printName.bind(this)`，使实例本身也具有 printName 方法，通过 bind 方法，实例本身的 printName 方法中的 this 被永久的绑定到 bind 方法的第一个参数（即实例本身），从而可以找到 print 方法。

```js
class Logger {
  constructor() {
    this.printName = this.printName.bind(this)
  }
  printName(name = 'there') {
    this.print(`Hello ${name}`)
  }
  print(text) {
    console.log(text)
  }
}
const logger = new Logger()
console.log(logger) // 一个有printName方法属性的对象，原型上有printName、print方法

logger.printName() // Hello there

const { printName } = logger
printName() // Hello there
```

![02](https://image.newarea.site/20230803/02.png)

## 类方法中的 this 指向问题

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  speak() {
    console.log(this.name)
  }
}
const p = new Person('Callback', 27)
p.speak(); // Callback

const f = p.speak
var name = 'Jack'
f() // Cannot read properties of undefined (reading 'name')
```

通常我们会认为方法内部的 `this` 指向调用这个方法的对象，通过 `Person` 的实例 `p` 调用 `speak()` 方法，其中的 `this` 就指向 p。后面将 `speak` 赋值给常量 `f`，按理说 `f()` 方法被调用时应该输出 `window` 对象的信息，但这里却是 `undefined`。

这是因为根据 JavaScript 的语法规则，**所有在类中定义的方法都默认开启局部严格模式**。**在严格模式下，函数中的 `this` 等于 `undefined`**。如：

```js
function fn() {
  console.log(this)
}
fn() // 输出 window 对象信息

function fn1() {
  'use strict'
  console.log(this)
}
fn1() // 输出 undefined
```

参考:

[JavaScript严格模式下关于this的几种指向详解](JavaScript严格模式下关于this的几种指向详解)
