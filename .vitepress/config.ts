import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { getNav, getSidebar } from './scripts/utils'
import { description, github, title } from './scripts/meta'
import pwa from './scripts/pwa'
import algoliaOptions from './scripts/algolia'

const navs = [
  ['基础', '1.HTML/svg/basic'],
  ['框架', '1.Vue/常用类型'],
  ['工具', '宝塔面板/新建站点'],
  ['依赖', '客户端/Async%20Validate'],
  ['构建工具', '1.Vite/部署'],
  ['规范化', '中文排版'],
]

// https://vitepress.dev/reference/site-config
export default withPwa(defineConfig({
  title,
  description,
  outDir: './dist',
  lastUpdated: true,
  useWebFonts: false,
  cleanUrls: true,
  ignoreDeadLinks: true,
  markdown: {
    lineNumbers: true,
  },
  pwa,
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', sizes: '16x16 32x32 48x48', href: '/favicon/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
  ],
  lang: 'zh',
  themeConfig: {
    nav: getNav(navs),
    sidebar: getSidebar(navs),
    search: {
      provider: 'algolia',
      options: algoliaOptions,
    },
    logo: '/logo.svg',
    lastUpdatedText: '最后一次更新于',
    outline: 'deep',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    outlineTitle: '大纲',
    editLink: {
      pattern: `${github}/blob/master/docs/:path`,
      text: '为此页提供修改建议',
    },
    socialLinks: [{ icon: 'github', link: github }],
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '本页目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    footer: {
      message: `全链路学习网站，欢迎 <a target="_blank" style="color: var(--vp-c-brand)" href="${github}">star ⭐</a> 让更多人发现`,
      copyright: `<a target="_blank" href="https://beian.miit.gov.cn/">粤ICP备2023127875号-1</a> | 版权所有 © 2024`,
    },
  },
}))
