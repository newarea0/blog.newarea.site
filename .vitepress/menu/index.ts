import { basicSidebar } from './basic'
import { frameworkSidebar } from './framework'
import { packageSidebar } from './package'
import { buildToolSidebar } from './build-tool'
import { standardizationSidebar } from './standardization'
import { toolSidebar } from './tool'

// 导航栏
export const nav = [
  { text: '基础', link: '/基础/HTML/contenteditable', activeMatch: '/基础/' },
  { text: '框架', link: '/框架/Vue/响应式/reactive', activeMatch: '/框架/' },
  { text: '工具', link: '/工具/Docker/安装', activeMatch: '/工具/' },
  { text: '依赖包', link: '/依赖包/客户端/async-validator', activeMatch: '/依赖包/' },
  { text: '构建工具', link: '/构建工具/Vite/依赖预构建', activeMatch: '/构建工具/' },
  { text: '规范化', link: '/规范化/ESLint/概览', activeMatch: '/规范化/' },
  {
    text: '关于',
    items: [
      { text: '关于本站', link: '/关于/关于本站' },
      { text: '关于我', link: '/关于/关于我' },
    ],
  },
]

// 侧边栏
export const sidebar = {
  '/基础/': { base: '/基础/', items: basicSidebar },
  '/框架/': { base: '/框架/', items: frameworkSidebar },
  '/工具/': { base: '/工具/', items: toolSidebar },
  '/依赖包/': { base: '/依赖包/', items: packageSidebar },
  '/构建工具/': { base: '/构建工具/', items: buildToolSidebar },
  '/规范化/': { base: '/规范化/', items: standardizationSidebar },
}
