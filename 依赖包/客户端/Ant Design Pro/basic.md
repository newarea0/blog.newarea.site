# Ant Design Pro 基础

## 相关常用参考文档

- [Ant Design](https://ant-design.antgroup.com/index-cn) - 蚂蚁集团出品的一套 React 组件库。
- [ProComponents](https://procomponents.ant.design/) - Ant Design 提供的是基础组件，ProComponents 基于 Ant Design 封装了一些实际场景中常用的业务组件，如 ProLayout、ProTable、ProForm 等。
- [Umi](https://umijs.org/) 一个可插拔的企业级前端应用框架，提供了一整套开箱即用的功能和约定。
- [Ant Design Pro](https://pro.ant.design/zh-CN) - 基于 Ant Design、ProComponents、Umi 封装的一整套企业级中后台前端/设计解决方案，可以理解一个后台模板、脚手架，避免了从零开始搭建项目。

## 安装

安装命令行工具

```sh
pnpm i @ant-design/pro-cli -g
```

初始化项目 myapp

```sh
pro create myapp
```

回答交互式的问题，complete 包含所有区块，不太适合当基础模板来进行二次开发，这里选择 simple

```sh
? 🚀 要全量的还是一个简单的脚手架? (Use arrow keys)
❯ simple
  complete
```

![](https://image.newarea.site/2024-03-22-01-17-13.png)

进入项目并安装依赖

```sh
cd myapp && pnpm i
```

启动项目

```sh
pnpm start
```

### 目录结构

![](https://image.newarea.site/2024-03-22-01-19-54.png)

```
├── config                   # 构建时配置，包含路由，插件的开启及配置，这里不能使用 JSX、浏览器 API
├── mock                     # 本地模拟数据
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── app.tsx              # 运行时配置
│   ├── global.less          # 全局样式
│   └── global.tsx           # 全局 JS
├── tests                    # 测试工具
├── README.md
└── package.json
```

### 约定大于配置

文件要放到对应的文件夹下面，如页面组件放到 `src/pages` 中。

## 配置 title、logo、favicon

### title

由 layout 插件决定，既可以通过[构建时配置](https://umijs.org/docs/max/layout-menu#title)，也可以通过[运行时配置](https://umijs.org/docs/max/layout-menu#title-1)。

修改 config/defaultSettings.ts

```ts
//...
title: 'Ant Design Pro1',
logo: '/logo.svg',
//...
```

### logo

和 title 一样，也是由 layout 插件决定，通过构建时、运行时配置。

使用新 logo 替换原 `public/logo.svg`。

修改 config/defaultSettings.ts

```ts
//...
logo: '/logo.svg',
//...
```

### favicon

[参考1](https://umijs.org/docs/api/config#favicons) [参考2](https://umijs.org/docs/guides/directory-structure#favicon)

使用新 favicon 文件替换原 `public/favicon.svg`。

如果文件名不是 `favicon.svg`，如 `public/favicon1.svg`，则修改 `config/config.ts`，添加如下内容：

```ts
//...
favicons: ['/favicon1.ico']
//...
```

![](https://image.newarea.site/2024-03-23-01-12-34.png)

## 新增一个页面

新增页面组件（路由组件），pages/ant-design/button/index.tsx

```tsx
import React from 'react';
import { Button, Flex } from 'antd';

const AntDesignButton: React.FC = () => {
  return (
    <>
      <Button>Primary</Button>

      <Flex gap="small" wrap="wrap">
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Flex>
    </>
  )
}

export default AntDesignButton
```

修改 config/routes.ts 添加对应路由配置，同时配置菜单

```ts
export default [
  // ...
  {
    path: '/ant-design',
    name: 'antDesign',
    icon: 'antDesign',
    routes: [
      {
        path: 'button',
        name: 'button',
        component: './ant-design/button',
      },
    ],
  },
  // ...
]
```

## 样式解决方案

## 权限

## 路径别名

- `@` 项目 src 目录
- `@@` 临时目录，通常是 src/.umi 目录
