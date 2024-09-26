import type { DefaultTheme } from 'vitepress'

export const frameworkSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Vue',
    collapsed: false,
    items: [
      { text: 'jsx', link: '/Vue/jsx' },
      { text: 'nextTick', link: '/Vue/nextTick' },
      {
        text: 'Pinia',
        collapsed: true,
        items: [
          { text: 'Pinia', link: '/Vue/Pinia/Pinia' },
          { text: '在组件外使用 Pinia', link: '/Vue/Pinia/在组件外使用 Pinia' },
          { text: '持久化', link: '/Vue/Pinia/持久化' },
        ],
      },
      {
        text: 'reactivity',
        collapsed: true,
        items: [
          { text: 'reactive', link: '/Vue/reactivity/reactive' },
          { text: 'ref 和 reactive 的区别', link: '/Vue/reactivity/ref 和 reactive 的区别' },
          { text: 'ref 自动解包', link: '/Vue/reactivity/ref 自动解包' },
          { text: 'toRef 和 toRefs', link: '/Vue/reactivity/toRef 和 toRefs' },
          { text: '如何对 reactive 定义的数组进行赋值', link: '/Vue/reactivity/如何对 reactive 定义的数组进行赋值' },
        ],
      },
      {
        text: 'v-model',
        collapsed: true,
        items: [
          { text: 'transfer-basic-type-data', link: '/Vue/v-model/transfer-basic-type-data' },
          { text: 'transfer-reference-type-data', link: '/Vue/v-model/transfer-reference-type-data' },
        ],
      },
      {
        text: 'Vue Router',
        collapsed: true,
        items: [
          { text: 'meta', link: '/Vue/Vue Router/meta' },
          { text: '常用类型', link: '/Vue/Vue Router/常用类型' },
          { text: '组合式 API', link: '/Vue/Vue Router/组合式 API' },
          { text: '重定向、别名、替换', link: '/Vue/Vue Router/重定向、别名、替换' },
        ],
      },
      { text: 'Vue3 不同构建版本的区别', link: '/Vue/Vue3 不同构建版本的区别' },
      {
        text: 'watch',
        collapsed: true,
        items: [
          { text: '注意', link: '/Vue/watch/注意' },
          { text: '监听 prop', link: '/Vue/watch/监听 prop' },
          { text: '监听', link: '/Vue/watch/监听' },
        ],
      },
      { text: '常用类型', link: '/Vue/常用类型' },
      {
        text: '渲染函数',
        collapsed: true,
        items: [
          { text: '函数式组件', link: '/Vue/渲染函数/函数式组件' },
          { text: '渲染函数', link: '/Vue/渲染函数/渲染函数' },
        ],
      },
      {
        text: '源码',
        collapsed: true,
        items: [
          { text: 'diff', link: '/Vue/源码/diff' },
          { text: 'jest', link: '/Vue/源码/jest' },
          { text: 'mini-vue', link: '/Vue/源码/mini-vue' },
          { text: 'proxy-defineProperty', link: '/Vue/源码/proxy-defineProperty' },
          { text: 'source-code-structure', link: '/Vue/源码/source-code-structure' },
          { text: 'using-a-function-alone', link: '/Vue/源码/using-a-function-alone' },
          { text: 'virtual-dom', link: '/Vue/源码/virtual-dom' },
        ],
      },
      {
        text: '组件间通信',
        collapsed: true,
        items: [
          { text: 'provide 和 inject', link: '/Vue/组件间通信/provide 和 inject' },
          { text: '总结', link: '/Vue/组件间通信/总结' },
        ],
      },
      { text: '组合式函数', link: '/Vue/组合式函数' },
      { text: '解决props值无法赋值给data的问题', link: '/Vue/解决props值无法赋值给data的问题' },
      {
        text: '透传属性',
        collapsed: true,
        items: [
          { text: '巧用 v-bind、v-on', link: '/Vue/透传属性/巧用 v-bind、v-on' },
          { text: '透传', link: '/Vue/透传属性/透传' },
        ],
      },
    ],
  },
  {
    text: 'React',
    collapsed: true,
    items: [
      {
        text: 'Ant Design',
        collapsed: true,
        items: [
          { text: 'form', link: '/React/Ant Design/form' },
          { text: 'valuePropName', link: '/React/Ant Design/valuePropName' },
        ],
      },
      {
        text: 'Ant Design Pro',
        collapsed: true,
        items: [
          { text: 'basic', link: '/React/Ant Design Pro/basic' },
          { text: 'config-provider', link: '/React/Ant Design Pro/config-provider' },
          { text: 'i18n', link: '/React/Ant Design Pro/i18n' },
          { text: 'simple-model', link: '/React/Ant Design Pro/simple-model' },
          { text: 'tailwindcss', link: '/React/Ant Design Pro/tailwindcss' },
        ],
      },
      { text: 'index', link: '/React/index' },
      { text: 'JSX 语法', link: '/React/JSX 语法' },
      {
        text: 'React Hooks',
        collapsed: true,
        items: [
          { text: 'forward-ref', link: '/React/React Hooks/forward-ref' },
          { text: 'memo', link: '/React/React Hooks/memo' },
          { text: 'use-callback', link: '/React/React Hooks/use-callback' },
          { text: 'use-context', link: '/React/React Hooks/use-context' },
          { text: 'use-deferred-value', link: '/React/React Hooks/use-deferred-value' },
          { text: 'use-effect', link: '/React/React Hooks/use-effect' },
          { text: 'use-imperative-handle', link: '/React/React Hooks/use-imperative-handle' },
          { text: 'use-memo', link: '/React/React Hooks/use-memo' },
          { text: 'use-reducer', link: '/React/React Hooks/use-reducer' },
          { text: 'use-ref', link: '/React/React Hooks/use-ref' },
          { text: 'use-state', link: '/React/React Hooks/use-state' },
        ],
      },
      {
        text: 'React Router',
        collapsed: true,
        items: [
          { text: 'browser-router', link: '/React/React Router/browser-router' },
          { text: 'index', link: '/React/React Router/index' },
          { text: 'routes', link: '/React/React Router/routes' },
        ],
      },
      { text: 'React 生命周期', link: '/React/React 生命周期' },
      { text: 'React18 新特性', link: '/React/React18 新特性' },
      {
        text: 'scanalysis',
        collapsed: true,
        items: [
          { text: 'create-root', link: '/React/scanalysis/create-root' },
          { text: 'jsx', link: '/React/scanalysis/jsx' },
          { text: 'react-debugger', link: '/React/scanalysis/react-debugger' },
        ],
      },
      {
        text: 'Umi',
        collapsed: true,
        items: [
          { text: 'faq', link: '/React/Umi/faq' },
          { text: 'plugin', link: '/React/Umi/plugin' },
          { text: 'route', link: '/React/Umi/route' },
        ],
      },
      { text: '严格模式', link: '/React/严格模式' },
      { text: '代码分割', link: '/React/代码分割' },
      { text: '常用 VSCode React 代码片段', link: '/React/常用 VSCode React 代码片段' },
      { text: '父子组件的渲染顺序', link: '/React/父子组件的渲染顺序' },
    ],
  },
]
