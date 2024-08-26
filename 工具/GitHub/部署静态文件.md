# 使用 GitHub Action、GitHub Pages 部署静态文件

打算使用 VuePress 搭建个人博客，想要每当提交代码到 GitHub 仓库时，通过 GitHub Action 工作流，自动更新 GitHub Pages 为最新内容。工作流配置如下：

.github/workflows/deploy-docs.yml

```yml
name: Deploy docs

on:
  # 每当 push 到远程 master 分支时触发 Github Action
  push:
    branches:
      - master

permissions:
  contents: write

jobs:
  deploy-docs:
    # 暂时禁用该 job
    if: ${{ false }}
    # 使用环境
    runs-on: ubuntu-latest

    steps:
      # 将代码拉取到虚拟机
      - uses: actions/checkout@v3
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      
      # 安装 pnpm
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          # 使用 pnpm install 安装依赖
          run_install: true

      # 安装 Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          # 用于指定用于缓存的包管理器，应该先安装包管理器
          cache: pnpm

      # 运行构建脚本
      - name: Build VuePress site
        run: pnpm build

      # 部署到 GitHub Pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: src/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

除了上面的 [crazy-max/ghaction-github-pages](https://github.com/crazy-max/ghaction-github-pages)，[peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) 也可以实现将代码部署到GitHub Pages。

当执行上述工作流报如下错误时：

```
/usr/bin/git push origin gh-pages
remote: Write access to repository not granted.
fatal: unable to access 'https://github.com/username/repository.git/': The requested URL returned error: 403
Error: Action failed with "The process '/usr/bin/git' failed with exit code 128"
```

有两种方式解决。

**方式一：**

修改工作流配置文件，向 workflow 或 job 的 [permissions.contents](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#permissions) 添加写权限:

```yml
permissions:
  contents: write
```

**方式二：**

配置 [GITHUB_TOKEN](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#configuring-the-default-github_token-permissions)，使其具有读写权限:

项目 Settings -> Actions -> General -> Workflow permissions -> 选择 `Read and write permissions`

![](https://image.newarea.site/2023-12-05-01-11-08.png)

上面的工作流配置使用了方式一。