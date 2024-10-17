# gitalk

Gitalk 是一个基于 GitHub Issue 和 Preact 开发的评论插件。

## 1 注册 OAuth application

点击右上角个人头像 -> Settings -> Developer settings -> OAuth Apps -> New OAuth App

![](https://image.newarea.site/2024-04-15-23-17-42.png)

![](https://image.newarea.site/2024-04-15-23-19-36.png)

![](https://image.newarea.site/2024-04-15-23-20-59.png)

![](https://image.newarea.site/2024-04-15-23-25-12.png)

前面三个参数可以随意填写，第四个参数很重要，是登录 Github 后的回调 URL，这个一定不能填写错，开发时可以写开发时的本地地址，如 `http://localhost:5173/`、`http://192.168.231.172:5173/`，应用上线后，可以填写线上地址。

这里第四个参数我填 `http://localhost:5173/`。

```html
index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="gitalk-container"></div>

  <script type="module" src="./src/index.js"></script>
</body>
</html>
```

```js
// src/index.js
const gitalk = new Gitalk({
  clientID: '586fc98ddcabd3d4fbb7',
  clientSecret: 'c06929a0114901500b25f9ce552590a760352cb8',
  // Github 仓库名，如 Github 用户 newarea0 下有个仓库 gitalk
  repo: 'gitalk',
  owner: 'newarea0',
  admin: ['newarea0'],
  id: location.pathname,
  distractionFreeMode: false
})

gitalk.render('gitalk-container')
```

注意仓库要提前创建好。

![](https://image.newarea.site/2024-04-15-23-50-22.png)

点击【使用 GitHub 登录】按钮，跳转到 GitHub 登录页面：

![](https://image.newarea.site/2024-04-15-23-53-17.png)

输入用户名、密码点击【Sign in】按钮，跳转到上面注册 OAuth application 时，第四个参数填写的 URL：

![](https://image.newarea.site/2024-04-15-23-54-20.png)
