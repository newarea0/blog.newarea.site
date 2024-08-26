# 使用对象或数组的值或键创建联合类型

## 前言

实际开发中我需要用到太多的键值对，并且有相当一部分情况下，键名是一个联合，而且还是某个数组的联合，然而早期 TS 对这样的联合实现并不是很理想。

这几天又翻了翻 Stack Overflow，发现很多新答案，对此整理一下。

_后面的内容最主要的是针对 TS 增加了 [字面量常量上下文表达式(Const contexts for literal expressions)](https://github.com/Microsoft/TypeScript/pull/29510) 而展开的，所以需了解下它，为了简化，后面简称为 **常量字面量。**_

**常量字面量确定了一个对象或数组的所有子级是只读的，也就是不可修改。**

比如声明一个常量：

```ts
const obj = {
  foo: "one",
  bar: "aaa",
};
```

默认情况下，这个对象的类型如下：

```ts
type Obj = {
  foo: string;
  bar: string;
};
```

因为常量是只读的，所以一般会这么做：

```ts
type Obj = Readonly<{
  foo: "one";
  bar: "aaa";
}>;

const obj: Obj = {
  foo: "one",
  bar: "aaa",
};
```

重复再写一遍，累死个人啦。

TS 把上面的这种完全常量的类型断言为常量字面量，可以使用 `const` 关键字来断言，比如：

```ts
const obj = <const>{
  foo: "one",
  bar: "aaa",
};
// or
const obj2 = {
  foo: "one",
  bar: "aaa",
} as const;
```

上面两种方式都可以把对象或者数组断言为常量字面量。

对象或者数组通过断言为常量字面量后，所有内部属性都是只读的，上面的类型为：

```ts
const obj: {
  readonly foo: "one";
  readonly bar: "aaa";
};
```

这个东西和联合有什么关系？

因为这些数据都是只读的，所以这些对象或者数组的值都会被定义为字面量，就比如：

```ts
// type is : string[]
const arr = ["foo", "bar", "baz"];

// type is : readonly ["foo", "bar", "baz"]
const arr2 = ["foo", "bar", "baz"] as const;
```

上面的代码中， `arr` 的类型是 `string[]`，但是 `arr2` 的类型就变为了一个只读元组 `readonly ["foo", "bar", "baz"]`，此时它的值是常量，并且元组本身只读。

好玩的来了，那么拿这个只读元组的值作为类型如何，比如：

```ts
const arr2 = ["foo", "bar", "baz"] as const;

// type is : "foo" | "bar" | "baz"
type Values = typeof arr2[number];
```

此时 `Values` 的类型将会成为只读元组 `arr2` 的值的联合。

接下来分析下常量字面量断言的应用。

## 使用字符串数组的值创建联合

比如现在有一个字符串数组如下：

```ts
const arr = ["foo", "bar", "baz"];

//现在我们需要根据数组的值来创建一个这样的联合：
type Keys = "foo" | "bar" | "baz";
```

可以这样定义这个联合：

```ts
const arr = <const>["foo", "bar", "baz"];

type Keys = typeof arr[number];
```

## 使用对象的键创建联合

使用对象的键创建联合：

```ts
const obj = {
  foo: 1,
  bar: 2,
  baz: 3,
} as const;

// 同上一节需要得到使用键名生成的联合，那么可以这样编写类型：
// type si : "foo" | "bar" | "baz";
type Keys = keyof typeof obj;
```

## 使用对象的值作为联合

有时候我们希望把对象的值作为一个联合，可以使用以下方法：

```ts
const obj = {
  k1: "foo",
  k2: "bar",
  k3: "baz",
} as const;

// type Keys = "foo" | "bar" | "baz"
type Keys = typeof obj[keyof typeof obj];
```

还有的特殊情况是辨识联合，比如一个对象数组如下

```ts
const objs = [
  { name: "foo", other: "something" },
  { name: "bar", other: "something" },
  { name: "baz", other: "something" },
];
```

此时我们需要使用这个对象数组中每项的 `name` 创建一个联合，那么可以这样实现：

```ts
const objs = [
  { name: "foo", other: "something" },
  { name: "bar", other: "something" },
  { name: "baz", other: "something" },
] as const;

// type Keys = "foo" | "bar" | "baz"
type Keys = typeof objs[number]["name"];
```

## 使用联合作为对象的键名

有时候需要反向操作，把一个联合作为一个对象的键名，比如以下需求：

```ts
const keys = ["foo", "bar", "baz"];
const obj = {};

keys.forEach((v) => (obj[v] = true));
```

此时 `obj` 的类型是 `string[]`，这明显不是我们预期的，因为程序运行结束 `obj` 的键名都是由 `keys` 数组的值映射的。

不过可以使用以下方式解决这个问题：

```ts
const keys = ["foo", "bar", "baz"] as const;

const obj: {
  [index in typeof keys[number]]?: boolean;
} = {};

keys.forEach((v) => (obj[v] = true));

// 此时 `obj` 的类型为：
// const obj: {
//   foo?: boolean;
//   bar?: boolean;
//   baz?: boolean;
// };
```

## 参考

[Convert array of strings to TypeScript type](https://stackoverflow.com/questions/52173855/convert-array-of-strings-to-typescript-type)

[Typescript: derive union type from array of objects](https://stackoverflow.com/questions/60496276/typescript-derive-union-type-from-array-of-objects)

[Typescript derive union type from tuple/array values](https://stackoverflow.com/questions/45251664/typescript-derive-union-type-from-tuple-array-values)
