# 类型操作

通过组合各种类型操作符，我们可以以简洁、可维护的方式表达复杂的操作和值。在本节中，我们将介绍根据现有类型或值来表达新类型的方法。

- **泛型** - 带参数的类型
- **keyof 类型操作符** - 使用keyof操作符创建新类型
- **typeof 类型操作符** - 使用typeof操作符创建新类型
- **索引访问类型** - 使用Type['a']语法访问类型的子集
- **条件类型** - 类型类似于类型系统中的 if 语句
- **映射类型** - 通过映射现有类型中的每个属性来创建类型
- **模板文字类型** - 通过模板文字字符串更改属性的映射类型

## 1 泛型

指在定义函数、接口、类或类型的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

**泛型函数**

```ts
function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

**泛型接口**

```ts
interface Config<T>{
  (value:T):T;
}
function getData<T>(value:T):T{
  return value;
}
var myGetData:Config<string> = getData;
myGetData('10');
```

**泛型类**

```ts
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

**泛型类型**

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: <Type>(arg: Type) => Type = identity;
```

## 2 keyof

`keyof T` 表示类型T所有公共属性的字面量的联合类型，其返回类型是一个**联合类型**。

```ts
const COLORS = {
  red: 'red',
  blue: 'blue'
}

// 首先通过typeof操作符获取Colors变量的类型，然后通过keyof操作符获取该类型的所有键，
// 即字符串字面量联合类型 'red' | 'blue'
type Colors = keyof typeof COLORS 
let color: Colors;
color = 'red' // Ok
color = 'blue' // Ok

// Type '"yellow"' is not assignable to type '"red" | "blue"'.
color = 'yellow' // Error
```

## 3 typeof

TypeScript 扩展了 typeof 的作用，

JavaScript 中的 typeof，用法为 `typeof 变量名` 或者 `typeof 值`，返回一个字符串，如 `string`。

```ts
let message = 'hello'
console.log(typeof message)
console.log(typeof 'hello')
```

TypeScript 扩展的 typeof，用法为 `type T = typeof 变量名`，返回一个类型。

```ts
let message = 'hello'
type t1 = typeof message
type t2 = typeof typeof 'hello' // 报错 Identifier expected
```

## 4 索引访问类型

`T[K]` 表示对象 T 的属性K所表示的类型

```ts
let person = {
    name: 'musion',
    age: 35
}

function getValues(person: any, keys: string[]) {
    return keys.map(key => person[key])
}

console.log(getValues(person, ['name', 'age'])) // ['musion', 35]
console.log(getValues(person, ['gender'])) // [undefined]
```

在上述例子中，可以看到 `getValues(persion, ['gender'])` 打印出来的是`[undefined]`，但是 TS 编译器并没有给出报错信息，那么如何使用 TS 对这种模式进行类型约束呢？这里就要用到了索引访问类型，改造一下 getValues 函数:

```ts
function getValues<T, K extends keyof T>(person: T, keys: K[]): T[K][] {
  return keys.map(key => person[key]);
}

interface Person {
    name: string;
    age: number;
}

const person: Person = {
    name: 'musion',
    age: 35
}

getValues(person, ['name']) // ['musion']
getValues(person, ['gender']) // 报错：
// Argument of Type '"gender"[]' is not assignable to parameter of type '("name" | "age")[]'.
// Type "gender" is not assignable to type "name" | "age".
```

## 5 条件类型

> SomeType extends OtherType ? TrueType : FalseType;

条件类型有点像 JavaScript 中的三元表达式，当左侧的类型可分配给右侧的类型时，将在第一个分支（“真”分支）中获得类型；否则，将在后一个分支（“假”分支）中获得类型。

```js
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
 
type Example1 = Dog extends Animal ? number : string;  // type Example1 = number
 
type Example2 = RegExp extends Animal ? number : string;  // type Example2 = string
```

## 6 映射类型

TypeScript 提供了从旧类型中创建新类型的一种方式 — 映射类型。 在映射类型里，新类型以相同的形式去转换旧类型里每个属性。TS 内置了一些映射类型（实际上是一些语法糖），让我们可以方便地进行类型映射，可以在 TypeScript 包中的 typescript/lib/lib.es5.d.ts 中找到他们的定义：

```ts
// 将传入的属性变为只读选项
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
// 将传入的属性变为可选项：keyof T 拿到 T 所有属性名, 然后 in 进行遍历, 将值赋给 P, 最后 T[P] 取得相应属性的值.
type Partial<T> = {
    [P in keyof T]?: T[P];
}

// 使用
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```

## 7 模板文字类型

比如参数枚举值如下：

```
"top-left" | "top-center" | "top-right" | "middle-left" | "middle-center" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right"
```

如果全量列举每一个值，不仅繁琐，而且容易出错，此时模板文字类型就派上用场了:

```ts
type VerticalAlignment = "top" | "middle" | "bottom";
type HorizontalAlignment = "left" | "center" | "right";

declare function setToolTipPosition(value: `${VerticalAlignment}-${HorizontalAlignment}`): void;

setToolTipPosition("top-left");   // ok!
setToolTipPosition("top-middel"); // error!
setToolTipPosition("top-pot");    // error! 
```
