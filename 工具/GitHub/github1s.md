# github1s

仅仅想方便的阅读下 GibHub 项目代码，虽然 GitHub 本身可以直接在网页端进行新建、编辑文件的操作。但没有历史文件标签页，每次只能编辑一个文件，需要不停的在左侧目录菜单查找文件、导航，使用体验太好。

![](https://image.newarea.site/2024-05-25-14-34-17.png)

之前的做法可能是将 GitHub 项目下载、克隆到本地，然后用本地编辑器（如 VSCode）打开项目。你可能需要安装相关编辑器、Git以及各种配置，这也很麻烦。

![](https://image.newarea.site/2024-05-23-14-50-00.png)

有没有一种简单的方法来阅读 GitHub 项目代码呢？可以使用 [github1s](https://github.com/conwnet/github1s)，通过在项目 URL 的 github 后面添加 `1s` 来快速打开在线版的 VS Code。

注意，github1s **只能用于阅读源码不支持编辑功能**。

## 方式1 通过修改地址栏 URL

在浏览器地址栏修改原 GitHub 项目 URL。

只需在 github 后面添加 `1s`，然后在浏览器地址栏中按 Enter 键即可在**当前标签页**阅读项目代码。

![](https://image.newarea.site/2024-05-25-14-56-00.png)

## 方式2 通过书签

将以下代码片段保存为书签，可以使用它在 github.com 和 github1s.com 之间快速切换。

```js
javascript: window.location.href = window.location.href.replace(/github(1s)?.com/, function(match, p1) { return p1 ? 'github.com' : 'github1s.com' })
```

打开浏览器书签管理器 > 点击右上角管理按钮（三个点）> 选择添加新书签，将上述代码作为网址添加新书签：

![](https://image.newarea.site/2024-05-25-15-07-23.png)

## 方式3 通过浏览器插件

[相关的第三方插件](https://github.com/conwnet/github1s?tab=readme-ov-file#chrome-extensions)

## 方式4 通过油猴脚本（推荐）

安装油猴脚本[Github跳转到github1s编辑页面](https://greasyfork.org/zh-CN/scripts/422506-github%E8%B7%B3%E8%BD%AC%E5%88%B0github1s%E7%BC%96%E8%BE%91%E9%A1%B5%E9%9D%A2)，Github仓库页面显示一个按钮，跳转到Github1s的编辑页面

![](https://image.newarea.site/2024-05-25-15-44-34.png)
