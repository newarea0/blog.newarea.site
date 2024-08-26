# GitHub Pages

> GitHub Pages 是一项静态站点托管服务，它直接从 GitHub 上的仓库获取 HTML、CSS 和 JavaScript 文件。

站点（GitHub Pages site）必须要有对应的仓库（GitHub repository ），但不是每一个仓库都有对应的站点。想要创建一个新站点，要么存在一个现有的仓库，要么新建一个仓库。

如果仓库中并非所有文件都与站点相关，则可以使用指定分支和文件夹保存站点源文件，也可以使用自定义 GitHub Actions 工作流来生成和部署站点源文件。

## 创建站点

### 步骤

1.在 GitHub 上，导航到站点的仓库。

2.单击仓库下的 “Settings” 选项卡。

![](https://image.newarea.site/20230901/01.png)

3.单击 “Pages”，选择 “Deploy from a branch”，并为站点内容选择分支、根目录，注意：根目录下必须存在 `index.html`、`index.md` 或 `README.md` 文件，GitHub Pages 将以此作为站点的入口文件。

![](https://image.newarea.site/20230901/02.png)

4.站点的访问路径为 `https://<username>.github.io/<repository>`，其中 `username` 表示 GitHub 用户名，repository 表示仓库名。如果创建的仓库名称为 `<username>.github.io`，则站点访问路径为 `https://<username>.github.io`

5.更改站点源文件后，**需要等一会站点才更新**。

### 示例

1.在 GitHub 上新建一个仓库 foo。

2.在本地新建一个项目 Git foo，在项目根目录下添加如下文件

::: code-tabs

@tab index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <p>Hello, Tom</p>
</body>
</html>
```

@tab index.css

```css
body {
  color: red;
}
```

:::

3.将项目 foo 推送到仓库 foo。

```sh
git remote add origin git@github.com:tomZhang68/foo.git
git push -u origin master
```

4.按照上述创建站点步骤开启仓库 foo 的 GitHub Pages。

5.通过 `http://tomZhang68.github.io/foo` 访问站点。

## 注意

对于名称为非 `username.github.io` 的仓库，如仓库 foo，要想站点中资源能被正确引用，如果资源引用路径使用绝对路径，则需要在路径前加上 `/foo/`。如上例中 index.html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/blog/style.css">
  <title>Document</title>
</head>
<body>
  <p>Hello, Tom</p>
</body>
</html>
```
