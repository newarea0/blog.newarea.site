# 利用 GitHub Actions 构建 GitHub Pages 所需源文件

1.新建一个 Vue3 + Vite 项目 vite-project ，并初始化为一个 Git 项目

```sh
pnpm create vite
# 一系列下一步...
cd vite-project
git init
```

修改 vite.config.ts

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/vite-project/'
})
```

2.添加文件 `.github/workflows/deploy.yml`

```yml
name: deploy

on:
  push:
    branches:
      - master

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: use Node.js 16
        uses: actions/setup-node@v3
        with:
          # 选择要使用的 node 版本
          node-version: '16.x'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          # 选择要使用的 pnpm 版本
          version: 8
          # 使用 pnpm 安装依赖
          run_install: true
      
      - name: Build
        run: pnpm run build

      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: ./dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

secrets.GITHUB_TOKEN 无需手动添加。

3.新建一个 GitHub 仓库 vite-project，并将上面创建的项目代码提交到该仓库，GitHub Actions 会自动打包，并将产物存放在仓库 gh-pages 分支下。

4.开启仓库 GitHub Pages，选择“Deploy from a branch”，选择分支 gh-pages。

5.GitHub pages 站点路径为 `https://tomzhang68.github.io/vite-project/`。
