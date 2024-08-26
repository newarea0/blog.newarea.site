# paths

[paths](https://www.typescriptlang.org/tsconfig#paths)

[Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)

用于设置模块名到基于 baseUrl 的路径映射

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

```ts
// hello/world.ts
export const helloWorld = 'hell'
```

```ts
// ex.ts
import { helloWorld } from '@/world'

console.log(helloWorld)
```

tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["hello/*"]
    }
  }
}
```

## 应用

在 vite 创建的项目中如果配置了模块解析别名，需要通过 compilerOptions.paths 选项为 TypeScript 再配置一遍

```ts
// vite.config.ts
resolve: {
  alias: [
    {
      find: '@',
      replacement: resolve(__dirname, './src'),
    }
  ]
}
```

tsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
