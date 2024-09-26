# vxe-table

[vxe-table-demo](https://github.com/xuliangzhan/vxe-table-demo)

## 全局引入

```js
// src/plugins/vxe-table.js
import { App } from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

// 全局默认参数
VXETable.setup({
  version: 0,
  zIndex: 100,
  table: {
    autoResize: true
  }
})

export function useTable (app: App) {
  app.use(VXETable)
}
```

```js
// src/main
import { createApp } from 'vue'
import App from './App.vue'

import { useTable } from './plugins/vxe-table'

createApp(App).use(useTable).mount('#app')
```

## 按需引入（使用 Vite）

安装 vite 插件，配置插件

```
npm vite-plugin-style-import -D
```

修改 vite.config.ts 配置文件

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vxe-table',
          esModule: true,
          resolveComponent: (name) => `vxe-table/es/${name}`,
          resolveStyle: (name) => `vxe-table/es/${name}/style.css`
        }
      ]
    })
  ]
})
```

```js
// src/plugins/vxe-table
import { App } from 'vue'
import XEUtils from 'xe-utils'
import {
  VXETable,
  Header,
  Icon,
  Column,
  Table
} from 'vxe-table'
import zhCNLocat from 'vxe-table/es/locale/lang/zh-CN'

// 全局默认参数
VXETable.setup({
  version: 0,
  zIndex: 100,
  table: {
    autoResize: true
  }
})

// 导入默认的国际化（如果项目中使用多语言，则应该导入到 vue-i18n 中）
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCNLocat, key), args)
})

export function useTable (app: App) {
  app.use(Header)
    .use(Icon)
    .use(Column)
    .use(Table)
}
```

```js
// src/main
import { createApp } from 'vue'
import App from './App.vue'

import { useTable } from './plugins/vxe-table'

createApp(App).use(useTable).mount('#app')
```
