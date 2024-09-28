# baseUrl、paths

## baseUrl

`baseUrl` 是 TypeScript 编译器选项中的一个设置，它指定了基础目录，用于解析非相对模块名。相对模块不会受到 `baseUrl` 的影响。下面通过示例来说明：

```
|-- ts-demo
    |-- .gitignore
    |-- ex.ts
    |-- package.json
    |-- pnpm-lock.yaml
    |-- tsconfig.json
    |-- hello
        |-- world.ts
```

::: code-group

```ts [hello/world.ts]
export const helloWorld = 'hell'
```

```ts [ex.ts]
import { helloWorld } from 'hello/world'

console.log(helloWorld)
```

:::

如果配置中的 `baseUrl` 为 `./`，ex.ts 文件通过 `path.resolve('./', 'hello/world')` 来解析模块名称 `hello/world`，故可以正确解析。

如果将 `baseUrl` 设为 `../`，则 ex.ts 文件无法通过 `path.resolve('../', 'hello/world')` 正确解析出模块 `hello/world`，从而报错：

![09](https://image.newarea.site/20230713/09.png)

## paths

[paths](https://www.typescriptlang.org/tsconfig#paths)

[Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)

用于设置模块名到基于 `baseUrl` 的路径映射，这种配置的好处是：

1. 简化导入语句，使其更短更清晰。
2. 避免使用很长的相对路径（如 `../../../../`）。
3. 如果你移动文件位置，只需要更新 `paths` 配置，而不是修改所有导入语句。

下面通过示例来说明：

```
|-- ts-demo
    |-- .gitignore
    |-- ex.ts
    |-- package.json
    |-- pnpm-lock.yaml
    |-- tsconfig.json
    |-- hello
        |-- world.ts
```

::: code-group

```ts [hello/world.ts]
export const helloWorld = 'hell'
```

```ts [ex.ts]
import { helloWorld } from '@/world'

console.log(helloWorld)
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["hello/*"]
    }
  }
}
```

:::

### 应用

在 vite 创建的项目中如果配置了模块解析别名，需要通过 compilerOptions.paths 选项为 TypeScript 再配置一遍

::: code-group

```ts [vite.config.ts]
resolve: {
  alias: [
    {
      find: '@',
      replacement: resolve(__dirname, './src'),
    }
  ]
}
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

:::
