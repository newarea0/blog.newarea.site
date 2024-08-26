# unplugin-auto-import

[unplugin-auto-import|Github](https://github.com/antfu/unplugin-auto-import)

主要用于识别单文件组件文件 `<script></script>` 中来自 vue、vue-router、pinia 的属性和方法，自动导入它们，避免写一堆 import 语句。

使用了 unplugin-auto-import 后，下面代码：

```html
<script setup lang="ts">
  const count = ref(0)
</script>
```

相当于

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const count = ref(0)
</script>
```

vite/plugins/auto-import.ts

```ts
import autoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

export default function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      'pinia'
    ],
    dts: './src/types/auto-imports.d.ts',
    dirs: [
      './src/utils/composables/**'
    ],
    AutoImport({
      resolvers: [ArcoResolver()],
    })
  })
}
```
