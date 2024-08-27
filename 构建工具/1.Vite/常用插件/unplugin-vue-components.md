# unplugin-vue-components

[unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)

用于识别单文件组件 `<template></template>` 中的组件，包括自己写的组件（如src/components中的组件）和 第三方UI组件库中的组件，自动导入它们，避免写一堆 import 语句。

使用了 unplugin-vue-components 后，下面代码：

```html
<template>
  <a-button>hello</a-button>
</template>
```

相当于

```html
<template>
  <Button>hello</Button>
</template>

<script setup lang="ts">
  import { Button } from '@arco-design/web-vue'
  import '@arco-design/web-vue/es/button/style/css.js'
</script>
```

## 测试

### part 1

vite/plugins/components.ts

```ts
import components from 'unplugin-vue-components/vite'

export default function createComponents() {
  return components({
    dirs: ['src/components'],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: './src/types/components.d.ts',
    resolvers: [
      {
        type: 'component',
        resoleve: (name) => {
          console.log(111, name)
        }
      }
    ]
  })
}
```

src/App.vue

```html
<template>
  <div id="app">
    <hello-world />
    <a-button>hello</a-button>
    <RouterView />
  </div>
</template>
```

![](https://image.newarea.site/13.png)

### part 2

vite/plugins/components.ts

```ts
import components from 'unplugin-vue-components/vite'

export default function createComponents() {
  return components({
    dirs: ['src/components'],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: './src/types/components.d.ts',
    resolvers: [
      {
        type: 'component',
        resoleve: (name) => {
          console.log(111, name)
          // RouterView 是全局组件，无需引入程序也能识别，所有不用处理
          // HelloWorld 是测试用的，根本不存在
          // 这里只需处理 AButton，告诉程序如何查找 AButton，并引入相应组件样式
          if (name.match(/^A[A-Z]/)) {
            const importName = name.slice(1)
            return {
              name: importName,
              from: '@arco-design/web-vue',
              sideEffects: `@arco-design/web-vue/es/${kebabCase(importName)}/style/css.js`
            }
          }
        }
      }
    ]
  })
}
```

属性 name、from 的作用相当于 `import { Button } from '@arco-design/web-vue'`

属性 sideEffects 的作用相当于 `import '@arco-design/web-vue/es/button/style/css.js'`，这里只是示意，实际是不准确的，具体样式路径可以参考 [ArcoResolver](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/arco.ts) 中的 matchComponents。

### part 3

vite/plugins/components.ts

```ts
import components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

export default function createComponents() {
  return components({
    dirs: ['src/components'],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: './src/types/components.d.ts',
    resolvers: [
      ArcoResolver({
        sideEffect: true
      })
    ]
  })
}
```

实际上 unplugin-vue-components 已经提供了常见UI组件库的 resolver
