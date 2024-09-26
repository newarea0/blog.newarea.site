import type { DefaultTheme } from 'vitepress'

export const packageSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'NodeJs',
    collapsed: false,
    items: [
      { text: 'chalk', link: '/NodeJs/chalk' },
      { text: 'color-convert', link: '/NodeJs/color-convert' },
      { text: 'cross-env', link: '/NodeJs/cross-env' },
      { text: 'EJS', link: '/NodeJs/EJS' },
      { text: 'exaca', link: '/NodeJs/exaca' },
      {
        text: 'express',
        collapsed: true,
        items: [
          { text: 'basic', link: '/NodeJs/express/basic' },
        ],
      },
      { text: 'fs-extra', link: '/NodeJs/fs-extra' },
      { text: 'inquire', link: '/NodeJs/inquire' },
      { text: 'mddir', link: '/NodeJs/mddir' },
      { text: 'nodemon', link: '/NodeJs/nodemon' },
      { text: 'prettier', link: '/NodeJs/prettier' },
    ],
  },
  {
    text: '客户端',
    collapsed: true,
    items: [
      {
        text: 'Ant Design',
        collapsed: true,
        items: [
          { text: 'form', link: '/客户端/Ant Design/form' },
          { text: 'valuePropName', link: '/客户端/Ant Design/valuePropName' },
        ],
      },
      {
        text: 'Ant Design Pro',
        collapsed: true,
        items: [
          { text: 'basic', link: '/客户端/Ant Design Pro/basic' },
          { text: 'config-provider', link: '/客户端/Ant Design Pro/config-provider' },
          { text: 'i18n', link: '/客户端/Ant Design Pro/i18n' },
          { text: 'simple-model', link: '/客户端/Ant Design Pro/simple-model' },
          { text: 'tailwindcss', link: '/客户端/Ant Design Pro/tailwindcss' },
        ],
      },
      {
        text: 'Arco Design',
        collapsed: true,
        items: [
          { text: '全屏组件', link: '/客户端/Arco Design/全屏组件' },
          { text: '动态使用 Icon', link: '/客户端/Arco Design/动态使用 Icon' },
          { text: '抽离弹框组件', link: '/客户端/Arco Design/抽离弹框组件' },
        ],
      },
      { text: 'Async Validate', link: '/客户端/Async Validate' },
      {
        text: 'Axios',
        collapsed: true,
        items: [
          { text: 'async-await', link: '/客户端/Axios/async-await' },
          { text: 'axios', link: '/客户端/Axios/axios' },
          { text: 'basic', link: '/客户端/Axios/basic' },
          { text: 'filter-empty-string', link: '/客户端/Axios/filter-empty-string' },
          { text: 'interceptors', link: '/客户端/Axios/interceptors' },
          { text: 'qs', link: '/客户端/Axios/qs' },
        ],
      },
      {
        text: 'Element Plus',
        collapsed: true,
        items: [
          { text: '前端分页组件', link: '/客户端/Element Plus/前端分页组件' },
          { text: '动态设置 el-table 高度', link: '/客户端/Element Plus/动态设置 el-table 高度' },
          {
            text: '多条件过滤',
            collapsed: true,
            items: [
              { text: 'index', link: '/客户端/Element Plus/多条件过滤/index' },
            ],
          },
          { text: '封装弹框', link: '/客户端/Element Plus/封装弹框' },
        ],
      },
      { text: 'Gitalk', link: '/客户端/Gitalk' },
      { text: 'Highlight.js', link: '/客户端/Highlight.js' },
      {
        text: 'Lodash',
        collapsed: true,
        items: [
          { text: 'lodash 和 lodash-es 区别', link: '/客户端/Lodash/lodash 和 lodash-es 区别' },
          { text: 'Lodash', link: '/客户端/Lodash/Lodash' },
          { text: '常用函数', link: '/客户端/Lodash/常用函数' },
        ],
      },
      {
        text: 'Vant',
        collapsed: true,
        items: [
          { text: 'pull-request', link: '/客户端/Vant/pull-request' },
          { text: 'toast', link: '/客户端/Vant/toast' },
        ],
      },
      { text: 'Vue Flow', link: '/客户端/Vue Flow' },
      {
        text: 'Vxe Table',
        collapsed: true,
        items: [
          { text: '基础', link: '/客户端/Vxe Table/基础' },
        ],
      },
    ],
  },
]
