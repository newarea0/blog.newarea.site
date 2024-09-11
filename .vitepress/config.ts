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
  title: '码农备忘录',
  description: 'A VitePress Site',
  outDir: './dist',
  lastUpdated: true,
  useWebFonts: false,
  cleanUrls: true,
  ignoreDeadLinks: true,
  markdown: {
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'shortcut icon', href: '/logo.svg' }],
  ],
  lang: 'zh',
  themeConfig: {
    nav: getNav(navs),
    sidebar: getSidebar(navs),
    search: {
      provider: 'algolia',
      options: {
        appId: 'O3PGAL8Q97',
        apiKey: 'ad89508a7d20babe5afcb122c781aa4e',
        indexName: 'newarea',
        placeholder: '搜索文档',
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            searchBox: {
              resetButtonTitle: '清除查询条件',
              resetButtonAriaLabel: '清除查询条件',
              cancelButtonText: '取消',
              cancelButtonAriaLabel: '取消',
            },
            startScreen: {
              recentSearchesTitle: '搜索历史',
              noRecentSearchesText: '没有搜索历史',
              saveRecentSearchButtonTitle: '保存至搜索历史',
              removeRecentSearchButtonTitle: '从搜索历史中移除',
              favoriteSearchesTitle: '收藏',
              removeFavoriteSearchButtonTitle: '从收藏中移除',
            },
            errorScreen: {
              titleText: '无法获取结果',
              helpText: '你可能需要检查你的网络连接',
            },
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
              searchByText: '搜索提供者',
            },
            noResultsScreen: {
              noResultsText: '无法找到相关结果',
              suggestedQueryText: '你可以尝试查询',
              reportMissingResultsText: '你认为该查询应该有结果？',
              reportMissingResultsLinkText: '点击反馈',
            },
          },
        },
      },
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
      copyright: `<a target="_blank" href="https://beian.miit.gov.cn/">粤ICP备2023127875号-1</a> | 版权所有 © 2024 <a target="_blank" href="${github}">stormzhangbx</a>`,
    },
  },
})
