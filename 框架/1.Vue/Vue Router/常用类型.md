# 常用类型

## 1 [RouterOptions](https://router.vuejs.org/zh/api/#routeroptions)

`createRouter` 的参数的类型

```ts
export declare type PathParserOptions = Pick<_PathParserOptions, 'end' | 'sensitive' | 'strict'>;

/**
 * Options to initialize a {@link Router} instance.
 */
export declare interface RouterOptions extends PathParserOptions {
    /**
     * History implementation used by the router. Most web applications should use
     * `createWebHistory` but it requires the server to be properly configured.
     * You can also use a _hash_ based history with `createWebHashHistory` that
     * does not require any configuration on the server but isn't handled at all
     * by search engines and does poorly on SEO.
     *
     * @example
     * ```js
     * createRouter({
     *   history: createWebHistory(),
     *   // other options...
     * })
     * ```
     */
    history: RouterHistory;
    /**
     * Initial list of routes that should be added to the router.
     */
    routes: Readonly<RouteRecordRaw[]>;
    /**
     * Function to control scrolling when navigating between pages. Can return a
     * Promise to delay scrolling. Check {@link ScrollBehavior}.
     *
     * @example
     * ```js
     * function scrollBehavior(to, from, savedPosition) {
     *   // `to` and `from` are both route locations
     *   // `savedPosition` can be null if there isn't one
     * }
     * ```
     */
    scrollBehavior?: RouterScrollBehavior;
    /**
     * Custom implementation to parse a query. See its counterpart,
     * {@link RouterOptions.stringifyQuery}.
     *
     * @example
     * Let's say you want to use the [qs package](https://github.com/ljharb/qs)
     * to parse queries, you can provide both `parseQuery` and `stringifyQuery`:
     * ```js
     * import qs from 'qs'
     *
     * createRouter({
     *   // other options...
     *   parseQuery: qs.parse,
     *   stringifyQuery: qs.stringify,
     * })
     * ```
     */
    parseQuery?: typeof parseQuery;
    /**
     * Custom implementation to stringify a query object. Should not prepend a leading `?`.
     * {@link RouterOptions.parseQuery | parseQuery} counterpart to handle query parsing.
     */
    stringifyQuery?: typeof stringifyQuery;
    /**
     * Default class applied to active {@link RouterLink}. If none is provided,
     * `router-link-active` will be applied.
     */
    linkActiveClass?: string;
    /**
     * Default class applied to exact active {@link RouterLink}. If none is provided,
     * `router-link-exact-active` will be applied.
     */
    linkExactActiveClass?: string;
}

export declare function createRouter(options: RouterOptions): Router
```

## 2 RouteRecordRaw 和 RouteRecordNormalized

相同点：都反映了路由**记录相关**信息。

区别：

- RouteRecordRaw 是配置路由时，由**用户输入的**路由记录
- RouteRecordNormalized 用户输入的路由记录，**经路由系统解析后得到的**标准路由记录

### 2.1 [RouteRecordRaw](https://router.vuejs.org/zh/api/#routerecordraw)

路由记录

- 使用 `createRouter` 的选项 `routes` 的类型，及其中的 `children` 的类型。
- 作为 `addRoute` 的参数的类型。

```ts
export declare type PathParserOptions = Pick<_PathParserOptions, 'end' | 'sensitive' | 'strict'>;

/**
 * @internal
 */
export declare interface _PathParserOptions {
    /**
     * Makes the RegExp case sensitive. Defaults to false
     */
    sensitive?: boolean;
    /**
     * Should we disallow a trailing slash. Defaults to false
     */
    strict?: boolean;
    /**
     * Should the RegExp match from the beginning by prepending a `^` to it. Defaults to true
     * @internal
     */
    start?: boolean;
    /**
     * Should the RegExp match until the end by appending a `$` to it. Defaults to true
     */
    end?: boolean;
}

/**
 * Common properties among all kind of {@link RouteRecordRaw}
 * @internal
 */
export declare interface _RouteRecordBase extends PathParserOptions {
    /**
     * Path of the record. Should start with `/` unless the record is the child of
     * another record.
     *
     * @example `/users/:id` matches `/users/1` as well as `/users/posva`.
     */
    path: string;
    /**
     * Where to redirect if the route is directly matched. The redirection happens
     * before any navigation guard and triggers a new navigation with the new
     * target location.
     */
    redirect?: RouteRecordRedirectOption;
    /**
     * Aliases for the record. Allows defining extra paths that will behave like a
     * copy of the record. Allows having paths shorthands like `/users/:id` and
     * `/u/:id`. All `alias` and `path` values must share the same params.
     */
    alias?: string | string[];
    /**
     * Name for the route record.
     */
    name?: RouteRecordName;
    /**
     * Before Enter guard specific to this record. Note `beforeEnter` has no
     * effect if the record has a `redirect` property.
     */
    beforeEnter?: NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[];
    /**
     * Arbitrary data attached to the record.
     */
    meta?: RouteMeta;
    /**
     * Array of nested routes.
     */
    children?: RouteRecordRaw[];
}

/**
 * Route Record defining one single component with the `component` option.
 */
declare interface RouteRecordSingleView extends _RouteRecordBase {
    /**
     * Component to display when the URL matches this route.
     */
    component: RawRouteComponent;
    components?: never;
    children?: never;
    redirect?: never;
    /**
     * Allow passing down params as props to the component rendered by `router-view`.
     */
    props?: _RouteRecordProps;
}

export declare type RouteRecordRaw = RouteRecordSingleView | RouteRecordSingleViewWithChildren | RouteRecordMultipleViews | RouteRecordMultipleViewsWithChildren | RouteRecordRedirect;
```

### 2.2 [RouteRecordNormalized](https://router.vuejs.org/zh/api/#routerecordnormalized)

路由记录的标准化版本，用于

- getRoutes 返回的数组中的每项的类型；
- 导航守卫中 `to`、`from` 中的 `matched` 的类型。

```ts
/**
 * Normalized version of a {@link RouteRecord | route record}.
 */
export declare interface RouteRecordNormalized {
    /**
     * {@inheritDoc _RouteRecordBase.path}
     */
    path: _RouteRecordBase['path'];
    /**
     * {@inheritDoc _RouteRecordBase.redirect}
     */
    redirect: _RouteRecordBase['redirect'] | undefined;
    /**
     * {@inheritDoc _RouteRecordBase.name}
     */
    name: _RouteRecordBase['name'];
    /**
     * {@inheritDoc RouteRecordMultipleViews.components}
     */
    components: RouteRecordMultipleViews['components'] | null | undefined;
    /**
     * Nested route records.
     */
    children: RouteRecordRaw[];
    /**
     * {@inheritDoc _RouteRecordBase.meta}
     */
    meta: Exclude<_RouteRecordBase['meta'], void>;
    /**
     * {@inheritDoc RouteRecordMultipleViews.props}
     */
    props: Record<string, _RouteRecordProps>;
    /**
     * Registered beforeEnter guards
     */
    beforeEnter: _RouteRecordBase['beforeEnter'];
    /**
     * Registered leave guards
     *
     * @internal
     */
    leaveGuards: Set<NavigationGuard>;
    /**
     * Registered update guards
     *
     * @internal
     */
    updateGuards: Set<NavigationGuard>;
    /**
     * Registered beforeRouteEnter callbacks passed to `next` or returned in guards
     *
     * @internal
     */
    enterCallbacks: Record<string, NavigationGuardNextCallback[]>;
    /**
     * Mounted route component instances
     * Having the instances on the record mean beforeRouteUpdate and
     * beforeRouteLeave guards can only be invoked with the latest mounted app
     * instance if there are multiple application instances rendering the same
     * view, basically duplicating the content on the page, which shouldn't happen
     * in practice. It will work if multiple apps are rendering different named
     * views.
     */
    instances: Record<string, ComponentPublicInstance | undefined | null>;
    /**
     * Defines if this record is the alias of another one. This property is
     * `undefined` if the record is the original one.
     */
    aliasOf: RouteRecordNormalized | undefined;
}

export declare type RouteRecord = RouteRecordNormalized;
```

标准路由记录包含了全部的属性（属性全是必须的），如果没有配置某项属性，则该属性为空。

## 3 RouteLocationRaw 和 RouteLocationNormalized

相同点：都反映了**路由地址**相关信息。

区别：

- RouteLocationRaw 导航时，**用户配置**的路由地址
- RouteLocationNormalized 用户配置的路由地址，**经路由系统解析后得到的**标准路由地址


### 3.1 [RouteLocationRaw](https://router.vuejs.org/zh/api/#routelocationraw)

用户级的路由地址，**用来告诉路由系统“我要去哪个页面”**，可以用于：

- 传递给 `push`、`redirect`方法的参数的类型；
- `<router-link>` props `to` 的类型；
- 用于在导航首位中返回。

```ts
export declare type RouteLocationRaw = string | RouteLocationPathRaw | RouteLocationNamedRaw;
```

可以是字符串、对象，有三种形式，如

```js
router.push('/users/posva#bio')
router.push({ path: '/users/posva', hash: '#bio' })
router.push({ name: 'users', params: { username: 'posva' }, hash: '#bio' })
```

### 3.2 [RouteLocationNormalized](https://router.vuejs.org/zh/api/#routelocationnormalized)

标准化的路由地址，没有任何重定向记录。在导航守卫中，to 和 from 总是属于这种类型。

上面的 `router.push('/users/posva#bio')` 经解析后可以得到 `RouteLocationNormalized` 类型对象，

```
{
  fullPath: '',
  hash: '#bio',
  query: '',
  matched: [
    // ...
  ],
  meta: '',
  name: '',
  params: { username: 'posva' }，
  path: '/users/posva'，
  redirectedFrom: ''
}
```