# unplugin-icons

[unplugin-icons](https://github.com/unplugin/unplugin-icons)

- 可以使用 **Iconify 图标**
- 只有用到的图标（包括 Iconify 图标、自定义图标）才会被打包进最终的构建产物
- 可以设置图标的尺寸、颜色，甚至添加动画
- 当 Iconify 图标不满足需求时，可以使用**自定义图标**
- 结合 unplugin-vue-components，**自动导入**，避免书写导入语句

下面以 [Vue3 + Vite](https://github.com/unplugin/unplugin-icons/tree/main/examples/vite-vue3) 为例说明 unplugin-icons 用法。

## 1 安装依赖

```shell
pnpm i unplugin-icons unplugin-vue-components -D
```

## 2 配置插件

修改配置文件 vite.config.ts

```ts
import Icon from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { defineConfig } from 'vite'
import IconResolver from 'unplugin-icons/resolver'
import components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Icon({
      compiler: 'vue3',
      // 自动检测项目中用到的 Iconify 图标集并安装，如当检测到代码中有 <IconMdiHome />，会自动安装 @iconify-json/mdi，相当于执行 pnpm i @iconify-json/mdi -D
      autoInstall: true,
      // 使用自定义图标
      customCollections: {
        // custom 表示自定义图标集合名，./src/assets/icons 表示自定义图标 SVG 目录
        custom: FileSystemIconLoader('./src/assets/icons', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
      },
    }),
    components({
      dts: './src/types/components.d.ts',
      resolvers: [
        // 如果不设置自动导入，则需要在 Vue 单文件组件中先手动导入图标（如 import IconMdiHome from '~icons/mdi/home、import IconCustomVue from '~icons/custom/vue'），再使用
        IconResolver({
          prefix: 'Icon',
          customCollections: ['custom'],
        }),
      ],
    })
    // 其他 Vite 插件配置...
  ],
})
```

## 3 使用图标

```vue
<template>
  <!-- 来自 Iconify 图标 -->
  <!-- 组件名规则：Icon + Iconify 集合名 + PascalCase 文件名 -->
  <IconMdiHome />
  <IconEpEdit />

  <!-- 来自自定义图标 -->
  <!-- 组件名规则：Icon + Custom（上面设定的集合名）+ PascalCase 文件名 -->
  <IconCustomVue />
</template>
```
