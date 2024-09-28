import type { DefaultTheme } from 'vitepress'

export const packageSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '客户端',
    collapsed: true,
    items: [
      { text: 'async-validator', link: '客户端/async-validator' },
      {
        text: 'Axios',
        collapsed: true,
        items: [
          { text: '概览', link: '客户端/Axios/概览' },
          { text: 'async、await', link: '客户端/Axios/async、await' },
          { text: 'qs', link: '客户端/Axios/qs' },
          { text: '传参', link: '客户端/Axios/传参' },
          { text: '拦截器', link: '客户端/Axios/拦截器' },
          { text: '过滤值为空字符串的参数', link: '客户端/Axios/过滤值为空字符串的参数' },
        ],
      },
      { text: 'Gitalk', link: '客户端/Gitalk' },
      { text: 'Highlight.js', link: '客户端/Highlight.js' },
      {
        text: 'Lodash',
        collapsed: true,
        items: [
          { text: 'lodash 和 lodash-es 区别', link: '客户端/Lodash/lodash 和 lodash-es 区别' },
          { text: 'Lodash', link: '客户端/Lodash/Lodash' },
          { text: '常用函数', link: '客户端/Lodash/常用函数' },
        ],
      },
      { text: 'Vue Flow', link: '客户端/Vue Flow' },
    ],
  },
  {
    text: 'NodeJs',
    collapsed: true,
    items: [
      { text: 'Chalk', link: 'NodeJs/Chalk' },
      { text: 'Color-convert', link: 'NodeJs/Color-convert' },
      { text: 'cross-env', link: 'NodeJs/cross-env' },
      { text: 'EJS', link: 'NodeJs/EJS' },
      { text: 'Exaca', link: 'NodeJs/Exaca' },
      {
        text: 'Express',
        collapsed: true,
        items: [
          { text: '概览', link: 'NodeJs/Express/概览' },
        ],
      },
      { text: 'fs-extra', link: 'NodeJs/fs-extra' },
      { text: 'inquire', link: 'NodeJs/inquire' },
      { text: 'mddir', link: 'NodeJs/mddir' },
      { text: 'nodemon', link: 'NodeJs/nodemon' },
    ],
  },
]
