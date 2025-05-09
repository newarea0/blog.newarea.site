import type { DefaultTheme } from 'vitepress'

export const standardizationSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'ESLint',
    collapsed: true,
    items: [
      { text: '概览', link: 'ESLint/概览' },
      { text: 'eslint-config-inspector', link: 'ESLint/eslint-config-inspector' },
      { text: 'eslint-config', link: 'ESLint/eslint-config' },
      { text: 'eslint-stylistic', link: 'ESLint/eslint-stylistic' },
      { text: 'quick-start', link: 'ESLint/quick-start' },
      { text: '常用规则', link: 'ESLint/常用规则' },
      { text: '忽略规则', link: 'ESLint/忽略规则' },
      { text: '配置对象', link: 'ESLint/配置对象' },
    ],
  },
  {
    text: 'Prettier',
    collapsed: true,
    items: [
      { text: 'WebStorm 设置', link: 'Prettier/WebStorm 设置' },
      { text: '使用', link: 'Prettier/使用' },
      { text: '和 ESlint 的区别', link: 'Prettier/和 ESlint 的区别' },
      { text: '常用配置选项', link: 'Prettier/常用配置选项' },
      { text: '忽略文件', link: 'Prettier/忽略文件' },
      { text: '配置文件', link: 'Prettier/配置文件' },
    ],
  },
  { text: 'Commitizen', link: 'Commitizen' },
  { text: 'commitlint', link: 'commitlint' },
  { text: 'editorconfig', link: 'editorconfig' },
  { text: 'husky', link: 'husky' },
  { text: 'lint-staged', link: 'lint-staged' },
  { text: 'stylelint', link: 'stylelint' },
  { text: 'yorkie', link: 'yorkie' },
  {
    text: 'Vue 命令技巧',
    collapsed: true,
    items: [
      { text: '文件命令技巧', link: 'Vue 命令技巧/文件命令技巧' },
      { text: '代码命令技巧', link: 'Vue 命令技巧/代码命令技巧' },
    ],
  },
  { text: '工程命名规范', link: '工程命名规范' },
  { text: '中文排版', link: '中文排版' },
]
