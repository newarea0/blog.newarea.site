# type、interface

[Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

```ts
// 类型别名
type g = {
  name: string,
  age: number
}

// 接口
interface Girl {
  name: string;
  age: number
}
```

书写上的区别：
- 类型别名通过`type`关键字定义，而接口通过`interface`定义;
- 类型别名后面需要跟上`=`，而接口不需要;
- 类型别名中使用的是`,`，而接口是`;`

关键区别在于，与始终可扩展的接口相比，类型别名无法重新打开以添加​​新属性。

## 1 接口

### 1.1 新增属性

新建一个新接口继承已有接口

```ts
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear: Bear = getBear() 
bear.name
bear.honey
```

新建一个新接口继承已有类型

```ts
type Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}
```

向已有接口添加新字段

```ts
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```

### 1.2 修改属性

无法**修改**已有接口中某属性的类型，下面写法是错误的

```ts
interface Foo {
    age: number
    address: string
}
interface Foo {
    address: number
}
```

错误信息如下

![10](https://image.newarea.site/20230713/10.png)

但是像下面这样写是没问题的

```ts
interface Foo {
    age: number
    address: string
}
interface Foo {
    address: string
}
```

## 2 类型

### 2.1 新增属性

通过 `&` 新建一个新类型扩展已有类型

```ts
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}

const bear: Bear = getBear();
bear.name;
bear.honey;
```

### 2.2 修改属性

使用 `Omit` 和 `&`

```ts
type A = {
    age: number,
    address: string
}

type B = Omit<A, 'age'> & {
    age: string
}
```

虽然下面写法不报错，但不管位置1处写的什么类型，类型 B 中属性 age 的类型始终是 `number`。

```ts
type A = {
    age: number,
    address: string
}

type B = A & {
    age: string // 位置1
}
```

**注意：**

类型别名创建后无法更改

```ts
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}

 // Error: Duplicate identifier 'Window'.
```
