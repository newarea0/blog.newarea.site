# create-turbo

create-turbo 是由 Vercel 提供的用于快速搭建 Turbo 项目的脚手架。它可以帮助我们快速创建一个基于 turborepo 的 monorepo 项目。

## 初始化项目

```sh
# 使用 Turborepo 维护的示例模板 https://turbo.build/repo/docs/getting-started/examples#core-maintained-examples
pnpm dlx create-turbo@latest --example [example-name]

# 使用社区模板 https://turbo.build/repo/docs/getting-started/examples#community-maintained-examples
npx create-turbo@latest --example [github-url]
```

下面表示使用基础模板：

```sh
pnpm dlx create-turbo@latest
```

1. 输入目录名（项目名），默认`my-turborepo`。
2. 选择包管理器。

![](https://image.newarea.site/2025-03-20_22-50-41.png)

## 项目目录结构

初始化后的项目核心结构如下：

```
my-turborepo
├─ apps
│  ├─ docs
│  └─ web
├─ packages
│  ├─ eslint-config
│  ├─ typescript-config
│  └─ ui
├─ package.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ README.md
└─ turbo.json
```

- `package.json`，描述项目命令、依赖

![](https://image.newarea.site/2025-03-20_23-19-30.png)

- `README.md`，详细的项目说明

![](https://image.newarea.site/2025-03-20_23-58-40.png)

- `turbo.json`，