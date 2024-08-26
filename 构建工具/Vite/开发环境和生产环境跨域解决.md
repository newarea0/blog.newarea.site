# 开发环境和生产环境跨域解决

## 1 开发环境（这里重点讲解proxyTable中的pathRewrite）

[vue-cli 配置 proxyTable pathRewrite](https://www.cnblogs.com/wangqiao170/p/9284524.html)

[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#proxycontext-config)

### 1.1 情况1 - 接口没有统一前缀

如果 API 接口没有统一的前缀，是不是就不能使用 proxyTable 了呢？不，还是可以用的。

使用 proxyTable，请求的 url 必须要有一个统一的前缀，因此，即使实际的接口地址没有统一的前缀，在前端代码中我们可以人为地给请求 url 添加一个前缀。

如`http://139.9.232.44:8000/user/list`、`http://139.9.232.44:8000/student/list`，在前端代码中接口请求地址（url）可以写成/api/user/list、/api/student/list，配置如下

```js
module.exports = {
  devServer: {
    proxy: {
      '/api/v1': {
        // ...
      },
      '/api': {
        target: 'http://139.9.232.44:8000', // 本来请求的localhost:80，现在代理到http://139.9.232.44:8000
        changeOrigin: true,
        pathRewrite: { // 该情况下，pathRewrite必写
          '^/api': '' // 相当于'/api/user/list'.replace(/^\/api/, '') -> '/user/list'
        }
      }
      // ...
    }
  }
}
```

`http://localhost:80/api/user/list -> http://139.9.232.44:8000/user/list`

在开发环境时，通过 axios 调用 `/api/user/list` 时，即调用 `http://localhost:80/api/user/list`，由于该地址中包含 `/api`，根据上面配置，会将请求接口的主机代理到 `http://139.9.232.44:8000`，然后将 `/api` 替换成空，最终请求地址为 `http://139.9.232.44:8000/user/list`

如果在前端代码中接口请求地址（url）写死，如直接写成 `http://139.9.232.44:8000/user/list`，**那么不会经过上面的代理**，实际调用时，客户端（浏览器）会直接去调部署在 `http://139.9.232.44:8000` 上的接口。除非后端接口做了CORS 处理，允许跨域请求，否则会出现跨域问题，调用失败。


注意：

代码中不建议将接口地址写死，因为调用 http 或 https开头的接口不会经过代理，此时只有当接口本身设置了允许跨域访问才能调用成功。

```js
// 不建议
axios.get('http://172.16.8.15/api/resource/vps/count').then(res => {
  console.log(res)
})
```

```js
// 建议
axios.get('/api/resource/vps/count').then(res => {
  console.log(res)
})
```

### 1.2 情况2 - 接口有统一前缀

后端提供的 API 接口有统一的前缀，如 `http://139.9.232.44:8000/api/user/list`、`http://139.9.232.44:8000/api/student/list`，在前端代码中接口请求地址（url）可以写成 `/api/user/list`、`/api/student/list`，配置如下

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://139.9.232.44:8000',
        changeOrigin: true,
        pathRewrite: { // 该情况下，pathRewrite也可以不写(推荐不写)
          '^/api': '/api'
        }
      }
    }
  }
}
```

## 2 生产环境(测试、预发环境也一样)

[参考](https://www.cnblogs.com/zhaohongcheng/p/11250161.html)

[参考](https://blog.csdn.net/zhangqun23/article/details/86685432)

生产环境通常使用 Nginx 部署打包后的单页面，如 Nginx 服务器地址为 `http://139.9.232.50:8080`。

### 2.1 情况1 - 接口没有统一前缀

API接口没有统一的前缀

接口 `http://139.9.232.44:8000/user/list` 在前端代码中直接写成 `/api/user/list`。通过axio调用 `/api/user/list` 时，即调用 `http://139.9.232.50:8080/api/user/list`（因为前端代码是部署在 `http://139.9.232.50:8080` ），明显实际没有这个接口，配置 Nginx 反向代理：

```conf
location  /api {
  proxy_pass  http://139.9.232.44:8000;
  rewrite  ^.+api/?(.*)$ /$1 break;
  # 下面这样写也可以(只是略微修改了正则表达式)
  # rewrite ^/api/(.*) /$1 break;
}
```

上述配置的作用是当 Nginx 收到以 `/api` 开头的请求时，将请求代理到 `http://139.9.232.44:8000` 服务器，并去掉开头的 `/api` (因为实际后端接口没有`/api`)

### 2.2 情况2 - 接口有统一前缀

API接口有统一的前缀，如下的统一前缀 `/api`。

接口 `http://139.9.232.44:8000/api/user/list` 在前端代码中写成 `/api/user/list`。通过axio调用 `/api/user/list` 时，即调用 `http://139.9.232.50:8080/api/user/list`，明显实际没有这个接口，配置Nginx反向代理：

```conf
location  /api {
  proxy_pass  http://139.9.232.44:8000;
}
```

## 3 注意

当请求路径有多个匹配规则时，如

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
          // ...
      },
      '/api/v1': {
        // ...
      }
    }
  }
}
```

尽管有多条匹配规则，当有一个请求时，会从上往下进行匹配，如果匹配了某条规则，就不再匹配下面的规则，拿上面的例子讲，有一个请求以 `/api/v1` 开头，本打算使用第二条匹配规则，结果却匹配了第一条规则，从而使请求不成功。

如果有多条匹配规则，一般将复杂规则的写在前面，简单规则写在后面，所以上面应该改为

```js
module.exports = {
  devServer: {
    proxy: {
      '/api/v1': {
        // ...
      },
      '/api': {
          // ...
      }
    }
  }
}
```

同样的，Nginx 配置文件中也可以写多个匹配规则。
