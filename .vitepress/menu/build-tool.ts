import type { DefaultTheme } from 'vitepress'

export const buildToolSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Vite',
    collapsed: true,
    items: [
      { text: '依赖预构建', link: 'Vite/依赖预构建' },
      {
        text: '常用插件',
        collapsed: true,
        items: [
          { text: 'unplugin-auto-import', link: 'Vite/常用插件/unplugin-auto-import' },
          { text: 'unplugin-vue-components', link: 'Vite/常用插件/unplugin-vue-components' },
          { text: 'unplugin-icons', link: 'Vite/常用插件/unplugin-icons' },
          { text: 'vite-plugin-style-import', link: 'Vite/常用插件/vite-plugin-style-import' },
          { text: 'vite-plugin-svg-icons', link: 'Vite/常用插件/vite-plugin-svg-icons' },
        ],
      },
      { text: '开发环境和生产环境跨域解决', link: 'Vite/开发环境和生产环境跨域解决' },
      { text: '生产环境动态配置', link: 'Vite/生产环境动态配置' },
      { text: '通过修改 host 文件来切换接口服务', link: 'Vite/通过修改 host 文件来切换接口服务' },
      { text: '部署', link: 'Vite/部署' },
      { text: '配置总结', link: 'Vite/配置总结' },
    ],
  },
  {
    text: 'Parcel',
    collapsed: true,
    items: [
      { text: '与 Rollup 对比', link: 'Parcel/与 Rollup 对比' },
      { text: '零配置写前端项目', link: 'Parcel/零配置写前端项目' },
    ],
  },
  {
    text: 'Rollup',
    collapsed: true,
    items: [
      { text: '插件', link: 'Rollup/插件' },
      { text: '整合 ESLint', link: 'Rollup/整合 ESLint' },
      { text: '整合 TypeScript', link: 'Rollup/整合 TypeScript' },
      { text: '树摇', link: 'Rollup/树摇' },
      { text: '配置文件', link: 'Rollup/配置文件' },
    ],
  },
  {
    text: 'Turborepo',
    collapsed: true,
    items: [
      { text: '基础', link: 'Turborepo/基础' },
    ],
  },
]
