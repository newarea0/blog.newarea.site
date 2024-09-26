# vite-plugin-style-import

[vite-plugin-style-import](https://github.com/vbenjs/vite-plugin-style-import)

unplugin-vue-components 只会识别模板（`<template></template>`）中出现的组件，不会处理用户在 script 中手动导入的组件，比如 Arco Design Vue 的 Message 组件。

```html
<script setup lang="ts">
  import { Message } from '@arco-design/web-vue'

  Message.success('hello')
</script>
```

可以发现页面中 Message 样式是乱的，显然是没有导入相应 CSS 样式。

```html
<script setup lang="ts">
  import { Message } from '@arco-design/web-vue'
  import '@arco-design/web-vue/es/message/style/css.js'

  Message.success('hello')
</script>
```

手动导入样式后显示就正常了，但是这种方式很麻烦，vite-plugin-style-import 就是解决这个问题的。

vite/plugins/style-import.ts

```ts
import { createStyleImportPlugin } from 'vite-plugin-style-import'

export default function createComponents() {
  return createStyleImportPlugin({
    libs: [
      {
        libraryName: '@arco-design/web-vue',
        esModule: true,
        resolveStyle: (name) => {
          // css
          return `@arco-design/web-vue/es/${name}/style/css.js`
          // less
          return `@arco-design/web-vue/es/${name}/style/index.js`
        },
      }
    ]
  })
}
```

## 完整引入和按需引入的区别

完整引入（全部组件和样式文件），打包后大小 2.17M

```ts
// main.ts
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

const app = createApp(App);
app.use(ArcoVue)
```

只引入 AButton 组件和全部样式，打包后大小1.09M

```ts
// main.ts
import '@arco-design/web-vue/dist/arco.css'
```

```html
<!-- src/views/foo.vue -->
<template>
  <a-button>hello</a-button>
</template>

<script setup lang="ts">
  import { Button as AButton } from '@arco-design/web-vue'
</script>
```