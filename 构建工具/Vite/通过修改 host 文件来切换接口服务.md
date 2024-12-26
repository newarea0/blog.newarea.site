# 通过修改 host 文件来切换接口服务

本地开发时，如果要切换所连接的后端服务，之前的做法是修改 .env.development 中服务地址：

::: code-group

```env [.env.development]
# 服务1
# VITE_APP_URL = http://100.118.120.201:8060

# 服务2
VITE_APP_URL = http://100.118.120.106.com:8060
```

```ts [vite.config.ts]
proxy: {
  '/uimp': {
    [VITE_APP_BASE_API]: {
      target: `${VITE_APP_URL}/`,
      changeOrigin: true,
    },
  },
}
```

:::

## 更好的做法

更好的做法是修改 host 文件，而不是修改项目配置文件：

::: code-group

```host [host 文件]
# 服务1
# 100.118.120.201 localhost.dev.com

# 服务2
100.118.120.106 localhost.dev.com
```

```env [.env.development]
VITE_APP_URL = http://localhost.dev.com:8060
```

```env [.env]
VITE_APP_BASE_API = /api
```

```ts [vite.config.ts]
import { URL, fileURLToPath } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './packages/vite/plugins/index'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_BASE_API, VITE_APP_URL } = env

  return {
    plugins: createVitePlugins(),
    define: {
      'process.env': {},
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      open: '/login',
      proxy: {
        [VITE_APP_BASE_API]: {
          target: `${VITE_APP_URL}/`,
          changeOrigin: true,
        },
      },
    },
  }
})
```

:::

![](https://image.newarea.site/2024-07-08-16-55-00.png)
