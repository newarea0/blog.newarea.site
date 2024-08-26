# meta

在 vue2-router中，在处理嵌套路由时，meta 仅包含匹配位置的 route meta 信息。 看个栗子：

```js
{
  path: '/parent',
  meta: { nested: true },
  children: [
    { path: 'foo', meta: { nested: true } },
    { path: 'bar' }
  ]
}
```

在导航到 /parent/bar 时，只会显示当前路由对应的 meta 信息为 {}，不会显示父级的 meta 信息

```js
meta: {}
```

所以在这种情况下，需要通过 to.matched.some() 检查 meta 字段是否存在，而进行下一步逻辑。

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.nested))
    next('/login')
  else next()
})
```

因此为了避免使用额外的 to.matched.some， 这个 rfc 提议，将父子路由中的 meta 进行第一层合并（同 Object.assing()，而不是递归合并）。如果再遇到上述嵌套路由时，将可以直接通过to.meta 获取信息。

```js
router.beforeEach((to, from, next) => {
  if (to.meta.nested) next('/login')
  else next()
})
```
