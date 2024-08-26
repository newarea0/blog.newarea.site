# 过滤值为空字符串的参数

利用 Axios 参数如果是 undefined 传参时会默认无这个字段的特点，来过滤值为空字符串的参数。

```js
// 创建axios实例
const service = axios.create({
  // ...
})

// request 拦截器
service.interceptors.request.use((config) => {
  for (const key in config.data) {
    config.data[key] = config.data[key] === '' ? undefined : config.data[key]
  }
  return config
})
```

或者 [过滤请求参数中的空字符串，null和undefined值](https://www.qiyuandi.com/zhanzhang/zonghe/12215.html)
