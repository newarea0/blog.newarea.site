# 路由

参考文档时以[将文件加入菜单和路由](https://pro.ant.design/zh-CN/docs/new-page#%E5%B0%86%E6%96%87%E4%BB%B6%E5%8A%A0%E5%85%A5%E8%8F%9C%E5%8D%95%E5%92%8C%E8%B7%AF%E7%94%B1)为主，辅以：

- Ant Design Pro-高级使用-[菜单的高级用法](https://pro.ant.design/zh-CN/docs/advanced-menu)
- Ant Design Pro-页面开发-[布局](https://pro.ant.design/zh-CN/docs/layout)
- Umi-Umi Max-布局与菜单-配置-[扩展的路由配置](https://umijs.org/docs/max/layout-menu#%E6%89%A9%E5%B1%95%E7%9A%84%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE)
- Umi-指南-[路由](https://umijs.org/docs/guides/routes)

## 路由相关配置

path

component

## 菜单相关配置

- name：如果没有配置该项，则该路由不会出现在侧边菜单中。

- icon：菜单图标。

parentKeys

access

- flatMenu: 为 `true` 时表示不展示自己，只展示 children

### hideInXXX

- hideChildrenInMenu：用于配置是否在菜单中隐藏 children。

hideInMenu

hideInBreadcrumb

### 布局相关配置

layout

Umi-指南-路由-路由配置-[layout](https://umijs.org/docs/guides/routes#layout)

1. 全局布局可能来自于 layouts/index.tsx 约定，或插件添加的 layout（如 @umijs/max 自带的 layout 插件将自动添加菜单布局），当配置 layout: false 时，将取消所有 layout ，此时组件内容占据整个页面，多用于登录页等场景。

2. layout: false 仅对一级路由生效，更多例子详见 [全局 layout](https://umijs.org/docs/guides/routes#%E5%85%A8%E5%B1%80-layout) 。

layout 另一种用法：

Ant Design Pro-高级用法-菜单的高级用法-[根据路径更换布局](https://pro.ant.design/zh-CN/docs/advanced-menu#%E6%A0%B9%E6%8D%AE%E8%B7%AF%E5%BE%84%E6%9B%B4%E6%8D%A2%E5%B8%83%E5%B1%80)

xxxRender：

headerRender

footerRender

menuRender

menuHeaderRender

## 嵌套布局

参考：Ant Design Pro-页面开发-布局-路由配置-[嵌套路由](https://pro.ant.design/zh-CN/docs/layout#%E5%B5%8C%E5%A5%97%E5%B8%83%E5%B1%80)

有时我们的页面可能会有一些全局的通用的处理逻辑或者 UI，会希望在页面加载前完成，通常会希望可以在**内置布局**内部再包一层 layout 来完成需求。

```tsx
// config/routes.ts
export default [
  {
    path: '/',
    component: '../layout/index',
    menu: {
      flatMenu: true,
    },
    routes: [
      {
        path: '/',
        redirect: '/overview',
      },
      {
        path: '/overview',
        component: 'Overview/index',
        menu: {
          name: 'overview',
          icon: 'testicon',
        },
      },
    ],
  },
];

// src/layout/index.tsx
const Layout = ({ children }) => children;
export default Layout;
```

## 路由、页面变化

```ts
// src/app.tsx

// https://umijs.org/docs/api/runtime-config#onroutechange
export const onRouteChange: RuntimeConfig['onRouteChange'] = () => {
  console.log(5566)
}

/**
 * @name ProLayout 运行时布局配置
 * @doc https://procomponents.ant.design/components/layout#prolayout
 */
export const layout: RunTimeLayoutConfig = ({ initialState }) => {

  return {
    onPageChange() {
      console.log(33344)
    },
  }
}
```
