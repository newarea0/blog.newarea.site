import { dirname, join, resolve } from 'node:path'
import { defineConfig } from 'vite'
import VueComponents from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import react from '@vitejs/plugin-react'
import MarkdownTransform from './.vitepress/plugins/vite-plugin-md-transform'

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '#': resolve(__dirname, './.vitepress'),
        // '#/components': resolve(__dirname, './.vitepress/components'),
      },
      // alias: [
      //   { find: '/@/', replacement: 'aaa' },
      // ],
    },
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        'vitepress',
      ],
    },
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-highlight-targeted-heading',
      ],
    },
    plugins: [
      react(),
      MarkdownTransform(),
      VueComponents({
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
