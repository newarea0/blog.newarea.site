# vite-plugin-svg-icons

[vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md)

用于生成 [svg 雪碧图](https://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/).

svg-icon.js

```ts
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild,
  })
}
```


## 配置说明

| 参数        | 类型                   | 默认值                | 说明                                                           |
| ----------- | ---------------------- | --------------------- | -------------------------------------------------------------- |
| iconDirs    | `string[]`             | \-                    | 需要生成雪碧图的图标文件夹                                     |
| symbolId    | `string`               | `icon-[dir]-[name]`   | svg 的 symbolId 格式，见下方说明                               |
| svgoOptions | `boolean｜SvgoOptions` | `true`                | svg 压缩配置，可以是对象[Options](https://github.com/svg/svgo) |
| inject      | `string`               | `body-last`           | svgDom 默认插入的位置，可选`body-first`                        |
| customDomId | `string`               | `__svg__icons__dom__` | svgDom 插入节点的 ID                                           |

**symbolId**

`icon-[dir]-[name]`

`[name]`：svg 文件名

`[dir]`：

该插件的 svg 不会生成 hash 来区分，而是通过文件夹来区分。如果`iconDirs`对应的文件夹下面包含这其他文件夹，例：

则生成的 SymbolId 为注释所写

```shell
# src/icons
- icon1.svg # icon-icon1
- icon2.svg # icon-icon2
- icon3.svg # icon-icon3
- dir/icon1.svg # icon-dir-icon1
- dir/dir2/icon1.svg # icon-dir-dir2-icon1
```

## SVG 要求

- 为了使图标颜色可改变，在 SVG 中设置 `fill="currentColor"` 或 `stroke="currentColor"`。
- 不要指定 `height` 和 `width`。
