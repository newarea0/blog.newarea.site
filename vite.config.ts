import { defineConfig } from 'vite'
import { dirname, join, resolve } from 'node:path'
import MarkdownTransform from './.vitepress/plugins/vite-plugin-md-transform'
import VueComponents from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { PageProperties, PagePropertiesMarkdownSection } from '@nolebase/vitepress-plugin-page-properties/vite'

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, './vitepress'),
      },
    },
    optimizeDeps: {
      exclude: [ 
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        'vitepress'
      ], 
    },
    ssr: { 
      noExternal: [ 
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-highlight-targeted-heading',
      ], 
    }, 
    plugins: [
      MarkdownTransform(),
      VueComponents({
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: '../components.d.ts',
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),

      PageProperties(),
      // PagePropertiesMarkdownSection({
      //   excludes: [
      //     join('pages', 'en', 'index.md'),
      //     join('pages', 'zh-CN', 'index.md'),
      //   ],
      // }),
    ],
    // 其他的配置...
  }
})