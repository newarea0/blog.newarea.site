
[ambient](https://www.typescriptlang.org/docs/handbook/modules.html#working-with-other-javascript-libraries):

没有定义实现的声明

![01](https://image.newarea.site/20230714/01.png)

## 1 环境模块 [Ambient Modules](https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules)

@types/node

@types/node/url.d.ts

```ts
export interface Url {
  protocol?: string;
  hostname?: string;
  pathname?: string;
}
export function parse(
  urlStr: string,
  parseQueryString?,
  slashesDenoteHost?
): Url;
```

@types/node/path.d.ts

```ts
export function normalize(p: string): string;
export function join(...paths: any[]): string;
export var sep: string;
```

另一种写法是使用 `declare module` 将这些类型声明写在一个 `.d.ts` 文件中，它的结构类似于命名空间。

```ts
declare module "url" {
  export interface Url {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }
  export function parse(
    urlStr: string,
    parseQueryString?,
    slashesDenoteHost?
  ): Url;
}

declare module "path" {
  export function normalize(p: string): string;
  export function join(...paths: any[]): string;
  export var sep: string;
}
```

## 2 速记环境模块 [Shorthand ambient modules](https://www.typescriptlang.org/docs/handbook/modules.html#shorthand-ambient-modules)

如果不想在使用新模块之前花时间写声明，可以使用速记声明来快速上手。

declarations.d.ts

```ts
declare module "hot-new-module";
```

来自速记模块的所有导入都将具有any类型。

```ts
import x, { y } from "hot-new-module";
x(y);
```

## 3 通配符模块声明 [Wildcard module declarations](https://www.typescriptlang.org/docs/handbook/modules.html#wildcard-module-declarations)