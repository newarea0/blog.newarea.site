/* eslint-disable no-console */
// 该脚本用于自动生成 VitePress 侧边栏配置

// 使用方法：
// 1. 将此脚本放置在项目根目录
// 2. 在终端中运行： node generate-sidebar.js 目录名 输出文件路径，例如: node .\generate-sidebar.js 基础 .\.vitepress\sidebars\basic.ts
// 3. 脚本将扫描 基础 目录下的所有 .md 文件，生成侧边栏配置
// 4. 生成的配置将保存在 .\.vitepress\sidebars\basic.ts 文件中

// 注意事项：
// - 目录结构将被转换为嵌套的侧边栏项
// - 默认所有目录都是折叠的（collapsed: true）
// - README.md 文件会被忽略
// - 文件名将作为侧边栏项的文本显示

// 配置选项：
// - DOCS_DIR：文档根目录，默认为 'docs'
// - OUTPUT_FILE：输出文件路径，默认为 '.vitepress/sidebar.js'

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function generateSidebar(dir, basePath = '') {
  const sidebar = []
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      const dirName = path.basename(file)
      const items = generateSidebar(filePath, path.join(basePath, dirName))
      if (items.length > 0) {
        sidebar.push({
          text: dirName,
          collapsed: true, // 设置默认折叠
          items,
        })
      }
    }
    else if (path.extname(file) === '.md') {
      const name = path.basename(file, '.md')
      if (name.toLowerCase() !== 'readme') {
        sidebar.push({
          text: name,
          // 去掉开头的斜杠，否则侧边栏菜单无法高亮
          link: `${path.join(basePath, name).replace(/\\/g, '/')}`,
        })
      }
    }
  })

  return sidebar
}

function stringifySidebar(sidebar, indent = 0) {
  const spaces = ' '.repeat(indent)
  let result = '[\n'
  sidebar.forEach((item) => {
    if (Object.keys(item).length === 2 && item.text && item.link) {
      // 如果只有 text 和 link，则在一行内显示
      result += `${spaces}  { text: '${item.text}', link: '${item.link}' },`
    }
    else {
      result += `${spaces}  {\n`
      result += `${spaces}    text: '${item.text}',\n`
      if (item.link) {
        result += `${spaces}    link: '${item.link}',\n`
      }
      if (item.collapsed !== undefined) {
        result += `${spaces}    collapsed: ${item.collapsed},\n`
      }
      if (item.items) {
        result += `${spaces}    items: ${stringifySidebar(item.items, indent + 4)},\n`
      }
      result += `${spaces}  },`
    }
    result += '\n'
  })
  result += `${spaces}]`
  return result
}

function writeSidebarConfig(sidebar, outputPath) {
  const content = `import type { DefaultTheme } from 'vitepress'

export const ${path.basename(outputPath, '.ts')}Sidebar: DefaultTheme.SidebarItem[] = ${stringifySidebar(sidebar)}
`

  fs.writeFileSync(outputPath, content)
  console.log(`侧边栏配置已生成到: ${outputPath}`)
}

// 获取命令行参数
const args = process.argv.slice(2)
if (args.length < 2) {
  console.error('请提供目录名和输出文件路径作为参数')
  process.exit(1)
}

const dirName = args[0]
const outputPath = args[1]
const docsDir = path.join(__dirname, dirName)

if (!fs.existsSync(docsDir)) {
  console.error(`目录 "${dirName}" 不存在`)
  process.exit(1)
}

const sidebar = generateSidebar(docsDir)
writeSidebarConfig(sidebar, outputPath)
