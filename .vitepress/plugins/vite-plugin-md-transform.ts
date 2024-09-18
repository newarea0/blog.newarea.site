import type { Plugin } from 'vite'
import {
  convertMdImageToAImage,
  generateTxt,
  getNoSSRComponents,
  replacer,
} from '../scripts/utils'

function vitePluginMdTransform(): Plugin {
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

      // if (process.env.NODE_ENV === "development") {
      //   code = getReadFileSync(code);
      //   generateCurrentMarkdown(code, id);
      // }

      // 将 md 文件中的图片转换为 Image 组件
      return convertMdImageToAImage(code)
    },
  }
}

export default vitePluginMdTransform
