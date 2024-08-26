# 重定向、别名、替换

[重定向和别名](https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html)

## 重定向 redirect

**重定**向类似 Nginx 中的代理，访问路由 `/a`，实际上跳转到路由 `/b`。

```js
const route = createRouter({
  routes: [
    {
      path: '/a',
      redirect: '/b'
    },
    {
      path: '/b',
      // ...
    }
  ]
})
```

配置了重定向 `redirect` 就无需配置 `component` 或 `components` 配置，因为重定向记录永远不会到达。唯一的例外是嵌套路由：如果一个路由记录有 children 和 redirect 属性，它也应该有 component 属性。

## 别名 alias

**别名**类似人的小名、外号，如王五，小名小王，当喊王五、小王叫的是同一个人。

```js
const route = createRouter({
  routes: [
    {
      path: '/a',
      alias: '/home',
      // ...
    }
  ]
})
```

## 替换 replace

用在导航中，作用类似于 `router.push`，唯一不同的是，它在导航时不会向 history 添加新记录，正如它的名字所暗示的那样——它取代了当前的条目。

声明式 | 编程式
:-- | :--
`<router-link :to="..." replace>` | `router.replace(...)` <br> `router.push({ path: '/home', replace: true })` <br>...
