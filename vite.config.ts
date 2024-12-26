import { dirname, join, resolve } from 'node:path'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import react from '@vitejs/plugin-react'
import MarkdownTransform from './.vitepress/plugins/vite-plugin-md-transform'

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '#': resolve(__dirname, './.vitepress'),
      },
    },
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
      ],
      include: ['mermaid'],
    },
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-highlight-targeted-heading',
        'ant-design-vue',
        '@ant-design/icons-svg',
        '@ant-design/icons-vue',
      ],
    },
    plugins: [
      react(),
      MarkdownTransform(),
      Components({
        dirs: './.vitepress/components/vue',
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: './.vitepress/components.d.ts',
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
  }
})
