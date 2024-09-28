# extends

extends 关键字在 TypeScript 中经常用到，在不同场景下含义不同，总结如下：

## 1 表示继承

**继承父类的方法和属性**

Class 可以通过 extends 关键字实现继承

```js
class Animal {
  public name;
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `My name is ${this.name}`;
  }
}

class Cat extends Animal {
  public color;
  constructor(color) {
    this.color = color;
  }
}

let c = new Cat('Tom');
console.log(c.sayHi()); // Meow, My name is Tom
```

**继承某个类型**

```js
 interface Animal {
   kind: string;
 }
 
 interface Dog extends Animal {
   bark(): void;
 }
 // Dog => { name: string; bark(): void }
```


## 2 泛型约束

[Constraints](https://www.typescriptlang.org/docs/handbook/2/functions.html#constraints)

[约束（Constraints）](https://ts.yayujs.com/handbook/MoreOnFunctions.html#%E7%BA%A6%E6%9D%9F-constraints)

[TypeScript 泛型参数的默认值理解](https://blog.csdn.net/dizuncainiao/article/details/124295921)

[Generic parameter defaults](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html#generic-parameter-defaults)

在书写泛型的时候，我们往往需要对类型参数作一定的限制，比如希望传入的参数是一个对象数组，且数组的每一项是至少含有 name 属性（类型为 string），我们可以这么写：

```js
function getCnames<T extends { name: string }>(entities: T[]): string[] {
  return entities.map(entity => entity.name)
}
```

`T extends A` 表示用类型 A 对类型 T 进行约束，若类型 A 有 n 个约束条件，那么类型 T 至少也有这 n 个约束条件。

如 `T extends { name: string, age: number }` 表示 T 是一个对象，且**至少**含有属性name（类型为 string）、age（类型为 number），T 可以还包含其他属性。

## 3 条件类型

> `SomeType extends OtherType ? TrueType : FalseType;`

条件类型有点像 JavaScript 中的三元表达式，当左侧的类型符合右侧类型“约束”时，将在第一个分支（“真实”分支）中获得类型；否则，将在后一个分支（“假”分支）中获得类型。

```js
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
 
// Animal 表示需要有属性 live，而 Dog 有属性 live、woof，所以这里符合约束（套用“泛型约束”）
type Example1 = Dog extends Animal ? number : string;  // type Example1 = number
 
type Example2 = RegExp extends Animal ? number : string;  // type Example2 = string
```

```js
type Human = {
  name: string;
  occupation: string;
}
type Duck = {
  name: string;
}
type Bool = Duck extends Human ? 'yes' : 'no'; // type Bool = 'no'
```

可以发现此时类型 Bool 为 'no'，**这是因为 Duck 没有类型为 string 的 occupation 属性，类型 Duck 不满足类型 Human 的约束条件**

`Duck extends Human` 中 Human 约束了 Duck，表示 Duck 需要满足条件 “有两个属性name、Duck，且都是 string 类型”（**这跟泛型约束是一致的**），如果满足就取“真”类型，否则取“假”类型

```js
type Human = {
  name: string;
}
type Duck = {
  name: string;
  occupation: string;
}
type Bool = Duck extends Human ? 'yes' : 'no'; // type Bool = 'yes'
```

