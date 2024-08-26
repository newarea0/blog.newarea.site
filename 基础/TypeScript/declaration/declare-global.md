# 声明文件中 declare global 的作用

[Global augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#global-augmentation)

声明文件要么是全局文件，要么是模块文件，其他文件在使用声明文件时

- 如果声明文件是全局文件，类型不需要导入，可以直接使用
- 如果声明文件是模块文件，需先导入类型，再使用

例子：

```
|-- ts-demo
    |-- index.ts
    |-- package.json
    |-- pnpm-lock.yaml
    |-- tsconfig.json
    |-- types
        |-- global.d.ts
```

```ts
// index.ts
function add(p1: Person, p2: Person) {
  return p1.age + p2.age
}
```

为了让 `index.ts` 的类型 `Person` 编译时能得到正确的解析，类型声明文件 `global.d.ts` 既可以写成全局文件，也可以写成模块文件（**`global.d.ts` 通常是全局文件，见名知意**）

写成全局文件

```ts
// global.d.ts
declare interface Person {
  age: number
  name: string
}
```

写成模块文件，在模块内部添加声明到全局作用域中

```ts
declare global {
  declare interface Person {
    age: number
    name: string
  }
}

export {}
```

**在 `d.ts` 声明文件中，任何的 `declare` 默认就是 `global` 的了，所以你在 `d.ts` 文件中是不能出现 `declare global` 的。只有在模块文件中的定义，如果想要全局就使用 `declare global`**

所以在项目中出现的类型声明文件只用两种类型：

**全局文件**

```ts
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type RefType<T> = T | null;
```

**模块文件**

```ts
import type { ComputedRef, Ref } from 'vue';

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>;
};
```