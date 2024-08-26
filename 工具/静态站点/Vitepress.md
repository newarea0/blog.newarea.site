# Vitepress

- 搜索
- 图片查看
- 评论
- pwa：[@vite-pwa/vitepress](https://vite-pwa-org.netlify.app/frameworks/vitepress)
- mermaid：[vitepress-plugin-mermaid](https://emersonbottero.github.io/vitepress-plugin-mermaid/guide/getting-started.html)
- 音乐


项目

- ESlint
- TypeScript
- GitHub Action

## 新建项目

新建一个 Node.js 项目 blog.newarea.site。

```sh
# 项目目录 blog.newarea.site
mk blog.newarea.site

cd blog.newarea.site

pnpm init

# 安装 VitePress
pnpm i -D vitepress

# 启动交互式安装向导
pnpm vitepress init
```

交互式安装向导：

```
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  Default Theme + Customization
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
└  Done! Now run npm run docs:dev and start writing.

Tips:
- Since you've chosen to customize the theme, you should also explicitly install vue as a dev dependency.
```

因为这是个全新的项目，所以对问题 “Where should VitePress initialize the config?” 使用默认答案 “./”。

问题 “Theme”，选择 “Default Theme + Customization”，方便自定义主题。

安装 Vue：

```sh
pnpm i vue
```

此时项目结构：

```
blog.newarea.site                          
├─ .vitepress             
│  ├─ theme              
│  │  ├─ index.ts        主题配置文件
│  │  └─ style.css       
│  └─ config.mts         配置文件 
├─ api-examples.md       
├─ index.md              
├─ markdown-examples.md  
├─ package.json             
└─ pnpm-lock.yaml                     
```

初始化 Git

```
git init
```

添加 Git 忽略文件 .gitignore，内容：

```
node_modules
.temp
docs/.vitepress/cache/
docs/.vitepress/dist/
docs/dist/
.vscode
cache
.eslintcache
components.d.ts
dist

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# json
meta.json
```

本地运行：

```
pnpm dev
```

## 修改 npm 脚本

- docs:dev -> dev
- docs:build -> build
- docs:preview -> preview

## 修改构建输出位置

项目的构建输出位置，相对于项目根目录。

```ts
export default defineConfig({
  outDir: './dist',
})
```

## 集成 ESLint

```sh
# 安装 ESLint
pnpm i eslint -D

# 启动安装 @antfu/eslint-config 会话
pnpm dlx @antfu/eslint-config@latest
```

修改 `package.json`，添加下面脚本：

```
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## 图片查看

这里有几种方式：

### 方式一：使用 Ant Design Vue 中的 [Image 图片](https://antdv.com/components/image-cn)

安装依赖：

```sh
pnpm i ant-design-vue
pnpm i unplugin-vue-components -D
```

新增文件 `.vitepress/plugin/vite-plugin-md-transform.ts`：

```ts
import type { Plugin } from 'vite'

/**
 * 转化md图片为a-image
 * @param mdContent
 * @returns
 */
export function convertMdImageToAImage(mdContent: string) {
  // 使用正则表达式匹配所有的 ![...](...) 格式的图片标签
  const regex = /!\[(.*?)\]\((.*?)\)/g

  // 使用正则表达式替换为 <a-image src="..." alt="..." /> 格式
  const convertedContent = mdContent.replace(
    regex,
    '<a-image src="$2" alt="$1" />',
  )
  return convertedContent
}

export default function vitePluginMdTransform(): Plugin {
  return {
    name: 'vite-plugin-md-transform',
    // 'pre', 'post', 和默认值；'pre' 会在其他插件转换之前执行，'post' 会在其他插件转换之后执行，只影响 transform 和 load 钩子的执行顺序
    enforce: 'pre',
    async transform(code, id) {
      // 筛选出当前预览的 md 文件
      if (!id.match(/\.md\b/))
        return null
      const [_name, i] = id.split('/').slice(-2)

      // 排除 docs/index.md 文件
      if (_name === 'docs' && i === 'index.md')
        return code

      // 排除 system 目录下的所有文件
      if (_name === 'system')
        return code

      // 将 md 文件中的图片转换为 Image 组件
      return convertMdImageToAImage(code)
    },
  }
}
```

./vitepress/config.mts

```ts
import { defineConfig } from 'vitepress'
import MarkdownTransform from './plugins/vite-plugin-md-transform'
import VueComponents from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [
      MarkdownTransform(),
      VueComponents({
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: '../components.d.ts',
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ]
  },
})
```

### 方式二：markdown-it-custom-attrs + Fancybox

[怎么给你的vitepress添加图片放大预览效果](https://blog.csdn.net/www1577791638/article/details/126091280)

### 方式三：medium-zoom

[Allow images to be zoomed in on click](https://github.com/vuejs/vitepress/issues/854)

## 搜索

[VuePress 博客优化之开启 Algolia 全文搜索](https://segmentfault.com/a/1190000041480102)

## Nólëbase 集成

### 阅读增强

[阅读增强](https://nolebase-integrations.ayaka.io/pages/zh-CN/integrations/vitepress-plugin-enhanced-readabilities/)
