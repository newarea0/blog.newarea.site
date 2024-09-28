# strict

通过 `tsc --init` 生成的配置文件 tsconfig.json 中默认开启了严格模式 `"strict": true`

严格模式会启用下面8个编译选项：

- alwaysStrict
- strictBindCallApply
- strictFunctionTypes
- strictNullChecks
- strictPropertyInitialization
- noImplicitAny
- noImplicitThis
- useUnknownInCatchVariables

上面选项，当 `strict` 开启情况下默认值为 `true`，否则默认值 `false`。每个通过 `strict` 开启的选项都可以被单独设置。如：

```json
{
  "strict": true,
  "noImplicit": false
}
```

未来的 Typescript 版本可能会添加更多的类型检查选项到这个集合中。这意味着你不用跟踪每一次的 Typescript 发布使得你的项目能启用新的严格检查相关的选项。如果新的选项被添加到上面的集合中，只要升级了你项目的 Typescript 版本它们就会被自动激活。

## 1 alwaysStrict

> 总是生成 `"use strict"`。

在编译后的 js 文件头部生成 `"use strict"`，开启 ES5 的[严格模式|MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)。

## 2 strictBindCallApply

当使用 `call`、`bind`、`apply` 调用函数时，提供正确的类型检查。

如：

```ts
function fn(x: string) {
  return parseInt(x);
}
 
const n2 = fn.call(undefined, false);
```

未开启 `strictBindCallApply`，以上代码编译时不报错，但在运行时会报错。

开启后，TypeScript 会报错 `Argument of type 'boolean' is not assignable to parameter of type 'string'.`。

## 3 strictFunctionTypes

对函数参数类型严格把控。

如：

```ts
function fn(x: string) {
  console.log("Hello, " + x.toLowerCase());
}
 
type StringOrNumberFunc = (ns: string | number) => void;
 
let func: StringOrNumberFunc = fn;
func(10);
```

未开启 `strictFunctionTypes`，以上代码编译时不报错，但在运行时会报错。

开启后，TypeScript 会报错。

## 4 strictNullChecks

未开启 `strictNullChecks` 时，可以将 `null`、`undefined` 赋值给 `number`、`string` 类型的变量，如：

```ts
let userName: string;
userName = undefined; // OK
const chars = userName.split('')
```

使用值为 `null`、`undefined` 的变量时容易引起“空指针”问题，以上代码编译时不报错，但在运行时会报错：`Uncaught TypeError: Cannot read properties of undefined (reading 'split')`

开启后，以上代码会报错：

```ts
let userName: string;
userName = undefined; // 不能将类型“undefined”分配给类型“string”。ts(2322)
userName.split('')
```

## 5 strictPropertyInitialization

开启后，TypeScript 会检查**类**属性是否需要初始化(可以理解为初始值)，当需要初始化的属性未初始化时，抛出错误，如：

```ts
class UserAccount {
  name: string;
  accountType = "user";
  email: string;  // error，email未初始化
  address: string | undefined;

  constructor(name: string) {
    this.name = name;
  }
}
```

- name 明确初始化
- accountType 已初始赋值（默认值）
- email 没有初始值，会抛出错误
- address 声明了 undefined 类型，也就意味着不需要初始赋值

## 6 noImplicitAny

> 禁止隐式的 `any` 类型。

在有些情况下，当一个变量没有类型注解（显示指定类型），也无法根据类型推断准确推断出类型，此时变量类型将被推断为 `any`，这可能会导致一些错误，如：

```ts
function fn(s) {
  console.log(s.subtr(3))
}
fn(42)
```

未开启 `noImplicitAn`，以上代码编译时不报错，但在运行时会报错。

开启后，当变量类型推断为 `any` 时，TypeScript 会报错。

## 7 noImplicitThis

## 8 useUnknownInCatchVariables

`try/catch` 中 `catch` 块的参数默认类型为 `any`, 当在代码块中使用参数时不会抛出任何问题，即潜在的的问题不会在编译期暴露出来，就会导致运行时错误。 当设置为 `true` 时，TypeScript 会将 `catch` 块中的参数类型设置为 `unknown`, 从而迫使用户增加类型约束，保证代码正确运行。

```ts
try {
  throw 123;
} catch(e) {
  console.log(e.message)
}
```

未开启 `useUnknownInCatchVariables`，上述代码编译不报错，但运行时会报错。

开启后，编译报错 `e 的类型是 unknown`。
