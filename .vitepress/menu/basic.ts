import type { DefaultTheme } from 'vitepress'

export const basicSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'HTML',
    collapsed: true,
    items: [
      { text: 'contenteditable', link: 'HTML/contenteditable' },
      {
        text: 'SVG',
        collapsed: true,
        items: [
          { text: '概览', link: 'HTML/SVG/概览' },
          { text: 'fill、stroke', link: 'HTML/SVG/fill、stroke' },
          { text: 'SVG 雪碧图', link: 'HTML/SVG/SVG 雪碧图' },
          { text: 'viewbox', link: 'HTML/SVG/viewbox' },
          { text: '几种元素含义', link: 'HTML/SVG/几种元素含义' },
        ],
      },
      { text: 'preload、prefetch', link: 'HTML/preload、prefetch' },
      { text: '字符实体', link: 'HTML/字符实体' },
      { text: '拖放', link: 'HTML/拖放' },
      { text: 'async、defer', link: 'HTML/async、defer' },
    ],
  },
  {
    text: 'CSS',
    collapsed: true,
    items: [
      { text: 'currentColor', link: 'CSS/currentColor' },
      { text: 'filter', link: 'CSS/filter' },
      {
        text: 'flex',
        collapsed: true,
        items: [
          { text: '概览', link: 'CSS/flex/概览' },
          { text: 'flex 属性值简写', link: 'CSS/flex/flex 属性值简写' },
          { text: 'flex-basis', link: 'CSS/flex/flex-basis' },
          { text: 'flex-wrap、flex-shrink', link: 'CSS/flex/flex-wrap、flex-shrink' },
        ],
      },
      { text: '修改滚动条样式', link: 'CSS/修改滚动条样式' },
      { text: '背景', link: 'CSS/背景' },
    ],
  },
  {
    text: 'JS',
    collapsed: true,
    items: [
      {
        text: 'blob',
        collapsed: true,
        items: [
          { text: 'arraybuffer', link: 'JS/blob/arraybuffer' },
          { text: 'Blob URL 和 Data URL 的区别', link: 'JS/blob/Blob URL 和 Data URL 的区别' },
          { text: 'formdata', link: 'JS/blob/formdata' },
          { text: '使用文件', link: 'JS/blob/使用文件' },
          { text: '通过接口下载文件', link: 'JS/blob/通过接口下载文件' },
        ],
      },
      { text: 'break、continue', link: 'JS/break、continue' },
      { text: 'call、apply、bind', link: 'JS/call、apply、bind' },
      { text: 'decodeURI、decodeURIComponent', link: 'JS/decodeURI、decodeURIComponent' },
      { text: 'ECMAScript', link: 'JS/ECMAScript' },
      { text: 'for 循环', link: 'JS/for 循环' },
      {
        text: 'HTTP',
        collapsed: true,
        items: [
          { text: 'Content-Type', link: 'JS/HTTP/Content-Type' },
          { text: 'OPTIONS 请求方法', link: 'JS/HTTP/OPTIONS 请求方法' },
          { text: '传统项目解决跨域问题', link: 'JS/HTTP/传统项目解决跨域问题' },
          { text: '浏览器缓存机制', link: 'JS/HTTP/浏览器缓存机制' },
        ],
      },
      { text: 'JSON.stringify', link: 'JS/JSON.stringify' },
      { text: 'Math', link: 'JS/Math' },
      { text: 'mouseover、mouseenter', link: 'JS/mouseover、mouseenter' },
      { text: 'Number、parseInt、parseFloat', link: 'JS/Number、parseInt、parseFloat' },
      { text: 'Object.keys', link: 'JS/Object.keys' },
      { text: 'UrlEncode 编码', link: 'JS/UrlEncode 编码' },
      {
        text: '下载',
        collapsed: true,
        items: [
          { text: '概览', link: 'JS/下载/概览' },
        ],
      },
      {
        text: '事件',
        collapsed: true,
        items: [
          { text: 'input、change', link: 'JS/事件/input、change' },
          { text: '事件调用', link: 'JS/事件/事件调用' },
          { text: '捕获、冒泡', link: 'JS/事件/捕获、冒泡' },
        ],
      },
      {
        text: '位置',
        collapsed: true,
        items: [
          { text: 'pageX、pageY', link: 'JS/位置/pageX、pageY' },
          { text: 'screenX、screenY', link: 'JS/位置/screenX、screenY' },
        ],
      },
      { text: '修改页面内容', link: 'JS/修改页面内容' },
      {
        text: '函数',
        collapsed: true,
        items: [
          { text: '匿名函数', link: 'JS/函数/匿名函数' },
          { text: '立即执行函数', link: 'JS/函数/立即执行函数' },
        ],
      },
      { text: '各种符号', link: 'JS/各种符号' },
      { text: '图片', link: 'JS/图片' },
      {
        text: '尺寸',
        collapsed: true,
        items: [
          { text: 'clientHeight、scrollTop、scrollHeight', link: 'JS/尺寸/clientHeight、scrollTop、scrollHeight' },
          { text: 'getBoundingClientRect', link: 'JS/尺寸/getBoundingClientRect' },
          { text: 'js实现文章目录导航', link: 'JS/尺寸/js实现文章目录导航' },
          { text: 'offset', link: 'JS/尺寸/offset' },
          { text: '获取元素宽高', link: 'JS/尺寸/获取元素宽高' },
        ],
      },
      { text: '换行', link: 'JS/换行' },
      {
        text: '时间',
        collapsed: true,
        items: [
          { text: '日期 Date 兼容性', link: 'JS/时间/日期 Date 兼容性' },
          { text: '日期时间的获取与设置', link: 'JS/时间/日期时间的获取与设置' },
          { text: '时间戳', link: 'JS/时间/时间戳' },
        ],
      },
      {
        text: '模块',
        collapsed: true,
        items: [
          { text: 'ES6 模块', link: 'JS/模块/ES6 模块' },
          { text: '在 HTML 中使用 ES6 模块语法', link: 'JS/模块/在 HTML 中使用 ES6 模块语法' },
          { text: '模块顶级 await', link: 'JS/模块/模块顶级 await' },
        ],
      },
      {
        text: '模块化',
        collapsed: true,
        items: [
          { text: 'amd', link: 'JS/模块化/amd' },
          { text: 'cmd', link: 'JS/模块化/cmd' },
          { text: 'commonjs', link: 'JS/模块化/commonjs' },
          { text: 'ES6 模块', link: 'JS/模块化/ES6 模块' },
          { text: 'umd', link: 'JS/模块化/umd' },
        ],
      },
      {
        text: '正则',
        collapsed: true,
        items: [
          { text: '概览', link: 'JS/正则/概览' },
          { text: 'match', link: 'JS/正则/match' },
          { text: 'replace', link: 'JS/正则/replace' },
        ],
      },
      {
        text: '类',
        collapsed: true,
        items: [
          { text: 'constructor 方法', link: 'JS/类/constructor 方法' },
          { text: 'this 指向', link: 'JS/类/this 指向' },
        ],
      },
      { text: '类数组', link: 'JS/类数组' },
      { text: '继承与原型链', link: 'JS/继承与原型链' },
      { text: '递归', link: 'JS/递归' },
      { text: '遍历数组删除指定元素', link: 'JS/遍历数组删除指定元素' },
      { text: '闭包', link: 'JS/闭包' },
      { text: '防抖、节流', link: 'JS/防抖、节流' },
      { text: '事件循环机制', link: 'JS/事件循环机制' },
    ],
  },
  {
    text: 'NodeJS',
    collapsed: true,
    items: [
      { text: 'dirname', link: 'NodeJS/dirname' },
      { text: 'nvm', link: 'NodeJS/nvm' },
      { text: '使用 Node 实现一个文件上传接口', link: 'NodeJS/使用 Node 实现一个文件上传接口' },
      { text: '命令行参数', link: 'NodeJS/命令行参数' },
      { text: '模式匹配', link: 'NodeJS/模式匹配' },
      { text: '环境变量', link: 'NodeJS/环境变量' },
    ],
  },
  {
    text: 'NPM',
    collapsed: true,
    items: [
      { text: 'dependencies、devDependencies', link: 'NPM/dependencies、devDependencies' },
      { text: 'npm cli', link: 'NPM/npm cli' },
      { text: 'npm link', link: 'NPM/npm link' },
      { text: 'npm 包管理机制', link: 'NPM/npm 包管理机制' },
      { text: 'npx', link: 'NPM/npx' },
      { text: 'nvm-windows', link: 'NPM/nvm-windows' },
      { text: 'package-lock', link: 'NPM/package-lock' },
      {
        text: 'package.json',
        collapsed: true,
        items: [
          { text: 'module', link: 'NPM/package.json/module' },
          { text: 'peerdependencies', link: 'NPM/package.json/peerdependencies' },
          { text: 'type', link: 'NPM/package.json/type' },
          { text: 'types', link: 'NPM/package.json/types' },
          { text: 'unpkg', link: 'NPM/package.json/unpkg' },
        ],
      },
      { text: 'scripts-prepend-node-path', link: 'NPM/scripts-prepend-node-path' },
      { text: '使用 rollup 打造自己的 npm 包', link: 'NPM/使用 rollup 打造自己的 npm 包' },
      { text: '发布 npm 包', link: 'NPM/发布 npm 包' },
      { text: '完整性', link: 'NPM/完整性' },
      { text: '脚手架', link: 'NPM/脚手架' },
      { text: '配置', link: 'NPM/配置' },
    ],
  },
  {
    text: 'Pnpm',
    collapsed: true,
    items: [
      { text: 'monorepo', link: 'Pnpm/monorepo' },
      { text: 'node_modules 结构', link: 'Pnpm/node_modules 结构' },
      { text: '存储库 store', link: 'Pnpm/存储库 store' },
      { text: '安装及使用', link: 'Pnpm/安装及使用' },
      { text: '特点', link: 'Pnpm/特点' },
      { text: '配置', link: 'Pnpm/配置' },
    ],
  },
  {
    text: 'Tailwind CSS',
    collapsed: true,
    items: [
      { text: '任意值', link: 'Tailwind CSS/任意值' },
      { text: '使用方式', link: 'Tailwind CSS/使用方式' },
    ],
  },
  {
    text: 'TypeScript',
    collapsed: true,
    items: [
      {
        text: 'declaration',
        collapsed: true,
        items: [
          { text: 'declare-global', link: 'TypeScript/declaration/declare-global' },
          { text: 'declare-module', link: 'TypeScript/declaration/declare-module' },
          { text: 'declare-module1', link: 'TypeScript/declaration/declare-module1' },
          { text: 'declare-module2', link: 'TypeScript/declaration/declare-module2' },
          { text: 'declare', link: 'TypeScript/declaration/declare' },
          { text: 'generate-declaration-file-by-ts', link: 'TypeScript/declaration/generate-declaration-file-by-ts' },
          { text: 'use-a-dependency-without-declaration-file', link: 'TypeScript/declaration/use-a-dependency-without-declaration-file' },
        ],
      },
      { text: 'extends', link: 'TypeScript/extends' },
      { text: 'namespace', link: 'TypeScript/namespace' },
      { text: 'type、interface', link: 'TypeScript/type、interface' },
      { text: '仅仅导入类型', link: 'TypeScript/仅仅导入类型' },
      { text: '使用对象或数组的值或键创建联合类型', link: 'TypeScript/使用对象或数组的值或键创建联合类型' },
      { text: '全局模块、文件模块', link: 'TypeScript/全局模块、文件模块' },
      { text: '声明空间', link: 'TypeScript/声明空间' },
      { text: '字面量推断', link: 'TypeScript/字面量推断' },
      { text: '工具类型', link: 'TypeScript/工具类型' },
      { text: '常见符号', link: 'TypeScript/常见符号' },
      { text: '整合 ESLint', link: 'TypeScript/整合 ESLint' },
      { text: '概览', link: 'TypeScript/概览' },
      { text: '模块系统', link: 'TypeScript/模块系统' },
      { text: '类型判断式', link: 'TypeScript/类型判断式' },
      { text: '类型声明、类型推断、类型断言', link: 'TypeScript/类型声明、类型推断、类型断言' },
      { text: '类型操作', link: 'TypeScript/类型操作' },
      {
        text: '配置',
        collapsed: true,
        items: [
          { text: '概览', link: 'TypeScript/配置/概览' },
          { text: 'baseUrl、paths', link: 'TypeScript/配置/baseUrl、paths' },
          { text: 'esmoduleInterop', link: 'TypeScript/配置/esmoduleInterop' },
          { text: 'files、extends、include、exclude', link: 'TypeScript/配置/files、extends、include、exclude' },
          { text: 'isolatedmodules', link: 'TypeScript/配置/isolatedmodules' },
          { text: 'jsx', link: 'TypeScript/配置/jsx' },
          { text: 'lib', link: 'TypeScript/配置/lib' },
          { text: 'moduleresolution', link: 'TypeScript/配置/moduleresolution' },
          { text: 'nounusedlocals-nounusedparameters', link: 'TypeScript/配置/nounusedlocals-nounusedparameters' },
          { text: 'paths', link: 'TypeScript/配置/paths' },
          { text: 'references', link: 'TypeScript/配置/references' },
          { text: 'rootDir、out、outDir、outFile', link: 'TypeScript/配置/rootDir、out、outDir、outFile' },
          { text: 'strict', link: 'TypeScript/配置/strict' },
          { text: 'target', link: 'TypeScript/配置/target' },
          { text: 'target、module', link: 'TypeScript/配置/target、module' },
          { text: 'types', link: 'TypeScript/配置/types' },
        ],
      },
    ],
  },
]
