# 插件

可插拔

https://github.com/umijs/umi/tree/master/packages/plugins/src

https://github.com/umijs/umi/tree/master/packages/core/src

## 常用插件

## 如何启用

## 如何配置

有的插件配置分为构建时配置和运行时配置

在路由里配置菜单信息

```js
// config/routes.ts
export default [
  {
    path: '/overview',
    component: 'Overview/index',
    menu: {
      name: 'overview',
      icon: 'testicon',
      flatMenu: false,
      hideInMenu: false,
      hideChildrenInMenu: false,
    },
  },
];
```

配置单个路由的布局信息

```js
// config/route.ts
export default [
  {
    path: '/overview',
    component: 'Overview/index',
    name: 'overview',
    icon: 'testicon',
    layout: {
      hideMenu: false,
      hideNav: false,
      hideFooter: false,
    },
  },
];
```

嵌套布局

```js
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

下面这种写法是旧的写法

```js
/**
 * 路由配置
 */
export interface IBestAFSRoute extends IRoute {
  /** 权限：https://yuque.antfin-inc.com/bigfish/best_afs/nxuhgb */
  access?: string;

  /** 当前页面的面包屑是否隐藏 */
  showBreadcrumb?: boolean;

  /** 默认为 false，在菜单中隐藏此项包括子项 */
  menu?: false | IRouteMenuConfig;

  /** 默认为 true ，是否显示 Layout */
  layout?: boolean | IRouteLayoutConfig;
}
```

![](https://image.newarea.site/2024-03-21-11-23-02.png)