import type { DefaultTheme } from 'vitepress'

export const frameworkSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Vue',
    collapsed: true,
    items: [
      {
        text: '响应式',
        collapsed: true,
        items: [
          { text: 'reactive', link: 'Vue/响应式/reactive' },
          { text: 'ref 和 reactive 的区别', link: 'Vue/响应式/ref 和 reactive 的区别' },
          { text: 'ref 自动解包', link: 'Vue/响应式/ref 自动解包' },
          { text: 'toRef 和 toRefs', link: 'Vue/响应式/toRef 和 toRefs' },
          { text: '如何对 reactive 定义的数组进行赋值', link: 'Vue/响应式/如何对 reactive 定义的数组进行赋值' },
        ],
      },
      { text: 'nextTick', link: 'Vue/nextTick' },
      {
        text: 'v-model',
        collapsed: true,
        items: [
          { text: 'defineModel', link: 'Vue/v-model/defineModel' },
        ],
      },
      { text: 'Vue3 不同构建版本的区别', link: 'Vue/Vue3 不同构建版本的区别' },
      {
        text: 'watch',
        collapsed: true,
        items: [
          { text: '注意', link: 'Vue/watch/注意' },
          { text: '监听 prop', link: 'Vue/watch/监听 prop' },
          { text: '监听', link: 'Vue/watch/监听' },
        ],
      },
      {
        text: '组件间通信',
        collapsed: true,
        items: [
          { text: 'provide、inject', link: 'Vue/组件间通信/provide、inject' },
          { text: '总结', link: 'Vue/组件间通信/总结' },
        ],
      },
      { text: '组合式函数', link: 'Vue/组合式函数' },
      { text: '解决 props 值无法赋值给 data 的问题', link: 'Vue/解决 props 值无法赋值给 data 的问题' },
      {
        text: '透传属性',
        collapsed: true,
        items: [
          { text: '巧用 v-bind、v-on', link: 'Vue/透传属性/巧用 v-bind、v-on' },
          { text: '透传', link: 'Vue/透传属性/透传' },
        ],
      },
      { text: '常用类型', link: 'Vue/常用类型' },
      {
        text: '渲染函数',
        collapsed: true,
        items: [
          { text: '函数式组件', link: 'Vue/渲染函数/函数式组件' },
          { text: '渲染函数', link: 'Vue/渲染函数/渲染函数' },
        ],
      },
      { text: 'JSX', link: 'Vue/JSX' },
      {
        text: '源码',
        collapsed: true,
        items: [
          { text: 'diff', link: 'Vue/源码/diff' },
          { text: 'mini-vue', link: 'Vue/源码/mini-vue' },
          { text: 'proxy、defineProperty', link: 'Vue/源码/proxy、defineProperty' },
          { text: 'using-a-function-alone', link: 'Vue/源码/using-a-function-alone' },
          { text: '单独使用某个功能', link: 'Vue/源码/单独使用某个功能' },
          { text: '如何运行 Jest 单元测试', link: 'Vue/源码/如何运行 Jest 单元测试' },
          { text: '虚拟 DOM', link: 'Vue/源码/虚拟 DOM' },
        ],
      },

      // #region Vue 官方
      {
        text: 'Vue Router',
        collapsed: true,
        items: [
          { text: 'meta', link: 'Vue/Vue Router/meta' },
          { text: '常用类型', link: 'Vue/Vue Router/常用类型' },
          { text: '组合式 API', link: 'Vue/Vue Router/组合式 API' },
          { text: '重定向、别名、替换', link: 'Vue/Vue Router/重定向、别名、替换' },
        ],
      },
      {
        text: 'Pinia',
        collapsed: true,
        items: [
          { text: '概览', link: 'Vue/Pinia/概览' },
          { text: '在组件外使用 Pinia', link: 'Vue/Pinia/在组件外使用 Pinia' },
          { text: '持久化', link: 'Vue/Pinia/持久化' },
        ],
      },
      // #endregion

      // #region UI 组件库
      {
        text: 'Arco Design',
        collapsed: true,
        items: [
          { text: '全屏组件', link: 'Vue/Arco Design/全屏组件' },
          { text: '动态使用 Icon', link: 'Vue/Arco Design/动态使用 Icon' },
          { text: '抽离弹框组件', link: 'Vue/Arco Design/抽离弹框组件' },
        ],
      },
      {
        text: 'Element Plus',
        collapsed: true,
        items: [
          { text: '前端分页组件', link: 'Vue/Element Plus/前端分页组件' },
          { text: '动态设置 el-table 高度', link: 'Vue/Element Plus/动态设置 el-table 高度' },
          {
            text: '多条件过滤',
            collapsed: true,
            items: [
              { text: 'index', link: 'Vue/Element Plus/多条件过滤/index' },
            ],
          },
          { text: '封装弹框', link: 'Vue/Element Plus/封装弹框' },
        ],
      },
      {
        text: 'Vant',
        collapsed: true,
        items: [
          { text: 'pull-request', link: 'Vue/Vant/pull-request' },
          { text: 'toast', link: 'Vue/Vant/toast' },
        ],
      },
      {
        text: 'Vxe Table',
        collapsed: true,
        items: [
          { text: '基础', link: 'Vue/Vxe Table/基础' },
        ],
      },
      // #endregion
    ],
  },
  {
    text: 'React',
    collapsed: true,
    items: [
      { text: 'JSX 语法', link: 'React/JSX 语法' },
      {
        text: 'React Hooks',
        collapsed: true,
        items: [
          { text: 'useState', link: 'React/React Hooks/useState' },
          { text: 'useEffect', link: 'React/React Hooks/useEffect' },
          { text: 'useRef', link: 'React/React Hooks/useRef' },
          { text: 'forwardRef', link: 'React/React Hooks/forwardRef' },
          { text: 'createContext、useContext', link: 'React/React Hooks/createContext、useContext' },
          { text: 'useReducer', link: 'React/React Hooks/useReducer' },
          { text: 'memo', link: 'React/React Hooks/memo' },
          { text: 'useCallback', link: 'React/React Hooks/useCallback' },
          { text: 'useDeferredValue', link: 'React/React Hooks/useDeferredValue' },
          { text: 'useImperativeHandle', link: 'React/React Hooks/useImperativeHandle' },
          { text: 'useMemo', link: 'React/React Hooks/useMemo' },
        ],
      },
      { text: '生命周期', link: 'React/生命周期' },
      { text: 'React18 新特性', link: 'React/React18 新特性' },
      {
        text: 'React18 源码解析',
        collapsed: true,
        items: [
          { text: 'createRoot', link: 'React/React18 源码解析/createRoot' },
          { text: 'debugger', link: 'React/React18 源码解析/debugger' },
          { text: 'jsx', link: 'React/React18 源码解析/jsx' },
        ],
      },
      { text: '严格模式', link: 'React/严格模式' },
      { text: '代码分割', link: 'React/代码分割' },
      { text: '常用 VSCode React 代码片段', link: 'React/常用 VSCode React 代码片段' },
      { text: '父子组件的渲染顺序', link: 'React/父子组件的渲染顺序' },

      {
        text: 'React Router',
        collapsed: true,
        items: [
          { text: '概览', link: 'React/React Router/概览' },
          { text: 'BrowserRouter', link: 'React/React Router/BrowserRouter' },
        ],
      },

      {
        text: 'Umi',
        collapsed: true,
        items: [
          { text: '常见问题', link: 'React/Umi/常见问题' },
          { text: '插件', link: 'React/Umi/插件' },
          { text: '路由', link: 'React/Umi/路由' },
        ],
      },
      {
        text: 'Ant Design',
        collapsed: true,
        items: [
          { text: 'valuePropName', link: 'React/Ant Design/valuePropName' },
          { text: '几种获取表单数据的方式', link: 'React/Ant Design/几种获取表单数据的方式' },
        ],
      },
      {
        text: 'Ant Design Pro',
        collapsed: true,
        items: [
          { text: '概览', link: 'React/Ant Design Pro/概览' },
          { text: '使用 Tailwind CSS', link: 'React/Ant Design Pro/使用 Tailwind CSS' },
          { text: '国际化', link: 'React/Ant Design Pro/国际化' },
          { text: '如何设置 Ant Design 的全局配置', link: 'React/Ant Design Pro/如何设置 Ant Design 的全局配置' },
          { text: '简易数据流', link: 'React/Ant Design Pro/简易数据流' },
        ],
      },
    ],
  },

  { text: 'Nuxt、Next 和 Nest', link: 'Nuxt、Next 和 Nest' },
]
