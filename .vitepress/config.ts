import { defineConfig } from 'vitepress'
import { getNav, getSidebar } from './scripts/utils'

const github = 'https://github.com/stormzhangbx/blog.newarea.site'
const navs = [
  ['基础', '1.HTML/svg/basic'],
  ['框架', '1.Vue/常用类型'],
  ['工具', '宝塔面板/新建站点'],
  ['依赖', '客户端/Async%20Validate'],
  ['构建工具', '1.Vite/部署'],
  ['规范化', '中文排版'],
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '小晰博客',
  description: 'A VitePress Site',
  outDir: './dist',
  lastUpdated: true,
  useWebFonts: false,
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'shortcut icon', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }],
  ],
  themeConfig: {
    nav: getNav(navs),
    sidebar: getSidebar(navs),

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ],
    search: {
      provider: 'algolia',
      options: {
        appId: 'O3PGAL8Q97',
        apiKey: 'ad89508a7d20babe5afcb122c781aa4e',
        indexName: 'newarea',
      },
    },

    // footer: {
    //   message: `全链路学习网站，欢迎 <a target="_blank" style="color: var(--vp-c-brand)" href="${github}">star ⭐</a> 让更多人发现`,
    //   copyright: `<a target="_blank" href="https://beian.miit.gov.cn/">沪ICP备2023024648号-1</a> | 版权所有 © 2023 <a target="_blank" href="${github}">Anthony dapan</a>`,
    // },
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    lastUpdatedText: '最后一次更新于',
    outline: 'deep',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    returnToTopLabel: '返回顶部',
    outlineTitle: '大纲',
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '本页目录',
    editLink: {
      pattern: `${github}/blob/master/docs/:path`,
      text: '为此页提供修改建议',
    },
    socialLinks: [{ icon: 'github', link: github }],
  },
})
