# 类型声明、类型推断、类型断言

## 1 类型注解

[Type Annotations on Variables|TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-annotations-on-variables)

或者叫做类型声明，通过类型注解（Type Annotations），可以**显式**的给变量、函数参数、函数返回值**指定**类型，如：

```ts
let myName: string = 'Alice'
```

有时类型注解是没必要的，TypeScript 通过类型推断可以自动推断出类型，如：

```ts
// 不需要类型注解，变量 myName 的类型被自动推断为 string
let myName = 'Alice'
```

## 2 类型推断

[Type Inference|TypeScript](https://www.typescriptlang.org/docs/handbook/type-inference.html)

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

以下代码虽然没有指定类型，但是会在编译的时候报错：

```ts
let myFavoriteNumber = 'seven'
myFavoriteNumber = 7 // 不能将类型“number”分配给类型“string”。ts(2322)
```

**如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型**，如：

```ts
let myFavoriteNumber
myFavoriteNumber = 'seven'
myFavoriteNumber = 7
```

## 3 类型断言

[Type Assertions|TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)

类型断言（Type Assertion）可以用来手动指定一个**值**的类型。

```ts
interface Cat {
  name: string
  run(): void
}
interface Fish {
  name: string
  swim(): void
}

function isFish(animal: Cat | Fish) {
  if (typeof animal.swim === 'function') { // 类型“Cat | Fish”上不存在属性“swim”。类型“Cat”上不存在属性“swim”。ts(2339
    return true
  }
  return false
}
```

上面的例子中，编译 animal.swim 的时候会报错。此时可以使用类型断言，将 `animal` 断言成 `Fish`：

```ts
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true
  }
  return false
}
```

注意，类型断言只能够“欺骗” TypeScript 编译器，无法避免运行时的错误，滥用类型断言可能会导致运行时错误：

```ts
interface Cat {
  name: string
  run(): void
}
interface Fish {
  name: string
  swim(): void
}

function swim(animal: Cat | Fish) {
  (animal as Fish).swim()
}

const tom: Cat = {
  name: 'Tom',
  run() { console.log('run') }
}
swim(tom)
```

上面的例子编译时不会报错，但在运行时会报错：`Uncaught TypeError: animal.swim is not a function`
